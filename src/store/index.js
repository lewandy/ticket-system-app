import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

//Import modules
import { auth } from "./modules/AuthModule"
import { notifications } from "./modules/NotificationModule"

export default new Vuex.Store({
    modules: {
        auth,
        notifications
    }
})