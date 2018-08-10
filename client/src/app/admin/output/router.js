import BlankLayout from 'layouts/blank-layout.vue';

module.exports = {
  path: 'output',
  component: BlankLayout,
  meta: {
    title: '公司产品'
  },
  children: [
    require('./opensource/router.js'),
    require('./platform/router.js'),
    require('./website/router.js'),
  ]
}
