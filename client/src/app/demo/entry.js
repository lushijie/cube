import Vue from 'vue';
import packages from 'demo/packages';
import BlankLayout from 'demo/layouts/blank.vue';
import Router from 'demo/router.js';
import Store from 'store';
import 'filters';
import 'plugins/demo';

// // import 'mixins/user';
// // import 'static/css/app.css';

// ENV config
Vue.config.devtools = INJECT.ENV !== 'production';
Vue.config.silent = INJECT.ENV === 'production';

// 错误处理, 2.2.0+
Vue.config.errorHandler = function(err, vm) {
  console.warn(err, vm);
};

// 注册所有组件
const allPackages = [];
(function() {
  Object.keys(packages).forEach((key) => {
    allPackages.push(key);
    Vue.component(key, packages[key]);
  });

  Store.commit('demo/addPackages', allPackages);
})();

// 挂载到根节点
const vm = new Vue({
  el: '#root', // #root 元素会被replace
  router: Router,
  store: Store,
  data: {
    bus: new Vue() // 设立 BUS 总线
  },
  render: h => h(BlankLayout)
});
Vue.use(vm);
