import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

//Containers or layouts
const DefaultLayout = () => import("@/layouts/Default")
const LoginComponent = () => import("@/components/Login")

const DashboardComponent = () => import("@/components/Dashboard")

export default new VueRouter({
	mode: "history",
	linkActiveClass: "open active",
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: "/login",
			name: "Login",
			meta: {
				label: "Inicio de sesion"
			},
			component: LoginComponent
		},
		{
			path: "/",
			name: "Home",
			component: DefaultLayout,
			meta: {
				label: "Inicio"
			},
			redirect: "login",
			children: [
				{
					path: "dashboard",
					name: "Dashboard",
					meta: {
						label: "inicio"
					},
					component: DashboardComponent
				}
			]
		}
	]
})