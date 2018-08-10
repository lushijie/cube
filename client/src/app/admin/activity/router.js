/*
* @Author: lushijie
* @Date:   2018-03-28 17:50:07
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-11 11:22:42
*/
// const HomeVue = (resolve) => require(['./home.vue'], resolve);
// const ListVue = (resolve) => require(['./list.vue'], resolve);

import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';
import LectureAddView from './member/lecturer-add.vue';
import SponsorAddView from './member/sponsor-add.vue';
import OrganizerAddView from './member/organizer-add.vue';

module.exports = {
  path: 'activity',
  component: BlankLayout,
  meta: {
    title: '活动管理',
    module: 'activity'
  },
  children: [
    {
      path: 'list',
      component: BlankLayout,
      children: [
        {
          path: '',
          name: 'activity_list',
          component: ListView,
        },
        {
          path: 'lecturer',
          name: 'activity_lecturer_add',
          component: LectureAddView,
        },
        {
          path: 'sponsor',
          name: 'activity_sponsor_add',
          component: SponsorAddView,
        },
        {
          path: 'organizer',
          name: 'activity_organizer_add',
          component: OrganizerAddView,
        },
      ]
    },
    {
      path: 'add',
      name: 'activity_add',
      component: AddView,
    },
    require('./lecturer/router.js'),
    require('./organizer/router.js'),
    require('./series/router.js'),
    require('./sponsor/router.js')
  ]
};
