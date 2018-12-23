/*
* @Author: lushijie
* @Date:   2017-05-26 19:36:52
* @Last Modified by:   lushijie
* @Last Modified time: 2018-08-13 19:42:50
*/
const path = require('path');
const helper = require('@lushijie/utils');
const fs = require('fs-extra');

const stringifyDefineOptions = function(options) {
  function stringifyString(obj) {
    obj = obj || {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const tmp = obj[key];
      if (typeof tmp === 'string') {
        obj[key] = JSON.stringify(tmp);
      } else if (Object.prototype.toString.call(tmp) === '[object Object]') {
        stringifyString(tmp);
      }
    }
    return obj;
  }
  return stringifyString(options);
};

module.exports = function(chunk) {
  const PRO_ROOT_PATH = path.join(__dirname, '..', '..');
  const runTimePath = path.join(PRO_ROOT_PATH, 'client/runtime.json');
  const runtime = JSON.parse(fs.readFileSync(runTimePath, { encoding: 'utf8' }) || '{}');

  const env = runtime[chunk].env;
  const temp = {
    CHUNK: chunk, // 运行模块
    ENV: env, // 运行环境
    PRO_ROOT_PATH, // 项目更目录
    MODE: runtime[chunk].mode, // 运行命令模式
    SOURCE_MAP: true,
  };
  const CONFIG = {
    common: {
      DEFINE: {
        INJECT: { // 注入系统的变量
          APPNAME: '示例管理系统',
          ...temp
        }
      },
      ...temp,
    },

    development: {
      DEFINE: {
        INJECT: { // 注入系统的变量与 common 中进行merge操作
          DOMAIN: 'http://test.abc.com'
        }
      }
    },

    production: {
      devtool: '',
      DEFINE: {
        INJECT: { // 注入系统的变量与 common 中进行merge操作
          DOMAIN: 'http://abc.com',
        }
      }
    }
  };

  const res = helper.extend({}, CONFIG.common, CONFIG[env]);
  res.DEFINE = stringifyDefineOptions(res.DEFINE);
  return res;
};
