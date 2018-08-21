<template>
  <div>
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
      }
    },

    methods: {
      handleTreeChange() {
        console.log('treeChange...');
        this.$root.bus.$emit('treeChange');
      }
    },

    computed: {
      ...mapState('cube', ['node']),
      tree() {
        return Utils.extend({}, this.node.tree);
      }
    },

    mounted() {
      this.$store.watch(this.$store.getters['cube/treeChange'], () => {
        this.handleTreeChange();
      });
      this.handleTreeChange();
    }
  };
</script>

<style scoped>
  .el-col {
    padding: 6px;
  }
</style>
