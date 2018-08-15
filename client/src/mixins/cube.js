import Vue from 'vue';
import Utils from 'utils';
import CommonMixins from './common.js';
import Tree from 'utils/tree.js';

const mixins = {
  data() {
    return {
      treeInst: new Tree(),
    }
  },
  computed: {
  }
}

Vue.mixin(Utils.extend({}, mixins, CommonMixins));
