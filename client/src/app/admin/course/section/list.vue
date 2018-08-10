<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        专栏名称:
        <el-input class="el-input el-input-normal" v-model="filter.column_name" placeholder="请输入内容"></el-input>
      </label>

      <TableFilterVue />
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="column_name"
        label="名称">
      </el-table-column>

      <el-table-column
        prop="column_cover"
        label="logo"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.column_cover" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="column_desc"
        label="描述">
      </el-table-column>

      <el-table-column
        prop="column_status"
        label="状态">
        <template slot-scope="scope">
          <TableStatusVue :scope="scope"  :name="'status'"/>
        </template>
      </el-table-column>

      <el-table-column
        class-name="table-operate"
        label="操作">
        <template slot-scope="scope">
          <TableOperateVue :row="scope.row" :callback="getPageList" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top: 20px; text-align: center;"
      background
      layout="prev, pager, next"
      @current-change="$pageChange"
      v-bind="pagination"
      >
    </el-pagination>
  </div>
</template>

<script>
  import Utils from 'utils';
  import CommonModel from 'admin/common/model.js';

  export default {
    components: {
    },

    data() {
      return {
        crumbs: ['课程管理', '专栏管理', '列表数据'],
        tableData: [],
        filter: {
          column_name: '',
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];

        CommonModel.getItems('/bapi/column/list', params).then(res => {
          this.tableData = res.data.data;
          this.pagination = this.$getPagination(res.data);
        });
      }
    },
    mounted() {
      this.getPageList();
    }
  };
</script>
<style scoped>
  .img-logo {
    width: 120px;
  }
</style>
