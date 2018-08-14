<template>
  <div>
    <el-row>
      <!-- 组件列表 -->
      <el-col :span="6">
        <h4 class="txt-center">组件列表</h4>
        <div class="grid-content cube-selector">
          <ul>
            <li v-for="item in packages">
              <el-button type="primary" @click.prevent="createComponent(item)">{{item.label}}</el-button>
            </li>
          </ul>
        </div>
      </el-col>

      <!-- 组件操作 -->
      <el-col :span="6">
        <h4 class="txt-center">已组件操作</h4>
        <div class="grid-content"></div>
      </el-col>

      <!-- 预览展示 -->
      <el-col :span="6">
        <h4 class="txt-center">预览展示</h4>
        <div id="preview" class="grid-content"></div>
      </el-col>

      <!-- 属性编辑 -->
      <el-col :span="6">
        <h4 class="txt-center">属性编辑</h4>
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    // mapGetters,
    // mapActions,
    mapState,
    // mapMutations
  } from 'vuex';
  import Utils from 'utils';

  export default {
    components: {
    },

    data() {
      return {
      }
    },

    methods: {
      createComponent(item) {
        const uuid = Utils.uuid;
        const children = Utils.extend([], this.tree.root.children);
        children.push({
          tag: item.tag,
          uuid: uuid,
          label: item.label,
          properties: {
            props: {

            },
            attrs: {
              id: uuid
            }
          },
          ref: uuid
        });
        this.$store.commit('cube/updateTreeChildren', children);
        Utils.renderJSONToComponent(Utils.extend({}, this.tree.root));
      }
    },

    computed: {
      ...mapState('cube', ['packages', 'tree']),
    },

    mounted() {
    }
  };
</script>

<style scoped>
  .cube-selector ul {
    list-style: none;
  }
  .cube-selector li {
    margin-bottom: 20px;
  }
  .txt-center {
    text-align: center;
  }
</style>
