import BlankLayout from 'cube/scope/layouts/blank.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'create',
  component: BlankLayout,
  children: [
    {
      path: '',
      name: 'cube-create',
      component: HomeView
    }
  ]
}
