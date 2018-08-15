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
  export default {
    data() {
      return {
      }
    },

    computed: {
      selectedNode() {
        return this.treeInst.getSeletedNode();
      }
    },

    mounted() {

    }
  }
</script>

<style scoped>

</style>