<template>
  <div id="cube-prop">
    <PropItem :attrs="bindProps"/>
  </div>
</template>

<script>
  import Utils from 'utils';
  import PropItem from './prop-item.vue';
  import Tree from 'app/common/tree.js';
  const treeInst = new Tree();

  export default {
    data() {
      return {
        bindProps: treeInst.getSeletedNode().properties.props
      };
    },

    components: {
      PropItem
    },

    computed: {
      selectedNode() {
        return this.treeInst.getSeletedNode();
      },

      selectedProps() {
        return Utils.extend({}, this.selectedNode.properties.props);
      },

      selectedUid() {
        return this.selectedNode.uuid;
      }
    },

    watch: {
      selectedNode: {
        deep: true,
        handler(newVal, oldVal) {
          if (newVal.uuid !== oldVal.uuid) {
            this.bindProps = this.selectedProps;
          }
        }
      },

      bindProps: {
        deep: true,
        handler(newVal, oldVal) {
          this.treeInst.matchUpdateNodeByUid(this.selectedUid, (node) => {
            node.properties.props = Utils.extend({}, newVal);
          });
        }
      }
    },

    mounted() {
      console.log(this.selectedProps)
    }
  };
</script>

<style scoped>

</style>