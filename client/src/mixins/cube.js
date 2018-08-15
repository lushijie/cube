import Vue from 'vue';
import Utils from 'utils';
import CommonMixins from './common.js';
import { mapGetters } from 'vuex';
import Tree from 'utils/tree.js';

const mixins = {
  data() {
    return {
      treeInst: new Tree(),
    }
  },
  computed: {
    ...mapGetters({
      'routeMeta': 'cube/getRouteMeta',
    }),
  }
}

Vue.mixin(Utils.extend({}, mixins, CommonMixins));
