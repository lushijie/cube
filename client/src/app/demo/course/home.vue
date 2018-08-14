<template>
  <div>
    课程页面
    <el-button type="primary" @click.prevent="increment">increment</el-button>
    <el-button type="primary" @click.prevent="addCount">addCount</el-button>

    <abc ref="abc123" v-bind="abc123"></abc>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
  import abc from './abc.vue';

  export default {
    components: {
      abc
    },
    data() {
      return {
        abc123: {
          a: '233',
          b: '777',
          c: '999'
        }
      }
    },
    methods: {
      ...mapMutations('demo', ['addCount']),
      ...mapActions('demo', ['increment']),
    },

    computed: {
      ...mapGetters('demo', ['metaData']),
      ...mapState('demo', ['routeMeta']),
    },

    mounted() {
      console.log(this.metaData, this.routeMeta);
    }
  };
</script>
<style scoped>
</style>
