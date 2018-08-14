<template>
  <div id="cube-list-container">
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

  export default {
    props: {
    },

    components: {
    },

    data() {
      return {
      }
    },

    methods: {
      createComponent(item) {
        const uuid = Utils.uuid;
        const children = Utils.extend([], this.tree.root.children);
        children.push({
          tag: item.tag,
          uuid: uuid,
          label: item.label,
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
        this.$store.commit('cube/updateTreeChildren', children);
        Utils.renderJSONToComponent(Utils.extend({}, this.tree.root));
      }
    },

    computed: {
      ...mapState('cube', ['packages', 'tree']),
    },

    mounted() {
    }
  };
</script>

<style scoped>
  #cube-list-container ul {
    list-style: none;
  }
  #cube-list-container li {
    margin-bottom: 20px;
  }
</style>
