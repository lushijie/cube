import Vue from 'vue';
import Utils from 'utils';
import Store from 'store';
import VueRouter from 'vue-router';
import Blank from 'app/pages/components/blank.vue';
import NotFound from 'app/pages/components/404.vue';
import Dashboard from 'app/pages/dashboard/home.vue';
import Preview from 'app/pages/preview/home.vue';

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
      component: Blank,
      children: [
        {
          path: 'dashboard',
          meta: {},
          component: Dashboard
        },
        {
          path: 'preview',
          meta: {},
          component: Preview
        }
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
  Store.commit('updateRouteMeta', { ...mergedMeta });
  next();
});

router.afterEach(transition => {
  // TODO
});

export default router;
