/*
* @Author: lushijie
* @Date:   2018-05-02 14:07:46
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-11 15:36:37
*/
import Vue from 'vue';
import BlankLayout from 'layouts/blank-layout.vue';
import Router from 'admin/router.js';
import VuexStore from 'store';
import 'filters';
import 'plugins/admin';
import 'mixins/admin';
import 'layouts';
import 'static/css/app.css';

// ENV config
Vue.config.devtools = INJECT.ENV !== 'production';
Vue.config.silent = INJECT.ENV === 'production';

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
  render: h => h(BlankLayout)
});
Vue.use(vm);
