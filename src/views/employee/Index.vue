<template>
  <v-container>
    <v-col cols="12">
      <v-row>
        <employee-form
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

import EmployeeForm from "./Register";

export default {
  created() {
    this.$store.dispatch("employee/GET_ALL");
  },
  methods: {
    showModal(model = null) {
      if (!model) {
        return;
      }
      this.$store.dispatch("notifications/reset");
      this.$store.commit("employee/MODAL_HANDLER", true);
      this.employee = model;
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
        }
      });
    }
  },
  computed: {
    alert() {
      return this.$store.getters["notifications/notification"];
    },
    employees() {
      return this.$store.getters["employee/GET"];
    }
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