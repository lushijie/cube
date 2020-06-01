import Vue from 'vue';
import packages from 'packages/description';
import Blank from 'pages/common/blank.vue';
import Router from 'app/router.js';
import Store from 'store';
import EventEmitter from 'eventemitter3';
import 'filters';
import 'mixins';
import 'plugins';
import 'static/css/reset.css';

Vue.config.devtools = INJECT.ENV !== 'production';
Vue.config.silent = INJECT.ENV === 'production';
global.ee = new EventEmitter();

// 2.2.0+
Vue.config.errorHandler = function(err, vm) {
  console.warn(err, vm);
};

// 格式化 packages 信息
const formatPackages = Object.keys(packages).map((key) => {
  const { label, visible, slots, props } = packages[key];
  return {
    tag: key,
    label,
    visible,
    slots,
    props
  };
}) || [];
Store.commit('addPackages', formatPackages);

// 挂载到根节点
const vm = new Vue({
  el: '#root',
  router: Router,
  store: Store,
  data: {
    bus: new Vue() // 设立 BUS 总线
  },
  render: h => h(Blank)
});
Vue.use(vm);
