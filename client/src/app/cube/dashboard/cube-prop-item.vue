<template>
  <div>
    <ul>
      <li v-for="(value, key) in attrs">
        <span v-if="!isObject(attrs[key])">
          {{ key }}: <el-input v-model="attrs[key]" placeholder="请输入内容"></el-input>
        </span>

        <span v-else>
          <template>
            <div style="margin-left: 12px;">
              <p style="margin: 5px 0 0;">{{ key }}包含的属性</p>
              <PropItemVue :attrs="attrs[key]"></PropItemVue>
            </div>
          </template>
        </span>

      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  export default {
    name: 'PropItemVue',

    props: {
      attrs: Object
    },

    methods: {
      isObject(obj) {
        return Utils.isObject(obj);
      }
    },

    mounted() {
    }
  };
</script>

<style scoped>
  #cube-prop ul {
    padding: 0;
    list-style: none;
  }
  div.el-input {
    display: inline-block;
    width: auto;
  }
</style>