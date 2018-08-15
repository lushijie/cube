import Utils from 'utils';

module.exports = {
  'block-r': {
    label: '根组件',
    component: Utils.interop(require('./block-r.vue')),
    config: {}
  },
  'block-a': {
    label: '组件a',
    component: Utils.interop(require('./block-a.vue')),
    config: {}
  },
  'block-b': {
    label: '组件b',
    component: Utils.interop(require('./block-b.vue')),
    config: {}
  },
  'block-c': {
    label: '组件c',
    component: Utils.interop(require('./block-c.vue')),
    config: {}
  }
}