/*
* @Author: lushijie
* @Date:   2018-05-29 18:33:54
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-11 11:22:37
*/
import BlankLayout from 'layouts/blank-layout.vue';
import ListView from './list.vue';
import AddView from './add.vue';

module.exports = {
  path: 'website',
  component: BlankLayout,
  meta: {
    title: '热门网站',
    module: 'website'
  },
  children: [
    {
      path: '',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'website_list',
      component: ListView,
    },
    {
      path: 'add',
      name: 'website_add',
      component: AddView,
    },
  ]
}
