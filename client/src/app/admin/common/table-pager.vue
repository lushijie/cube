<template>
  <div class="table-pager">
    <el-pagination
      v-if="_pagination['total'] > 1"
      background
      layout="prev, pager, next"
      @current-change="pageChange"
      v-bind="_pagination">
    </el-pagination>
  </div>
</template>

<script>
  import Utils from 'utils';
  export default {
    name: 'tablepagervue',
    props: {
      callback: Function
    },
    data() {
      return {};
    },
    computed: {
      _pagination() {
        return this.$parent.pagination
      }
    },
    methods: {
      pageChange(page) {
        this.$parent.pagination['current-page'] = page;
        if (Utils.isFunction(this.callback)) {
          this.callback('pageChange', page);
          return;
        }
        if (Utils.isFunction(this.$parent.getPageList)) {
          this.$parent.getPageList();
          return;
        }
        console.warn('pageChange 不存在相应的回调函数，不予执行');
      }
    }
  }
</script>

<style>
  .table-pager {
    margin-top: 20px;
    text-align: center;
  }
</style>
