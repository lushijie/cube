import BlankLayout from 'layouts/blank-layout.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'activity',
  component: BlankLayout,
  meta: {
    title: '活动',
    showHeader: false,
    showFooter: false
  },
  children: [
    {
      path: '',
      name: 'activity',
      component: HomeView
    }
  ]
}
