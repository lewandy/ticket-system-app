<template>
    <v-tabs v-model="tab">
      <v-tab href="#tab-time-entries">Time entries</v-tab>
      <v-tab href="#tab-employees">Employees</v-tab>

      <v-tab-item value="tab-time-entries">
        <v-row>
          <v-col cols="12">
            <time-entries></time-entries>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item value="tab-employees">
        <v-card flat tile>Employees</v-card>
      </v-tab-item>
    </v-tabs>
</template>
<script>
import Employees from "./Employees";
import TimeEntries from "./TimeEntries";

export default {
  components: {
    Employees,
    TimeEntries
  },
  data() {
    return {
      tab: ""
    };
  }
};
</script>