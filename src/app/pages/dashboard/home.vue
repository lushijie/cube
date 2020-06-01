<template>
  <div class="whole-container">
    <!-- 顶部操作栏 -->
    <el-row>
      <el-col :span="6" style="float:right; text-align: right;">
        <Header :treeId="treeId" />
      </el-col>
    </el-row>

    <el-row>
      <!-- 组件列表 -->
      <el-col :span="3">
        <h4 class="col-title">组件列表</h4>
        <div class="grid-content cube-nav-grid">
          <Navbar />
        </div>
      </el-col>

      <!-- 组件操作 -->
      <el-col :span="5">
        <h4 class="col-title">组件操作</h4>
        <div class="grid-content cube-action-grid">
          <Actionbar :node="treeStruct" />
        </div>
      </el-col>

      <!-- 预览展示 -->
      <el-col :span="9">
        <h4 class="col-title">预览展示</h4>
        <div class="grid-content cube-preview-grid">
          <Preview />
        </div>
      </el-col>

      <!-- 属性编辑 -->
      <el-col :span="7">
        <h4 class="col-title">属性编辑</h4>
        <div class="grid-content cube-edit-grid">
          <Propbar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Utils from 'utils';
  import Store from 'store';
  import Navbar from './navbar.vue';
  import Header from './header.vue';
  import Actionbar from './actionbar.vue';
  import Propbar from './prop.vue';
  import Preview from '../preview/preview.vue';
  import { mapState, mapGetters } from 'vuex';

  export default {
    components: {
      Header,
      Navbar,
      Actionbar,
      Preview,
      Propbar,
    },

    data() {
      return {
        treeId: null,
        isSaving: false
      };
    },

    computed: {
      ...mapGetters(['tree', 'treeStruct']),
      ...mapState(['isTreeSaved'])
    },

    mounted() {
      this.treeId = this.currentRouteData.query.treeId; // 在 URL 中获取 tree id
      let tmpTree = this.treeInst.getCacheTree(this.treeId); // localStorage读取
      if (!tmpTree.treeId) { // 新建
        tmpTree = Utils.extend({}, this.tree);
        tmpTree.treeId = this.treeId;
        this.treeInst.setCacheTree(this.treeId);
      }

      // 等待组件加载完毕再触发
      global.ee.once('TreeLoadFinish', () => {
        Store.commit('updateTree', tmpTree);
      });

      // 监听struct change 事件
      this.$store.watch(this.$store.getters['detectStructChange'], (pre, after) => {
        if (!Utils.isDeepEqual(pre)) {
          this.$root.bus.$emit('structChange');
        }

        // 设置树的保存状态
        Store.commit('updateTreeSaved', Utils.isDeepEqual(tmpTree, this.tree));
      });

      // 首次主动触发
      this.$root.bus.$emit('structChange');
    }
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
