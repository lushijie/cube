/*
* @Author: lushijie
* @Date:   2017-01-17 14:32:02
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-10 15:04:45
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import BlankLayout from 'layouts/blank-layout.vue';
import NotFound from 'layouts/not-found.vue';
import Utils from 'utils';
import store from 'store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // 'history' 需要在404的时候返回首页
  base: '/',
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes: [
    {
      path: '/',
      component: BlankLayout,
      children: [
        // require('./dashboard/router'),
        // require('./platform/router'),
        // require('./opensource/router'),
        // require('./course/router'),
        // require('./activity/router'),
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
  store.commit('user/updateRouteMeta', { ...mergedMeta });
  next();
});

router.afterEach(transition => {
  setTimeout(() => {
    try {
      // const mergedMeta = Utils.getRouterMeta(transition.matched);
      // document.title = ((mergedMeta && mergedMeta.title) ? `${mergedMeta.title}-${INJECT.APPNAME}` : INJECT.APPNAME);
      $('html').removeClass(function() {
        const htmlClass = $(this).attr('class');
        if (htmlClass) {
          const list = htmlClass.split(' ');
          return list.filter(function(val) {
            return (val !== 'ie8' && val !== 'ie9');
          }).join(' ');
        }
      });
      $('html').addClass(`user-mod-block ${Utils.getPageID() || 'index'}-page`);
    } catch (e) {
      console.warn(e);
    }
  });
});

export default router;
