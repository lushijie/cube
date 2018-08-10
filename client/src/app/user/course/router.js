import BlankLayout from 'layouts/blank-layout.vue';
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
