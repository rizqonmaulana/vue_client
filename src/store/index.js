import Vue from "vue";
import Vuex from "vuex";
import Event from './modules/event'
import Auth from './modules/auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Event, Auth },
  state: {},
  mutations: {},
  actions: {},
  plugins: [createPersistedState({
    paths: ['Auth.user']
  })]
});
