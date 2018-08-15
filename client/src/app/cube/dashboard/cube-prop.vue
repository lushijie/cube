<template>
  <div id="cube-prop">
    <ul>
      <li
        v-for="(value, key) in bindProps">
        {{ key }}: <el-input v-model="bindProps[key]" placeholder="请输入内容"></el-input>
      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  import Tree from 'utils/tree.js';
  const treeInst = new Tree();

  export default {
    data() {
      return {
        bindProps: treeInst.getSeletedNode().properties.props
      };
    },

    methods: {

    },

    computed: {
      selectedNode() {
        return this.treeInst.getSeletedNode();
      },

      selectedProps() {
        return Utils.extend({}, this.selectedNode.properties.props);
      },

      selectedUUID() {
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
          this.treeInst.matchUpdateNodeByUUID(this.selectedUUID, (node) => {
            node.properties.props = Utils.extend({}, newVal);
          });
        }
      }
    },

    mounted() {
    }
  }
</script>

<style scoped>
  #cube-prop ul {
    list-style: none;
  }
  div.el-input {
    display: inline-block;
    width: auto;
  }
</style>