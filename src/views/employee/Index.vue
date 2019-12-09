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
              <span class="headline">Employee info</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" lazy-validation>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field :rules="rules.name" v-model="employee.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :rules="rules.last_name"
                        v-model="employee.last_name"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        :rules="rules.email"
                        type="email"
                        v-model="employee.email"
                        label="Email *"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-checkbox v-model="employee.status" label="Status"></v-checkbox>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="employee.password"
                        label="Password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="employee.password_confirmation"
                        label="Confirm password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
              <small>*indicates required field, fill password fields for change or empty for not change.</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="modalHandler(false)">Close</v-btn>
              <v-btn color="blue darken-1" text @click="actionHandler()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <v-data-table :headers="headers" :items="employees" :items-per-page="5" class="elevation-1">
        <template v-slot:item.status="{ item }">
          <div>{{ item.status ? "Active" : "Inactive" }}</div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="modalHandler(true,item)">edit</v-icon>
          <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"; //map getters from the state
import { isNumber } from "util";
import { ModalFeaturesMixin } from "@/mixins/";
import GetConstant, {
  Actions,
  Getters
} from "@/store/modules/employee/module-constants.js";

export default {
  mixins: [ModalFeaturesMixin],
  created() {
    this.getEmployees();
  },
  data() {
    return {
      employee: {
        name: "",
        last_name: "",
        emaild: "",
        password: "",
        password_confirmation: "",
        status: true
      },
      rules: {
        name: [v => !!v || "The name is required!"],
        last_name: [v => !!v || "The last name is required!"],
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ]
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
  methods: {
    /**
     * Verify if the id exists for update or register
     */
    ifEmployeeId() {
      return isNumber(this.employee.id);
    },
    /**
     * Dispatch action in employee module
     */
    getEmployees() {
      this.$store.dispatch(GetConstant(Actions.GET_EMPLOYEES));
    },
    clearForm() {
      (this.employee.id = null), (this.employee.name = "");
      this.employee.last_name = "";
      this.employee.email = "";
      this.employee.password = "";
      this.employee.password_confirmation = "";
      this.employee.status = true;
    },
    /**
     * @param { Boolean } action open or close modal
     * @param { Object } model the new employee to be displayed
     */
    modalHandler(action, model = null) {
      if (this.$refs["form"]) this.$refs["form"].resetValidation();

      if (action) {
        if (model) {
          this.employee = Object.assign({}, model);
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

      if (this.ifEmployeeId()) {
        this.updateEmployee(this.employee);
      } else {
        this.registerEmployee(this.employee);
      }
    },
    registerEmployee(employee) {
      this.$store
        .dispatch(GetConstant(Actions.REGISTER), employee)
        .then(() => {
          alert("Employee registered");
          this.hideModal();
        })
        .catch(error => {
          alert(error.message);
        });
    },
    updateEmployee(employee) {
      this.$store
        .dispatch(GetConstant(Actions.UPDATE), employee)
        .then(response => {
          alert("Employee updated");
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
    ...mapGetters({
      employees: GetConstant(Getters.EMPLOYEES)
    })
  }
};
</script>