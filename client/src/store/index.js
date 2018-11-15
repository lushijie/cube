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

const chunkName = INJECT.CHUNK;
store.modules[chunkName] = Utils.extend({}, Utils.interop(require('./modules/common')), Utils.interop(require(`./modules/${chunkName}`)));
export default new Vuex.Store(store);
