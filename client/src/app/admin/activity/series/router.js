import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'series',
  component: BlankLayout,
  meta: {
    title: '系列管理',
    module: 'series'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'series_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'series_add',
      component: AddView,
    },
  ]
}
