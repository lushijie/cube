/*
* @Author: lushijie
* @Date:   2018-01-23 11:03:34
* @Last Modified by:   lushijie
* @Last Modified time: 2018-07-18 16:36:37
*/
import Vue from 'vue';
import Utils from 'utils';
import { mapGetters } from 'vuex';
import CommonMixins from './common.js';
import CrumbVue from 'admin/common/crumb.vue';
import TableOperateVue from 'admin/common/table-operate.vue';
import TablePagerVue from 'admin/common/table-pager.vue';
import TableFilterVue from 'admin/common/table-filter.vue';
import TableStatusVue from 'admin/common/table-status.vue';
import ImageUploadVue from 'admin/common/upload-img.vue';
import NormalConstants from 'admin/constants/admin-normal.js';

const mixins = {
  components: {
    CrumbVue,
    TableFilterVue,
    TableStatusVue,
    TableOperateVue,
    TablePagerVue,
    ImageUploadVue
  },
  data() {
    return {
      INJECT: INJECT,
      pagination: {
        'total': 0,
        'page-count': 0,
        'page-size': 10,
        'current-page': 1
      },
      loginURL: NormalConstants.loginURL,
      uploadURL: NormalConstants.uploadURL,
      csrf: {
        'x-csrf-token': document.querySelector('meta[name="csrf"]').getAttribute('value')
      }
    }
  },
  methods: {
    $resetForm(evt, ref) {
      this.$refs[ref || 'form1'].resetFields();
    },

    $getPagination(pager) {
      return {
        'total': +pager.count,
        'page-count': +pager.totalPages,
        'current-page': +pager.currentPage,
        'page-size': +pager.pageSize
      }
    }
  },
  computed: {
    ...mapGetters({
      'routeMeta': 'admin/getRouteMeta',
    }),
  }
};

Vue.mixin(Utils.extend({}, mixins, CommonMixins));
