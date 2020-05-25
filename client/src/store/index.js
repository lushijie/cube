import Vue from 'vue';
import Vuex from 'vuex';
import Utils from 'utils';

Vue.use(Vuex);

const state = {
  // TODO
};

// 必须是同步函数
const mutations = {
  // TOOD
};

// 可以组合可以异步
const actions = {
  // TODO
};

const getters = {
  // TODO
};

const store = {
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [],
  strict: INJECT.ENV === 'development'
};

const chunkName = 'cube';
store.modules[chunkName] = Utils.interop(require(`./modules/${chunkName}`));
export default new Vuex.Store(store);
