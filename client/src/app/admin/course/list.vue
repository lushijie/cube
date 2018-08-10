<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        课程名称:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.course_title"
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
        prop="course_title"
        label="课程标题">
      </el-table-column>

      <el-table-column
        prop="course_cover"
        label="课程封面"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.course_cover" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="course_desc"
        label="课程描述">
      </el-table-column>

      <el-table-column
        prop="course_video_url"
        label="视频地址">
        <template slot-scope="scope">
          <a :href="scope.row.course_video_url" target="_blank">{{ scope.row.course_video_url }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="course_ppt_url"
        label="课件地址">
        <template slot-scope="scope">
          <a :href="scope.row.course_ppt_url" target="_blank">{{ scope.row.course_ppt_url }}</a>
        </template>
      </el-table-column>

      <!--
      <el-table-column
        prop="course_count"
        label="观看人数">
      </el-table-column>
      -->

      <el-table-column
        prop="course_level"
        label="课程级别">
        <template slot-scope="scope">
          {{ levelMap[scope.row.course_level] }}
        </template>
      </el-table-column>

      <el-table-column
        prop="category_id"
        label="分类">
        <template slot-scope="scope">
          {{ categorys[scope.row.category_id] }}
        </template>
      </el-table-column>

      <el-table-column
        prop="course_status"
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
        levelMap: {
          1: '初级',
          2: '中级',
          3: '高级'
        },
        crumbs: ['课程管理', '列表数据'],
        tableData: [],
        filter: {
          course_title: '',
        },
        categorys: {},
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'course_status DESC';

        CommonModel.getItems('/bapi/course/list', params).then(res => {
          this.tableData = res.data.data;
          this.pagination = this.$getPagination(res.data);
        });
      }
    },
    mounted() {
      CommonModel.getItems('/bapi/category/all').then(res => {
        res.data.forEach(ele => {
          this.categorys[ele.id] = ele.category_name;
        });
      });
      this.getPageList();
    }
  };
</script>
<style scoped>
  .img-logo {
    width: 120px;
  }
</style>
