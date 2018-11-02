/*
* @Author: lushijie
* @Date:   2018-08-07 10:29:34
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-10 14:54:19
*/
const fs = require('fs-extra');
const path = require('path');
const argv = require('yargs').argv;

const filePath = './runtime.json';
fs.ensureFileSync(filePath);
const runtime = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}) || '{}');
runtime[argv.chunk] = argv.env;

fs.writeFileSync(filePath, JSON.stringify(runtime));
fs.removeSync(path.join(`./static/dist/${argv.chunk}`));
