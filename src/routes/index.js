import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

//Containers or layouts
const DefaultLayout = () => import("@/layouts/Default")
const LoginComponent = () => import("@/components/Login")

const DashboardComponent = () => import("@/components/Dashboard")
const PersonInfo = () => import("@/components/general/PersonInfo")
const PreselectionComponent = () => import("@/components/preselection/Preselection.vue")

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
				},
				{
					path: "personal-info",
					name: "Personal Info",
					meta: {
						label: "Informacion personal"
					},
					component: PersonInfo
				},
				{
					path: "preselection",
					name: "Preseleccion",
					meta: {
						label: "Preseleccion de materias"
					},
					component: PreselectionComponent
				}
			]
		}
	]
})