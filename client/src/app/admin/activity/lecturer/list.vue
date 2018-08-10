<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        姓名:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.lecturer_name"
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
        prop="lecturer_name"
        label="名称">
      </el-table-column>

      <el-table-column
        prop="lecturer_alias"
        label="网名">
      </el-table-column>

      <el-table-column
        prop="lecturer_avatar"
        label="头像"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.lecturer_avatar" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="lecturer_desc"
        label="个人简介">
      </el-table-column>

      <el-table-column
        prop="lecturer_company"
        label="公司">
      </el-table-column>

      <el-table-column
        prop="lecturer_title"
        label="职位">
      </el-table-column>

      <el-table-column
        prop="lecturer_phone"
        label="手机">
      </el-table-column>

      <el-table-column
        prop="lecturer_email"
        label="邮箱">
      </el-table-column>

      <el-table-column
        prop="lecturer_github"
        label="github"
        width="180">
        <template slot-scope="scope">
          <a :href="scope.row.lecturer_github" target="_blank">{{ scope.row.lecturer_github }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="lecturer_homepage"
        label="个人主页"
        width="180">
        <template slot-scope="scope">
          <a :href="scope.row.lecturer_homepage" target="_blank">{{ scope.row.lecturer_homepage }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="lecturer_status"
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
        crumbs: ['活动管理', '演讲者管理', '列表数据'],
        tableData: [],
        filter: {
          lecturer_name: ''
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'lecturer_status DESC';

        CommonModel.getItems('/bapi/lecturer/list', params).then(res => {
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
