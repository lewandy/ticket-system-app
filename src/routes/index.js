import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//Containers or layouts
const DefaultLayout = () => import("@/layouts/Default");
const LoginComponent = () => import("@/views/Login");

const TicketsComponent = () => import("@/views/Tickets");
const EmployeeComponent = () => import("@/views/employee/Index");

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
          path: "tickets",
          name: "Tickets",
          meta: {
            label: "Tickets"
          },
          component: TicketsComponent
        },
        {
          path: "employees",
          name: "Employees",
          meta: {
            label: "Employees"
          },
          component: EmployeeComponent
        }
      ]
    }
  ]
});
