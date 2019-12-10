<template>
  <v-container>
    <v-col cols="12">
      <v-row>
        <v-btn class="ml-3 mb-4" @click="modalHandler(true)" color="primary" dark>Register</v-btn>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="isModalOpen" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ IsUpdating ? 'Edit ticket' : 'Register ticket' }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        :rules="rules.subject"
                        v-model="ticket.subject"
                        label="Subject"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="8" sm="6">
                      <v-select
                        :disabled="IsUpdating"
                        v-model="ticket.employees"
                        :items="employees"
                        :menu-props="{ maxHeight: '400' }"
                        label="Employees"
                        :rules="rules.employees"
                        item-text="name"
                        multiple
                        return-object
                        hint="Select employees"
                        persistent-hint
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="8" sm="6">
                      <v-textarea
                        name="input-7-1"
                        label="Description"
                        v-model="ticket.description"
                        hint="Hint text"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
              <small>* indicates required field, fill password fields for change or empty for not change.</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="modalHandler(false)">Close</v-btn>
              <v-btn color="blue darken-1" text @click="actionHandler()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-data-table :headers="headers" :items="tickets" :items-per-page="5" class="elevation-1">
        <template v-slot:item.status="{ item }">
          <div>{{ item.status ? "Active" : "Inactive" }}</div>
        </template>
        <template v-slot:item.date="{ item }">
          <div>{{ item.dale | date }}</div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showDetail(item)">mdi-eye</v-icon>
          <v-icon small class="mr-2" @click="modalHandler(true,item)">edit</v-icon>
          <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { isNumber } from "util";
import { ModalFeaturesMixin } from "@/mixins/";
import GetConstant, {
  Actions,
  Getters
} from "@/store/modules/ticket/module-constants.js";

export default {
  mixins: [ModalFeaturesMixin],
  created() {
    this.getStatuses();
    this.getEmployees();
    this.getTickets();
  },
  data() {
    return {
      ticket: {
        id: null,
        subject: "",
        date: "",
        employees: [],
        description: "",
        status_id: 1
      },
      rules: {
        subject: [v => !!v || "The subject is required!"],
        employees: [
          v =>
            v.length > 0 ||
            this.ifTicketId() ||
            "You have to add at least one employee!"
        ],
        status: [v => !!v || "Select a status"]
      },
      headers: [
        { text: "Id", value: "id" },
        { text: "Subject", value: "subject" },
        { text: "Date", value: "date" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  filters: {
    date(val) {
      return moment(val).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  methods: {
    /**
     * Verify if the id exists for update or register
     */
    ifTicketId() {
      return isNumber(this.ticket.id);
    },
    /**
     * Dispatch action in employee module
     */
    getEmployees() {
      this.$store.dispatch("employee/GET_EMPLOYEES");
    },
    /**
     * Dispatch action in ticket module
     */
    getTickets() {
      this.$store.dispatch(GetConstant(Actions.GET_TICKETS));
    },
    getStatuses() {
      this.$store.dispatch(GetConstant(Actions.GET_STATUSES));
    },
    clearForm() {
      this.ticket.id = null;
      this.ticket.subject = null;
      this.ticket.date = null;
      this.ticket.employees = [];
      this.ticket.description = null;
      this.ticket.status_id = 1;
    },
    /**
     * @param { Boolean } action open or close modal
     * @param { Object } model the new ticket to be displayed
     */
    modalHandler(action, model = null) {
      if (this.$refs["form"]) this.$refs["form"].resetValidation();
      if (action) {
        if (model) {
          let entity = Object.assign({}, model);
          this.ticket.id = entity.id;
          this.ticket.subject = entity.subject;
          this.ticket.date = entity.date;
          this.ticket.description = entity.description;
          this.ticket.status_id = entity.status.id;
        }

        this.showModal();
      } else {
        this.clearForm();
        this.hideModal();
      }
    },
    /**
     * Validate if create or update
     */
    actionHandler() {
      if (!this.$refs["form"].validate()) {
        return;
      }

      if (this.ifTicketId()) {
        this.updateTicket(this.ticket);
      } else {
        this.registerTicket(this.ticket);
      }
    },
    showDetail(item) {
      this.$router.push(`tickets/${item.id}`);
    },
    registerTicket(ticket) {
      this.$store
        .dispatch(GetConstant(Actions.REGISTER), ticket)
        .then(() => {
          alert("Ticket registered");
          this.hideModal();
        })
        .catch(error => {
          alert(error.message);
        });
    },
    updateTicket(ticket) {
      this.$store
        .dispatch(GetConstant(Actions.UPDATE), ticket)
        .then(response => {
          alert("Ticket updated");
          this.hideModal();
        })
        .catch(error => {
          alert(error.message);
        });
    },
    deleteItem(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch(GetConstant(Actions.DELETE), id)
          .then(() => {
            this.hideModal();
          })
          .catch(error => {
            alert(error.message);
          });
      }
    }
  },
  computed: {
    IsUpdating() {
      return isNumber(this.ticket.id);
    },
    ActualDate() {
      return (
        this.ticket.date &&
        moment(this.ticket.date).format("MMMM Do YYYY, h:mm:ss a")
      );
    },
    ...mapGetters({
      tickets: GetConstant(Getters.TICKETS),
      statuses: GetConstant(Getters.STATUSES),
      employees: "employee/EMPLOYEES"
    })
  }
};
</script>