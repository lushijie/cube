<template>
  <div class="app-header">
    <div class="row-1200-content">
      header
    </div>
  </div>
</template>

<script>
  import TechNavs from 'user/constants/tech-activity.js';
  export default {
    name: '',
    components: {
    },
    data() {
      return {
        techNavs: TechNavs,
        pathPrefix: '',
        activeIndex: '',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
    mounted() {
      console.log(this.techNavs);
    },
  };
</script>

<style scoped>
  .app-header {
    background-color: #333;
    height: 68px;
    font-weight: 500;
  }
  .app-header .logo {
    display: inline-block;
    width: 158px;
    margin-right: 256px;
    vertical-align: top;
    position: relative;
    top: 7px;
  }
  .app-header .el-menu-demo {
    background-color: transparent;
  }
  .app-header .app-link {
    float: left;
    padding: 0 20px;
    height: 66px;
    text-decoration: none;
    color: #bbb;
  }
  .app-header .activity-group .app-link {
    padding: 0 10px;
  }

  .app-header .app-link.router-link-active {
    background-color: #f5f5f5;
    color: #555;
    border-bottom: 2px solid #f5f5f5;
    font-weight: 700;
  }
  .sub-act-category {
    color: #fff;
  }
  .sub-act-category:hover {
    text-decoration: underline;
  }
</style>
