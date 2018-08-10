<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        赞助商名称:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.sponsor_name"
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
        prop="sponsor_name"
        label="赞助商名称">
      </el-table-column>

      <el-table-column
        prop="sponsor_alias"
        label="赞助商别名">
      </el-table-column>

      <el-table-column
        prop="sponsor_logo"
        label="赞助商logo"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.sponsor_logo" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="sponsor_desc"
        label="赞助商简介">
      </el-table-column>

      <el-table-column
        prop="sponsor_homepage"
        label="赞助商主页"
        width="180">
        <template slot-scope="scope">
          <a :href="scope.row.sponsor_homepage" target="_blank">{{ scope.row.sponsor_homepage }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="sponsor_status"
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
        crumbs: ['活动管理', '赞助商管理', '列表数据'],
        tableData: [],
        filter: {
          sponsor_name: ''
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'sponsor_status DESC';

        CommonModel.getItems('/bapi/sponsor/list', params).then(res => {
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
