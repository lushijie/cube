/*
* @Author: lushijie
* @Date:   2018-05-29 15:17:02
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-13 17:10:11
*/
import VueRequest from 'request';

module.exports = {
  // 列表
  getItems(url, data) {
    return VueRequest(url, {
      errorTips: true,
      trimed: true,
      data: data
    });
  },

  // 软删除
  deleteItem(url, data) {
    return VueRequest(url, {
      method: 'POST',
      errorTips: true,
      trimed: true,
      data: data
    });
  },

  // 更新
  updateItem(url, data) {
    return VueRequest(url, {
      method: 'POST',
      errorTips: true,
      trimed: true,
      data: data
    });
  },

  // 硬删除
  unlinkItem(url, data) {
    return VueRequest(url, {
      method: 'POST',
      errorTips: true,
      trimed: true,
      data: data
    });
  },

  // 上下线
  statusItem(url, data) {
    return VueRequest(url, {
      method: 'POST',
      errorTips: true,
      trimed: true,
      data: data
    });
  },

  // 获取登陆用户信息
  getUserInfo(data) {
    return VueRequest('/bapi/user/profile', {
      method: 'POST',
      errorTips: false,
      trimed: true,
      data: data
    });
  },

  // login
  login(data) {
    return VueRequest('/api/auth/login', {
      method: 'GET',
      errorTips: true,
      trimed: true,
      data: data
    });
  },

  // logout
  logout(data) {
    return VueRequest('/api/auth/logout', {
      method: 'GET',
      errorTips: true,
      trimed: true,
      data: data
    });
  }
};
