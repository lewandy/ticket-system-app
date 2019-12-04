<template>
  <v-alert dismissible v-model="alert.show" :type="alert.type || 'info'">{{ alert.message }}</v-alert>
</template>

<script>
export default {
  computed: {
    alert() {
      return this.$store.getters["notifications/notification"];
    }
  }
};
</script>

<style>
</style>