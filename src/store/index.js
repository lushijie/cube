import Vue from 'vue';
import Vuex from 'vuex';
import Utils from 'utils';

Vue.use(Vuex);

const state = {
  packages: [],
  routeMeta: {},
  isTreeSaved: false,
  tree: {
    id: null,
    struct: {
      tag: 'block-root',
      uuid: Utils.uuid,
      label: '页面组件',
      root: true,
      selected: true,
      properties: {
        props: {}
      },
      slots: [],
    }
  }
};

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
    return [ ...state.packages ].filter(ele => ele.visible);
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
