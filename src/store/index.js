import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },
  getters: {},
  // 修改数据得地方
  mutations: {
    setUser (state, paylode) {
      state.user = paylode
      setToken(paylode)
    }
  },

  actions: {},
  modules: {}
})
