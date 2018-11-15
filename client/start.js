/*
* @Author: lushijie
* @Date:   2018-08-07 10:29:34
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-10 14:54:19
*/
const utils = require('@lushijie/utils');
const fs = require('fs-extra');
const path = require('path');
const argv = require('yargs').argv;

const defaultChunk = process.env.npm_package_config_defaultChunk;
const currentChunk = argv.chunk || defaultChunk;

const filePath = './runtime.json';
fs.ensureFileSync(filePath);
const runtime = JSON.parse(fs.readFileSync(filePath, {
  encoding: 'utf8'
}) || '{}');
runtime[currentChunk] = {
  env: argv.env,
  mode: argv.mode,
  time: utils.dateTimeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
};
fs.writeFileSync(filePath, JSON.stringify(runtime, null, 2));

// clean last time output
fs.removeSync(path.join(`./static/dist/${currentChunk}`));
