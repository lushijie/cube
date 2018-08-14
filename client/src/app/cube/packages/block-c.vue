<template>
  <div>
    <slot name="header"></slot>
    <slot name="content">
      c: {{ c }}
    </slot>
    <slot name="footer"></slot>
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
