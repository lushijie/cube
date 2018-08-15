/*
* @Author: lushijie
* @Date:   2018-01-23 11:03:34
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-15 14:49:59
*/
// import VueRequest from 'request';

export default {
  methods: {
    // $VueRequest: VueRequest,
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
        }
      })
      return data;
    }
  }
};
