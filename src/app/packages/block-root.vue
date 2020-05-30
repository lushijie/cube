<template>
  <div :style="{ backgroundColor, fontSize: ( font || {}).fontSize || '14px'}">
    <slot></slot>
    <div style="text-align: right; font-size: 12px; color: #ccc">copyright @ lushijie</div>
  </div>
</template>

<script>
  export default {
    props: {
      backgroundColor: {
        type: String,
        default: '#eee'
      },
      // 支持分组属性设定
      font: {
        fontSize: Number
      }
    },



    mounted() {
      console.log('根组件加载成功');
    }
  };
</script>

<style scoped>
  .block-root {
    color: red;
  }
</style>
