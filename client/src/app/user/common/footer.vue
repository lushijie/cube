<template>
  <div class="app-footer">
    <div class="copyright">
      <div class="content">
        <p>北京奇虎科技有限公司版权所有 © 1997-{{ yearNow }}  360.CN All Rights Reserved. 京ICP证080047号</p>
        <p>京公网安备 11000002000006号</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {
    },
    data() {
      return {
        yearNow: new Date().getFullYear()
      }
    }
  }
</script>

<style scoped>
  .copyright {
    display: table;
    width: 100%;
    padding: 15px 0;
    font-size: 14px;
    color: #A5A7AD;
    letter-spacing: 0;
    text-align: center;
    line-height: 30px;
    background: #232937;
  }
  .copyright .content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
</style>
