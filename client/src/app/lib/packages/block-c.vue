<template>
  <div>
    c: {{ c }}
  </div>
</template>

<script>
  export default {
    props: {
      c: String,
    },
    components: {
    },
    data() {
      return {
      };
    },
    methods: {
    },

    computed: {
    },

    mounted() {
      console.info('c123456');
    }
  };
</script>

<style scoped>
  .block-c {
    color: red;
  }
</style>
