import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import HRAdminDashboard from "../views/HRAdminDashboard.vue";
import VendorAdminDashboard from "../views/VendorAdminDashboard.vue"; 

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/hr-admin-dashboard",
    name: "HRAdminDashboard",
    component: HRAdminDashboard,
  },
  {
    path: "/vendor-admin-dashboard",
    name: "VendorAdminDashboard",
    component: VendorAdminDashboard,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;