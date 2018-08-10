import BlankLayout from 'layouts/blank-layout.vue';
import HomeView from './home.vue';

module.exports = {
  path: '',
  component: BlankLayout,
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '',
      name: 'dashboard',
      component: HomeView
    }
  ]
}
