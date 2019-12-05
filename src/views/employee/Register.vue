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
            <span class="headline">Employee info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="employee.name" label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="employee.last_name" label="Last Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-checkbox v-model="employee.status" label="Status"></v-checkbox>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field type="email" v-model="employee.email" label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="employee.password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <v-text-field
                    v-model="employee.password_confirmation"
                    label="Confirm password"
                    type="password"
                    required
                  ></v-text-field>
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
    employee: {
      type: Object,
      required: true
    }
  },
  created() {
    this.isOpen = this.dialog;
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    ...mapGetters({
      modalState: "employee/MODAL_STATE"
    })
  },
  methods: {
    hideModal() {
      this.$emit("clearForm");
      this.$store.commit("employee/MODAL_HANDLER", false);
    },
    showModal() {
      this.$store.commit("employee/MODAL_HANDLER", true);
      this.$store.dispatch("notifications/reset");
    },
    register() {
      this.$emit("register");
    },
    update() {
      this.$emit("update");
    },
    actionHandler() {
      if (isNumber(this.employee.id)) {
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