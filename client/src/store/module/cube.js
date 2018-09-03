import Utils from 'utils';
export default {
  namespaced: true,
  state: {
    packages: [],
    routeMeta: {},
    isTreeSaved: true,
    node: {
      id: 123456, // 默认 ID 会被复写掉
      tree: {
        tag: 'block-root',
        uuid: Utils.uuid,
        label: '页面容器',
        root: true,
        selected: true,
        properties: {
          props: {
            r: '根节点的属性',
            rr: {
              rrr: '根节点嵌套属性'
            }
          }
        },
        slots: []
        // slots: [
        //   {
        //     tag: 'block-a',
        //     uuid: Utils.uuid,
        //     label: '组件a',
        //     selected: false,
        //     properties: {
        //       props: {
        //         a: '组件a的属性'
        //       },
        //     },
        //     slots: [
        //       {
        //         tag: 'block-c',
        //         uuid: Utils.uuid,
        //         label: '组件c',
        //         selected: false,
        //         properties: {
        //           props: {
        //             c: '组件c的属性'
        //           },
        //           slot: 'header'
        //         },
        //       }
        //     ]
        //   },
        //   {
        //     tag: 'block-b',
        //     uuid: Utils.uuid,
        //     label: '组件b',
        //     selected: false,
        //     properties: {
        //       props: {
        //         b: '组件b的属性'
        //       },
        //     },
        //   }
        // ]
      }
    }
  },

  getters: {
    // metaData(state) {
    //   return { ...state.routeMeta };
    // },

    treeChange(state) {
      return () => {
        return { ...state.node.tree };
      };
    }
  },

  mutations: {
    updateRouteMeta(state, payload) {
      state.routeMeta = {
        ...payload
      };
    },

    addPackages(state, payload) {
      state.packages = [ ...payload ];
    },

    updateTree(state, payload) {
      state.node.tree = { ...payload };
    },

    updateNode(state, payload) {
      state.node = { ...payload };
    },

    setNodeSaved(state, payload) {
      state.isTreeSaved = payload;
    }
  },

  actions: {
    // increment(context) {
    //   context.commit('mutation name');
    // }
  },
};
