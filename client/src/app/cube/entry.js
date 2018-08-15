import Vue from 'vue';
import packages from 'cube/packages';
import BlankLayout from 'cube/scope/layouts/blank.vue';
import Router from 'cube/router.js';
import Store from 'store';
import 'filters';
import 'plugins/cube';
import 'mixins/cube';

// import 'static/css/app.css';

// ENV config
Vue.config.devtools = INJECT.ENV !== 'production';
Vue.config.silent = INJECT.ENV === 'production';

// 错误处理, 2.2.0+
Vue.config.errorHandler = function(err, vm) {
  console.warn(err, vm);
};

// 全局注册所有 cube 组件
const allPackages = [];
(function() {
  Object.keys(packages).forEach((key) => {
    allPackages.push({
      tag: key,
      label: packages[key].label
    });
    Vue.component(key, packages[key].component);
  });
  Store.commit('cube/addPackages', allPackages);
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
