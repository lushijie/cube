<template>
  <div id="preview" class="grid-content cube-tree-preview">
  </div>
</template>

<script>
  import Vue from 'vue';
  import Utils from 'utils';
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        // TODO
      }
    },

    computed: {
      ...mapState('cube', ['node']),
    },

    watch: {

    },

    methods: {
      renderJSONToComponent(domJSON, outerContainerId = 'preview', innerContainerId = 'preview-inner') {
        if (!document.getElementById(outerContainerId)) {
          throw new Error('外部容器不存在');
        }

        // for second+ time render
        if (!document.getElementById(innerContainerId)) {
          document.getElementById(outerContainerId).outerHTML = `<div id="${outerContainerId}"><div id="${innerContainerId}"></div></div>`;
        };

        function createComponent(node, h) {
          const tag = node.tag;
          const properties = node.properties || {};
          const children = node.children || [];
          return h(tag, properties, children.map(ele => {
            return createComponent(ele, h);
          }));
        }

        const RootComponent = Vue.component('root-component', {
          render: function(h) {
            return createComponent(domJSON, h);
          },
        });

        new RootComponent().$mount(`#${innerContainerId}`);
      },
    },

    mounted() {
      this.$store.watch(this.$store.getters['cube/treeChange'], () => {
        console.log('vuex change ...');
        this.renderJSONToComponent(Utils.extend({}, this.node.tree));
      });

      console.log(Utils.extend({}, this.node.tree));

      this.renderJSONToComponent(Utils.extend({}, this.node.tree));
    }
  }
</script>

<style scoped>

</style>