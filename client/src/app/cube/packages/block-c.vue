<template>
  <div>
    c: {{ c }}
    <div style="margin-left: 15px;">
      <slot></slot>
    </div>
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
