<template>
  <div class="crumb-box">
    <el-breadcrumb :separator="separator">
      <el-breadcrumb-item v-for="item in newCrumbs" :key="item.text + Math.random()">
        <span v-if="!item.path">{{item.text}}</span>
        <router-link v-if="item.path" :to="{ path: item.path }">{{item.text}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  import Utils from 'utils';
  export default {
    name: 'CrumbBoxVue',
    components: {

    },
    props: {
      separator: {
        type: String,
        default: '>'
      },
      crumbs: {
        type: Array,
        default: function() {
          return [{text: INJECT.APPNAME, path: '/'}];
        }
      }
    },
    data() {
      return {
        currentPath: location.href
      };
    },
    methods: {
    },
    computed: {
      newCrumbs() {
        return this.crumbs.map((ele) => {
          let tmp = {};
          if (Utils.isString(ele)) {
            tmp.text = ele;
          } else {
            tmp = ele;
          }
          return tmp;
        });
      }
    }
  };
</script>

<style scoped>
  .crumb-box {
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 30px;
  }
</style>
