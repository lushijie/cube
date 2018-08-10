import Vue from 'vue'
import AdminLayout from 'layouts/admin-layout.vue';
import UserLayout from 'layouts/user-layout.vue';
import LoginLayout from 'layouts/login-layout.vue';

// 全局注册
Vue.component('admin-layout', AdminLayout);
Vue.component('user-layout', UserLayout);
Vue.component('login-layout', LoginLayout);
