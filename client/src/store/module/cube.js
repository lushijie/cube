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
        selected: true,
        children: [
          {
            tag: 'block-a',
            uuid: Utils.uuid,
            label: '组件a',
            selected: false,
            children: [
              {
                tag: 'block-c',
                uuid: Utils.uuid,
                label: '组件c',
                selected: false
              }
            ]
          },
          {
            tag: 'block-b',
            uuid: Utils.uuid,
            label: '组件b',
            selected: false
          }
        ]
      }
    },
    packages: [],
    count: 0,
    routeMeta: {}
  },

  getters: {
    metaData(state) {
      return { ...state.routeMeta };
    },

    treeRoot(state) {
      return () => {
        return { ...state.tree.root }
      }
    }
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
      state.packages = [ ...payload ];
    },

    updateTreeChildren(state, payload) {
      state.tree.root.children = [ ...payload ];
    },

    updateTreeRoot(state, payload) {
      state.tree.root = { ...payload };
    }
  },

  actions: {
    increment(context) {
      context.commit('addCount')
    }
  },
}
