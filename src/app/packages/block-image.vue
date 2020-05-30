<template>
  <div>
    <img :src="imgURL" alt="图片">
  </div>
</template>

<script>
  export default {
    props: {
      url: String,
    },

    computed: {
      imgURL: function() {
        return this.url || 'https://p0.meituan.net/travelcube/a6d651dfde0437d2e13449b82ffbaf129203.png'
      }
    },

    mounted() {
      console.info('image 组件加载完毕');
    }
  };
</script>

<style scoped>

</style>
