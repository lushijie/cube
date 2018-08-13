
export default {
  namespaced: true,

  state: {
    userInfo: {
      nickname: ''
    },
    // 侧边栏配置
    asideConfig: {
      width: 250,
      isCollapsed: false,

      // 当前激活地址
      active: '',
      openeds: []
    },
    // 路由信息
    routeMeta: {}
  },
  getters: {
    asideStyle(state) {
      return {'width': state.asideConfig.width + 'px'};
    },
    getRouteMeta(state) {
      return {...state.routeMeta};
    },
  },
  mutations: {
    toggleAside(state, payload) {
      const isCollapsed = state.asideConfig.isCollapsed;
      state.asideConfig.isCollapsed = !isCollapsed;
      state.asideConfig.width = !isCollapsed ? 64 : 250;
    },

    // 更新当前路由
    updateActiveRoute(state, payload) {
      const { path } = payload;
      const pathArr = path.split('/');
      const openeds = [];
      for (let i = 2, len = pathArr.length; i < len; i++) {
        openeds.push(pathArr.slice(0, i).join('/'));
      }

      state.asideConfig = {
        ...state.asideConfig,
        active: path,
        openeds,
      };
    },

    // 更新用户信息
    updateUserInfo(state, payload) {
      state.userInfo = {
        ...payload
      }
    },

    updateRouteMeta(state, payload) {
      state.routeMeta = {
        ...payload
      }
    }
  },
  actions: {

  },
}
