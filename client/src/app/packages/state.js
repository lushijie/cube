import Utils from 'utils';

export default {
  packages: [],
  routeMeta: {},
  isTreeSaved: false,
  tree: {
    id: null, // 会被复写掉
    struct: {
      tag: 'block-root',
      uuid: Utils.uuid,
      label: '页面容器',
      root: true,
      selected: true,
      properties: {
        props: {
          backgroundColor: '背景颜色',
          font: {
            fontSize: '字体大小'
          }
        }
      },
      slots: []
      //     slots: [
      //       {
      //         tag: 'block-image',
      //         uuid: Utils.uuid,
      //         label: '图片组件',
      //         selected: false,
      //         properties: {
      //           props: {
      //             c: '组件c的属性'
      //           },
      //           slot: 'header'
      //         },
      //       }
      //     ]
    }
  }
};