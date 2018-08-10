/*
* @Author: lushijie
* @Date:   2018-01-22 10:02:26
* @Last Modified by:   lushijie
* @Last Modified time: 2018-06-22 17:04:23
*/
module.exports = [
  // {
  //   path: 'dashboard',
  //   text: 'Dashboard',
  //   icon: 'fa fa-desktop'
  // },
  {
    path: 'banner',
    text: '轮播图管理',
    icon: 'fa fa-image',
    children: [
      {
        path: 'list',
        text: '列表数据',
        icon: 'fa fa-list-ol',
      },
      {
        path: 'add',
        text: '更新插入',
        icon: 'fa fa-pencil'
      }
    ]
  },
  {
    path: 'activity',
    text: '活动管理',
    icon: 'fa fa-list-ol',

    children: [
      {
        text: '列表数据',
        path: 'list',
        icon: 'fa fa-list-ol',
      },
      {
        text: '更新插入',
        path: 'add',
        icon: 'fa fa-pencil',
      },
      // {
      //   text: '系列管理',
      //   path: 'series',
      //   icon: 'fa fa-columns',
      //   children: [
      //     {
      //       path: 'list',
      //       text: '列表数据',
      //       icon: 'fa fa-list-ol',
      //     },
      //     {
      //       path: 'add',
      //       text: '更新插入',
      //       icon: 'fa fa-pencil'
      //     }
      //   ]
      // },
      {
        text: '演讲者管理',
        path: 'lecturer',
        icon: 'fa fa-address-card',
        children: [
          {
            path: 'list',
            text: '列表数据',
            icon: 'fa fa-list-ol',
          },
          {
            path: 'add',
            text: '更新插入',
            icon: 'fa fa-pencil'
          }
        ]
      },
      {
        text: '组织者管理',
        path: 'organizer',
        icon: 'fa fa-sitemap',
        children: [
          {
            path: 'list',
            text: '列表数据',
            icon: 'fa fa-list-ol',
          },
          {
            path: 'add',
            text: '更新插入',
            icon: 'fa fa-pencil'
          }
        ]
      },
      {
        text: '赞助商管理',
        path: 'sponsor',
        icon: 'fa fa-group',
        children: [
          {
            path: 'list',
            text: '列表数据',
            icon: 'fa fa-list-ol',
          },
          {
            path: 'add',
            text: '更新插入',
            icon: 'fa fa-pencil'
          }
        ]
      },
    ]
  },
  {
    path: 'course',
    text: '课程管理',
    icon: 'fa fa-align-left',
    children: [
      {
        text: '列表数据',
        path: 'list',
        icon: 'fa fa-list-ol',
      },
      {
        text: '更新插入',
        path: 'add',
        icon: 'fa fa-pencil',
      },
      {
        text: '分类管理',
        path: 'category',
        icon: 'fa fa-list-alt',
        children: [
          {
            text: '列表数据',
            path: 'list',
            icon: 'fa fa-list-ol',
          },
          {
            text: '更新插入',
            path: 'add',
            icon: 'fa fa-pencil',
          }
        ]
      },
      // {
      //   text: '专栏管理',
      //   path: 'column',
      //   icon: 'fa fa-columns',
      //   children: [
      //     {
      //       text: '列表数据',
      //       path: 'list',
      //       icon: 'fa fa-list-ol',
      //     },
      //     {
      //       text: '更新插入',
      //       path: 'add',
      //       icon: 'fa fa-pencil',
      //     }
      //   ]
      // }
    ]
  },

  {
    path: 'output',
    text: '公司产品',
    icon: 'fa fa-archive',
    children: [
      {
        path: 'website',
        text: '热门网站',
        icon: 'fa fa-cloud',
        children: [
          {
            path: 'list',
            text: '列表数据',
            icon: 'fa fa-list-ol',
          },
          {
            path: 'add',
            text: '更新插入',
            icon: 'fa fa-pencil'
          }
        ]
      },
      {
        path: 'platform',
        text: '平台工具',
        icon: 'fa fa-archive',
        children: [
          {
            path: 'list',
            text: '列表数据',
            icon: 'fa fa-list-ol',
          },
          {
            path: 'add',
            text: '更新插入',
            icon: 'fa fa-pencil'
          }
        ]
      },
      {
        path: 'opensource',
        text: '开源项目',
        icon: 'fa fa-database',
        children: [
          {
            path: 'list',
            text: '列表数据',
            icon: 'fa fa-list-ol',
          },
          {
            path: 'add',
            text: '更新插入',
            icon: 'fa fa-pencil'
          }
        ]
      }
    ]
  },
  {
    path: 'user/list',
    text: '用户管理',
    icon: 'fa fa-user'
  },
  // {
  //   path: 'setting',
  //   text: '系统配置',
  //   icon: 'fa fa-cogs',
  //   children: [
  //     {
  //       path: 'home',
  //       text: '配置',
  //       icon: 'fa fa-gear'
  //     }
  //   ]
  // },
];
