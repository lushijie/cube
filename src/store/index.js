import Vue from 'vue';
import Vuex from 'vuex';
import Utils from 'utils';

Vue.use(Vuex);

const state = {
  packages: [],
  routeMeta: {},
  isTreeSaved: false,
  tree: {
    treeId: null,
    treeStruct: {
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

  treeStruct(state) {
    return { ...state.tree.treeStruct };
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

  // this.$store.watch 监听
  detectStructChange(state) {
    return () => {
      return { ...state.tree.treeStruct };
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
    state.tree.treeStruct = { ...payload };
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
