<template>
  <div>
    <ChildVue :menu="tree.root"></ChildVue>
  </div>
</template>

<script>
  import Utils from 'utils';
  import ChildVue from './child.vue';

  export default {
    components: {
      ChildVue
    },
    data() {
      return {
        tree: {
          id: 123456,
          root: {
            tag: 'div',
            uuid: Utils.uuid,
            label: '页面容器',
            root: true,
            children: [
              {
                tag: 'block-a',
                label: '组件a',
                properties: {
                  props: {
                    a: 'this is a'
                  }
                },
                children: [
                  {
                    tag: 'block-c',
                    label: '组件c',
                    properties: {
                      props: {
                        c: 'this is c'
                      }
                    },
                  }
                ]
              },

              {
                tag: 'block-b',
                label: '组件b',
                properties: {
                  props: {
                    b: 'this is b'
                  }
                }
              }
            ]
          }
        }
      };
    },
    methods: {

    },

    computed: {

    },

    mounted() {
      console.log(this.tree);
    }
  };
</script>

<style scoped>
  /*TODO*/
</style>
