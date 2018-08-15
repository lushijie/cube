<template>
  <div>
    r: {{ r }}
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      r: String,
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
