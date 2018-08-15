<template>
  <div id="cube-preview" class="grid-content cube-tree-preview">
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },

    methods: {

    },

    computed: {
    },

    watch: {

    },

    mounted() {
      this.$root.$data.bus.$on('treeChange', () => {
        this.treeInst.renderTree();
      });
    }
  }
</script>

<style>
  /* 动态注入的结构，使用全局样式 */
  .cube-selected {
    padding: 5px;
    border: 1px solid #409eff;
  }
</style>
<style scoped>

</style>