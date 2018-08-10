<template>
  <span>
    <el-button type="primary" icon="fa fa-search" @click="filterSearch">搜索</el-button>
    <el-button type="primary" icon="fa fa-refresh" @click="cleanSearch">清空</el-button>
  </span>
</template>

<script>
  import Utils from 'utils';

  export default {
    name: 'tablefiltervue',
    props: {
      callback: Function
    },
    methods: {
      filterSearch() {
        this.$parent.pagination['current-page'] = 1;
        if (Utils.isFunction(this.callback)) {
          this.callback('filterSearch');
          return;
        }
        if (Utils.isFunction(this.$parent.getPageList)) {
          this.$parent.getPageList();
          return;
        }
        console.warn('filterSearch 不存在相应的回调函数，不予执行');
      },

      cleanSearch() {
        this.$parent.pagination['current-page'] = 1;
        this.$parent.filter = this.$parent.$options.data().filter;
        if (Utils.isFunction(this.callback)) {
          this.callback('cleanSearch');
          return;
        }
        if (Utils.isFunction(this.$parent.getPageList)) {
          this.$parent.getPageList();
          return;
        }
        console.warn('cleanSearch 不存在相应的回调函数，不予执行');
      }
    }
  }
</script>

<style scoped>

</style>
