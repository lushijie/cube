<template>
  <div id="cube-list">
    <ul>
      <li v-for="item in packages">
        <el-button type="primary" @click.prevent="createComponent(item)">{{item.label}}</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  import { mapState } from 'vuex';
  import TreeOperate from 'utils/tree.js';

  export default {
    props: {
    },

    components: {
    },

    data() {
      return {
        treeInst: new TreeOperate()
      }
    },

    methods: {
      createComponent(item) {
        const uuid = Utils.uuid;

        this.treeInst.addNode('123456', {
          tag: item.tag,
          uuid: uuid,
          label: item.label,
          selected: true,
          properties: {
            props: {
              a: 'aaa',
              b: 'bbb',
              c: 'ccc',
            },
            attrs: {
              id: uuid
            }
          },
          ref: uuid
        });
      }
    },

    computed: {
      ...mapState('cube', ['packages', 'node']),
    },

    mounted() {
    }
  };
</script>

<style scoped>
  #cube-list ul {
    list-style: none;
  }
  #cube-list li {
    margin-bottom: 20px;
  }
</style>
