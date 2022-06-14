import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /* authToken: null,
    id_user: null,
    username: null, */
  },

  getters: {
    getAuthToken(state) {
      return localStorage.getItem("authToken");
    },

    getIDUser(state) {
      return localStorage.getItem("idUser");
    },

    getUsername(state) {
      return localStorage.getItem("username");
    },
  },

  mutations: {
    async setSession(state, payload) {
      /* state.authToken = payload.authToken;
      state.id_user = payload.id_user;
      state.username = payload.username; */

      localStorage.setItem("authToken", payload.token);
      localStorage.setItem("idUser", payload.id_user);
      localStorage.setItem("username", payload.username);
    },

    async deleteSession(state, payload) {
      /* state.authToken = null;
      state.id_user = null;
      state.username = null; */

      localStorage.removeItem("authToken");
      localStorage.removeItem("idUser");
      localStorage.removeItem("username");
    },
  },

  actions: {},

  modules: {},
});
