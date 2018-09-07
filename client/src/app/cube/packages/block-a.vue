<template>
  <div>
    <span class="click-btn" @click="clickTest"> a: {{ a }} </span>
    <slot name="header"></slot>
    <!-- <slot name="footer"></slot> -->
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
      };
    },

    methods: {
      clickTest() {
        console.info(this.a);
      }
    },

    computed: {
    },

    mounted() {
      // console.info('a123456');
    }
  };
</script>

<style scoped>
  .click-btn {
    cursor: pointer;
  }
</style>
