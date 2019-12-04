import { HTTP } from "@/shared/HttpClient";
const EMPLOYEE_ENDPOINT = "employees";

import {
  SET_EMPLOYEES,
  MODAL_HANDLER,
  GET_EMPLOYEES
} from "./mutations-type";

const state = {
  employees: [],
  isModalOpen: false
};

const getters = {
  GET_EMPLOYEES: state => {
    return state.employees;
  },
  MODAL_STATE: state => {
    return state.isModalOpen;
  }
};

const mutations = {
  [SET_EMPLOYEES]: (state, payload) => {
    state.employees = payload;
  },
  [MODAL_HANDLER]: (state, payload) => {
    state.isModalOpen = payload;
  }
};

const actions = {
  getEmployees: async ({ commit, dispatch }) => {
    let { data } = await HTTP.get(EMPLOYEE_ENDPOINT);
    commit(SET_EMPLOYEES, data);
  },
  registerEmployee: async ({ dispatch }, payload) => {
    try {
      let { status } = await HTTP.post(EMPLOYEE_ENDPOINT, payload);
      if (status == 201) {
        dispatch(
          "notifications/show",
          {
            message: GET_EMPLOYEES,
            type: "success"
          },
          { root: true }
        );
        dispatch("modalHandler", true);
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
    dispatch("getEmployees");
  },
  modalHandler({ commit }, payload) {
    commit(MODAL_HANDLER, payload);
  }
};

export const employee = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
