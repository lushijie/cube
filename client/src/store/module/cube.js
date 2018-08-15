// import Utils from 'utils';
export default {
  namespaced: true,

  state: {
    packages: [],
    count: 0,
    routeMeta: {},
    node: {
      id: 123456,
      tree: {
        tag: 'div',
        uuid: '123456',
        label: '页面容器',
        root: true,
        selected: true,
        children: [
          {
            tag: 'block-a',
            uuid: '123457',
            label: '组件a',
            selected: false,
            children: [
              {
                tag: 'block-c',
                uuid: '123458',
                label: '组件c',
                selected: false
              }
            ]
          },
          {
            tag: 'block-b',
            uuid: '123459',
            label: '组件b',
            selected: false
          }
        ]
      }
    }
  },

  getters: {
    metaData(state) {
      return { ...state.routeMeta };
    },

    treeChange(state) {
      return () => {
        return { ...state.node.tree }
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
      state.node.tree.children = [ ...payload ];
    },

    updateTree(state, payload) {
      state.node.tree = { ...payload };
    }
  },

  actions: {
    increment(context) {
      context.commit('addCount')
    }
  },
}
