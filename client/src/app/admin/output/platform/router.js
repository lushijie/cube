import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'platform',
  component: BlankLayout,
  meta: {
    title: '平台工具',
    module: 'platform'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'platform_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'platform_add',
      component: AddView,
    },
  ]
}
