/*
* @Author: lushijie
* @Date:   2018-01-22 18:47:03
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-13 10:35:45
*/
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './module';

Vue.use(Vuex);

// 最好提前在你的 store 中初始化好所有所需属性。
// 当需要在对象上添加新属性时 使用 Vue.set(obj, 'newProp', 123), 或者
// 以新对象替换老对象，state.obj = { ...state.obj, newProp: 123 }
const state = {
  // TODO
};

// 必须是同步函数
const mutations = {
  // TOOD
};

// action 可以组合可以异步
// action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
// context.commit/context.state/context.getters
const actions = {
  // TODO
};

const getters = {
  // TODO
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
