import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'banner',
  component: BlankLayout,
  meta: {
    title: '轮播图管理',
    module: 'banner'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'banner_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'banner_add',
      component: AddView,
    },
  ]
}
