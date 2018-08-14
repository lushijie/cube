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
        <h4>已组件操作</h4>
        <div class="grid-content cube-tree-grid">
          <CubeStruct :menu="rootNode"></CubeStruct>
        </div>
      </el-col>

      <!-- 预览展示 -->
      <el-col :span="6">
        <h4>预览展示</h4>
        <div class="grid-content cube-tree-preview">
            <CubePreview></CubePreview>
        </div>
      </el-col>

      <!-- 属性编辑 -->
      <el-col :span="6">
        <h4>属性编辑</h4>
        <div class="grid-content cube-tree-prop">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import CubeList from './cube-list.vue';
  import CubeStruct from './cube-struct.vue';
  import CubePreview from './cube-preview.vue';

  export default {
    components: {
      CubeList,
      CubeStruct,
      CubePreview
    },

    data() {
      return {
      }
    },

    methods: {

    },

    computed: {
      ...mapState('cube', ['packages', 'tree']),
      rootNode() {
        return {...this.tree.root};
      }
    },

    mounted() {

    }
  };
</script>

<style scoped>
  .txt-center {
    /*text-align: center;*/
  }
</style>
