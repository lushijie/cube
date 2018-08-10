<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        域账户:
        <el-input class="el-input el-input-normal" v-model="filter.user_name" placeholder="请输入内容" @keyup.enter.native="getPageList"></el-input>
      </label>
      <TableFilterVue :callback="getPageList"/>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="域账户">
      </el-table-column>

      <el-table-column
        prop="user_nickname"
        label="姓名">
      </el-table-column>

      <el-table-column
        prop="user_email"
        label="邮箱">
      </el-table-column>

      <el-table-column
        prop="user_type"
        label="超管">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.user_type == 1" type="success">超管</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="user_status"
        width="80"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <TableStatusVue :scope="scope"  :name="'status'"/>
        </template>
      </el-table-column>

      <el-table-column
        class-name="table-operate"
        label="操作">
        <template slot-scope="scope">
          <TableOperateVue :row="scope.row" :callback="getPageList" :func="['online', 'offline']"/>
          <el-button
            v-if="scope.row.user_type == 1"
            @click="setAdmin(scope.row, 2)"
            type="primary"
            plain>
            取消超管
          </el-button>

          <el-button
            v-if="scope.row.user_type == 2"
            @click="setAdmin(scope.row, 1)"
            type="primary"
            plain>
            设置为超管
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <TablePagerVue />
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
        crumbs: ['用户管理', '列表数据'],
        tableData: [],
        filter: {
          user_name: ''
        }
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];

        CommonModel.getItems('/bapi/user/list', params).then(res => {
          this.tableData = res.data.data;
          this.pagination = this.$getPagination(res.data);
        });
      },

      setAdmin(row, new_type) {
        const params = {
          id: row.id,
          user_type: new_type
        };
        CommonModel.updateItem('/bapi/user/update', params).then(res => {
          this.$message.success('设置成功');
          this.getPageList();
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
