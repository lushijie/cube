import Vue from 'vue';
import Utils from 'utils';
import VueResource from 'vue-resource';
import NormalConstants from 'admin/constants/admin-normal.js';

Vue.use(VueResource);
Vue.http.options.root = '/';

Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  next();
});

const VueRequest = function(url, options = {}, keyChangeMap) {
  if (!/^https?:\/\//.test(url)) {
    url = (INJECT.BAPI || INJECT.DOMAIN || '') + url;
  }

  const httpParams = [url];
  const defaultOptions = {
    method: 'GET',
    timeout: 5000,
    emulateHTTP: true,
    emulateJSON: true,
    trimed: false,
    errorTips: false,
    silent: false,
    credentials: true,
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'x-csrf-token': document.querySelector('meta[name="csrf"]').getAttribute('value')
    }
  };

  options = Utils.extend({}, defaultOptions, options);
  options.method = options.method.toUpperCase();

  let paramsData = options.data || {};
  // trimed
  if (options.trimed) {
    paramsData = Utils.getTrimedResult(paramsData);
  }

  // param key map
  if (Utils.isObject(keyChangeMap)) {
    paramsData = Utils.isObject(keyChangeMap) ? Utils.renameKeys(paramsData, keyChangeMap) : paramsData;
  }

  // params
  if (['POST', 'PUT', 'PATCH'].indexOf(options.method) > -1) {
    httpParams.push(paramsData);
  } else {
    options.params = paramsData;
    delete options.data;
  }
  httpParams.push(options);

  // Vue.http
  return Vue.http[options.method.toLowerCase()](...httpParams).then(res => {
    const resp = res.body;

    // 非管理员登陆
    if (resp && ((resp.errno === 401) || (resp.errno === 403))) {
      console.warn('非管理员权限登录', NormalConstants.loginURL);
      location.href = NormalConstants.loginURL;
      return;
    };

    // errorTips
    let errorTips = options.errorTips;
    if (errorTips) {
      errorTips = Utils.extend({
        success: 0,
        errno: 'errno',
        errmsg: 'errmsg'
      }, errorTips);

      if (resp[errorTips.errno] !== errorTips['success']) {
        if (errorTips.errcb) {
          errorTips.errcb(resp);
        } else {
          let errList = [errorTips.errmsg];
          if (errorTips.errmsg.indexOf('.') > -1) {
            errList = errorTips.errmsg.split('.');
          }
          let errmsg = resp;
          errList.forEach((ele) => {
            errmsg = errmsg[ele];
          });

          let lastErrMsg = '请求出错啦！';
          if (!options.silent) { // 非静默状态下弹窗提示
            if (Utils.isString(errmsg) && errmsg) {
              lastErrMsg = errmsg;
            }

            if (Utils.isObject(errmsg)) {
              lastErrMsg = errmsg[Object.keys(errmsg)[0]] || lastErrMsg;
            }

            new Vue().$alert(lastErrMsg, '错误', {confirmButtonText: '确定'});
          }

          return Promise.reject(resp);
        }
      }
    }

    return Promise.resolve(resp);
  }, err => {
    console.warn('请求出错：', err);
    return Promise.reject(err);
  });
};

module.exports = VueRequest;
