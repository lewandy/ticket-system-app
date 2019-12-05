<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("auth/verifyToken");
  },
  data: () => ({
    //
  }),
  watch: {
    $route(from, to) {
      this.$store.dispatch("notifications/reset");
    }
  }
};
</script>
