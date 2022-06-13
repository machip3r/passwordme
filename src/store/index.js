import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: null,
    username: null,
  },

  getters: {
    getUsername(state) {
      return state.username;
    },

    getAuthToken(state) {
      return state.authToken === null
        ? localStorage.getItem("passwordmeLogged")
        : state.authToken;
    },
  },

  mutations: {
    async setSession(state, payload) {
      state.authToken = payload.authToken;
      state.username = payload.username;

      localStorage.setItem("passwordmeLogged", true);
    },

    async deleteSession(state, payload) {
      state.authToken = null;
      state.username = null;

      localStorage.removeItem("passwordmeLogged");
    },
  },

  actions: {},

  modules: {},
});
