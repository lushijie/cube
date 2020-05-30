<template>
  <div class="header">
    <el-button
      :type="isTreeSaved ? 'success' : 'danger'"
      @click="saveCacheTree"
      :loading="isSaving">
      {{ isTreeSaved ? '已保存' : '点击保存' }}
    </el-button>

    <el-button
      type="danger"
      @click="removeCacheTree">
      清除缓存
    </el-button>
  </div>
</template>

<script>
  import Utils from 'utils';
  import Store from 'store';
  import { mapState, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        treeId: null,
        isSaving: false
      };
    },

    methods: {
      saveCacheTree() {
        this.isSaving = true;
        setTimeout(() => {
          this.treeInst.setCacheTree(this.treeId);
          this.$root.bus.$emit('structChange');
          this.isSaving = false;
        }, 300);
      },

      removeCacheTree() {
        this.treeInst.removeCacheTree(this.treeId);
        this.$notify({
          title: '成功',
          message: '缓存删除成功',
          type: 'success',
          duration: 1000
        });
      }
    },

    computed: {
      ...mapGetters(['tree', 'struct']),
      ...mapState(['isTreeSaved'])
    },
  };
</script>

<style scoped>
  .whole-container {
    min-width: 900px;
    padding-bottom: 30px;
  }
  .el-col {
    padding: 6px 15px;
  }
  .col-title {
    font-weight: 700;
    font-size: 16px;
  }
  .cube-action-grid {
    max-height: 90vh;
    overflow: auto
  }
</style>
