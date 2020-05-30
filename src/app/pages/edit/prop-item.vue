<template>
  <div class="cube-prop-item">
    <ul>
      <li v-for="(value, key) in attrs" :key="key">
        <span v-if="typeof attrs[key] === 'string'">
          {{ key }}: <el-input v-model="attrs[key]" placeholder="请输入内容"></el-input>
        </span>

        <!-- TODO: 嵌套属性 -->
        <span v-if="typeof attrs[key] === 'object'">
          <template>
            <div style="margin-left: 12px;">
              <p style="margin: 5px 0 0;">{{ key }}包含的属性</p>
              <PropItem :attrs="attrs[key]" /> <!-- 嵌套调用组件自身-->
            </div>
          </template>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PropItem',

    props: {
      attrs: Object
    },
  };
</script>

<style scoped>
  .cube-prop-item .el-input {
    display: inline-block;
    width: auto;
  }
</style>