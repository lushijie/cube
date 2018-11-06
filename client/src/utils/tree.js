import Store from 'store';
import Utils from 'utils';
import Vue from 'vue';
const registedComponents = new Set();

export default class Tree {
  constructor(tree = {}) {
    if (tree.id) {
      this.setCacheTree(tree.id, tree.struct);
      Store.commit('cube/updateTree', tree);
    }
  }
  /**
   * 获取树的存储Id
   * @return id
   */
  getTreeId() {
    return Store.state.cube.tree.id;
  }

  /**
   * 获取 localStorage 缓存的Id
   * @param savedId
   * @return cacheId
   */
  getCacheId(treeid) {
    return `tree${treeid}`;
  }

  /**
   * 获取树的结构信息
   * @return object
   */
  getStruct() {
    return Utils.extend({}, Store.state.cube.tree.struct);
  }

  /**
   * 获取结构中所用到的组件名称
   * @return array
   */
  getUsedComponents() {
    const nodes = this.getStruct();
    const usedComponents = new Set();
    function travel(node) {
      if (node.tag) {
        usedComponents.add(node.tag);
      }
      if (node.slots) {
        node.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(nodes);
    return [ ...usedComponents ];
  }

  /**
   * 缓存树到localStorage
   * @return void
   */
  setCacheTree(treeId, struct) {
    const cacheId = this.getCacheId(treeId);
    window.localStorage.setItem(cacheId, JSON.stringify({
      id: treeId,
      struct: struct || this.getStruct()
    }));

    // 标记，已经缓存
    Store.commit('cube/updateTreeSaved', true);
  }

  /**
   * 从 localStrage 获取缓存树
   */
  getCacheTree(treeId) {
    const cacheId = this.getCacheId(treeId);
    return JSON.parse(window.localStorage.getItem(cacheId) || '{}');
  }

  /**
   * 获取根节点的 uuid
   * @return uuid
   */
  getRootUid() {
    return this.getStruct().uuid;
  }

  /**
   * 获取属于当前树的一个随机 Uid
   * @return {[type]} [description]
   */
  getRandomUid() {
    const nodes = this.getStruct();
    const uuids = [];

    function travel(node) {
      uuids.push(node.uuid);

      if (node.slots) {
        node.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(nodes);
    return uuids[Math.floor(Math.random() * uuids.length)];
  }

  /**
   * 根据 uuid 获取节点，不会回写，仅限读使用
   * @param  {[type]} uuid [description]
   * @return {[type]}      [description]
   */
  getNodeByUid(uuid) {
    const nodes = this.getStruct();
    let matched = null;

    function travel(node) {
      if (node.uuid === uuid) {
        matched = node;
      } else {
        if (!matched && node.slots) {
          node.slots.forEach(ele => {
            travel(ele);
          });
        }
      }
    }

    travel(nodes);
    return matched;
  }

  /**
   * 设置某 uuid 的节点为选中状态
   * @param {[type]} uuid [description]
   */
  selectNodeByUid(uuid) {
    const nodes = this.getStruct();
    let target = null;

    function travel(node) {
      if (node.uuid === uuid) {
        target = node;
        node.selected = true;
      } else {
        node.selected = false;
      }

      if (node.slots) {
        node.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(nodes);
    Store.commit('cube/updateTreeStruct', nodes);
    return target;
  }

  /**
   * 获取当前选中的节点
   * @return {[type]} [description]
   */
  getSeletedNode() {
    const nodes = this.getStruct();
    let matched = false;

    function travel(node) {
      if (node.selected) {
        matched = node;
      } else {
        if (!matched && node.slots) {
          node.slots.forEach(ele => {
            travel(ele);
          });
        }
      }
    }

    travel(nodes);
    return matched;
  }

  /**
   * 添加节点
   * @param {[type]} fatherUid [description]
   * @param {[type]} newNode       [description]
   */
  addNode(fatherUid, newNode) {
    const nodes = this.getStruct();
    let matched = false;

    function travel(node) {
      if (!matched && node.uuid === fatherUid) {
        matched = true;
        node.slots = node.slots || [];
        node.slots.push(newNode);
      }
      if (!matched && node.slots) {
        node.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(nodes);
    Store.commit('cube/updateTreeStruct', nodes);
    this.selectNodeByUid(newNode.uuid);
  }

  /**
   * before uuid节点插入， uuid这个节点一定处于 slots 中
   * @param {*} uuid
   * @param {*} node
   */
  insertNodeBefore(uuid, newNode) {
    const nodes = this.getStruct();
    let matched = null;

    function travel(node) {
      if (node.slots) {
        node.slots.forEach((ele, index) => {
          if (!matched) {
            if (ele.uuid === uuid) {
              matched = ele;
              node.slots.splice(index, 0, newNode);
            } else {
              travel(ele);
            }
          }
        });
      }
    }

    travel(nodes);
    Store.commit('cube/updateTreeStruct', nodes);
    this.selectNodeByUid(newNode.uuid);
  }

  /**
   * 根据 uuid 删除节点
   * @param  {[type]} uuid [description]
   * @return {[type]}      [description]
   */
  deleteNodeByUid(uuid) {
    const nodes = this.getStruct();
    let currentSelected = false;
    let matched = false;

    function travel(node) {
      if (node.uuid === uuid && node.root) {
        throw new Error('根节点不允许删除');
      }

      if (!matched && node.slots) {
        node.slots.forEach((ele, index) => {
          if (ele.uuid === uuid) {
            matched = ele;
            currentSelected = ele.selected;
            node.slots.splice(index, 1);
          } else {
            travel(ele);
          }
        });
      }
    }

    // 遍历查找，命中后执行操作
    travel(nodes);

    // 重置 vuex 数据
    Store.commit('cube/updateTreeStruct', nodes);

    // 如果删除之前该节点为选中状态，删除该节点之后，设置root节点为选中状态
    // 如果删除的节点包含选中节点，删除该节点之后，设置root节点为选中状态
    if (currentSelected || !this.getSeletedNode()) {
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
    const nodes = this.getStruct();

    function travel(node) {
      if (node.uuid === uuid) {
        success(node);
      } else {
        fail(node);
      }

      if (node.slots) {
        node.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(nodes);
    Store.commit('cube/updateTreeStruct', nodes);
  }

  /**
   * 根据 uuid 更新节点，命中的执行更新策略，不命中的不执行
   * @param  {[type]}   uuid [description]
   * @param  {Function} cb   [description]
   * @return {[type]}        [description]
   */
  matchUpdateNodeByUid(uuid, cb) {
    const nodes = this.getStruct();
    let matched = false;

    function travel(node) {
      if (!matched && node.uuid === uuid) {
        matched = true;
        cb(node);
      }

      if (!matched && node.slots) {
        node.slots.forEach(ele => {
          travel(ele);
        });
      }
    }

    travel(nodes);
    Store.commit('cube/updateTreeStruct', nodes);
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

    const componentPromiseList = this.getUsedComponents().map(componentName => {
      if (!registedComponents.has(componentName)) {
        registedComponents.add(componentName);
        return import(`cube/packages/${componentName}.vue`).then(_ => {
          Vue.component(componentName, Vue.extend(_.default));
        });
      }
    });

    Promise.all(componentPromiseList).then(() => {
      const struct = this.getStruct();
      const RootComponent = Vue.component('root-component', {
        render: function(h) {
          return createComponent(struct, h);
        },
      });

      // for second+ time render
      if (!document.getElementById(innerId)) {
        document.getElementById(outerId).outerHTML = `<div id="${outerId}"><div id="${innerId}"></div></div>`;
      };

      new RootComponent().$mount(`#${innerId}`);
    });
  }
}
