<template>
  <div>
    <span>r: {{ r }}</span>
    <br>
    <span>rrr: {{ rr.rrr }}</span>
    <div style="margin-left: 15px;">
      <slot></slot>
    </div>
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
