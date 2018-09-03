<template>
  <div>
    <!-- 全局操作栏 -->
    <el-row>
      <el-col :span="6" style="float:right; text-align: right;">
        <el-button
          :type="isTreeSaved ? 'success' : 'danger'"
          @click="cacheTree"
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
  import { mapState } from 'vuex';
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
        saveLoading: false
      };
    },

    methods: {
      handleTreeChange() {
        console.debug('treeChange...');
        this.$root.bus.$emit('treeChange');
      },

      cacheTree() {
        this.saveLoading = true;
        setTimeout(() => {
          this.treeInst.cacheTree();
          this.$root.bus.$emit('treeChange');
          this.saveLoading = false;
        }, 300);
      }
    },

    computed: {
      ...mapState('cube', ['isTreeSaved', 'tree']),
      struct() {
        return Utils.extend({}, this.tree.struct);
      }
    },

    mounted() {
      // 在 URL 中获取 tree id
      const treeId = this.currentRouteData.query.id;
      const cacheId = this.treeInst.getCacheId(treeId);
      const storedTree = JSON.parse(window.localStorage.getItem(cacheId));

      if (storedTree) {
        // 如果 localStorage（或者数据库中）存在则为编辑状态，需要从存储中读取
        Store.commit('cube/updateTree', storedTree);
      } else {
        // 如果不存在已经保存的，需要新建并保存
        const initTree = Utils.extend({}, this.tree);
        initTree.id = treeId;
        Store.commit('cube/updateTree', initTree);
        this.treeInst.cacheTree();
      }

      this.$store.watch(this.$store.getters['cube/treeChange'], (pre, after) => {
        if (!Utils.isDeepEqual(pre, after)) {
          this.handleTreeChange();
        }

        Store.commit('cube/updateTreeSaved', Utils.isDeepEqual(storedTree, this.tree));
      });

      this.handleTreeChange();
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
