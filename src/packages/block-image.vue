<template>
  <div>
    <img :src="imgURL" :alt="imgAlt">
  </div>
</template>

<script>
  export default {
    props: {
      imgURL: String,
      imgAlt: String
    },

    mounted() {
      console.info('image 组件加载完毕');
    }
  };
</script>

<style scoped>
  img {
    width: auto;
    max-width: 100%;
  }
</style>
