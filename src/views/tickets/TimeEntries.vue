<template>
  <v-data-table :headers="headers" :items="timeEntries" sort-by="calories">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ modalTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="5">
                    <v-menu
                      ref="menu"
                      v-model="timeEntry.date_from"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="timeEntry.date_to"
                          label="From"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="time"
                        full-width
                        @click:minute="$refs.menu.save(time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="11" sm="5">
                    <v-dialog
                      ref="dialog"
                      v-model="modal2"
                      :return-value.sync="time"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="time"
                          label="To"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="modal2" v-model="time" full-width>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      v-model="showDatePicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="timeEntry.date"
                          label="Picker without buttons"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="timeEntry.date" @input="showDatePicker = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="timeEntries.employee_id"
                      :items="employees"
                      :menu-props="{ maxHeight: '400' }"
                      label="Employee"
                      :rules="rules.employees"
                      item-text="name"
                      item-value="id"
                      return-object
                      hint="Select employee"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="Note"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.employee="{ item }">{{ item.employee.name }}</template>
    <template v-slot:item.ticket="{ item }">{{ item.ticket.subject }}</template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters } from "vuex";
import GetConstant, {
  Actions,
  Getters
} from "../../store/modules/timeEntries/module-constants";

export default {
  created() {
    this.getTimesEntries();
    this.getEmployees();
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Id",
        align: "left",
        sortable: false,
        value: "id"
      },
      { text: "Employee", value: "employee" },
      { text: "Ticket", value: "ticket" },
      { text: "From", value: "date_from" },
      { text: "To", value: "date_to" },
      { text: "Actions", value: "action", sortable: false }
    ],
    time: null,
    menu2: false,
    modal2: false,
    timeEntry: {
      employee_id: 1,
      ticket_id: 1,
      date_from: "",
      date_to: "",
      note: "This is the note",
      updated_at: "2019-12-10 17:48:26",
      date: "",
      created_at: "2019-12-10 17:48:26",
      id: 1
    },
    rules: {
      employee: [v => !!v || "Employee is required"]
    },
    defaultItem: {
      id: null,
      employee: null,
      ticket: null,
      date_from: "",
      date_to: "",
      note: ""
    },
    showDatePicker: false
  }),
  computed: {
    ...mapGetters({
      timeEntries: GetConstant(Getters.TIME_ENTRY),
      employees: "employee/EMPLOYEES"
    }),
    modalTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    getEmployees() {
      this.$store.dispatch("employee/GET_EMPLOYEES");
    },
    getTimesEntries() {
      this.$store.dispatch(GetConstant(Actions.GET_TIME_ENTRY));
    },
    editItem(item) {
      this.showModal();
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },
    showModal(model = null) {
      if (model) {
        let data = Object.assign({}, model);
        this.timeEntry = model;
      }

      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.timeEntry = Object.assign({}, this.defaultItem);
      }, 300);
    },
    save() {
      //TODO : create a new time entry
    }
  }
};
</script>