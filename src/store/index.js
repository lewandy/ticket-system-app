import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Import modules
import { auth } from "./modules/auth/AuthModule";
import { notifications } from "./modules/auth/NotificationModule";

import { employee } from "./modules/employee/employee";
import { ticket } from "./modules/ticket/ticket";

export default new Vuex.Store({
  modules: {
    auth,
    notifications,
    employee,
    ticket
  }
});
