import Utils from 'utils';

module.exports = {
  'block-a': {
    label: '组件a',
    component: Utils.interop(require('./block-a.vue'))
  },
  'block-b': {
    label: '组件b',
    component: Utils.interop(require('./block-b.vue'))
  },
  'block-c': {
    label: '组件c',
    component: Utils.interop(require('./block-c.vue'))
  }
}