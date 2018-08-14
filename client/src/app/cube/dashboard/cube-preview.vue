<template>
  <div id="preview" class="grid-content cube-tree-preview">
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        // TODO
      }
    },

    computed: {
      ...mapState('cube', ['tree']),
    },

    watch: {

    },

    mounted() {
      console.log(this.$store.getters)
      this.$store.watch(this.$store.getters['cube/treeRoot'], () => {
        console.log('change');
      })
    }
  }
</script>

<style scoped>

</style>