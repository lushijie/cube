<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        组织者名称:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.organizer_name"
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
        prop="organizer_name"
        label="组织者名称">
      </el-table-column>

      <el-table-column
        prop="organizer_alias"
        label="组织者别名">
      </el-table-column>

      <el-table-column
        prop="organizer_logo"
        label="组织者logo"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.organizer_logo" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="organizer_desc"
        label="组织者简介">
      </el-table-column>

      <el-table-column
        prop="organizer_homepage"
        label="组织者主页"
        width="180">
        <template slot-scope="scope">
          <a :href="scope.row.organizer_homepage" target="_blank">{{ scope.row.organizer_homepage }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="organizer_status"
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
        crumbs: ['活动管理', '组织者管理', '列表数据'],
        tableData: [],
        filter: {
          organizer_name: ''
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'organizer_status DESC';

        CommonModel.getItems('/bapi/organizer/list', params).then(res => {
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
