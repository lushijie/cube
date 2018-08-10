<template>
  <div>
    <CrumbVue :crumbs="crumbs"/>
    BannerList
  </div>
</template>

<script>
  export default {
    components: {
    },

    data() {
      return {
        crumbs: ['轮播图管理', '列表数据'],
      }
    },
    methods: {

    },
    mounted() {
    }
  };
</script>
<style scoped>
  .img-logo {
    width: 120px;
  }
</style>
