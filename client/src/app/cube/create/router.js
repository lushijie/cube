import BlankLayout from 'cube/scope/layouts/blank.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'create',
  component: BlankLayout,
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '',
      name: 'cube-create',
      component: HomeView
    }
  ]
}
