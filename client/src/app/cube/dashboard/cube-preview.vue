<template>
  <div id="cube-preview" class="grid-content cube-tree-preview">
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },

    methods: {

    },

    computed: {
    },

    watch: {

    },

    mounted() {
      this.$root.$data.bus.$on('structChange', () => {
        this.treeInst.renderTree(); // treeInst mixin
      });
    }
  };
</script>

<style>
  /* 动态注入的结构，此处要使用使用全局样式 */
  .cube-selected {
    padding: 3px;
    border: 1px dashed #f00;
  }

  .build .cube-selected {
    padding: 0;
    border: none;
  }
</style>
<style scoped>

</style>