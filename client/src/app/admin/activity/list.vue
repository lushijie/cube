<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>

    <div class="tool-filter">
      <label>
        活动名称:
        <el-input
          class="el-input el-input-normal"
          v-model="filter.activity_name"
          @keyup.enter.native="getPageList"
          placeholder="请输入内容">
        </el-input>
      </label>
      <TableFilterVue />
    </div>

    <el-table
      :data="tableData"
      :cell-style="{'text-align': 'center'}"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="活动地址">
        <template slot-scope="scope">
          <a :href="INJECT.DOMAIN + '/activity/detail?id=' + scope.row.id" target="_blank">{{ INJECT.DOMAIN }}/activity/detail?id={{ scope.row.id }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="activity_name"
        label="活动名称">
      </el-table-column>

      <el-table-column
        prop="activity_place"
        label="活动描述">
      </el-table-column>

      <el-table-column
        prop="activity_place"
        label="活动地点">
      </el-table-column>

      <el-table-column
        prop="activity_banner"
        label="logo"
        width="140">
        <template slot-scope="scope">
          <img :src="scope.row.activity_banner" class="img-logo">
        </template>
      </el-table-column>

      <el-table-column
        prop="activity_stime"
        label="开始时间">
      </el-table-column>

      <el-table-column
        prop="activity_etime"
        label="结束时间">
      </el-table-column>

      <el-table-column
        prop="activity_price"
        label="活动价格">
      </el-table-column>

      <el-table-column
        prop="activity_views"
        label="观看人数">
      </el-table-column>

      <el-table-column
        prop="activity_status"
        label="状态">
        <template slot-scope="scope">
          <TableStatusVue :scope="scope" :name="'status'"/>
        </template>
      </el-table-column>

      <!-- 关联关系操作 -->
      <el-table-column
        class-name="table-operate"
        label="关联">
        <template slot-scope="scope">
          <div v-for="rname in relationName">
            <el-popover
              placement="right"
              :width="rname.options.width || 600"
              @show="viewRelationData(rname.name, scope.row)"
              trigger="hover">

              <!-- 新建关联 -->
              <el-button
                v-if="rname.options.operate != -1"
                type="primary"
                plain
                @click="addRelationMember(rname.name, scope.row)">
                新建{{ rname.zhName }}
              </el-button>

              <!-- 关联列表 -->
              <el-table :data="relationData[scope.row.id][rname.name]">
                <el-table-column
                  v-for="rship in relationShip[rname.name]"
                  :key="rship.property"
                  :property="rship.property"
                  :label="rship.label">
                </el-table-column>
                <el-table-column label="操作" width="160" v-if="rname.options.operate != -1">
                  <template slot-scope="scope2">
                    <el-button
                      type="primary"
                      @click="editRelationMember(rname.name, scope.row, scope2.row)">
                      编辑
                    </el-button>

                    <el-button
                      type="danger"
                      @click="deleteRelationMember(rname.name, scope.row, scope2.row)">
                      删除
                   </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-button slot="reference" type="primary" plain>{{ rname.zhName }}</el-button>
            </el-popover>
          </div>

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
  import Vue from 'vue';
  import Utils from 'utils';
  import CommonModel from 'admin/common/model.js';
  import NormalConstants from 'admin/constants/admin-normal.js';
  const ModuleNameMap = NormalConstants.moduleMap;

  export default {
    components: {
    },

    data() {
      return {
        crumbs: ['活动管理', '列表数据'],
        tableData: [],
        filter: {
          activity_name: ''
        },

        relationName: [{
          name: 'lecturer',
          zhName: '演讲者',
          options: {}
        }, {
          name: 'sponsor',
          zhName: '赞助者',
          options: {}
        }, {
          name: 'organizer',
          zhName: '组织者',
          options: {
            width: 400
          }
        }, {
          name: 'activity_user',
          zhName: '报名者',
          options: {
            width: 400,
            operate: -1
          }
        }],

        // 关联数据字段
        relationShip: {
          // 演讲者
          lecturer: [{
            property: 'lecturer_name',
            label: '演讲者'
          }, {
            property: 'lecturer_topic',
            label: '主题'
          }, {
            property: 'lecturer_stime',
            label: '开始时间'
          }, {
            property: 'lecturer_etime',
            label: '结束时间'
          }, {
            property: 'lecturer_place',
            label: '地点'
          }],

          // 赞助者
          sponsor: [{
            property: 'sponsor_name',
            label: '赞助者'
          }, {
            property: 'sponsor_amount',
            label: '金额'
          }, {
            property: 'sponsor_widget',
            label: '赞助事项'
          }, {
            property: 'sponsor_order',
            label: '展示权重'
          }],

          // 组织者
          organizer: [{
            property: 'organizer_name',
            label: '组织者'
          }, {
            property: 'organizer_order',
            label: '展示权重'
          }],

          // 报名者
          activity_user: [{
            property: 'username',
            label: '用户名'
          }, {
            property: 'phone',
            label: '手机号'
          }, {
            property: 'email',
            label: '邮箱'
          }]
        },

        // 关联数据模型
        relationData: {}
      }
    },
    methods: {
      // 获取页面数据
      getPageList(evt, params = {}) {
        params = Utils.extend({}, this.filter, params);
        params.page = this.pagination['current-page'];
        params.pageSize = this.pagination['page-size'];
        params.order = 'activity_status DESC';

        CommonModel.getItems('/bapi/activity/list?relation=1', params).then(res => {
          this.tableData = res.data.data;
          this.pagination = this.$getPagination(res.data);

          this.relationData = {};
          this.tableData.forEach(ele => {
            // 按照活动来划分
            Vue.set(this.relationData, ele.id, {
              lecturer: ele.lecturer,
              sponsor: ele.sponsor,
              organizer: ele.organizer,
              activity_user: ele.activity_user
            });
          });
        });
      },

      // 编辑管理关系
      editRelationMember(type, row1, row2) {
        this.$router.push({
          name: `activity_${type}_add`,
          query: {
            activity_id: row1.id,
            id: row2.rid,
            [`${type}_id`]: row2[`${type}_id`]
          }
        });
      },

      // 删除关联关系
      deleteRelationMember(type, row1, row2) {
        this.$confirm(`确认删除该${ModuleNameMap[type]}?`, '提示', {
          type: 'warning'
        }).then(() => {
          CommonModel.unlinkItem(`/bapi/activity_${type}/unlink`, {id: row2.rid}).then(res => {
            this.$message.success('删除成功');
            this.relationData[row1.id][type] = this.relationData[row1.id][type].filter(ele => ele.rid !== row2.rid);
          });
        }).catch(() => {
          this.$message.info('取消操作');
        });
      },

      // 添加关联演讲者、赞助者、组织者
      addRelationMember(type, row) {
        this.$router.push({
          name: `activity_${type}_add`,
          query: {
            activity_id: row.id
          }
        });
      },

      // 查看相关演讲者、赞助者、组织者
      async viewRelationData(type, row) {
        // const result = await CommonModel.getItems(`/bapi/activity_${type}/list`);
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
