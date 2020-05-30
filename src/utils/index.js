const Crypto = require('crypto');
const Querystring = require('querystring');
const DeepEqual = require('deep-equal');

const Utils = {
  isDeepEqual: DeepEqual,

  isNumber(obj) {
    return typeof obj === 'number' && isFinite(obj);
  },

  isUndefined(arg) {
    return arg === void 0;
  },

  isArray(arg) {
    if (Array.isArray) {
      return Array.isArray(arg);
    }
    return Object.prototype.toString.call(arg) === '[object Array]';
  },

  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },

  isFunction(arg) {
    return typeof arg === 'function';
  },

  isString(arg) {
    return Object.prototype.toString.call(arg) === '[object String]';
  },

  md5(str) {
    return Crypto.createHash('md5').update(str + '', 'utf8').digest('hex');
  },

  getPageID() {
    return window.location.pathname
      .split('?')[0]
      .replace(/^\//, '')
      .split('/')
      .join('-');
  },

  getRouterMeta(matched) {
    const toMatched = Array.prototype.slice.call(matched);
    let mergedMeta = {};
    toMatched.forEach(ele => {
      if (ele.meta) {
        mergedMeta = Utils.extend(mergedMeta, ele.meta);
      }
    });
    return mergedMeta;
  },

  queryURL(url, key) {
    url = url.replace(/^[^?=]*\?/gi, '').split('#')[0]; // 去除网址与hash信息
    const json = {};
    // 考虑到key中可能有特殊符号如“[].”等，而[]却有是否被编码的可能，所以，牺牲效率以求严谨，就算传了key参数，也是全部解析url。
    url.replace(/(^|&)([^&=]+)=([^&]*)/g, function(a, b, key, value) {
      // 对url这样不可信的内容进行decode，可能会抛异常，try一下；另外为了得到最合适的结果，这里要分别try
      try {
        key = decodeURIComponent(key);
      } catch (e) {}
      try {
        value = decodeURIComponent(value);
      } catch (e) {}

      if (!(key in json)) {
        json[key] = /\[\]$/.test(key) ? [value] : value; // 如果参数名以[]结尾，则当作数组
      } else if (json[key] instanceof Array) {
        json[key].push(value);
      } else {
        json[key] = [json[key], value];
      }
    });
    return key ? json[key] : json;
  },

  encodeURIJson(json) {
    const s = [];
    for (const p in json) {
      // 删除掉参数, $.param 则是返回空， 如：
      // let a = {a: undefined, b: 1, c: null} -> a=&b=1
      if (json[p] === null) {
        continue;
      }
      if (json[p] instanceof Array) {
        for (let i = 0; i < json[p].length; i++) {
          s.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p][i]));
        }
      } else {
        s.push(p + '=' + encodeURIComponent(json[p]));
      }
    }
    return s.join('&');
  },

  // 深拷贝
  extend(target = {}, ...args) {
    let i = 0;
    const length = args.length;
    let options, name, src, copy;
    if (!target) {
      target = Utils.isArray(args[0]) ? [] : {};
    }
    for (; i < length; i++) {
      options = args[i];
      if (!options) {
        continue;
      }
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (src && src === copy) {
          continue;
        }
        if (Utils.isArray(copy)) {
          target[name] = Utils.extend([], copy);
        } else if (Utils.isObject(copy)) {
          target[name] = Utils.extend(
            src && Utils.isObject(src) ? src : {},
            copy
          );
        } else {
          target[name] = copy;
        }
      }
    }
    return target;
  },

  /**
   * 返回解析赋值的结果
   getDestructResult(['houseId', 'item:item1'], this.state);
  */
  getDestructResult(properties, sourceObject) {
    const destObject = {};

    const aliasMap = {};
    properties = Array.isArray(properties) ? properties : [properties];

    // 建立别名映衬
    properties = properties.map(function(ele) {
      if (ele.indexOf(':') > -1) {
        aliasMap[ele.split(':')[0]] = ele.split(':')[1];
      }
      return ele.split(':')[0];
    });

    // 如果存在别名，新对象使用别名
    Object.keys(sourceObject).forEach(function(ele) {
      if (properties.indexOf(ele) > -1) {
        destObject[aliasMap[ele] || ele] = sourceObject[ele];
      }
    });
    return destObject;
  },

  /**
   * 把对象拼接成url参数
   * getQueryJoin({name: 'lushijie'})
   */
  getQueryJoin(queryObject) {
    return Querystring.stringify(queryObject);
  },

  /**
   * 获取trimed之后的数据 data可以为字符串、对象、数组或者嵌套形式
   * getTrimedResult({name: '  lushijie', address: [' shangdong' , ' jinan']})
   */
  getTrimedResult(data) {
    if (typeof data === 'string') {
      return data.trim();
    } else if (Object.prototype.toString.call(data) === '[object Object]') {
      Object.keys(data).forEach(key => {
        data[key] = this.getTrimedResult(data[key]);
      });
      return data;
    } else if (Object.prototype.toString.call(data) === '[object Array]') {
      return data.map(ele => {
        return this.getTrimedResult(ele);
      });
    } else {
      return data;
    }
  },

  // 重命名对象key
  renameKeys(object, changeMap, onlyGetMapItem) {
    if (!changeMap || typeof changeMap !== 'object') {
      return object;
    }

    if (Array.isArray(object)) {
      const newArray = [];
      for (let i = 0; i < object.length; i++) {
        newArray.push(Utils.renameKeys(object[i], changeMap));
      }
      return newArray;
    } else {
      if (typeof object !== 'object') {
        return object;
      }
      const newCopy = {};
      const copy = Utils.extend({}, object);

      for (const key in changeMap) {
        if (typeof changeMap[key] === 'object') {
          if (copy.hasOwnProperty(key)) {
            copy[key] = Utils.renameKeys(copy[key], changeMap[key]);
            newCopy[key] = Utils.renameKeys(copy[key], changeMap[key]);
            continue;
          }
        }

        if (copy.hasOwnProperty(key) && key !== changeMap[key]) {
          const temp = copy[key];

          copy[changeMap[key]] = temp;
          newCopy[changeMap[key]] = temp;
          delete copy[key];
        }
      }
      return !onlyGetMapItem ? copy : newCopy;
    }
  },

  /**
   * 获取 uuid
   */
  get uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  },

  /**
   * 安全加载
   */
  interop(require) {
    return require && require.__esModule ? require['default'] : require;
  }
};

module.exports = Utils;
