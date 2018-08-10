<template>
  <span>
    <span v-if="name == 'status'">
      <el-tag v-if="scope.row[module + '_status'] == 1" type="success">在线上</el-tag>
      <el-tag v-if="scope.row[module + '_status'] == 0" type="info">已下线</el-tag>
      <el-tag v-if="scope.row[module + '_status'] == -1" type="info">已删除</el-tag>
    </span>
  </span>
</template>

<script>
  export default {
    props: {
      scope: [Array, Object],
      name: String,
    },
    data() {
      return {
        module: ''
      };
    },
    mounted() {
      this.module = this.routeMeta.module
    }
  }
</script>
