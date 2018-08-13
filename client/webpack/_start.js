/*
* @Author: lushijie
* @Date:   2018-06-14 10:46:16
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-13 16:51:48
*/
const argv = require('yargs').argv;
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const exec = require('child_process').exec;

function reportResult(err, stats) {
  if (err || stats.hasErrors()) {
    console.log(chalk.red(err, stats));
  } else {
    console.log(chalk.green(stats));
  }
}

const MODE = argv.mode;
const CHUNK = argv.chunk;
if (!CHUNK || !MODE) {
  return console.log(chalk.red('=== 运行参数缺失不予执行 === \n'));
}
console.log(chalk.green(`\n=== < 模块: ${CHUNK}, 模式: ${MODE} 启动编译> ===`));
const webpackenv = require('./webpack.env.js')({mode: MODE, chunk: CHUNK});
const webpackdll = require('./webpack.dll.js')(webpackenv);

(function(){
  const PRO_PATH = webpackenv.PRO_PATH;
  const bundle = path.join(PRO_PATH, `/server/www/static/bundle_${CHUNK}`);
  const vendor = path.join(PRO_PATH, `/server/www/static/vendor_${CHUNK}`);
  const manifest = path.join(PRO_PATH, `/client/webpack/manifest/${CHUNK}.*`);
  const view = path.join(PRO_PATH, `/server/view/${CHUNK}.html`);
  exec(`rm -rf ${bundle} && rm -rf ${vendor} && rm -rf ${manifest} && rm -rf ${view}`);
})();

webpack(Object.assign({}, webpackdll), (err, stats) => {
  const costTime = stats.endTime - stats.startTime;
  console.log(chalk.green(`\n====  < webpack dll 耗时 > ${costTime}ms ==== `));
  if (err || stats.hasErrors()) {
    console.log(chalk.red(err, stats));
  } else {
    console.log(chalk.green(stats));

    const webpackconfig = require('./webpack.config.js')(webpackenv);
    if (webpackenv.ENV === 'development') {
      webpack(Object.assign({}, webpackconfig, {
        watch: true,
        profile: true,
      })).watch(20, function(err, stats) {
        const costTime = stats.endTime - stats.startTime;
        console.log(chalk.green(`\n====  < webpack dev 耗时 > ${costTime}ms ==== `));
        reportResult(err, stats);
      });
    }

    if (webpackenv.ENV === 'production') {
      webpack(Object.assign({}, webpackconfig), (err, stats) => {
        const costTime = stats.endTime - stats.startTime;
        console.log(chalk.green(`\n====  < webpack pub 耗时 > ${costTime}ms ==== `));
        reportResult(err, stats);
      });
    }
  }
});
