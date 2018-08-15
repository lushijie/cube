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

<style scoped>

</style>