<template>
  <div
    class="cube-block-item"
    :data-uuid="node.uuid"
    draggable="true">
    <div class="node-item-group">
      <!-- 放置组件的位置(before), data-uuid 为已有的相邻组件的uuid -->
      <div
        class="cube-slot before"
        :data-uuid="node.uuid"
        :data-put-before="true"
        v-if="!node.root">
      </div>

      <div
        :class="{
          'node-item': true,
          'normal': !node.root,
          'root': node.root,
          'selected': node.selected
        }"
        :data-tag="node.tag"
        @click="setSelectedNode(node)">

        {{ node.label }}

        <!-- root 节点不允许删除 -->
        <i
          v-if="!node.root"
          class="el-icon-close node-item__del"
          @click.stop="deleteNode(node)">
        </i>
      </div>
    </div>

    <!-- 匿名卡槽 -->
    <ul class="slot-container" v-if="getPackageSlots(node.tag) === true">
      <li class="slot-item">
        <template
          v-for="ele in getSlots(node.slots)" >
          <Editor :node="ele" :key="ele.uuid" /> <!-- 自调用 -->
        </template>

        <!-- 匿名 slot 占位-->
        <div
          :data-uuid="node.uuid"
          :title="'匿名卡槽'"
          data-slot-name="default"
          data-slot-title="匿名卡槽"
          class="cube-slot slot" />
      </li>
    </ul>

    <!-- 具名卡槽 -->
    <ul class="slot-container"
      v-if="getPackageSlots(node.tag) && getPackageSlots(node.tag).length > 0">
      <li class="slot-item" v-for="(item, i) in getPackageSlots(node.tag)" :key="i">
        <template
          v-for="ele in getSlots(node.slots, item.slotName)">
          <Editor :node="ele" :key="ele.uuid" /> <!-- 自调用 -->
        </template>

        <!-- 具名 slot 占位-->
        <div
          :data-uuid="node.uuid"
          :title="item.slotLabel"
          :data-slot-name="item.slotName"
          :data-slot-title="item.slotLabel"
          class="cube-slot slot" />
      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  import { mapGetters } from 'vuex';
  import djs from 'dom.js';

  export default {
    name: 'Editor',

    props: {
      node: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },

    methods: {
      getSlots(slots = [], slotName = 'default') {
        return slots.filter(ele => {
          if (slotName === 'default') { // 匿名卡槽
            return ele.properties.slot === 'default' || !ele.properties.slot;
          } else { // 具名卡槽
            return ele.properties.slot === slotName;
          }
        });
      },

      setSelectedNode(item) {
        this.treeInst.selectNodeByUid(item.uuid);
      },

      deleteNode(item) {
        this.treeInst.deleteNodeByUid(item.uuid);
      },

      // 获取配置文件的 slots 信息
      getPackageSlots(tag) {
        const pkgInfo = this.packages.filter(ele => {
          return ele.tag === tag;
        })[0] || {};

        if (!pkgInfo.slots) {
          pkgInfo.slots = false;
        }

        return pkgInfo.slots;
      },

      // 移除所有的 drag-over 状态
      removeAllDragOver() {
        djs.findAll('.cube-slot').forEach(ele => {
          djs.removeClass(ele, 'drag-over');
        });
      },

      closest(el, selector) {
        let matchesFn;

        // find vendor prefix
        ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(fn) {
          if (typeof document.body[fn] === 'function') {
            matchesFn = fn;
            return true;
          }
          return false;
        });

        let parent;

        // traverse parents
        while (el) {
          parent = el.parentElement;
          if (parent && parent[matchesFn](selector)) {
            return parent;
          }
          el = parent;
        }

        return null;
      },

      bindDragEvent() {
        // 移除组件的拖拽事件, 防止重复绑定
        document.querySelectorAll('.cube-block-item').forEach(function(target, index) {
          target.ondragstart = null;
          target.ondrag = null;
          target.ondragend = null;
        });

        // 拖拽元素
        document.querySelectorAll('.cube-block-item').forEach(function(target, index) {
          target.ondragstart = function(event) {
            const info = {
              uuid: event.target.getAttribute('data-uuid')
            };
            window.localStorage.setItem('cube-drag-element', JSON.stringify(info));
          };

          target.ondrag = function(event) {};

          target.ondragend = function(event) {
            window.localStorage.removeItem('cube-drag-element');
          };
        });
      },

      bindDropEvent() {
        // 移除slot的释放事件, 防止重复绑定
        document.querySelectorAll('.cube-slot').forEach(function(target, index) {
          target.ondragenter = null;
          target.ondragover = null;
          target.ondragleave = null;
          target.ondrop = null;
        });

        // 放置组件
        const self = this;
        document.querySelectorAll('.cube-slot').forEach(function(target, index) {
          target.ondragenter = function(event) {
            event.preventDefault();
          };

          target.ondragover = function(event) {
            event.preventDefault();
            event.stopPropagation();
            self.removeAllDragOver();

            const to = event.toElement || event.relatedTarget;
            const dragUid = JSON.parse(window.localStorage.getItem('cube-drag-element')).uuid;
            if (dragUid) {
              // 如果是移动元素，不能移动到自己的子级元素
              if (!document.querySelectorAll(`.cube-block-item[data-uuid="${dragUid}"]`)[0].contains(to)) {
                djs.addClass(target, 'drag-over');
              }
            } else {
              djs.addClass(target, 'drag-over');
            }
          };

          target.ondragleave = function(event) {
            event.preventDefault();
            event.stopPropagation();

            const from = event.fromElement || event.relatedTarget;
            const to = event.toElement || event.relatedTarget;

            // 移除界外
            if (!self.closest(from, '.cube-slot')) {
              self.removeAllDragOver();
              return;
            }

            // 移到内部元素
            if (this.contains(to)) {
              if (to.getAttribute('class').indexOf('cube-slot') > -1) {
                self.removeAllDragOver();
                djs.addClass(target, 'drag-over');
              }
            }
          };

          target.ondrop = function(event) {
            event.stopPropagation();
            event.preventDefault();

            const dropTarget = document.querySelectorAll('.drag-over')[0];
            self.removeAllDragOver(); // 获得释放位置后， 移除所有的 drag-over 状态

            if (!dropTarget) {
              console.warn('没有获取到目标位置');
              return;
            }

            const dragInfo = JSON.parse(window.localStorage.getItem('cube-drag-element'));
            const isPutBefore = dropTarget.getAttribute('data-put-before');
            const relatedUid = dropTarget.getAttribute('data-uuid');
            let relatedSlotName = dropTarget.getAttribute('data-slot-name');

            // 新建节点信息，1.移动的节点 2.从组件列表拖拽新建的
            let newNode = null;

            // 如果放置到 before 位置, 新节点slot名字一定与紧靠在其后面的那个组件的slot一致
            if (isPutBefore) {
              relatedSlotName = (self.treeInst.getNodeByUid(relatedUid).properties || {}).slot || 'default';
            }

            // 移动节点
            if (dragInfo.uuid) {
              if (relatedUid !== dragInfo.uuid) { // 禁止拖拽自己到自身的子级节点中
                newNode = self.treeInst.deleteNodeByUid(dragInfo.uuid);
                if (relatedSlotName) {
                  newNode.properties = newNode.properties || {};
                  newNode.properties.slot = relatedSlotName;
                }
              }
            } else {
              const { tag, label, props = {} } = dragInfo;

              // TODO: 属性根据类型解析
              const vueProps = {};
              Object.keys(props).forEach(key => {
                const { default: defaultValue } = props[key];
                vueProps[key] = defaultValue;
              });

              const uuid = Utils.uuid;
              newNode = {
                tag,
                uuid,
                label,
                selected: true,
                properties: {
                  props: vueProps,
                  attrs: {
                    id: uuid
                  },
                  slot: relatedSlotName
                },
                ref: uuid
              };
            }

            // 落点位置，组件的before 与 slot 处理逻辑不一致
            // isPutBefore, 此时的relatedUid 其实为其相邻组件的uuid
            // !isPutBefore, 此时的relatedUid 为slot所有者组件的uuid
            self.treeInst[isPutBefore ? 'insertNodeBefore' : 'addNode'](relatedUid, newNode);

            setTimeout(() => {
              self.bindDragDropEvent();
            }, 50);
          };
        });
      },

      bindDragDropEvent() {
        this.bindDragEvent();
        this.bindDropEvent();
      }
    },

    computed: {
      ...mapGetters(['packages']),
    },

    mounted() {
      this.bindDragDropEvent();
    }
  };
</script>

<style scoped>
  .slot-container {
    list-style: none;
    padding: 0;
  }
  .slot-item {
    position: relative;
    border: 1px dashed#f00;
    border-left-width: 3px;
    border-left-style: outset;
    padding: 3px;
    margin-top: 1px;
  }
  .node-item {
    position: relative;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #409eff;
    color: #409eff;
    cursor: pointer;
  }
  .node-item.selected {
    background-color: #409eff;
    color: #fff;
  }
  .node-item__del {
    float: right;
    padding: 3px;
  }
  .node-item__del:hover {
    color: #f56c6c;
  }
  .cube-slot {
    transition: height 0.3s;
    height: 25px;
    background-color: #ffc;
  }
  .cube-slot.drag-over {
    background-color: #ff2;
    transition: height 0.3s;
    height: 45px;
  }
</style>
