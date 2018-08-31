import BlankLayout from 'cube/scope/layouts/blank.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'test',
  component: BlankLayout,
  children: [
    {
      path: '',
      component: HomeView
    }
  ]
};
