import Vue from 'vue';
import Vuex from 'vuex';
import State from 'app/packages/state';

Vue.use(Vuex);

const state = State;

const getters = {
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
};

const mutations = {
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
};

const actions = {};

const store = {
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [],
  strict: INJECT.ENV === 'development'
};

export default new Vuex.Store(store);
