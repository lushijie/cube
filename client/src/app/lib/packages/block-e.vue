<template>
  <div>
    e: {{ e }}
  </div>
</template>

<script>
  export default {
    props: {
      e: String,
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
      console.info('e123456');
    }
  };
</script>

<style scoped>
  .block-e {
    color: red;
  }
</style>
