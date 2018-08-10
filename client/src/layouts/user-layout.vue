<template>
  <div class="user-layout-body">
    <HeaderVue v-if="routeMeta.showHeader !== false"/>
    <!-- <slot></slot> -->
    <div class="user-layout-body-content">
      <router-view></router-view>
    </div>

    <FooterVue v-if="routeMeta.showFooter !== false"/>
  </div>
</template>

<script>
  import HeaderVue from 'user/common/header.vue';
  import FooterVue from 'user/common/footer.vue';

  export default {
    components: {
      HeaderVue,
      FooterVue
    },
    computed: {

    },
    mounted() {
    }
  }
</script>

<style scoped>
  .user-layout-body {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  .user-layout-body-content {
    flex: 1;
    flex-grow: 1;
  }
</style>
