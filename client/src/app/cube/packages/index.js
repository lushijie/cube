import Utils from 'utils';

module.exports = {
  'block-r': {
    label: '根组件',
    component: Utils.interop(require('./block-r.vue')),
    config: {
      visible: false
    },
  },
  'block-a': {
    label: '组件a',
    component: Utils.interop(require('./block-a.vue')),
    config: {
      visible: true
    }
  },
  'block-b': {
    label: '组件b',
    component: Utils.interop(require('./block-b.vue')),
    config: {
      visible: true
    }
  },
  'block-c': {
    label: '组件c',
    component: Utils.interop(require('./block-c.vue')),
    config: {
      visible: true
    }
  }
}