import BlankLayout from 'layouts/blank-layout.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'opensource',
  component: BlankLayout,
  meta: {
    title: '360开源'
  },
  children: [
    {
      path: '',
      name: 'opensource',
      component: HomeView
    }
  ]
}
