/*
* @Author: lushijie
* @Date:   2018-05-29 18:02:55
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-11 11:22:40
*/
import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'column',
  component: BlankLayout,
  meta: {
    title: '专栏管理',
    module: 'column'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'column_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'column_add',
      component: AddView,
    }
  ]
};
