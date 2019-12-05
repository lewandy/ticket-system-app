<template>
  <v-layout>
    <v-row>
      <v-btn class="ml-3 mb-4" @click="showModal()" color="primary" dark>Register</v-btn>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="modalState" persistent max-width="600px">
        <alert-app></alert-app>
        <v-card>
          <v-card-title>
            <span class="headline">Ticket info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="ticket.subject" label="Subject*" required></v-text-field>
                </v-col>
                <v-col cols="12" md="8" sm="6">
                  <v-select
                    v-model="ticket.employees"
                    :items="employees"
                    :menu-props="{ maxHeight: '400' }"
                    label="Employees *"
                    item-text="name"
                    multiple
                    return-object
                    hint="Select employees"
                    persistent-hint
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="ticket.status_id"
                    :items="statuses"
                    :menu-props="{ maxHeight: '400' }"
                    label="Status*"
                    item-text="name"
                    item-value="id"
                    hint="Ticket status"
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
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="hideModal">Close</v-btn>
            <v-btn color="blue darken-1" text @click="actionHandler()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import AlertApp from "@/components/AlertApp";
import { isNumber } from "util";

export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  created() {
    this.isOpen = this.dialog;
  },
  data() {
    return {
      dialog: false,
      value: null
    };
  },
  computed: {
    ...mapGetters({
      employees: "employee/GET",
      statuses: "ticket/GET_STATUS",
      modalState: "ticket/MODAL_STATE"
    })
  },
  methods: {
    hideModal() {
      this.$emit("clearForm");
      this.$store.commit("ticket/MODAL_HANDLER", false);
    },
    showModal() {
      this.$store.commit("ticket/MODAL_HANDLER", true);
      this.$store.dispatch("notifications/reset");
    },
    register() {
      this.$emit("register");
    },
    update() {
      this.$emit("update");
    },
    actionHandler() {
      if (isNumber(this.ticket.id)) {
        this.update();
      } else {
        this.register();
      }
    }
  },
  components: {
    AlertApp
  }
};
</script>

<style>
</style>