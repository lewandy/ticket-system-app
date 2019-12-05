import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import router from "@/routes/";
import store from "@/store";
import axios from "axios";
import "./registerServiceWorker";

window.axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_URI
  // headers: {
  //   Authorization: "Bearer " + localStorage.getItem("_tkn")
  // }
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
