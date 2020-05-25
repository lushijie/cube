import validator from 'validator';

export default {
  // element 其实已经内置isURL 方法
  isURL(rule, val, callback) {
    if (rule.required && !val) return callback(new Error(rule.errmsg || '该项信息必填'));
    const flag = validator.isURL(val, {
      protocols: ['http', 'https'],
      require_protocol: true
    });
    if (val && !flag) return callback(new Error('请输入正确URL地址'));
    callback();
  },

  isPhone(rule, val, callback) {
    if (rule.required && !val) return callback(new Error(rule.errmsg || '该项信息必填'));
    const flag = validator.isMobilePhone(val, 'zh-CN');
    if (val && !flag) return callback(new Error('请输入正确的中国大陆手机号'));
    callback();
  },
};
