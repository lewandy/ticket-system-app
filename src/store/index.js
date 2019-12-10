import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Import modules
import { auth } from "./modules/auth/AuthModule";
import { notifications } from "./modules/auth/NotificationModule";

import { employee } from "./modules/employee";
import { ticket } from "./modules/ticket";
import { timeEntry } from "./modules/timeEntries";

export default new Vuex.Store({
  modules: {
    auth,
    notifications,
    employee,
    ticket,
    timeEntry
  }
});
