import Vue from 'vue';
import VueRouter from 'vue-router';
import BlankLayout from 'cube/components/layouts/blank.vue';
import NotFound from 'cube/components/layouts/404.vue';
import Utils from 'utils';
import Store from 'store';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: '/',
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes: [
    {
      path: '',
      redirect: 'dashboard',
      component: BlankLayout,
      children: [
        require('./dashboard/router'),
        require('./preview/router')
      ]
    },

    {
      path: '*',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  const mergedMeta = Utils.getRouterMeta(to.matched);
  Store.commit('cube/updateRouteMeta', { ...mergedMeta });
  next();
});

router.afterEach(transition => {
  // TODO
});

export default router;
