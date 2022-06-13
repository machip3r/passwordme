import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      if (store.getters.getAuthToken) router.push("/home");
      else router.push("/login");
      next();
    },
    beforeEnter: (to, from, next) => router.push("/home"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters.getAuthToken) router.push("/login");
      next();
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getAuthToken) router.push("/home");
      next();
    },
  },
  {
    path: "/all",
    name: "AllPasswords",
    component: () => import("../views/AllView.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters.getAuthToken) router.push("/login");
      next();
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
