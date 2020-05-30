<template>
  <div>
    <span>{{ txt }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      txt: String,
    },

    mounted() {
      console.info('text 组件加载完毕');
    }
  };
</script>

<style scoped>
  .block-e {
    color: red;
  }
</style>
