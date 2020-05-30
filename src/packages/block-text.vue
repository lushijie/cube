<template>
  <div>
    <span>{{ text }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      text: String,
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
