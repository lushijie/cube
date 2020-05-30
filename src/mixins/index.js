import Vue from 'vue';
import Tree from 'utils/tree.js';

Vue.mixin({
  data() {
    return {
      treeInst: new Tree(),
    };
  },
  computed: {
    currentRouteData() {
      const current = this.$router.history.current;
      const data = { ...current };
      data.matched = data.matched.map(item => {
        return {
          name: item.name,
          path: item.path,
          regex: item.regex
        };
      });
      return data;
    }
  }
});
