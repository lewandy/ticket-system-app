const TIME_ENTRY_ENDPOINT = "time-entry";
import { Actions, Getters, Mutations } from "./module-constants";

const state = {
  timeEntries: []
};

const getters = {
  [Getters.TIME_ENTRY]: state => {
    return state.timeEntries;
  }
};

const mutations = {
  [Mutations.SET_TIME_ENTRY]: (state, payload) => {
    state.timeEntries = payload;
  },
  [Mutations.SET_STATUSES]: (state, payload) => {
    state.statuses = payload;
  }
};

const actions = {
  [Actions.GET_TIME_ENTRY]: async ({ commit }) => {
    let { data } = await window.axios.get(TIME_ENTRY_ENDPOINT);
    commit(Mutations.SET_TIME_ENTRY, data);
  },
  [Actions.REGISTER]: ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { status } = await window.axios.post(TIME_ENTRY_ENDPOINT, payload);
        if (status == 201) {
          dispatch(Actions.GET_TIME_ENTRY);
          return resolve();
        }
      } catch ({ response }) {
        reject({ message: response.data[Object.keys(response.data)[0]][0] });
      }
    });
  },
  [Actions.UPDATE]: ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        await window.axios.put(TIME_ENTRY_ENDPOINT + `/${payload.id}`, payload);
        dispatch(Actions.GET_TIME_ENTRY);
        return resolve();
      } catch ({ response }) {
        reject({ message: response.data[Object.keys(response.data)[0]][0] });
      }
    });
  },
  [Actions.DELETE]: ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        await window.axios.delete(TIME_ENTRY_ENDPOINT + `/${payload}`);
        dispatch(Actions.GET_TIME_ENTRY);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export const timeEntry = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
