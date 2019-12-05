const TICKET_ENDPOINT = "tickets";
const TICKET_STATUS_ENDPOINT = "tickets-status";

const state = {
  tickets: [],
  tickets_status: [],
  isModalOpen: false
};

const getters = {
  GET: state => {
    return state.tickets;
  },
  GET_STATUS: state => {
    return state.tickets_status.map(status => ({
      name: status.name,
      id: status.id
    }));
  },
  MODAL_STATE: state => {
    return state.isModalOpen;
  }
};

const mutations = {
  SET_TICKETS: (state, payload) => {
    state.tickets = payload;
  },
  SET_TICKETS_STATUS: (state, payload) => {
    state.tickets_status = payload;
  },
  MODAL_HANDLER: (state, payload) => {
    state.isModalOpen = payload;
  }
};

const actions = {
  GET_STATUS: async ({ commit }) => {
    let { data } = await window.axios.get(TICKET_STATUS_ENDPOINT);
    commit("SET_TICKETS_STATUS", data);
  },
  GET_ALL: async ({ commit }) => {
    let { data } = await window.axios.get(TICKET_ENDPOINT);
    commit("SET_TICKETS", data);
  },
  REGISTER: async ({ dispatch, commit }, payload) => {
    try {
      let { status } = await window.axios.post(TICKET_ENDPOINT, payload);
      if (status == 201) {
        dispatch(
          "notifications/show",
          {
            message: "Ticket created",
            type: "success"
          },
          { root: true }
        );
        setTimeout(() => {
          commit("MODAL_HANDLER", false);
        }, 3000);
      }
    } catch ({ response }) {
      dispatch(
        "notifications/show",
        {
          message: response.data[Object.keys(response.data)[0]][0],
          type: "error"
        },
        { root: true }
      );
    }
    dispatch("GET_ALL");
  },
  UPDATE: async ({ dispatch, commit }, payload) => {
    try {
      await window.axios.put(TICKET_ENDPOINT + `/${payload.id}`, payload);
      dispatch(
        "notifications/show",
        {
          message: "Tickets updated",
          type: "success"
        },
        { root: true }
      );
      setTimeout(() => {
        commit("MODAL_HANDLER", false);
      }, 3000);
    } catch ({ response }) {
      dispatch(
        "notifications/show",
        {
          message: response.data[Object.keys(response.data)[0]][0],
          type: "error"
        },
        { root: true }
      );
    }
  },
  DELETE: async ({ dispatch }, payload) => {
    try {
      await window.axios.delete(TICKET_ENDPOINT + `/${payload}`);
      dispatch("GET_ALL");
    } catch ({ response }) {
      alert("Error " + response.data.Error);
    }
  }
};

export const ticket = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
