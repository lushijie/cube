import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
// import AddView from './add.vue';

module.exports = {
  path: 'user',
  component: BlankLayout,
  meta: {
    title: '用户管理',
    module: 'user'
  },
  children: [
    {
      path: '',
      redirect: 'list'
    },
    {
      path: 'list',
      name: 'user_list',
      component: ListView,
    },
    // {
    //   path: 'add',
    //   name: 'user_add',
    //   component: AddView,
    // }
  ]
}
