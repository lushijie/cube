import BlankLayout from 'layouts/blank-layout.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'platform',
  component: BlankLayout,
  meta: {
    title: '平台工具'
  },
  children: [
    {
      path: '',
      name: 'platform',
      component: HomeView
    }
  ]
}
