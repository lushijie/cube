import Store from 'store';
import Utils from 'utils';
import Vue from 'vue';

export default class Tree {

  getTreeId() {
    return Store.state.cube.node.id;
  }

  /**
   * 获取整个节点树, 深拷贝
   * @return object
   */
  getTree() {
    return Utils.extend({}, Store.state.cube.node.tree);
  }

  /**
   * 获取根节点的 uuid
   * @return uuid
   */
  getRootUid() {
    return this.getTree().uuid;
  }

  /**
   * 获取属于当前树的一个随机 Uid
   * @return {[type]} [description]
   */
  getRandomUid() {
    const tree = this.getTree();
    const uuids = [];

    function travel(tree) {
      uuids.push(tree.uuid);

      if (tree.slots) {
        tree.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(tree);
    return uuids[Math.floor(Math.random() * uuids.length)];
  }

  /**
   * 根据 uuid 获取节点，不会回写，仅限读使用
   * @param  {[type]} uuid [description]
   * @return {[type]}      [description]
   */
  getNodeByUid(uuid) {
    const tree = this.getTree();
    let matched = null;

    function travel(tree) {
      if (tree.uuid === uuid) {
        matched = tree;
      } else {
        if (!matched && tree.slots) {
          tree.slots.forEach(ele => {
            travel(ele);
          });
        }
      }
    }

    travel(tree);
    return matched;
  }

  /**
   * 设置某 uuid 的节点为选中状态
   * @param {[type]} uuid [description]
   */
  selectNodeByUid(uuid) {
    const tree = this.getTree();
    let target = null;

    function travel(tree) {
      if (tree.uuid === uuid) {
        target = tree;
        tree.selected = true;
      } else {
        tree.selected = false;
      }

      if (tree.slots) {
        tree.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(tree);
    Store.commit('cube/updateTree', tree);
    return target;
  }

  /**
   * 获取当前选中的节点
   * @return {[type]} [description]
   */
  getSeletedNode() {
    const tree = this.getTree();
    let matched = false;

    function travel(tree) {
      if (tree.selected) {
        matched = tree;
      } else {
        if (!matched && tree.slots) {
          tree.slots.forEach(ele => {
            travel(ele);
          });
        }
      }
    }

    travel(tree);
    return matched;
  }

  /**
   * 添加节点
   * @param {[type]} fatherUid [description]
   * @param {[type]} node       [description]
   */
  addNode(fatherUid, node) {
    const tree = this.getTree();
    let matched = false;

    function travel(tree) {
      if (!matched && tree.uuid === fatherUid) {
        matched = true;
        tree.slots = tree.slots || [];
        tree.slots.push(node);
      }
      if (!matched && tree.slots) {
        tree.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(tree);
    Store.commit('cube/updateTree', tree);
    this.selectNodeByUid(node.uuid);
  }

  /**
   * before uuid节点插入， uuid这个节点一定处于 slots 中
   * @param {*} uuid
   * @param {*} node
   */
  insertNodeBefore(uuid, node) {
    const tree = this.getTree();
    let matched = null;

    function travel(tree) {
      if (tree.slots) {
        tree.slots.forEach((ele, index) => {
          if (!matched) {
            if (ele.uuid === uuid) {
              matched = ele;
              tree.slots.splice(index, 0, node);
            } else {
              travel(ele);
            }
          }
        });
      }
    }

    travel(tree);
    Store.commit('cube/updateTree', tree);
    this.selectNodeByUid(node.uuid);
  }

  /**
   * 根据 uuid 删除节点
   * @param  {[type]} uuid [description]
   * @return {[type]}      [description]
   */
  deleteNodeByUid(uuid) {
    const tree = this.getTree();
    let currentSelected = false;
    let matched = false;

    function travel(tree) {
      if (tree.uuid === uuid && tree.root) {
        throw new Error('根节点不允许删除');
      }

      if (!matched && tree.slots) {
        tree.slots.forEach((ele, index) => {
          if (ele.uuid === uuid) {
            matched = ele;
            currentSelected = ele.selected;
            tree.slots.splice(index, 1);
          } else {
            travel(ele);
          }
        });
      }
    }

    // 遍历查找，命中后执行操作
    travel(tree);

    // 重置 vuex 数据
    Store.commit('cube/updateTree', tree);

    // 如果删除之前该节点为选中状态，删除该节点之后，设置root节点为选中状态
    if (currentSelected) {
      this.selectNodeByUid(this.getRootUid());
    }

    // 返回删除的节点信息
    return matched;
  }

  /**
   * 遍历所有节点，根据 uuid 更新节点，命中的执行 success 回调，不命中的执行 fail 回调
   * @param  {[type]} ) {}          [description]
   * @return {[type]}   [description]
   */
  travelUpdateNodeByUid(uuid, success, fail = function() {}) {
    const tree = this.getTree();

    function travel(tree) {
      if (tree.uuid === uuid) {
        success(tree);
      } else {
        fail(tree);
      }

      if (tree.slots) {
        tree.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(tree);
    Store.commit('cube/updateTree', tree);
  }

  /**
   * 根据 uuid 更新节点，命中的执行更新策略，不命中的不执行
   * @param  {[type]}   uuid [description]
   * @param  {Function} cb   [description]
   * @return {[type]}        [description]
   */
  matchUpdateNodeByUid(uuid, cb) {
    const tree = this.getTree();
    let matched = false;

    function travel(tree) {
      if (!matched && tree.uuid === uuid) {
        matched = true;
        cb(tree);
      }

      if (!matched && tree.slots) {
        tree.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(tree);
    Store.commit('cube/updateTree', tree);
  }

  /**
   *
   * @param {*} treeId
   */
  getSaveId(treeId) {
    return `tree-${treeId}`;
  }

  saveTree() {
    window.localStorage.setItem(`${this.getSaveId(this.getTreeId())}`, JSON.stringify({
      id: this.getTreeId(),
      tree: this.getTree()
    }));

    Store.commit('cube/setNodeSaved', true);
  }

  /**
   * [renderTree description]
   * @param  {[type]} vdom    [description]
   * @param  {String} outerId [description]
   * @param  {String} innerId [description]
   * @return {[type]}         [description]
   */
  renderTree(outerId = 'cube-preview', innerId = 'cube-preview-inner') {
    if (!document.getElementById(outerId)) {
      throw new Error('外部容器不存在');
    }

    // for second+ time render
    if (!document.getElementById(innerId)) {
      document.getElementById(outerId).outerHTML = `<div id="${outerId}"><div id="${innerId}"></div></div>`;
    };

    function createComponent(node, h) {
      const tag = node.tag;
      const properties = node.properties || {};
      const slots = node.slots || [];

      if (node.selected) {
        node.properties['class'] = node.properties['class'] || {};
        node.properties['class']['cube-selected'] = true;
      }

      return h(tag, properties, slots.map(ele => {
        return createComponent(ele, h);
      }));
    }

    const self = this;
    const RootComponent = Vue.component('root-component', {
      render: function(h) {
        return createComponent(self.getTree(), h);
      },
    });

    new RootComponent().$mount(`#${innerId}`);
  }
}
