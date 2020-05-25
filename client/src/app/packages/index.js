module.exports = {
  'block-root': {
    label: '根组件',
    config: {
      visible: false, // false 则不在组件列表树中展示
      slots: true // 匿名卡槽
    },
  },
  'block-a': {
    label: '组件a',
    config: {
      visible: false,
      slots: [ // 具名卡槽
        {
          sname: 'header',
          slabel: '头部卡槽'
        },
        // {
        //   sname: 'footer',
        //   slabel: '底部卡槽'
        // }
      ]
    }
  },
  'block-b': {
    label: '组件b',
    config: {
      type: 'color',
      visible: true,
      slots: false // 不允许出现子组件
    }
  },
  'block-c': {
    label: '组件c',
    config: {
      visible: true,
      slots: false // 不允许出现子组件
    }
  },
  'block-d': {
    label: '组件d',
    config: {
      visible: true,
      slots: false // 不允许出现子组件
    }
  },
  'block-e': {
    label: '组件e',
    config: {
      visible: true,
      slots: false // 不允许出现子组件
    }
  }
};
