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
        props: {}
      },
      slots: [],
    }
  }
};
