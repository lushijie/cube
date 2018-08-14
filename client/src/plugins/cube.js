/*
* @Author: lushijie
* @Date:   2018-06-08 17:47:40
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-14 14:12:09
*/
import Vue from 'vue';
import {
  Button,
  Select,
  Row,
  Col
} from 'element-ui';

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI, { size: 'small' });

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
