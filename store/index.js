import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    userInfo: null,
    login: true
  },
  mutations: {
    getUser (state, info) {
      if (state.userInfo && (state.userInfo.username !== info.username)) {
        return
      }
      if (!state.login) {
        return
      }
      if (!info.message) {
        state.userInfo = { ...info }
      } else {
        state.userInfo = null
      }
    },
    setUser (state, info) {
      // console.log(arguments)
      state.userInfo = info
      state.login = true
    },
    logout (state) {
      state.userInfo = null
      state.login = false
    }
  }
})

export default store