import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      /* if (store.getters.getAuthToken !== null) router.push("/home"); */
      if (store.getters.getAuthToken !== null) router.push("/all");
      next();
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getAuthToken === null) router.push("/login");
      next();
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: (to, from, next) => {
      /* if (store.getters.getAuthToken !== null) router.push("/home"); */
      if (store.getters.getAuthToken !== null) router.push("/all");
      next();
    },
  },
  {
    path: "/all",
    name: "AllPasswords",
    component: () => import("../views/AllView.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getAuthToken === null) router.push("/login");
      next();
    },
  },
  {
    path: "/category/:c",
    name: "Category",
    component: () => import("../views/Category.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.getAuthToken === null) router.push("/login");
      next();

      /* let id = to.params.id;

      const uid = getAuth().currentUser.uid;
      Business.getBussinesByUId(uid).then((value) => {
        let validate = value.some((item) => item.id_business == id);

        if (validate) {
          next();
        } else {
          router.push("/");
        }
      }); */
    },
    meta: { title: "Dashboard" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
