<template>
  <div>
    <!-- 全局操作栏 -->
    <el-row>
      <el-col :span="6" style="float:right; text-align: right;">
        <el-button
          :type="isTreeSaved ? 'success' : 'danger'"
          @click="saveCacheTree"
          :loading="saveLoading">
          {{ isTreeSaved ? '已保存' : '点击保存' }}
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <!-- 组件列表 -->
      <el-col :span="6">
        <h4>组件列表</h4>
        <div class="grid-content cube-list-grid">
          <CubeList></CubeList>
        </div>
      </el-col>

      <!-- 组件操作 -->
      <el-col :span="6">
        <h4>组件操作</h4>
        <div class="grid-content cube-tree-grid">
          <CubeStruct :menu="struct"></CubeStruct>
        </div>
      </el-col>

      <!-- 预览展示 -->
      <el-col :span="6">
        <h4>预览展示</h4>
        <div class="grid-content cube-preview-grid">
          <CubePreview></CubePreview>
        </div>
      </el-col>

      <!-- 属性编辑 -->
      <el-col :span="6">
        <h4>属性编辑</h4>
        <div class="grid-content cube-prop-grid">
          <CubeProp></CubeProp>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Utils from 'utils';
  import Store from 'store';
  import { mapState, mapGetters } from 'vuex';
  import CubeList from './cube-list.vue';
  import CubeStruct from './cube-struct.vue';
  import CubePreview from './cube-preview.vue';
  import CubeProp from './cube-prop.vue';

  export default {
    components: {
      CubeList,
      CubeStruct,
      CubePreview,
      CubeProp
    },

    data() {
      return {
        treeId: null,
        saveLoading: false
      };
    },

    methods: {
      // tree struct 变化处理事件
      handleTreeStructChange() {
        console.debug('structChange...');
        this.$root.bus.$emit('structChange');
      },

      saveCacheTree() {
        this.saveLoading = true;
        setTimeout(() => {
          this.treeInst.setCacheTree(this.treeId);
          this.$root.bus.$emit('structChange');
          this.saveLoading = false;
        }, 300);
      }
    },

    computed: {
      ...mapGetters('cube', ['tree', 'struct']),
      ...mapState('cube', ['isTreeSaved'])
    },

    mounted() {
      this.treeId = this.currentRouteData.query.id; // 在 URL 中获取 tree id
      let tmpTree = this.treeInst.getCacheTree(this.treeId); // localStorage读取

      if (!tmpTree.id) { // 新建
        tmpTree = Utils.extend({}, this.tree);
        tmpTree.id = this.treeId;
        this.treeInst.setCacheTree(this.treeId);
      }
      Store.commit('cube/updateTree', tmpTree);

      // 监听struct change 事件
      this.$store.watch(this.$store.getters['cube/structChange'], (pre, after) => {
        if (!Utils.isDeepEqual(pre, after)) {
          this.handleTreeStructChange();
        }

        // 设置树的保存状态
        Store.commit('cube/updateTreeSaved', Utils.isDeepEqual(tmpTree, this.tree));
      });

      // 首次主动触发
      this.handleTreeStructChange();
    }
  };
</script>

<style scoped>
  .el-col {
    padding: 6px;
  }
  .cube-tree-grid {
    max-height: 95vh;
    overflow: auto
  }
</style>
