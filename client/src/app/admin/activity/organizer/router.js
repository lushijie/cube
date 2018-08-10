import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'organizer',
  component: BlankLayout,
  meta: {
    title: '组织者管理',
    module: 'organizer'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'organizer_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'organizer_add',
      component: AddView,
    },
  ]
}
