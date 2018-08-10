/*
* @Author: lushijie
* @Date:   2018-05-02 14:07:46
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-10 15:06:09
*/
import Vue from 'vue';
import UserLayout from 'layouts/user-layout.vue';
import Router from 'user/router.js';
import VuexStore from 'store';
// import 'filters';
// import 'plugins/user';
// import 'mixins/user';
// import 'layouts';
// import 'static/css/app.css';

// ENV config
Vue.config.devtools = INJECT.ENV !== 'production';
Vue.config.silent = INJECT.ENV === 'production';

(async function() {
  const _ = await import('lushijie-utils');
  console.log(_.isObject);
})();

// 错误处理, 2.2.0+
// Vue.config.errorHandler = function(err, vm) {
//   console.warn(err, vm);
// };

// 挂载到根节点
const vm = new Vue({
  el: '#root', // #root 元素会被replace
  router: Router,
  store: VuexStore,
  data: {
    bus: new Vue() // 设立 BUS 总线
  },
  render: h => h(UserLayout)
});
Vue.use(vm);
