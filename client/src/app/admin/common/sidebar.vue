<template>
  <div class="siderbar">
    <div @click="toggleAside" class="aside-toggle">
      <el-icon class="el-icon-d-arrow-left" v-show="!asideConfig.isCollapsed"></el-icon>
      <el-icon class="el-icon-d-arrow-right" v-show="asideConfig.isCollapsed"></el-icon>
    </div>

    <el-menu
      :default-active="asideConfig.active"
      :default-openeds="asideConfig.openeds.slice()"
      class="menu-list"
      @open="handleOpen"
      @close="handleClose"
      :collapse="asideConfig.isCollapsed"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b"
      >
      <template v-for="(menu, i) in menuData">
        <admin-recursive-menu :key="i" :menu="menu" prefix="/admin"></admin-recursive-menu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import AdminRecursiveMenu from 'admin/common/recursive-menu.vue';
  import menuData from 'admin/constants/admin-sidebar.js';

  export default {
    name: 'AdminSidebar',
    components: {
      AdminRecursiveMenu
    },
    props: {
    },
    data() {
      return {
        isCollapsed: false,
        menuData
      };
    },
    computed: {
      ...mapState('admin', ['asideConfig']),
    },
    methods: {
      ...mapMutations('admin', ['toggleAside']),

      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
  };
</script>
<style>
  .el-menu-item i,
  .el-submenu__title i {
    color: #fff;
  }
</style>

<style scoped>
  .siderbar {
    padding-top: 40px;
  }
  .siderbar .menu-list {
    border-right: 0;
  }
  .siderbar .aside-toggle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    top: 0px;
    right: 15px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
</style>
