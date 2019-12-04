const state = {
    message: "",
    type: "",
    show: false
}

const mutations = {
    "SET": (state, { message, type }) => {
        state.message = message
        state.type = type
        state.show = true;
    },
    "RESET": (state) => {
        state.message = "",
        state.type = "",
        state.show = false;
    }
}

const actions = {
    show({ commit }, payload) {
        commit("SET", payload)
    },
    reset({ commit }){
        commit("RESET")
    }
}

const getters = {
    notification(state) {
        return state
    }
}

export const notifications = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}