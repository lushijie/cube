<template>
  <div>
    a: {{ a }}
    <slot name="header"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      a: String,
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
