/*
* @Author: lushijie
* @Date:   2018-05-31 18:04:26
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-19 09:36:47
*/
module.exports = {
  uploadURL: (INJECT.BAPI || INJECT.DOMAIN || '') + '/bapi/common/upload',
  loginURL: `https://login.ops.qihoo.net:4436/sec/login?ref=${INJECT.BAPI || INJECT.DOMAIN || ''}/api/auth/login?rurl=${encodeURIComponent((INJECT.FAPI || INJECT.DOMAIN || '') + '/admin')}`,
  moduleMap: {
    user: '用户',
    website: '热门网站',
    platform: '平台工具',
    opensource: '开源项目',
    course: '课程',
    column: '专栏',
    category: '分类',
    banner: '轮播图',
    activity: '活动',
    sponsor: '赞助商',
    series: '系列',
    organizer: '组织者',
    lecturer: '演讲者'
  }
}
