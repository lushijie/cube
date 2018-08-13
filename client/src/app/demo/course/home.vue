<template>
  <div>
    课程页面
    <button @click.prevent="addCount">addCount</button>
    <button @click.prevent="increment">increment</button>

    <el-button type="primary">123</el-button>
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
