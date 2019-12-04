<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  watch: {
    $route(from,to){
      this.$store.dispatch("notifications/reset")
    }
  }
};
</script>
