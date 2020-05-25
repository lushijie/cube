import Vue from 'vue';

const filters = {
  _addSuffix2(value, suffix) {
    return value + suffix;
  },
};

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
