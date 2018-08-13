import BlankLayout from 'demo/layouts/blank.vue';
import HomeView from './home.vue';

module.exports = {
  path: 'course',
  component: BlankLayout,
  meta: {
    title: '培训课程'
  },
  children: [
    {
      path: '',
      name: 'course',
      component: HomeView
    }
  ]
}
