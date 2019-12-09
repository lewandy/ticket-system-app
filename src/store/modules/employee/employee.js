const EMPLOYEE_ENDPOINT = "employees";
import { Actions, Getters, Mutations } from "./module-constants";

const state = {
  employees: []
};

const getters = {
  [Getters.EMPLOYEES]: state => {
    return state.employees;
  }
};

const mutations = {
  [Mutations.SET_EMPLOYEES]: (state, payload) => {
    state.employees = payload;
  }
};

const actions = {
  [Actions.GET_EMPLOYEES]: async ({ commit }) => {
    let { data } = await window.axios.get(EMPLOYEE_ENDPOINT);
    commit(Mutations.SET_EMPLOYEES, data);
  },
  [Actions.REGISTER]: async ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { status } = await window.axios.post(EMPLOYEE_ENDPOINT, payload);
        if (status == 201) {
          dispatch(Actions.GET_EMPLOYEES);
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
        await window.axios.put(EMPLOYEE_ENDPOINT + `/${payload.id}`, payload);
        dispatch(Actions.GET_EMPLOYEES);
        return resolve();
      } catch ({ response }) {
        reject({ message: response.data[Object.keys(response.data)[0]][0] });
      }
    });
  },
  [Actions.DELETE]: async ({ dispatch }, payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        await window.axios.delete(EMPLOYEE_ENDPOINT + `/${payload}`);
        dispatch(Actions.GET_EMPLOYEES);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export const employee = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
