<template>
  <div>
    <v-tabs v-model="tab" dark>
      <v-tab href="#tab-time-entries">Time entries</v-tab>
      <v-tab href="#tab-employees">Employees</v-tab>

      <v-tab-item value="tab-time-entries">
        <v-card flat tile>Time entries</v-card>
      </v-tab-item>

      <v-tab-item value="tab-employees">
        <v-card flat tile>Employees</v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: ""
    };
  }
};
</script>