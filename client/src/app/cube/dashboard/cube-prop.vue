<template>
  <div id="cube-prop">
    <ul>
      <li
        v-for="(value, key) in selectedProps">
        {{ key }}: <el-input v-model="selectedProps[key]" placeholder="请输入内容"></el-input>
      </li>
    </ul>
  </div>
</template>

<script>
  // import Utils from 'utils';

  export default {
    data() {
      return {
        // selectedNode: null,
        // selectedUUID: null,
        // selectedProps: null
      };
    },

    methods: {

    },

    computed: {
      selectedNode() {
        return this.treeInst.getSeletedNode();
      },

      selectedProps() {
        return this.selectedNode.properties.props;
      },

      selectedUUID() {
        return this.selectedNode.uuid;
      }
    },

    watch: {
      // selectedProps: {
      //   deep: true,
      //   handler(newVal, oldVal) {
      //     console.log('attrs change ...');
      //     // this.treeInst.matchUpdateNodeByUUID(this.selectedUUID, (node) => {
      //     //   node.properties.props = Utils.extend({}, newVal);
      //     // });
      //   }
      // }
    },

    mounted() {
      // this.$root.$data.bus.$on('treeChange', () => {
      //   this.selectedNode = this.treeInst.getSeletedNode();
      //   this.selectedProps = this.selectedNode.properties.props;
      //   this.selectedUUID = this.selectedNode.uuid;
      // });
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