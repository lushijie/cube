import Vue from 'vue';
import {
  Button,
  Col,
  Input,
  Row
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.use(Button);
Vue.use(Col);
Vue.use(Input);
Vue.use(Row);

// // 全量引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI, { size: 'small' });