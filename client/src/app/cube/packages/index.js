import Utils from 'utils';

module.exports = {
  'block-r': {
    label: '根组件',
    component: Utils.interop(require('./block-r.vue')),
    config: {
      visible: false, // false 则不在组件列表树中展示
      slots: true // 匿名卡槽
    },
  },
  'block-a': {
    label: '组件a',
    component: Utils.interop(require('./block-a.vue')),
    config: {
      visible: true,
      slots: [ // 具名卡槽
        {
          sname: 'header',
          slabel: '头部卡槽'
        },
        {
          sname: 'footer',
          slabel: '底部卡槽'
        }
      ]
    }
  },
  'block-b': {
    label: '组件b',
    component: Utils.interop(require('./block-b.vue')),
    config: {
      visible: true,
      slots: false // 不允许出现子组件
    }
  },
  'block-c': {
    label: '组件c',
    component: Utils.interop(require('./block-c.vue')),
    config: {
      visible: true,
      slots: false // 不允许出现子组件
    }
  },
  'block-d': {
    label: '组件d',
    component: Utils.interop(require('./block-d.vue')),
    config: {
      visible: true,
      slots: false // 不允许出现子组件
    }
  },
  'block-e': {
    label: '组件e',
    component: Utils.interop(require('./block-e.vue')),
    config: {
      visible: true,
      slots: false // 不允许出现子组件
    }
  }
};
