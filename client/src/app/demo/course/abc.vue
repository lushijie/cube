<template>
  <div>
    {{ c }}
  </div>
</template>

<script>
  export default {
    props: {
      a: String,
      b: String,
      c: {
        type: String,
        default: 'ccc'
      }
    },
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
    },

    computed: {
    },

    mounted() {
    }
  };
</script>
<style scoped>
</style>
