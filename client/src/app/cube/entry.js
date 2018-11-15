import Vue from 'vue';
import packages from 'cube/packages';
import BlankLayout from 'cube/components/layouts/blank.vue';
import Router from 'cube/router.js';
import Store from 'store';
import 'filters';
import 'mixins';
import 'plugins';
import 'static/css/reset.css';

// ENV config
Vue.config.devtools = INJECT.ENV !== 'production';
Vue.config.silent = INJECT.ENV === 'production';

// 错误处理, 2.2.0+
Vue.config.errorHandler = function(err, vm) {
  console.warn(err, vm);
};

// 格式化 components 信息
const formatPackages = [];
(function() {
  Object.keys(packages).forEach((key) => {
    formatPackages.push({
      tag: key,
      label: packages[key].label,
      config: packages[key].config
    });
  });
  Store.commit('cube/addPackages', formatPackages);
})();

// 挂载到根节点
const vm = new Vue({
  el: '#root',
  router: Router,
  store: Store,
  data: {
    bus: new Vue() // 设立 BUS 总线
  },
  render: h => h(BlankLayout)
});
Vue.use(vm);
