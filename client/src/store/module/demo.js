export default {
  namespaced: true,

  state: {
    count: 0,
    routeMeta: {}
  },

  getters: {
    metaData(state) {
      return {...state.routeMeta};
    },
  },

  mutations: {
    updateRouteMeta(state, payload) {
      state.routeMeta = {
        ...payload
      }
    },

    addCount(state, payload) {
      state.count++;
    }
  },

  actions: {
    increment(context) {
      context.commit('addCount')
    }
  },
}
