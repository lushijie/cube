const _ = require('./modules/common');

const chunkName = INJECT.CHUNK;
module.exports = _.extend({}, _, require(`./modules/${chunkName}`));
