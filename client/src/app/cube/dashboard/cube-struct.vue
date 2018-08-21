<template>
  <div class="cube-struct" :data-uuid="menu.uuid">
    <span
      class="menu-item"
      :class="{'menu-item-selected': menu.selected}"
      @click="setSelectedNode(menu)">
      {{ menu.label }} - {{ menu.tag }}
      <i
        v-if="!menu.root"
        class="el-icon-close btn-delete"
        @click.stop="deleteNode(menu)">
      </i>
    </span>

    <!-- 卡槽占位, 默认情况处理 -->
    <ul class="slot-container" v-if="getPackageSlots(menu.tag) === true">
      <li
        class="slot-item"
        :data-uuid="menu.uuid"
        slot-name="default"
        slot-title="默认卡槽"
      >
        <template
          v-for="childMenu in menu.children"
          v-if="(childMenu.properties.slot === 'default') || (!childMenu.properties.slot)" >
          <MenuVue :menu="childMenu"></MenuVue>
        </template>
      </li>
    </ul>

    <!-- 具名卡槽 -->
    <ul class="slot-container" v-else="getPackageSlots(menu.tag)">
      <li
        class="slot-item"
        :data-uuid="menu.uuid"
        :slot-name="item.sname"
        :slot-title="item.slabel"
        v-for="item in getPackageSlots(menu.tag)">
        <template
          v-for="childMenu in menu.children"
          v-if="childMenu.properties.slot === item.sname">
          <MenuVue :menu="childMenu"></MenuVue>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
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
      setSelectedNode(item) {
        this.treeInst.setSelectedNodeByUUID(item.uuid);
      },

      deleteNode(item) {
        this.treeInst.deleteNodeByUUID(item.uuid);
      },

      // 获取配置文件的 slots 信息
      getPackageSlots(tag) {
        const descInfo = this.packages.filter(ele => {
          return ele.tag === tag;
        })[0] || [];
        if (!descInfo.config.slots) {
          descInfo.config.slots = false;
        }

        return descInfo.config.slots;
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
  .slot-container {
    margin: 0;
    list-style: none;
  }
  .slot-container .menu-item {
    margin-top: 10px;
  }

  .slot-item {
    padding: 10px;
    border: 1px solid #f00;
  }

  .slot-item.drag-enter {
    background-color: #ccc;
  }

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
    border: 1px solid #409eff;
    color: #409eff;
    cursor: pointer;
  }
  .menu-item-selected {
    background-color: #409eff;
    color: #fff;
  }
</style>
