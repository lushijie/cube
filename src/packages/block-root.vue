<template>
  <div :style="{ backgroundColor }">
    <slot />
    <div class="copyright">copyright @ lushijie</div>
  </div>
</template>

<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: '#fff'
      },
    },

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
