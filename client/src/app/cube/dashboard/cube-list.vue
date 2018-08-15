<template>
  <div id="cube-list">
    <ul>
      <li v-if="item.config.visible" v-for="item in packages">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click.prevent="createComponent(item)">
          {{item.label}}
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  import Utils from 'utils';
  import { mapState } from 'vuex';

  export default {
    props: {
    },

    components: {
    },

    data() {
      return {
      }
    },

    methods: {
      createComponent(item) {
        const uuid = Utils.uuid;
        const fatherUUID = this.treeInst.getRandomUUID();
        const attr = item.tag.split('-')[1];

        this.treeInst.addNode(fatherUUID, {
          tag: item.tag,
          uuid: uuid,
          label: item.label,
          selected: true,
          properties: {
            props: {
              [attr]: `新建节点${attr}`
            },
            attrs: {
              id: uuid
            }
          },
          ref: uuid
        });
      }
    },

    computed: {
      ...mapState('cube', ['packages', 'node']),
    },

    mounted() {
    }
  };
</script>

<style scoped>
  #cube-list ul {
    list-style: none;
  }
  #cube-list li {
    margin-bottom: 20px;
  }
</style>
