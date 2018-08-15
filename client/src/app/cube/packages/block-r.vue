<template>
  <div>
    <p>r: {{ r }}</p>
    <p style="padding-left: 30px;">rrr: {{ rr.rrr }}</p>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      r: String,
      rr: {
        rrr: String
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
