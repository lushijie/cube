<template>
  <div id="cube-list">
    <ul>
      <li
        class="block-component-item"
        draggable="true"
        v-for="item in aviablePackages"
        :key="item.tag"
        :data-block-tag="item.tag"
        :data-block-label="item.label"
        :data-block-props="JSON.stringify(item.props || '{}')">
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
              uuid: null, // 拖拽新建的元素无 uuid
              tag: event.target.getAttribute('data-block-tag'),
              label: event.target.getAttribute('data-block-label'),
              props: event.target.getAttribute('data-block-props'),
            };
            window.localStorage.setItem('cube-drag-element', JSON.stringify(info));
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
      ...mapGetters(['aviablePackages']),
    },

    mounted() {
      this.bindDragEvent();

      console.log(this.aviablePackages);
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
