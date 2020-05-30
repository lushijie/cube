module.exports = {
  'block-root': {
    label: '根组件',
    visible: false, // false， 则不在组件列表树中展示
    slots: true, // 匿名卡槽
  },
  'block-container': {
    label: '容器组件',
    visible: true,
    slots: [
      {
        slotName: 'header', // 具名卡槽
        slotLabel: '头部卡槽'
      },
      {
        slotName: 'footer',
        slotLabel: '底部卡槽'
      }
    ],
    props: {
      backgroundColor: {
        label: '背景颜色',
        type: 'color',
        default: '#ccc',
        description: '',
      }
    }
  },
  'block-image': {
    label: '图片组件',
    visible: true,
    slots: false, // 不允许出现子组件
    props: {
      imgURL: {
        label: '图片地址',
        type: 'input',
        default: 'https://p0.meituan.net/travelcube/a6d651dfde0437d2e13449b82ffbaf129203.png',
        description: '',
      }
    }
  },
  'block-text': {
    label: '文本组件',
    visible: true,
    slots: false, // 不允许出现子组件
    props: {
      text: {
        label: '文本',
        type: 'input',
        default: 'hello world',
        description: '',
      }
    }
  },
};
