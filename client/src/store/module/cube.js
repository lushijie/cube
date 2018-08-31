export default {
  namespaced: true,

  state: {
    packages: [],
    count: 0,
    routeMeta: {},
    // selectedNode: null,
    node: {
      id: 123,
      tree: {
        tag: 'block-r',
        uuid: 'r123456',
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
        slots: [
          {
            tag: 'block-a',
            uuid: 'a123457',
            label: '组件a',
            selected: false,
            properties: {
              props: {
                a: '组件a的属性'
              },
            },
            slots: [
              {
                tag: 'block-c',
                uuid: 'c123458',
                label: '组件c',
                selected: false,
                properties: {
                  props: {
                    c: '组件c的属性'
                  },
                  slot: 'header'
                },
              }
            ]
          },
          {
            tag: 'block-b',
            uuid: 'b123459',
            label: '组件b',
            selected: false,
            properties: {
              props: {
                b: '组件b的属性'
              },
            },
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
        return { ...state.node.tree };
      };
    }
  },

  mutations: {
    addCount(state, payload) {
      state.count++;
    },

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
    }
  },

  actions: {
    increment(context) {
      context.commit('addCount');
    }
  },
};
