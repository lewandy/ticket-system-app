<template>
  <v-container>
    <v-col cols="12">
      <v-row>
        <ticket-form
          @clearForm="clearForm()"
          @register="register(ticket)"
          @update="update(ticket)"
          :ticket.sync="ticket"
        ></ticket-form>
      </v-row>
      <v-row>
        <v-data-table :headers="headers" :items="tickets" :items-per-page="5" class="elevation-1">
          <template v-slot:item.status="{ item }">
            <div>{{ item.status.name }}</div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="showModal(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
            <v-icon small @click="viewDetail(item)">details</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";

import TicketForm from "./Register";

export default {
  created() {
    this.fetchTickets();
  },
  methods: {
    fetchTickets() {
      this.$store.dispatch("ticket/GET_ALL");
      this.$store.dispatch("ticket/GET_STATUS");
    },
    clearForm() {
      (this.ticket.id = null),
        (this.ticket.subject = ""),
        (this.ticket.description = ""),
        (this.ticket.employees = []),
        (this.ticket.status_id = true);
    },
    showModal(model = null) {
      let ticket = Object.assign({}, model);
      this.$store.dispatch("notifications/reset");
      this.$store.commit("ticket/MODAL_HANDLER", true);

      this.ticket.id = ticket.id;
      this.ticket.status_id = ticket.status.id;
      this.ticket.description = ticket.description;
      this.ticket.subject = ticket.subject;
    },
    register(ticket) {
      this.$store.dispatch("ticket/REGISTER", ticket);
    },
    update(ticket) {
      this.$store.dispatch("ticket/UPDATE", ticket);
    },
    deleteItem(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("ticket/DELETE", id);
          this.$store.dispatch("ticket/GET_ALL");
        }
      });
    }
  },
  computed: {
    alert() {
      return this.$store.getters["notifications/notification"];
    },
    ...mapGetters({ tickets: "ticket/GET" })
  },
  data() {
    return {
      IsModalOpen: false,
      ticket: {
        id: null,
        subject: "",
        description: "",
        employees: [],
        status_id: true
      },
      headers: [
        { text: "Id", value: "id" },
        { text: "subject", value: "subject" },
        { text: "description", value: "description" },
        { text: "status", value: "status" },
        { text: "Date Created", value: "date" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  components: {
    TicketForm
  }
};
</script>