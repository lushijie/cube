<template>
  <div class="app-layout">
    <div class="app-header">
      <admin-header></admin-header>
    </div>

    <div class="app-content">
      <div class="app-sidebar" :style="asideStyle">
        <admin-sidebar></admin-sidebar>
      </div>

      <div class="app-body">
        <!-- <slot></slot> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminHeader from 'admin/common/header.vue';
  import AdminSidebar from 'admin/common/sidebar.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'AdminLayout',
    components: {
      AdminHeader,
      AdminSidebar
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters('admin', ['asideStyle'])
    },
    methods: {
    },
    mounted() {
    }
  };
</script>

<style scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
  }
  .app-header {
    height: 70px;
    line-height: 70px;
    background-color: #fff;
  }

  .app-content {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .app-sidebar {
    position: relative;
    transition: width .5s linear;
    background-color: #545c64;
    overflow-y: auto;
  }
  .app-sidebar::-webkit-scrollbar {
    width: 0;
    display: none;
  }
  .app-body {
    padding: 25px;
    overflow: auto;
    flex: 1
  }
</style>
