// 组件列表栏
<template>
  <div id="cube-list">
    <ul>
      <li
        class="block-component-item"
        v-if="item.config.visible"
        v-for="item in packages"
        :key="item.tag"
        draggable="true"
        :data-block-tag="item.tag"
        :data-block-label="item.label">
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
  import { mapGetters } from 'vuex';
  export default {
    props: {
    },

    components: {
    },

    data() {
      return {
      };
    },

    methods: {
      // 组件注册拖拽事件
      bindDragEvent() {
        // 移除组件的拖拽事件, 防止重复绑定
        document.querySelectorAll('.block-component-item').forEach(function(target, index) {
          target.ondragstart = null;
          target.ondrag = null;
          target.ondragend = null;
        });

        // 拖拽元素
        document.querySelectorAll('.block-component-item').forEach(function(target, index) {
          target.ondragstart = function(event) {
            const info = {
              uuid: null, // 拖拽新建的元素无 Uid
              tag: event.target.getAttribute('data-block-tag'),
              label: event.target.getAttribute('data-block-label')
            };
            window.localStorage.setItem('drag-info', JSON.stringify(info));
            // event.dataTransfer.setData('drag-info', JSON.stringify(info));
          };

          target.ondrag = function(event) {
            // TODO
          };

          target.ondragend = function(event) {
            // TODO
          };
        });
      }
    },

    computed: {
      ...mapGetters('cube', ['packages']),
    },

    mounted() {
      this.bindDragEvent();
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
