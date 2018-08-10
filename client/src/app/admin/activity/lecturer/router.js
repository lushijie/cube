import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'lecturer',
  component: BlankLayout,
  meta: {
    title: '演讲者管理',
    module: 'lecturer'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'lecturer_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'lecturer_add',
      component: AddView,
    },
  ]
}
