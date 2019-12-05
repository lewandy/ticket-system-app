<template>
  <v-container>
    <v-col cols="12">
      <v-row>
        <employee-form
          @clearForm="clearForm()"
          @register="register(employee)"
          @update="update(employee)"
          :employee.sync="employee"
        ></employee-form>
      </v-row>
      <v-row>
        <v-data-table :headers="headers" :items="employees" :items-per-page="5" class="elevation-1">
          <template v-slot:item.status="{ item }">
            <div>{{ item.status ? "Active" : "Inactive" }}</div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="showModal(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";

import EmployeeForm from "./Register";

export default {
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      this.$store.dispatch("employee/GET_ALL");
    },
    clearForm() {
      this.employee.id = null,
      this.employee.name = "";
      this.employee.last_name = "";
      this.employee.email = "";
      this.employee.password = "";
      this.employee.password_confirmation = "";
      this.employee.status = true;
    },
    showModal(model = null) {
      let employee = Object.assign({}, model);
      if (!employee) {
        return;
      }
      this.$store.dispatch("notifications/reset");
      this.$store.commit("employee/MODAL_HANDLER", true);
      this.employee = employee;
    },
    register(employee) {
      this.$store.dispatch("employee/REGISTER", employee);
    },
    update(employee) {
      this.$store.dispatch("employee/UPDATE", employee);
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
          this.$store.dispatch("employee/DELETE", id);
          this.$store.dispatch("employee/GET_ALL");
        }
      });
    }
  },
  computed: {
    alert() {
      return this.$store.getters["notifications/notification"];
    },
    ...mapGetters({ employees: "employee/GET" })
  },
  data() {
    return {
      IsModalOpen: false,
      employee: {
        name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        status: true
      },
      headers: [
        { text: "Id", value: "id" },
        { text: "First Name", value: "name" },
        { text: "Last Name", value: "last_name" },
        { text: "Email", value: "email" },
        { text: "Date Created", value: "created_at" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  components: {
    EmployeeForm
  }
};
</script>