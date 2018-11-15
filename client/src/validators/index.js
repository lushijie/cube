import Utils from 'utils';

const chunkName = INJECT.CHUNK;
const validators = Utils.extend({}, Utils.interop(require('./modules/common')), Utils.interop(require(`./modules/${chunkName}`)));
export default validators;
