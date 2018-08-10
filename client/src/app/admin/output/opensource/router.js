/*
* @Author: lushijie
* @Date:   2018-05-29 18:34:04
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-11 11:22:38
*/
import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'opensource',
  component: BlankLayout,
  meta: {
    title: '开源项目',
    module: 'opensource'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'opensource_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'opensource_add',
      component: AddView,
    },
  ]
}
