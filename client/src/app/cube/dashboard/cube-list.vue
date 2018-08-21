<template>
  <div id="cube-list">
    <ul>
      <li v-if="item.config.visible" v-for="item in packages" :data-block-tag="item.tag" draggable="true" class="block-component-item" :data-block-label="item.label">
        <el-button
          type="primary"
          icon="el-icon-plus">
          {{item.label}}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  import { mapState } from 'vuex';

  export default {
    props: {
    },

    components: {
    },

    data() {
      return {
      }
    },

    methods: {
      addClass(el, className) {
        if (!el.length) {
          el = [el];
        }

        el.forEach(ele => {
          if (ele.classList) {
            ele.classList.add(className);
          } else {
            ele.className += ' ' + className;
          }
        });
      },

      removeClass(el, className) {
        if (!el.length) {
          el = [el];
        }

        el.forEach(ele => {
          if (ele.classList) {
            ele.classList.remove(className);
          } else {
            ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
          }
        })
      },

      removeAllDragOver() {
        this.removeClass(document.querySelectorAll('.slot-item'), 'drag-over');
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
        })

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

      bindEvent() {
        const self = this;

        // 移除事件1
        document.querySelectorAll('.block-component-item').forEach(function(target, index) {
          target.ondragstart = null;
          target.ondrag = null;
          target.ondragend = null;
        });

        // 移除事件2
        document.querySelectorAll('.slot-item').forEach(function(target, index) {
          target.ondragenter = null;
          target.ondragover = null;
          target.ondragleave = null;
          target.ondrop = null;
        });

        // 拖拽元素
        document.querySelectorAll('.block-component-item').forEach(function(target, index) {
          target.ondragstart = function(event) {
            const infoStr = `${event.target.getAttribute('data-block-tag')}-_-${event.target.getAttribute('data-block-label')}`
            event.dataTransfer.setData('block-info', infoStr);
          };

          target.ondrag = function(event) {
            // TODO
          };

          target.ondragend = function(event) {
            // TODO
          };
        });

        // 放置元素
        document.querySelectorAll('.slot-item').forEach(function(target, index) {
          target.ondragenter = function(event) {
            event.preventDefault();
          };

          target.ondragover = function(event) {
            event.preventDefault();
            event.stopPropagation();
            self.removeAllDragOver();
            self.addClass(target, 'drag-over');
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
                self.addClass(to, 'drag-over');
              }
            }
          }

          target.ondrop = function(event) {
            event.stopPropagation();
            event.preventDefault();

            // 拖拽完成
            const dragOverEle = document.querySelectorAll('.drag-over')[0];
            const blockInfo = event.dataTransfer.getData('block-info').split('-_-');

            // 重置 drag-over 状态
            self.removeAllDragOver();

            const uuid = Utils.uuid;
            self.treeInst.addNode(dragOverEle.getAttribute('data-uuid'), {
              tag: blockInfo[0],
              uuid: uuid,
              label: blockInfo[1],
              selected: true,
              properties: {
                props: {
                  [blockInfo[0].split('-')[1]]: `新建节点${blockInfo[0].split('-')[1]}`
                },
                attrs: {
                  id: uuid
                },
                slot: dragOverEle.getAttribute('slot-name')
              },
              ref: uuid
            });

            setTimeout(() => {
              self.bindEvent();
            }, 50);
          }
        });
      }
    },

    computed: {
      ...mapState('cube', ['packages', 'node']),
    },

    mounted() {
      this.bindEvent();
    }
  };
</script>

<style scoped>
  #cube-list ul {
    list-style: none;
  }
  #cube-list li {
    margin-bottom: 20px;
  }
</style>
