import Utils from 'utils';
export default {
  namespaced: true,
  state: {
    packages: [],
    routeMeta: {},
    isTreeSaved: false,
    tree: {
      id: null, // 会被复写掉
      struct: {
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
        //   }
        // ]
      }
    }
  },

  getters: {
    tree(state) {
      return { ...state.tree };
    },

    struct(state) {
      return { ...state.tree.struct };
    },

    packages(state) {
      return [ ...state.packages ];
    },

    aviablePackages(state) {
      return [ ...state.packages ].filter(ele => ele.config.visible);
    },

    routeMeta(state) {
      return { ...state.routeMeta };
    },

    structChange(state) {
      return () => {
        return { ...state.tree.struct };
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
      state.tree = { ...payload };
    },

    updateTreeSaved(state, payload) {
      state.isTreeSaved = payload;
    },

    updateTreeStruct(state, payload) {
      state.tree.struct = { ...payload };
    }
  },

  actions: {
    // increment(context) {
    //   context.commit('mutation name');
    // }
  },
};
