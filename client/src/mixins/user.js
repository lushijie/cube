/*
* @Author: lushijie
* @Date:   2018-01-23 11:03:34
* @Last Modified by:   lushijie
* @Last Modified time: 2018-07-18 16:37:08
*/
import Vue from 'vue';
import Utils from 'utils';
import CommonMixins from './common.js';
import { mapGetters } from 'vuex';

const mixins = {
  data() {
    return {
      INJECT: INJECT,
    }
  },
  computed: {
    ...mapGetters({
      'routeMeta': 'user/getRouteMeta',
    }),
  }
}

Vue.mixin(Utils.extend({}, mixins, CommonMixins));
