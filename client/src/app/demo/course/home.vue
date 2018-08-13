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
