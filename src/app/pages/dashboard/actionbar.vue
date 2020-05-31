<template>
  <div
    class="cube-block-item"
    :data-node-uuid="node.uuid"
    draggable="true">

    <!-- 组件body -->
    <div class="node-item-group">
      <div
        class="slot-placeholder"
        v-if="!node.root"
        :data-node-uuid="node.uuid"
        :data-node-before="true">
        <!-- 非根组件节点前置占位，用于组件的位置排序 -->
      </div>

      <div
        :class="[
          { 'node-item': true },
          node.root ? 'root' : 'normal',
          { selected: node.selected }
        ]"
        :data-tag="node.tag"
        @click="handleSelectNode(node)">
        {{ node.label }}
        <i
          v-if="!node.root"
          class="el-icon-close node-item__del"
          @click.stop="handleDeleteNode(node)">
          <!-- root 节点不允许删除 -->
        </i>
      </div>
    </div>

    <!-- 组件匿名卡槽 -->
    <ul class="slot-container" v-if="getPackageSlots(node.tag) === true">
      <li class="slot-item">
        <template
          v-for="ele in getSpeciallSlots(node.slots)" >
          <Actionbar :node="ele" :key="ele.uuid" /> <!-- 自调用 -->
        </template>

        <!-- 匿名 slot 占位-->
        <div
          class="slot-placeholder"
          :data-node-uuid="node.uuid"
          :title="'匿名卡槽'"
          data-slot-name="default"
          data-slot-title="匿名卡槽"/>
      </li>
    </ul>

    <!-- 组件具名卡槽 -->
    <ul class="slot-container"
      v-if="getPackageSlots(node.tag) && getPackageSlots(node.tag).length > 0">
      <li class="slot-item" v-for="(item, i) in getPackageSlots(node.tag)" :key="i">
        <template
          v-for="ele in getSpeciallSlots(node.slots, item.slotName)">
          <Actionbar :node="ele" :key="ele.uuid" /> <!-- 自调用 -->
        </template>

        <!-- 具名 slot 占位-->
        <div
          class="slot-placeholder"
          :data-node-uuid="node.uuid"
          :title="item.slotLabel"
          :data-slot-name="item.slotName"
          :data-slot-title="item.slotLabel"/>
      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  import { mapGetters } from 'vuex';
  import djs from 'dom.js';

  export default {
    name: 'Actionbar',

    props: {
      node: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },

    methods: {
      // 选中组件节点
      handleSelectNode(item) {
        this.treeInst.selectNodeByUid(item.uuid);
      },

      // 删除组件节点
      handleDeleteNode(item) {
        this.treeInst.deleteNodeByUid(item.uuid);
      },

      // 获取配置文件的 slots 信息
      getPackageSlots(tag) {
        const pkgInfo = this.packages.filter(ele => ele.tag === tag)[0] || {};
        if (typeof pkgInfo.slots === 'undefined') {
          pkgInfo.slots = false; // 省略 slots 时，false 补齐
        }
        return pkgInfo.slots;
      },

      // 获取匿名|具名卡槽
      getSpeciallSlots(slots = [], slotName = 'default') {
        return slots.filter(ele => {
          if (slotName === 'default') { // 匿名卡槽
            return ele.properties.slot === 'default' || !ele.properties.slot;
          } else { // 具名卡槽
            return ele.properties.slot === slotName;
          }
        });
      },

      // 在操作栏拖拽组件时记录组件信息(此处为uuid)到localStorage
      bindDragEvent() {
        // 拖拽元素
        document.querySelectorAll('.cube-block-item').forEach(function(target, index) {
          // 移除组件的拖拽事件, 防止重复绑定
          target.ondragstart = null;
          target.ondrag = null;
          target.ondragend = null;

          target.ondragstart = function(event) {
            const info = { uuid: event.target.getAttribute('data-node-uuid') };
            window.localStorage.setItem('cube-drag-element', JSON.stringify(info));
          };

          target.ondrag = function(event) {};

          target.ondragend = function(event) {
            window.localStorage.removeItem('cube-drag-element');
          };
        });
      },

      // 移除所有的 drag-over 状态
      removeAllDragOver() {
        djs.findAll('.slot-placeholder').forEach(ele => {
          djs.removeClass(ele, 'drag-over');
        });
      },

      // 将组件释放到 slot 容器
      bindDropEvent() {
        const self = this;
        document.querySelectorAll('.slot-placeholder').forEach(function(target, index) {
          // 移除slot的释放事件, 防止重复绑定
          target.ondragenter = null;
          target.ondragover = null;
          target.ondragleave = null;
          target.ondrop = null;

          target.ondragenter = function(event) {
            event.preventDefault();
          };

          target.ondragover = function(event) {
            event.preventDefault();
            event.stopPropagation();
            self.removeAllDragOver();

            const to = event.toElement || event.relatedTarget;
            const dragUid = JSON.parse(window.localStorage.getItem('cube-drag-element')).uuid;

            // 存在 dragUid 是移动组件，不存在 dragUid 则是新建组件
            if (dragUid) {
              // 如果是移动元素，不能移动到自己的子级元素
              if (!document.querySelectorAll(`.cube-block-item[data-node-uuid="${dragUid}"]`)[0].contains(to)) {
                djs.addClass(target, 'drag-over');
              }
            } else {
              djs.addClass(target, 'drag-over');
            }
          };

          target.ondragleave = function(event) {
            event.preventDefault();
            event.stopPropagation();

            // const from = event.fromElement || event.relatedTarget;
            // const to = event.toElement || event.relatedTarget;
            self.removeAllDragOver();
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
            const isMoveBefore = dropTarget.getAttribute('data-node-before');
            const targetUuid = dropTarget.getAttribute('data-node-uuid');
            let targetSlotName = dropTarget.getAttribute('data-slot-name');

            // 新建节点信息，分为两种情况: 1.移动的节点 2.从组件列表拖拽新建的
            let newNode = null;

            // 如果放置到 before 位置, 新节点slot名字一定与紧靠在其后面的那个组件的slot一致
            if (isMoveBefore) {
              targetSlotName = (self.treeInst.getNodeByUid(targetUuid).properties || {}).slot || 'default';
            }

            // 移动节点
            if (dragInfo.uuid) {
              if (targetUuid !== dragInfo.uuid) { // 禁止拖拽自己到自身的子级节点中
                newNode = self.treeInst.deleteNodeByUid(dragInfo.uuid);
                if (targetSlotName) { // 移动之后修改 slot
                  newNode.properties = newNode.properties || {};
                  newNode.properties.slot = targetSlotName;
                }
              }
            } else {
              // 新建节点
              const { tag, label, props = {} } = dragInfo;

              // TODO: 属性根据类型解析
              const vueProps = {};
              Object.keys(props).forEach(key => {
                const { default: defaultValue } = props[key];
                vueProps[key] = defaultValue;
              });

              const uuid = Utils.uuid;
              newNode = {
                // VNode
                tag,
                properties: {
                  props: vueProps,
                  attrs: {
                    id: uuid,
                  },
                  slot: targetSlotName, // 如果组件是其它组件的子组件，需指定所使用的插槽名称，默认 default
                },

                // custom props
                uuid,
                label,
                selected: true,
              };
            }

            // 落点位置，组件的 before 与 slot 处理逻辑不一致
            self.treeInst[isMoveBefore ? 'insertNodeBefore' : 'addNode'](targetUuid, newNode);

            // 为了让新增的节点响应事件，重新绑定事件
            setTimeout(() => {
              self.bindDragDropEvent();
            }, 50);
          };
        });
      },

      // 绑定拖拽、释放事件
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
  .slot-placeholder {
    transition: height 0.3s;
    height: 25px;
    background-color: #ffc;
  }
  .slot-placeholder.drag-over {
    background-color: #ff2;
    transition: height 0.3s;
    height: 45px;
  }
</style>
