/*
* @Author: lushijie
* @Date:   2017-01-17 14:32:02
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-22 10:32:03
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminLayout from 'layouts/admin-layout.vue';
import NotFound from 'layouts/not-found.vue';
import Dashboard from 'admin/dashboard.vue';
import Utils from 'utils';
import store from 'store';
import CommonModel from 'admin/common/model.js';
import NormalConstants from 'admin/constants/admin-normal.js'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // 'history' 需要在404的时候返回首页
  base: '/',
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes: [
    {
      path: '/admin',
      component: AdminLayout,
      // meta: {
      //   requiredAuth: true
      // },
      children: [
        {
          path: '',
          redirect: 'banner',
        },
        // {
        //   path: 'dashboard',
        //   meta: {
        //     title: 'dashboard'
        //   },
        //   component: Dashboard,
        // },
        // require('admin/activity/router'),
        // require('admin/course/router'),
        // require('admin/user/router'),
        // require('admin/output/router'),
        // require('admin/setting/router'),
        // require('admin/banner/router'),
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const mergedMeta = Utils.getRouterMeta(to.matched);
  console.log(mergedMeta);
  store.commit('admin/updateRouteMeta', { ...mergedMeta });

  // 活动列表页的演讲者、赞助者、组织者sidebar高亮处理
  let path = to.path;
  if (path.indexOf('/admin/activity/list') > -1) {
    path = '/admin/activity/list'
  }
  store.commit('admin/updateActiveRoute', { path });

  // 登陆验证
  // if (!store.state['admin'].userInfo.nickname && mergedMeta.requiredAuth) {
  //   const res = await CommonModel.getUserInfo();

  //   if (res && (+res.errno === 403)) {
  //     location.href = NormalConstants.loginURL;
  //   } else {
  //     store.commit('admin/updateUserInfo', {
  //       nickname: res && res.data && res.data.user_nickname
  //     });
  //     next();
  //   }
  // } else {
  //   next();
  // }
});

router.afterEach(transition => {
  setTimeout(() => {
    try {
      // 给 HTML 元素加特殊类
      const mergedMeta = Utils.getRouterMeta(transition.matched);
      document.title = ((mergedMeta && mergedMeta.title) ? `${mergedMeta.title}-${INJECT.APPNAME}` : INJECT.APPNAME);
      $('html').removeClass(function() {
        const htmlClass = $(this).attr('class');
        if (htmlClass) {
          const list = htmlClass.split(' ');
          return list.filter(function(val) {
            return (val !== 'ie8' && val !== 'ie9');
          }).join(' ');
        }
      });
      $('html').addClass(`admin-mod-block ${Utils.getPageID()}-page`);
    } catch (e) {
      console.warn(e);
    }
  });
});

export default router;
