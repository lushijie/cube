<template>
  <div>
    <slot name="header" />
    <span class="click-btn" @click="handleClick"> 事件测试，点击我 </span>
    <slot name="footer" />
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        alert('container 组件事件测试');
      }
    },

    mounted() {
      console.info('container 组件加载完毕');
    }
  };
</script>

<style scoped>
  .click-btn {
    cursor: pointer;
    padding: 3px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
</style>
