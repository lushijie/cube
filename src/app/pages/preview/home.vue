<template>
  <div class="preview-page">
    <div id="cube-preview">
      <Preview />
    </div>
  </div>
</template>

<script>
  import Tree from 'app/common/tree.js';
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