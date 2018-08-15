<template>
  <div id="cube-prop">
    <ul v-if="selectedNode && selectedNode.properties && selectedNode.properties.props">
      <li
        v-for="(value, key) in selectedNode.properties.props">
        {{key}} - {{value}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import TreeOperate from 'utils/tree.js';

  export default {
    data() {
      return {
        treeInst: new TreeOperate()
      }
    },

    computed: {
      ...mapState('cube', ['selectedNode']),
    },

    mounted() {
    }
  }
</script>

<style scoped>

</style>