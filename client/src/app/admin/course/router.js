import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'course',
  component: BlankLayout,
  meta: {
    title: '课程管理',
    module: 'course'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'course_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'course_add',
      component: AddView,
    },
    require('./section/router.js'),
    require('./category/router.js'),
  ]
};
