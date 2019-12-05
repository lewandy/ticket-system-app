import { HTTP } from "@/shared/HttpClient";
import router from "@/routes/";

const state = {
  access_token: null
};

const mutations = {
  AUTH: async (state, payload) => {
    state.access_token = payload;
  }
};

const actions = {
  authentication: async ({ commit, dispatch }, payload) => {
    try {
      const API_ENDPOINT = "login";
      const { data, status } = await HTTP.post(API_ENDPOINT, payload);
      if (status == 200) {
        // Alter defaults after instance has been created
        window.axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access_token}`;
        setToken(data.access_token);
        commit("AUTH", data);
        router.push("tickets");
      }
    } catch (error) {
      dispatch(
        "notifications/show",
        {
          message: "Email o clave incorrecta!",
          type: "error"
        },
        { root: true }
      );
    }
  },
  logout() {
    localStorage.removeItem("_tkn");
    localStorage.removeItem("user");
    router.push("login");
  },
  verifyToken() {
    var token = localStorage.getItem("_tkn");
    if (token) {
      window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      return false;
    }
    return true;
  }
};

/**
 * Set token to the window object
 * @param { String } _tkn
 */
function setToken(_tkn) {
  localStorage.setItem("_tkn", _tkn);
}

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations
};
