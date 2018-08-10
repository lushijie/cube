<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        系列名称:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.series_name"
          @keyup.enter.native="getPageList"
          placeholder="请输入内容">
        </el-input>
      </label>
      <TableFilterVue />
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="series_name"
        label="名称">
      </el-table-column>

      <el-table-column
        prop="series_desc"
        label="描述">
      </el-table-column>

      <el-table-column
        prop="series_logo"
        label="logo"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.series_logo" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="series_status"
        label="状态">
        <template slot-scope="scope">
          <TableStatusVue :scope="scope"  :name="'status'"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="series_order"
        label="展示权重">
      </el-table-column>

      <el-table-column
        class-name="table-operate"
        label="操作">
        <template slot-scope="scope">
          <TableOperateVue :row="scope.row" :callback="getPageList" />
        </template>
      </el-table-column>
    </el-table>

    <TablePagerVue />
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
        crumbs: ['活动管理', '系列管理', '列表数据'],
        tableData: [],
        filter: {
          series_name: ''
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'series_status DESC';

        CommonModel.getItems('/bapi/series/list', params).then(res => {
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
