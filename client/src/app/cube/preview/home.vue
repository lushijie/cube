<template>
  <div class="preview-page">
    <div id="cube-preview">
      <CubePreview></CubePreview>
    </div>
  </div>
</template>

<script>
  import CubePreview from 'cube/dashboard/cube-preview.vue';
  import Tree from 'utils/tree.js';
  export default {
    components: {
      CubePreview
    },

    data() {
      return {

      };
    },

    mounted() {
      const treeId = this.currentRouteData.query.id; // 在 URL 中获取 tree id
      const cacheTree = this.treeInst.getCacheTree(treeId); // localStorage读取
      const treeInst = new Tree(cacheTree);
      treeInst.renderTree();
    }
  };
</script>

<style scoped>

</style>