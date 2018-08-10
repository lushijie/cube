/*
* @Author: lushijie
* @Date:   2017-05-26 19:36:52
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-10 14:23:48
*/
const path = require('path');
const helper = require('lushijie-utils');
const fs = require('fs-extra');

const PRO_PATH = path.join(__dirname, '..', '..');
const runTimeFilePath = path.join(PRO_PATH, 'client/runtime.json');
const runtime = JSON.parse(fs.readFileSync(runTimeFilePath, {encoding: 'utf8'}) || '{}');

module.exports = function({chunk}) {
  const env = runtime[chunk];
  const temp = {
    CHUNK: chunk,
    ENV: env
  }
  const CONFIG = {
    common: {
      DEFINE: {
        INJECT: {
          APPNAME: '360 技术管理后台',
          ...temp
        }
      },
      PRO_PATH: PRO_PATH,
      ...temp,
    },

    development: {
      DEFINE: {
        INJECT: {
          DOMAIN: 'http://test.code.360.cn:8360'
        }
      }
    },

    production: {
      devtool: '',
      DEFINE: {
        INJECT: {
          DOMAIN: 'http://code.360.cn',
        }
      }
    }
  }

  return helper.extend({}, CONFIG.common, CONFIG[env]);
}
