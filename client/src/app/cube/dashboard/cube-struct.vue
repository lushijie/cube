// 组件操作栏
// slot-item 为放置组件的位置
<template>
  <div class="cube-struct" :data-uuid="menu.uuid" draggable="true">
    <!-- 组件节点展示 -->
    <div
      :class="{
        'menu-item': true,
        'menu-item-selected': menu.selected,
        'menu-item-normal': !menu.root,
        'menu-item-root': menu.root
      }"
      @click="setSelectedNode(menu)">
      {{ menu.label }} - {{ menu.tag }}
      <i
        v-if="!menu.root"
        class="el-icon-close btn-delete"
        @click.stop="deleteNode(menu)">
      </i>
    </div>

    <!-- 匿名卡槽占位 -->
    <ul class="slot-container" v-if="getPackageSlots(menu.tag) === true">
      <li
        class="slot-item"
        :data-uuid="menu.uuid"
        :title="'匿名卡槽'"
        data-slot-name="default"
        data-slot-title="匿名卡槽">
        <template
          v-for="childMenu in menu.slots"
          v-if="(childMenu.properties.slot === 'default') || (!childMenu.properties.slot)">
          <!-- 自调用 -->
          <MenuVue :menu="childMenu" :key="childMenu.uuid"></MenuVue>
        </template>
      </li>
    </ul>

    <!-- 具名卡槽 -->
    <ul class="slot-container" v-if="getPackageSlots(menu.tag) && getPackageSlots(menu.tag).length > 0">
      <li
        class="slot-item"
        v-for="(item, i) in getPackageSlots(menu.tag)"
        :key="i"
        :data-uuid="menu.uuid"
        :title="item.slabel"
        :data-slot-name="item.sname"
        :data-slot-title="item.slabel">
        <template
          v-for="childMenu in menu.slots"
          v-if="childMenu.properties.slot === item.sname">
          <MenuVue :menu="childMenu" :key="childMenu.uuid"></MenuVue>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  import { mapState } from 'vuex';
  import djs from 'dom.js';

  export default {
    name: 'MenuVue',

    props: {
      menu: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },

    components: {
    },

    data() {
      return {
      };
    },

    methods: {
      setSelectedNode(item) {
        this.treeInst.setSelectedNodeByUUID(item.uuid);
      },

      deleteNode(item) {
        this.treeInst.deleteNodeByUUID(item.uuid);
      },

      // 获取配置文件的 slots 信息
      getPackageSlots(tag) {
        const pkgInfo = this.packages.filter(ele => {
          return ele.tag === tag;
        })[0] || {};

        if (!pkgInfo.config.slots) {
          pkgInfo.config.slots = false;
        }

        return pkgInfo.config.slots;
      },

      removeAllDragOver() {
        djs.findAll('.slot-item').forEach(ele => {
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
        document.querySelectorAll('.cube-struct').forEach(function(target, index) {
          target.ondragstart = null;
          target.ondrag = null;
          target.ondragend = null;
        });

        // 拖拽元素
        document.querySelectorAll('.cube-struct').forEach(function(target, index) {
          target.ondragstart = function(event) {
            const info = {
              uuid: event.target.getAttribute('data-uuid')
            };
            event.dataTransfer.setData('drag-info', JSON.stringify(info));
          };

          target.ondrag = function(event) {
            // TODO
          };

          target.ondragend = function(event) {
            // TODO
          };
        });
      },

      bindDropEvent() {
        // 移除slot的释放事件, 防止重复绑定
        document.querySelectorAll('.slot-item').forEach(function(target, index) {
          target.ondragenter = null;
          target.ondragover = null;
          target.ondragleave = null;
          target.ondrop = null;
        });

        // 放置组件
        const self = this;
        document.querySelectorAll('.slot-item').forEach(function(target, index) {
          target.ondragenter = function(event) {
            event.preventDefault();
          };

          target.ondragover = function(event) {
            event.preventDefault();
            event.stopPropagation();

            self.removeAllDragOver();
            djs.addClass(target, 'drag-over');
          };

          target.ondragleave = function(event) {
            event.preventDefault();
            event.stopPropagation();

            const from = event.fromElement || event.relatedTarget;
            const to = event.toElement || event.relatedTarget;

            // 移除界外
            if (!self.closest(from, '.slot-item')) {
              self.removeAllDragOver();
              return;
            }

            // 移到内部元素
            if (this.contains(to)) {
              if (to.getAttribute('class').indexOf('slot-item') > -1) {
                self.removeAllDragOver();
                djs.addClass(target, 'drag-over');
              }
            }
          };

          target.ondrop = function(event) {
            event.stopPropagation();
            event.preventDefault();

            // 拖拽完成
            const dropTarget = document.querySelectorAll('.drag-over')[0];
            const dragInfo = JSON.parse(event.dataTransfer.getData('drag-info'));

            const fatherUUID = dropTarget.getAttribute('data-uuid');
            const fatherSlotName = dropTarget.getAttribute('data-slot-name');

            // 移除所有的 drag-over 状态
            self.removeAllDragOver();

            if (dragInfo.uuid) { // 如果存在uuid, 组件操作栏拖拽操作，移除旧节点，把其放入新节点
              if (fatherUUID !== dragInfo.uuid) { // 禁止拖拽自己到自身的子级节点中
                const deletedNode = self.treeInst.deleteNodeByUUID(dragInfo.uuid);
                if (fatherSlotName) {
                  deletedNode.properties = deletedNode.properties || {};
                  deletedNode.properties.slot = fatherSlotName;
                }
                self.treeInst.addNode(fatherUUID, deletedNode);
              }
            } else {
              // 从组件列表拖入，新建节点操作
              const uuid = Utils.uuid;
              self.treeInst.addNode(fatherUUID, {
                tag: dragInfo['tag'],
                uuid: uuid,
                label: dragInfo['label'],
                selected: true,
                properties: {
                  props: {
                    // 构造属性，package 组件中使用的属性
                    [dragInfo['tag'].split('-')[1]]: `新建节点${dragInfo['label']}`
                  },
                  attrs: {
                    id: uuid
                  },
                  slot: fatherSlotName
                },
                ref: uuid
              });
            }

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
      ...mapState('cube', ['packages']),
    },

    mounted() {
      this.bindDragDropEvent();
    }
  };
</script>

<style scoped>
  .slot-container {
    margin: 5px 0 0;
    list-style: none;
    padding-left: 0;
    border: 1px solid #f00;
    padding: 3px;
  }
  .slot-item {
    position: relative;
    padding: 10px 10px 40px;
    border: 1px dashed rgb(23, 101, 247);
    margin-top: 1px;
  }
  .slot-item:after{
    position: absolute;
    content: '+';
    display: inline-block;
    text-align: center;
    width: 100%;
    bottom: 0;
  }
  .slot-item.drag-over {
    background-color: #ccc;
  }
  .btn-delete {
    padding: 3px;
  }
  .btn-delete:hover {
    color: #f56c6c;
  }
  .menu-item {
    position: relative;
    margin: 10px 0 0;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #409eff;
    color: #409eff;
    cursor: pointer;
  }
  .menu-item-selected {
    background-color: #409eff;
    color: #fff;
  }
</style>
