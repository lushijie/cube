/*
* @Author: lushijie
* @Date:   2017-05-26 19:36:52
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-13 11:21:53
*/
const path = require('path');
const helper = require('lushijie-utils');
const fs = require('fs-extra');

const PRO_PATH = path.join(__dirname, '..', '..');
const runTimePath = path.join(PRO_PATH, 'client/runtime.json');
const runtime = JSON.parse(fs.readFileSync(runTimePath, {encoding: 'utf8'}) || '{}');

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
          APPNAME: '示例管理系统',
          ...temp
        }
      },
      PRO_PATH: PRO_PATH,
      ...temp,
    },

    development: {
      DEFINE: {
        INJECT: {
          DOMAIN: 'http://test.abc.com'
        }
      }
    },

    production: {
      devtool: '',
      DEFINE: {
        INJECT: {
          DOMAIN: 'http://abc.com',
        }
      }
    }
  }

  return helper.extend({}, CONFIG.common, CONFIG[env]);
}
