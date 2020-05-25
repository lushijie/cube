<template>
  <div class="preview-page">
    <div id="cube-preview">
      <CubePreview></CubePreview>
    </div>
  </div>
</template>

<script>
  import Preview from 'app/pages/dashboard/preview.vue';
  import Tree from 'app/common/tree.js';
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