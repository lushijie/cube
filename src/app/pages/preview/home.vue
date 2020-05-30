<template>
  <div class="preview-page">
    <div id="cube-preview"> <!-- 加此 id 是为了与直接使用 preview 组件保持一致 -->
      <Preview />
    </div>
  </div>
</template>

<script>
  import Tree from 'utils/tree.js';
  import Preview from './preview.vue';

  export default {
    components: {
      Preview
    },

    mounted() {
      const treeId = this.currentRouteData.query.id;
      const cacheTree = this.treeInst.getCacheTree(treeId);
      const treeInst = new Tree(cacheTree);
      treeInst.renderTree();
    }
  };
</script>

<style scoped>

</style>