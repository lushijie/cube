/*
* @Author: lushijie
* @Date:   2017-01-17 14:32:02
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-13 10:29:26
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import BlankLayout from 'demo/layouts/blank.vue';
import NotFound from 'demo/layouts/404.vue';
// import Utils from 'utils';
// import store from 'store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes: [
    {
      path: '',
      component: BlankLayout,
      children: [
        require('./course/router'),
      ]
    },

    {
      path: '*',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  // const mergedMeta = Utils.getRouterMeta(to.matched);
  // store.commit('user/updateRouteMeta', { ...mergedMeta });
  next();
});

router.afterEach(transition => {
  // TODO
});

export default router;
