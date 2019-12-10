<template>
  <div>
    <v-card class="mt-2 ml-2">
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-text-field readonly value="Computer" label="Subject" />
          </v-col>
          <v-col cols="2">
            <v-text-field readonly value="2018-11-12" label="Date" />
          </v-col>
          <v-col cols="4">
            <v-textarea readonly value="This is the description" label="Description"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <tabs-info></tabs-info>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TabsInfo from "./TabsInfo";

export default {
  name: "Ticker-detail",
  components: {
    TabsInfo
  }
};
</script>

<style>
</style>