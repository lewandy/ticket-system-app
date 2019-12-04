<template>
  <v-container>
    <v-col>
      <v-row>
        <employee-form :isOpen="IsModalOpen" @register="register" :employee.sync="employee"></employee-form>
      </v-row>
      <v-row>
        <v-data-table :headers="headers" :items="employees" :items-per-page="5" class="elevation-1">
          <template v-slot:item.status="{ status }">
            <div>{{ status == true ? "Activo" : "No activo"}}</div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="showModal(item)">edit</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

import EmployeeForm from "./Register";

export default {
  created() {
    this.getEmployees();
  },
  methods: {
    ...mapActions({
      getEmployees: "employee/getEmployees",
      registerEmployee: "employee/registerEmployee",
      modalHandler: "employee/modalHandler"
    }),
    showModal(model = null) {
      if (!model) {
        return;
      }
      this.employee = model;
    },
    register(employee) {
      this.registerEmployee(this.employee);
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
        name: "Lewandy",
        last_name: "Dilone",
        email: "lewa@gmail.com",
        password: "12345",
        password_confirmation: "12345",
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
      ],
      data: [
        {
          id: 1,
          name: "Lewandy",
          last_name: "Dilone",
          email: "lewa@gmail.com",
          status: true,
          created_at: "2019-12-03 23:02:32"
        }
      ]
    };
  },
  components: {
    EmployeeForm
  }
};
</script>