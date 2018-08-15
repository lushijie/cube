<template>
  <div>
    <div ref="menu.uuid" :data-id="menu.uuid">
      <span
        class="menu-item"
        :class="{'menu-item-selected': menu.selected}"
        style="margin-bottom: 10px;"
        @click="selectNode(menu)">

        {{ menu.label }} - {{ menu.tag }}

        <i
          v-if="!menu.root"
          class="el-icon-close btn-delete"
          @click="deleteNode(menu)">
        </i>
      </span>
    </div>
    <template v-if="menu.children" v-for="smenu in menu.children">
      <MenuVue :menu="smenu" style="margin-left: 30px;"></MenuVue>
    </template>
  </div>
</template>

<script>
  import TreeOperate from 'utils/tree.js';

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
        treeInst: new TreeOperate()
      }
    },

    methods: {
      selectNode(item) {
        this.treeInst.selectNodeByUUID(item.uuid);
      },

      deleteNode(item) {
        this.treeInst.deleteNodeByUUID(item.uuid);
      }
    },

    computed: {
    },

    mounted() {
    }
  };
</script>

<style scoped>
  .btn-delete {
    padding: 3px;
  }

  .btn-delete:hover {
    color: #f56c6c;
  }

  .menu-item {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #409eff;
    color: #409eff;
    cursor: pointer;
  }
  .menu-item-selected {
    background-color: #409eff;
    color: #fff;
  }
</style>
