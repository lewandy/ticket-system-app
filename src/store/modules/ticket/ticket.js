const TICKET_ENDPOINT = "tickets";
const STATUSES_ENDPOINT = "tickets-status";
import { Actions, Getters, Mutations } from "./module-constants";

const state = {
  tickets: [],
  statuses: []
};

const getters = {
  [Getters.TICKETS]: state => {
    return state.tickets;
  },
  [Getters.STATUSES]: state => {
    return state.statuses.map(status => ({ id: status.id, name: status.name }));
  }
};

const mutations = {
  [Mutations.SET_TICKETS]: (state, payload) => {
    state.tickets = payload;
  },
  [Mutations.SET_STATUSES]: (state, payload) => {
    state.statuses = payload;
  }
};

const actions = {
  [Actions.GET_TICKETS]: async ({ commit }) => {
    let { data } = await window.axios.get(TICKET_ENDPOINT);
    commit(Mutations.SET_TICKETS, data);
  },
  [Actions.REGISTER]: async ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { status } = await window.axios.post(TICKET_ENDPOINT, payload);
        if (status == 201) {
          dispatch(Actions.GET_TICKETS);
          return resolve();
        }
      } catch ({ response }) {
        reject({ message: response.data[Object.keys(response.data)[0]][0] });
      }
    });
  },
  [Actions.UPDATE]: async ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        await window.axios.put(TICKET_ENDPOINT + `/${payload.id}`, payload);
        dispatch(Actions.GET_TICKETS);
        return resolve();
      } catch ({ response }) {
        reject({ message: response.data[Object.keys(response.data)[0]][0] });
      }
    });
  },
  [Actions.DELETE]: async ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        await window.axios.delete(TICKET_ENDPOINT + `/${payload}`);
        dispatch(Actions.GET_TICKETS);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  [Actions.GET_STATUSES]: async ({ commit }) => {
    try {
      let { data } = await window.axios.get(STATUSES_ENDPOINT);
      commit(Mutations.SET_STATUSES, data);
    } catch (error) {
      console.log(error);
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
