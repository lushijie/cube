/*
* @Author: lushijie
* @Date:   2018-06-12 09:19:15
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-12 15:10:01
*/
import VueRequest from 'request';

module.exports = {
  getApiList(url, data) {
    return VueRequest(url, {
      errorTips: true,
      trimed: true,
      data: data
    });
  }
};
