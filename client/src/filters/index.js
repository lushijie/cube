/*
* @Author: lushijie
* @Date:   2017-06-01 18:34:50
* @Last Modified by:   lushijie
* @Last Modified time: 2018-01-22 14:30:39
*/
import Vue from 'vue';
import filters from './filters';

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
