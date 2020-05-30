<template>
  <div class="cube-prop">
    <PropItem :attrs="bindProps"/>
  </div>
</template>

<script>
  import Utils from 'utils';
  import PropItem from './prop-item.vue';

  export default {
    data() {
      return {
        bindProps: {}
      };
    },

    components: {
      PropItem
    },

    computed: {
      selectedNode() { // is been watched
        return this.treeInst.getSeletedNode();
      },
    },

    watch: {
      selectedNode: {
        deep: true,
        handler(newVal, oldVal) {
          if (newVal.uuid !== oldVal.uuid) {
            this.bindProps = this.selectedNode.properties.props;
          }
        }
      },

      bindProps: {
        deep: true,
        handler(newVal, oldVal) {
          this.treeInst.matchUpdateNodeByUid(this.selectedNode.uuid, (node) => {
            node.properties.props = Utils.extend({}, newVal);
          });
        }
      }
    },
  };
</script>

<style scoped>

</style>