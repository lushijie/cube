<template>
  <div id="cube-list">
    <ul>
      <li
        class="block-component-item"
        draggable="true"
        :key="item.tag"
        v-for="item in aviablePackages"
        :data-block-description="JSON.stringify(item || '{}')">
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
    methods: {
      // 组件注册拖拽事件
      bindDragEvent() {
        // 拖拽元素
        document.querySelectorAll('.block-component-item').forEach(function(target, index) {
          // 移除组件的拖拽事件, 防止重复绑定
          target.ondragstart = null;
          target.ondrag = null;
          target.ondragend = null;

          target.ondragstart = function(event) {
            const description = event.target.getAttribute('data-block-description');
            window.localStorage.setItem('cube-drag-element', description);
          };

          target.ondrag = function(event) {
            // TODO
          };

          target.ondragend = function(event) {
            window.localStorage.removeItem('cube-drag-element');
          };
        });
      }
    },

    computed: {
      ...mapGetters(['aviablePackages']),
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
