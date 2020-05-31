<template>
  <div>
    <slot />
    <div class="copyright">copyright @ lushijie</div>
  </div>
</template>

<script>
  export default {
    mounted() {
      console.info('root 组件加载完毕');
    }
  };
</script>

<style scoped>
  .copyright {
    text-align: right;
    margin-top: 20px;
    color: #999;
  }
</style>
