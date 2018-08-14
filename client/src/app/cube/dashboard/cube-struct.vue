<template>
  <div>
    <div ref="menu.uuid" :data-id="menu.uuid">
      <el-button type="" style="margin-bottom: 10px;" @click="clickMenuItem(menu)">
        {{ menu.label }} - {{ menu.tag }}
        <i class="el-icon-close"></i>
      </el-button>
    </div>
    <template v-if="menu.children" v-for="smenu in menu.children">
      <MenuVue :menu="smenu" style="margin-left: 30px;"></MenuVue>
    </template>
  </div>
</template>

<script>
  import Utils from 'utils';
  import { mapState } from 'vuex';

  export default {
    name: 'MenuVue',

    props: {
      menu: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },

    components: {
    },

    data() {
      return {
      }
    },

    methods: {
      clickMenuItem(item) {
        Utils.travelTree(this.rootNode, (ele) => {
          ele.selected = item.uuid === ele.uuid;
        });

        // this.$store.commit();
      }
    },

    computed: {
      ...mapState('cube', ['tree']),
      rootNode() {
        return {...this.tree.root};
      }
    },

    mounted() {
    }
  };
</script>

<style scoped>
  /*TODO*/
</style>
