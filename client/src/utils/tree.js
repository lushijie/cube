// vuex node 树处理
import Store from 'store';
import Utils from 'utils';

export default class TreeOperate {
  // constructor(tree) {
  //   // TODO
  // }

  getTree() {
    return Utils.extend({}, Store.state.cube.node.tree);
  }

  findNodeByUUID(uuid) {
    const tree = this.getTree();
    let target = null;

    function travel(tree) {
      if (tree.uuid === uuid) {
        target = tree;
      } else {
        if (tree.children) {
          tree.children.forEach(ele => {
            travel(ele);
          });
        }
      }
    }
    travel(tree);

    return target;
  }

  selectNodeByUUID(uuid) {
    const tree = this.getTree();
    let target = null;

    function travel(tree) {
      if (tree.uuid === uuid) {
        target = tree;
        tree.selected = true;
      } else {
        tree.selected = false;
      }

      if (tree.children) {
        tree.children.forEach(ele => {
          travel(ele);
        });
      }
    }
    travel(tree);

    Store.commit('cube/updateTree', tree);
    return target;
  }

  updateNodeByUUID(uuid, success, fail = function() {}) {
    const tree = this.getTree();

    function travel(tree) {
      if (tree.uuid === uuid) {
        success(tree);
      } else {
        fail(tree);
        if (tree.children) {
          tree.children.forEach(ele => {
            travel(ele);
          });
        }
      }
    }
    travel(tree);

    Store.commit('cube/updateTree', tree);
  }

  deleteNodeByUUID(uuid) {
    const tree = this.getTree();

    function travel(tree) {
      if (tree.uuid === uuid && tree.root) {
        throw new Error('根节点不允许删除');
      }

      if (tree.children) {
        tree.children.forEach((ele, index) => {
          if (ele.uuid === uuid) {
            tree.children.splice(index, 1);
          } else {
            travel(ele);
          }
        });
      }
    }
    travel(tree);

    Store.commit('cube/updateTree', tree);
  }
}