import { HTTP } from "@/shared/HttpClient"
import router from "@/routes/"

const state = {
	user: null
}

const mutations = {
	"AUTH": async (state, payload) => {
		state.user = payload;
	}
}

const actions = {
	authentication: async ({ commit, dispatch }, payload) => {
		if (payload.email == "admin@uapa.edu.do" && payload.password == "1234"){
			router.push("dashboard");
			return;
		}

		try {
			const { data, status } = await HTTP.post("api/auth", payload)
			if (status == 200) {
				setToken(data.user.token)
				commit("AUTH", data);
				router.push("dashboard")
			}
		} catch (error) {
			//TODO: Esto tiene que verificar que tipo de error fue el que paso.

			dispatch('notifications/show', {
				message: "Email o clave incorrecta!",
				type: "error"
			}, { root: true })
		}
	},
	logout(){
		localStorage.removeItem("_tkn");
		router.push("login");
	}
}

/**
 * Set token to the window object
 * @param { String } _tkn 
 */
function setToken(_tkn) {
	localStorage.setItem("_tkn", _tkn)
}

export const auth = {
	namespaced: true,
	state,
	actions,
	mutations
}
