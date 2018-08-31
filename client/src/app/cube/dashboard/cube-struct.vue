// 组件操作栏
<template>
  <div class="cube-struct" :data-uuid="menu.uuid">
    <!-- 组件节点展示 -->
    <span
      class="menu-item"
      draggable="true"
      :class="{'menu-item-selected': menu.selected}"
      @click="setSelectedNode(menu)">
      {{ menu.label }} - {{ menu.tag }}
      <i
        v-if="!menu.root"
        class="el-icon-close btn-delete"
        @click.stop="deleteNode(menu)">
      </i>
    </span>

    <!-- 匿名卡槽占位 -->
    <ul class="slot-container" v-if="getPackageSlots(menu.tag) === true">
      <li
        class="slot-item"
        :data-uuid="menu.uuid"
        :title="'匿名卡槽'"
        slot-name="default"
        slot-title="匿名卡槽">
        <template
          v-for="childMenu in menu.children"
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
        :slot-name="item.sname"
        :slot-title="item.slabel">
        <template
          v-for="childMenu in menu.children"
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
            const dragInfo = event.dataTransfer.getData('drag-info').split('&&');

            // 移除所有的 drag-over 状态
            self.removeAllDragOver();

            // 添加节点
            const uuid = Utils.uuid;
            self.treeInst.addNode(dropTarget.getAttribute('data-uuid'), {
              tag: dragInfo[0],
              uuid: uuid,
              label: dragInfo[1],
              selected: true,
              properties: {
                props: {
                  [dragInfo[0].split('-')[1]]: `新建节点${dragInfo[0].split('-')[1]}`
                },
                attrs: {
                  id: uuid
                },
                slot: dropTarget.getAttribute('slot-name')
              },
              ref: uuid
            });

            setTimeout(() => {
              self.bindDropEvent();
            }, 50);
          };
        });
      }
    },

    computed: {
      ...mapState('cube', ['packages']),
    },

    mounted() {
      this.bindDropEvent();
    }
  };
</script>

<style scoped>
  .slot-container {
    margin: 0;
    list-style: none;
    padding-left: 0;
    border: 1px solid #f00;
    padding: 3px;
  }

  .slot-container .menu-item {
    margin: 5px 0;
  }

  .slot-item {
    position: relative;
    padding: 10px 10px 60px;
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
    display: inline-block;
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
