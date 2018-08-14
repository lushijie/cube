export default {
  namespaced: true,

  state: {
    tree: {},
    packages: [],
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
    },

    addPackages(state, payload) {
      state.packages = [...payload];
    }
  },

  actions: {
    increment(context) {
      context.commit('addCount')
    }
  },
}
