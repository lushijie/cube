<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        网站名称:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.website_name"
          @keyup.enter.native="getPageList"
          placeholder="请输入内容">
        </el-input>
      </label>

      <label>
        网站地址:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.website_url"
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
        prop="website_name"
        label="站点名称">
      </el-table-column>

      <el-table-column
        prop="website_url"
        label="站点地址">
        <template slot-scope="scope">
          <a :href="scope.row.website_url" target="_blank">{{ scope.row.website_url }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="website_status"
        label="状态">
        <template slot-scope="scope">
          <TableStatusVue :scope="scope"  :name="'status'"/>
        </template>
      </el-table-column>

      <el-table-column
        prop="website_order"
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
        crumbs: ['公司产品', '热门网站', '列表数据'],
        tableData: [],
        filter: {
          website_name: ''
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'website_status DESC, website_order DESC';

        CommonModel.getItems('/bapi/website/list', params).then(res => {
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

</style>
