<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        中文名称:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.platform_name"
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
        prop="platform_name"
        label="中文名称">
      </el-table-column>

      <el-table-column
        prop="platform_alias"
        label="别名">
      </el-table-column>

      <el-table-column
        prop="platform_desc"
        label="描述">
      </el-table-column>

      <el-table-column
        prop="platform_logo"
        label="logo"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.platform_logo" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="platform_homepage"
        label="首页"
        width="140">
        <template slot-scope="scope">
          <a :href="scope.row.platform_homepage" target="_blank">{{ scope.row.platform_homepage }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="platform_status"
        label="状态">
        <template slot-scope="scope">
          <TableStatusVue :scope="scope"  :name="'status'"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="platform_order"
        label="站点位置">
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
        crumbs: ['公司产品', '平台工具', '列表数据'],
        tableData: [],
        filter: {
          platform_name: '',
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'platform_status DESC, platform_order DESC';

        CommonModel.getItems('/bapi/platform/list', params).then(res => {
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
