<template>
  <!-- use <component> to require only one root -->
  <!-- you can use with permit -->
  <component
    :is="hasChild ? 'el-submenu' : 'el-menu-item'"
    :index="prefix + '/' + menu.path">
    <template v-if="!hasChild">
      <i :class="menu.icon"></i>
      <span slot="title">{{menu.text}}</span>
    </template>
    <template v-if="hasChild" slot="title">
      <i :class="menu.icon"></i>
      <span>{{menu.text}}</span>
    </template>
    <template v-if="hasChild" v-for="(smenu, i) in menu.children">
      <!-- recursive call -->
      <admin-recursive-menu
        :key="i"
        :prefix="prefix + '/' + menu.path"
        :menu="smenu"></admin-recursive-menu>
    </template>
  </component>
</template>
<script>
export default {
  name: 'AdminRecursiveMenu',
  props: {
    prefix: {
      type: String
    },
    menu: {
      type: Object
    }
  },
  computed: {
    hasChild() {
      return this.menu && this.menu.children &&
        this.menu.children.length > 0;
    }
  },
  data() {
    return {};
  }
}
</script>

<style scoped>

</style>
