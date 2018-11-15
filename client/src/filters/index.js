import Vue from 'vue';
import Utils from 'utils';

const chunkName = INJECT.CHUNK;
const filters = Utils.extend({}, Utils.interop(require('./modules/common')), Utils.interop(require(`./modules/${chunkName}`)));
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
