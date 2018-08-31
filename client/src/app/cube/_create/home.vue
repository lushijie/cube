<template>
  <div>
    课程页面
    <el-button type="primary" @click.prevent="increment">increment</el-button>
    <el-button type="primary" @click.prevent="addCount">addCount</el-button>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';

  export default {
    components: {
    },
    data() {
      return {
        abc123: {
          a: '233',
          b: '777',
          c: '999'
        }
      };
    },
    methods: {
      ...mapMutations('cube', ['addCount']),
      ...mapActions('cube', ['increment']),
    },

    computed: {
      ...mapGetters('cube', ['metaData']),
      ...mapState('cube', ['routeMeta']),
    },

    mounted() {
      console.log(this.metaData, this.routeMeta);
    }
  };
</script>
<style scoped>
</style>
