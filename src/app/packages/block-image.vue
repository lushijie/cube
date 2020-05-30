<template>
  <div>
    <img :src="imgURL" alt="图片">
  </div>
</template>

<script>
  export default {
    props: {
      imgURL: String,
    },

    mounted() {
      console.info('image 组件加载完毕');
    }
  };
</script>

<style scoped>

</style>
