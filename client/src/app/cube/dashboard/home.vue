<template>
  <div>
    <el-row>
      <el-col :span="6" style="float:right; text-align: right;">
        <el-button :type="isNodeSaved ? 'success' : 'warning'" @click="saveTree" :loading="saveLoading">
          {{ isNodeSaved ? '已保存' : '点击保存' }}
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
          <CubeStruct :menu="tree"></CubeStruct>
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

      saveTree() {
        this.saveLoading = true;
        setTimeout(() => {
          this.treeInst.saveTree();
          this.$root.bus.$emit('treeChange');
          this.saveLoading = false;
        }, 300);
      }
    },

    computed: {
      ...mapState('cube', ['isNodeSaved', 'node']),
      tree() {
        return Utils.extend({}, this.node.tree);
      }
    },

    mounted() {
      // 获取 tree id， 如果 localStorage（或者数据库中）存在则为编辑状态
      const treeId = this.currentRouteData.query.id;
      const storedTree = JSON.parse(window.localStorage.getItem(`${this.treeInst.getSaveId(treeId)}`));

      if (storedTree) {
        Store.commit('cube/updateNode', storedTree);
      } else {
        // 如果不存在已经保存的
        const initTree = Utils.extend({}, Store.state.cube.node);
        initTree.id = treeId;
        Store.commit('cube/updateNode', initTree);
        this.treeInst.saveTree();
      }

      this.$store.watch(this.$store.getters['cube/treeChange'], (pre, after) => {
        if (!Utils.isDeepEqual(pre, after)) {
          this.handleTreeChange();
        }

        Store.commit('cube/setNodeSaved', Utils.isDeepEqual(storedTree, Store.state.cube.node));
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
