<template>
  <div>
    d: {{ d }}
  </div>
</template>

<script>
  export default {
    props: {
      d: String,
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
      console.info('d123456');
    }
  };
</script>

<style scoped>
  .block-d {
    color: red;
  }
</style>
