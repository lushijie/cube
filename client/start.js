/**
 * put runtime env to runtime.json
 */

const fs = require('fs-extra');
const path = require('path');
const argv = require('yargs').argv;
const cp = require('child_process');
const chalk = require('chalk');
const _ = require('./src/utils/modules/common');

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
  time: _.dateTimeFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
};
fs.writeFileSync(filePath, JSON.stringify(runtime, null, 2));

// clean last time output
fs.removeSync(path.join(constants.distOutputPath));

// listen output
const cmd = argv.mode === 'watch' ? 'webpack-dev-server' : 'webpack';
const arg = [`--config=${constants.webpackConfigPath}`, `--chunk=${currentChunk}`];
const runner = cp.spawn(cmd, arg, {stdio: 'inherit'});
runner.stdout && runner.stdout.on('data', (data) => {
  console.log(data.toString());
});
runner.stderr && runner.stderr.on('data', (data) => {
  console.log(chalk.red(data.toString()));
});
