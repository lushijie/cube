<template>
  <div>
    <div>{{ menu.label }} - {{ menu.tag }}</div>
    <template v-if="menu.children" v-for="smenu in menu.children">
      <ChildVue :menu="smenu" style="margin-left: 30px;"></ChildVue>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'ChildVue',
    props: {
      menu: Object
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
  /*TODO*/
</style>
