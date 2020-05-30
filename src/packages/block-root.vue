<template>
  <div :style="{ backgroundColor, fontSize: ( font || {}).fontSize || '14px'}">
    <slot></slot>
    <div style="text-align: right; color: #ccc">copyright @ lushijie</div>
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
      console.log('root 组件加载完毕');
    }
  };
</script>

<style scoped>
  .block-root {
    color: red;
  }
</style>
