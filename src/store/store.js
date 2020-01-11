import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import user from './modules/user'


Vue.use(Vuex);



// noinspection JSAnnotator
export const store = new Vuex.Store ({
  state: {
      progress: true,
      canals: null,
      canal: null,
      fields: null,
      api: 'http://e9d51c1e.ngrok.io'
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules:{
      user : user
  },
  plugins: [
    createPersistedState({
        modules: ['user']
    }),
  ],
});
