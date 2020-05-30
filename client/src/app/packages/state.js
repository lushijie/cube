import Utils from 'utils';

export default {
  packages: [],
  routeMeta: {},
  isTreeSaved: false,
  tree: {
    id: null,
    struct: {
      tag: 'block-root',
      uuid: Utils.uuid,
      label: '页面容器',
      root: true,
      selected: true,
      properties: {
        props: {
          // 默认属性
          backgroundColor: '#fff',
          font: {
            fontSize: '16px'
          }
        }
      },
      slots: [],
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