import Vue from 'vue';
import Utils from 'utils';

const chunkName = INJECT.CHUNK;
Vue.mixin(Utils.extend({}, Utils.interop(require('./modules/common')), Utils.interop(require(`./modules/${chunkName}`))));
