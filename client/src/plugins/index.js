import Utils from 'utils';

const chunkName = INJECT.CHUNK;
Utils.interop(require('./modules/common'));
Utils.interop(require(`./modules/${chunkName}`));
