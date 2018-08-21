<template>
  <div id="cube-list">
    <ul>
      <li v-if="item.config.visible" v-for="item in packages" :block-tag="item.tag" draggable="true" class="block-component-item">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click.prevent="createComponent(item)">
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
      createComponent(item) {
        const uuid = Utils.uuid;
        const fatherUUID = this.treeInst.getRandomUUID();
        const attr = item.tag.split('-')[1];

        this.treeInst.addNode(fatherUUID, {
          tag: item.tag,
          uuid: uuid,
          label: item.label,
          selected: true,
          properties: {
            props: {
              [attr]: `新建节点${attr}`
            },
            attrs: {
              id: uuid
            }
          },
          ref: uuid
        });
      }
    },

    computed: {
      ...mapState('cube', ['packages', 'node']),
    },

    mounted() {
      function removeClass(el, className) {
        if (el.classList) {
          el.classList.remove(className);
        } else {
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }

      function addClass(el, className) {
        if (el.classList) {
          el.classList.add(className);
        } else {
          el.className += ' ' + className;
        }
      }

      // function getClosest(elem, selector) {
      //   for (; elem && elem !== document; elem = elem.parentNode) {
      //     if (elem.matches(selector)) return elem;
      //   }
      //   return null;
      // }

      document.querySelectorAll('.block-component-item').forEach(function(ele, index) {
        ele.ondragstart = function(event) {
          event.dataTransfer.setData('block-tag', event.target.getAttribute('block-tag'));
        };

        ele.ondrag = function(event) {
          // console.log('drag...', event);
        };

        ele.ondragend = function(event) {
          // console.log('dragend...', event);
        };
      });

      document.querySelectorAll('.slot-item').forEach(function(target, index) {
        target.ondragenter = function(event) {
          event.preventDefault();
          addClass(target, 'drag-enter');
          console.log('target dragenter...');
        };

        target.ondragover = function(event) {
          event.preventDefault();
          // console.log('target ondragover...');
        };

        target.ondragleave = function(event) {
          event.preventDefault();
          const to = event.toElement || event.relatedTarget;
          if (to === target) return;
          if (this.contains(to)) {
            if (to.getAttribute('class').indexOf('slot-item') > -1) {
              removeClass(target, 'drag-enter')
            }
          } else {
            removeClass(target, 'drag-enter');
          }
        }

        target.ondrop = function(event) {
          event.stopPropagation();
          event.preventDefault();
          removeClass(target, 'drag-enter');
          // console.log('target drop...');
          // console.log('target ondrop...', event)
          // const dragId = event.dataTransfer.getData('state');
          // target.querySelectorAll('ul')[0].appendChild(document.getElementById(dragId));
        }
      });
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
