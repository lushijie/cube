/**
 * put runtime env to runtime.json
 */

const fs = require('fs-extra');
const path = require('path');
const argv = require('yargs').argv;
const cp = require('child_process');
const chalk = require('chalk');
const helper = require('@lushijie/utils');

const defaultChunk = process.env.npm_package_config_defaultChunk;
const currentChunk = argv.chunk || defaultChunk;

// constants
const constants = {
  runtimePath: './runtime.json',
  distOutputPath: `./static/dist/${currentChunk}`,
  webpackConfigPath: './webpack/webpack.config.js',
  modeEnvMap: {
    watch: 'development',
    debug: 'development',
    pub: 'production',
  }
};

// wirter runtime
const filePath = constants.runtimePath;
fs.ensureFileSync(filePath);
const runtime = JSON.parse(fs.readFileSync(filePath, {
  encoding: 'utf8'
}) || '{}');
runtime[currentChunk] = {
  mode: argv.mode,
  env: constants.modeEnvMap[argv.mode],
  time: helper.dateTimeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
};
fs.writeFileSync(filePath, JSON.stringify(runtime, null, 2));

// clean last time output
fs.removeSync(path.join(constants.distOutputPath));

// listen output
const cmd = argv.mode === 'watch' ? 'webpack-dev-server' : 'webpack';
const arg = [`--config=${constants.webpackConfigPath}`, `--chunk=${currentChunk}`, '--progress'];
const runner = cp.spawn(cmd, arg, {stdio: 'inherit'});
runner.on('close', code => {
  console.log('child exists with code: ' + code);
});
