<template>
  <div>
    <div id="preview"></div>
    <el-button type="primary" @click.prevent="createCom">动态生成</el-button>
  </div>
</template>

<script>
  import Utils from 'utils';

  const domJSON = {
    tag: 'div',
    children: [
      {
        tag: 'block-a',
        properties: {
          props: {
            a: 'this is a'
          }
        },
        children: [
          {
            tag: 'block-a',
            properties: {
              props: {
                a: 'this is a slot header'
              },
              slot: 'header'
            }
          },
          {
            tag: 'block-b',
            properties: {
              props: {
                b: 'this is a slot footer'
              },
              slot: 'footer'
            }
          }
        ]
      }
    ]
  };

  export default {
    components: {
    },

    data() {
      return {
      }
    },

    methods: {
      createCom(name) {
        Utils.renderJSONToComponent(domJSON);
      }
    },

    computed: {
    },

    mounted() {
    }
  };
</script>

<style scoped>
  /*TODO*/
</style>
