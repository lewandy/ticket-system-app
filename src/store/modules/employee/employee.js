const EMPLOYEE_ENDPOINT = "employees";

const state = {
  employees: [],
  isModalOpen: false
};

const getters = {
  GET: state => {
    return state.employees;
  },
  MODAL_STATE: state => {
    return state.isModalOpen;
  }
};

const mutations = {
  SET_EMPLOYEES: (state, payload) => {
    state.employees = payload;
  },
  MODAL_HANDLER: (state, payload) => {
    state.isModalOpen = payload;
  }
};

const actions = {
  GET_ALL: async ({ commit }) => {
    let { data } = await window.axios.get(EMPLOYEE_ENDPOINT);
    commit("SET_EMPLOYEES", data);
  },
  REGISTER: async ({ dispatch, commit }, payload) => {
    try {
      let { status } = await window.axios.post(EMPLOYEE_ENDPOINT, payload);
      if (status == 201) {
        dispatch(
          "notifications/show",
          {
            message: "Employee created",
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
      await window.axios.put(EMPLOYEE_ENDPOINT + `/${payload.id}`, payload);
      dispatch(
        "notifications/show",
        {
          message: "Employee updated",
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
      await window.axios.delete(EMPLOYEE_ENDPOINT + `/${payload}`);
      dispatch("GET_ALL");
    } catch ({ response }) {
      alert("Error " + response.data.Error);
    }
  }
};

export const employee = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
