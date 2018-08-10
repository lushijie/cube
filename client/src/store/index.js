/*
* @Author: lushijie
* @Date:   2018-01-22 18:47:03
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-08 17:50:17
*/
import Vue from 'vue';
import Vuex from 'vuex';
import Utils from 'utils';
import modules from './module'

Vue.use(Vuex);

// 最好提前在你的 store 中初始化好所有所需属性。
// 当需要在对象上添加新属性时 使用 Vue.set(obj, 'newProp', 123), 或者
// 以新对象替换老对象，state.obj = { ...state.obj, newProp: 123 }
const state = {
  count: 123,
  sysConf: {
    isFold: false,
    username: ''
  }
};

// 必须是同步函数
const mutations = {
  SETCOUNT(state, num) {
    state.count = +num;
  },
  ADDCOUNT(state, num) {
    state.count += num;
  },
  SETSYSCONF(state, payload) {
    const override = payload.__override;
    delete payload.__override;
    state.sysConf = override ? {...payload} : Utils.extend({}, state.sysConf, payload);
  }
};

// action 可以组合可以异步
// action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
// context.commit/context.state/context.getters
const actions = {
  addCount(context, num) {
    setTimeout(() => {
      context.commit('ADDCOUNT', num);
    }, 100);
  },
  setSysConf(context, payload) {
    context.commit('SETSYSCONF', payload);
  }
};

const getters = {
  vxGetState: (state) => (prop) => {
    if (prop) {
      if (prop.indexOf('.') > -1) {
        prop = prop.split('.');
      }
      prop = Utils.isArray(prop) ? prop : [prop];
      let target = {...state};
      for (let i = 0; i < prop.length; i++) {
        target = target ? target[prop[i]] : null;
      }
      return target;
    } else {
      return {...state};
    }
  }
  // vxSetState: ()
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  plugins: [],
  strict: INJECT.ENV === 'development'
});
