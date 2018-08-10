/*
* @Author: lushijie
* @Date:   2018-05-29 18:03:01
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-11 11:22:40
*/
import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'category',
  component: BlankLayout,
  meta: {
    title: '分类管理',
    module: 'category'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'category_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'category_add',
      component: AddView,
    }
  ]
};
