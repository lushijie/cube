import BlankLayout from 'layouts/blank-layout.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'setting',
  component: BlankLayout,
  meta: {
    title: '设置',
    module: 'setting'
  },
  children: [
    {
      path: '',
      redirect: 'home'
    },
    {
      path: 'home',
      component: HomeView
    }
  ]
}
