import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'sponsor',
  component: BlankLayout,
  meta: {
    title: '赞助者管理',
    module: 'sponsor'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'sponsor_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'sponsor_add',
      component: AddView,
    },
  ]
}
