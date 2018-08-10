
export default {
  namespaced: true,

  state: {
    routeMeta: {}
  },
  getters: {
    getRouteMeta(state) {
      return {...state.routeMeta};
    },
  },
  mutations: {
    updateRouteMeta(state, payload) {
      state.routeMeta = {
        ...payload
      }
    }
  },
  actions: {

  },
}
