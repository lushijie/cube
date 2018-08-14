import Utils from 'utils';
export default {
  namespaced: true,

  state: {
    tree: {
      id: 123456,
      root: {
        tag: 'div',
        uuid: Utils.uuid,
        label: '页面容器',
        root: true,
        children: [
          // TODO
        ]
      }
    },
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
    },

    updateTreeChildren(state, payload) {
      state.tree.root.children = [...payload];
    }
  },

  actions: {
    increment(context) {
      context.commit('addCount')
    }
  },
}
