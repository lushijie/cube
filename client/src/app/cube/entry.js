import Vue from 'vue';
import components from 'cube/components';
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

// 格式化 components 信息另行存储
const formatPackages = [];
(function() {
  Object.keys(components).forEach((key) => {
    formatPackages.push({
      tag: key,
      label: components[key].label,
      config: components[key].config
    });

    // 不再全量注册，移动到 renderTree 中实现
    // Vue.component(key, components[key].component);
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
