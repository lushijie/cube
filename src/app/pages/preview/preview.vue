<template>
  <div id="cube-preview" class="grid-content cube-tree-preview" />
</template>

<script>
  export default {
    mounted() {
      this.$root.$data.bus.$on('structChange', () => {
        this.treeInst.renderTree();
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

  .preview-page .cube-selected {
    padding: 0;
    border: none;
  }
</style>

<style scoped>

</style>