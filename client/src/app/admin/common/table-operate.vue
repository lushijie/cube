<template>
  <span>
    <el-button
      v-if="func.indexOf('edit') > -1 && oldStatus != -1"
      @click="handleEditRow"
      type="primary"
      plain>
      编辑
    </el-button>

    <el-button
      v-if="func.indexOf('online') > -1 && oldStatus == 0"
      @click="handleChangeStatus"
      type="primary"
      plain>
      上线
    </el-button>

    <el-button
      v-if="func.indexOf('offline') > -1 && oldStatus == 1"
      @click="handleChangeStatus"
      type="warning"
      plain>
      下线
    </el-button>

    <el-button
      v-if="func.indexOf('delete') > -1 && (oldStatus == 0 || oldStatus == 1)"
      @click="handleChangeDelete"
      type="danger"
      plain>
      删除
    </el-button>

    <el-button
      v-if="func.indexOf('restore') > -1 && oldStatus == -1"
      @click="handleChangeDelete"
      type="primary"
      plain>
      恢复
    </el-button>
  </span>
</template>

<script>
  import NormalConstants from 'admin/constants/admin-normal.js';
  import CommonModel from 'admin/common/model.js';
  const ModuleNameMap = NormalConstants.moduleMap;

  export default {
    name: 'tableoperatevue',

    props: {
      row: [Object, String, Number],
      func: {
        type: Array,
        default: function() {
          return ['edit', 'online', 'offline', 'delete']; // restore
        }
      },
      callback: Function
    },

    data() {
      return {
        module: ''
      };
    },

    computed: {
      oldStatus() {
        return +this.row[`${this.module}_status`];
      }
    },

    methods: {
      // 编辑
      handleEditRow() {
        this.$router.push({
          name: `${this.module}_add`,
          query: {
            id: this.row.id
          }
        });
      },

      // 上线与下线
      handleChangeStatus() {
        const newStatus = +!this.oldStatus;
        this.$confirm(`确认${newStatus ? '上线' : '下线'}该${ModuleNameMap[this.module]}?`, '提示', {
          type: 'warning'
        }).then(() => {
          CommonModel.statusItem(`/bapi/${this.module}/status`, {
            id: this.row.id,
            status: newStatus
          }).then(res => {
            this.$message.success(`操作成功`);
            this.row[`${this.module}_status`] = newStatus;
          });
        }).catch(() => {
          this.$message.info('取消操作');
        });
      },

      // 删除与恢复
      handleChangeDelete() {
        const isRestore = (this.oldStatus === -1);
        this.$confirm(`确认${isRestore ? '恢复' : '删除'}该${ModuleNameMap[this.module]}`, '提示', {
          type: 'warning'
        }).then(() => {
          CommonModel.statusItem(`/bapi/${this.module}/deleted`, {
            id: this.row.id,
            deleted: isRestore ? 0 : 1
          }).then(res => {
            this.$message.success(`操作成功`);
            this.callback();
            this.row[`${this.module}_status`] = isRestore ? 0 : -1;
          });
        }).catch(() => {
          this.$message.info('取消操作');
        });
      }
    },
    mounted() {
      this.module = this.routeMeta.module
    }
  }
</script>

<style scoped>

</style>
