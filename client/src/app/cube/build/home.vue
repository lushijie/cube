<template>
  <div class="build">
    <CubePreview></CubePreview>
  </div>
</template>

<script>
  import CubePreview from 'cube/dashboard/cube-preview.vue';
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
      const tmpTree = this.treeInst.getCacheTree(treeId); // localStorage读取
      this.treeInst.renderTree(tmpTree.struct);
    }
  };
</script>

<style scoped>

</style>