
<!-- TOC -->

- [开店宝小程序QuickStart](#开店宝小程序quickstart)
  - [1. 安装脚手架](#1-安装脚手架)
  - [2. 创建项目](#2-创建项目)
    - [2.1 方式1](#21-方式1)
    - [2.2 方式2](#22-方式2)
  - [3. 项目配置](#3-项目配置)
  - [4. 代码调试](#4-代码调试)
    - [4.1 启动调试](#41-启动调试)
    - [4.2 Android 调试](#42-android-调试)
    - [4.3 iOS 调试](#43-ios-调试)
  - [5. 打包小程序](#5-打包小程序)
  - [6. 组件库](#6-组件库)
    - [button](#button)
    - [Cell](#cell)
    - [Dialog](#dialog)
    - [Filter](#filter)
    - [Loading](#loading)
    - [PartLoading](#partloading)
    - [Searchbar](#searchbar)
    - [Timepicker](#timepicker)
  - [7. API](#7-api)
    - [开店宝 Module (KDB)](#开店宝-module-kdb)
      - [getMerchantInfo](#getmerchantinfo)
    - [日志 Module (MTLog)](#日志-module-mtlog)
      - [reportAnalytics](#reportanalytics)
    - [导航 Module (MTNavigation)](#导航-module-mtnavigation)
      - [setNavigationRButton](#setnavigationrbutton)
      - [setNavigationTitle](#setnavigationtitle)
      - [navigateTo](#navigateto)
      - [close](#close)
    - [网络 Module (MTNet)](#网络-module-mtnet)
      - [request](#request)
    - [储存 Module (MTStorage)](#储存-module-mtstorage)
      - [setStorage](#setstorage)
      - [getStorage](#getstorage)
    - [系统 Module(MTSystem)](#系统-modulemtsystem)
      - [getSystemInfo](#getsysteminfo)

<!-- /TOC -->

# 开店宝小程序QuickStart

## 1. 安装脚手架

通过 `npm config get prefix` 命令获取 npm 全局目录，将`mpbp-cli` 离线包解压缩放入`{prefix}/lib/node_modules`目录下，然后就可以在命令行中使用 `mpbp` 脚手架了。

## 2. 创建项目

### 2.1 方式1

```
$ mpbp init mpbp-project
# ? Project name [projectName]
# ? Project appKey[appKey]
# ? Project version [1.0.0]
# ? Project description [A mpbp project]
# ? Author []

$ cd mpbp-project
$ npm i
```
### 2.2 方式2

我们还提供离线项目示例压缩包，解压缩就可以使用。

## 3. 项目配置

```
{
  "appKey": "", // 小程序appKey
  "jssdk": "1.0.0", // 最小兼容基础库版本
  "version": "1.0.0", // 小程序包版本
  "pages": [ // 主包配置
    {
      "root": "pages/index.vue", // 主页，小程序首页
      "url": "", // 降级 h5 页面，暂定
      "degrade": false // 是否主动降级到 h5，暂定
    }
  ],
  "subPackages": [ // 子包配置，暂定
    {
      "root": "subPackageDemo",
      "pages": [
        {
          "root": "pages/demo.vue",
          "url": "",
          "degrade": false
        }
      ]
    }
  ],
  "min_android": "7.1.0", // 最小兼容安卓开店宝版本
  "min_ios": "7.1.0" // 最小兼容iOS开店宝版本
}
```

## 4. 代码调试

### 4.1 启动调试

```
# filePath 是你需要调试的vue文件相对路径
$ mpbp debug <filePath>
```

mpbp debug 是基于 weex-debugger 的调试工具，所以在初次使用 debug 命令时会去安装 weex-debugger 依赖，安装过程中会下载 chromium，建议翻墙后执行此命令，否则下载会报错。你也可以直接跳过此步骤，使用以下命令

```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 mpbp debug <filePath>
```

> 注意在没有安装 chromium 的情况下开启 jsdebug 选项会打不开页面

### 4.2 Android 调试

- 安装软件，`merchant7.1.0.apk`(同目录下)

- 下载上述开店宝安装包，安装打开首页，如下

 ![image](https://p0.meituan.net/travelcube/67b9f522302f17b9f67a6a8f0841b1a334708.jpg)

- 点击“调试入口”，第一次需要权限，授权后再次点击进入，呼起扫码页面体验

  ![image](https://p0.meituan.net/travelcube/66de612ba9da9f64ac253089b986126494501.jpg)

- 在weex playgroud上编写代码，生成二维码，用开店宝扫码体验（palyground地址：http://dotwe.org/vue/fb7eed4eb2fb0598cb2839c4d1d0b5ea）

  ![image](https://p0.meituan.net/travelcube/00d966501ef0135b59cd73ac2ef35ce7297079.png)

### 4.3 iOS 调试

- 安装软件，ipa包在同目录下

![image](https://p0.meituan.net/travelcube/90e380116e022b244c59056a71cf49ff82645.png)

- 安装ipa包到iPhone手机,手机连接手机到mac电脑
在xcode菜单中点击 Window -> Devices and Simulators，打开设备对话框点击 + 选择ipa包即可安装

![image](https://p0.meituan.net/travelcube/a133db97d8c2c2f5a74344b1c0951c93210364.png)

- 扫码打开小程序页面,打开开店宝测试版：
![image](https://p1.meituan.net/travelcube/3fe46c42c7a8f059f64300fc5e5d7149103245.jpg)

## 5. 打包小程序

```
# projectPath 是项目的相对路径
$ mpbp build [projectPath]
```

mpbp 将生成的小程序 zip 包存于项目根目录 build 目录下，编译后的源文件缓存于 dist 目录下。

## 6. 组件库

### button

```
<template>
    <scroller class="scroller">
        <div class="category-wrapper">
            <text class="category">类型样式</text>
        </div>
        <div class="main-wrapper">
            <text class="title">default</text>
            <mpbp-button text="这是Default状态的button，文本过长会展示省略号" size="full" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">pending</text>
            <mpbp-button text="这是Pending状态的button" type="pending" size="full" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">success</text>
            <mpbp-button text="这是Success状态的button" type="success" size="full" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">error</text>
            <mpbp-button text="这是Error状态的button" type="error" size="full" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">white</text>
            <mpbp-button text="这是White状态的button" type="white" size="full" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">disable</text>
            <mpbp-button text="这是Disable状态的button" disabled="true" size="full" @mpbpBtnClicked="onClick"></mpbp-button>
        </div>
        <div class="category-wrapper">
            <text class="category">尺寸样式</text>
        </div>
        <div class="main-wrapper">
            <text class="title">full</text>
            <mpbp-button size="full" type="success" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">normal</text>
            <mpbp-button size="normal" type="error" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">medium</text>
            <mpbp-button size="medium" type="white" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">small</text>
            <mpbp-button size="small" type="pending" @mpbpBtnClicked="onClick"></mpbp-button>
            <text class="title">tiny</text>
            <mpbp-button size="tiny" type="pending" @mpbpBtnClicked="onClick"></mpbp-button>
        </div>
        <div class="category-wrapper">
            <text class="category">自定义样式</text>
        </div>
        <div class="main-wrapper">
            <mpbp-button size="full" type="success" @mpbpBtnClicked="onClick"></mpbp-button>
        </div>
    </scroller>
</template>
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
buttonStyle|Object|N|null|button样式
type|String|N|'default'|样式类型。‘default’, ‘pending’, ‘success’, ‘error’, ‘white’
textStyle|Object|N|null|文本样式
text|String|N|'确认'|按钮文本
size|String|N|'normal'|按钮尺寸。‘full’, ‘normal’, ‘small’, ‘tiny’, ‘medium’

* 事件回调

```
// `@mpbpBtnClicked="mpbpBtnClicked"` 将会返回 { e, type, disabled }
```

### Cell

```
<template>
    <scroller class="scroller">
        <div class="category-wrapper">
            <text class="category">基本使用方法</text>
        </div>
        <mpbp-cell
            label="标题"
            title="文字内容"
            has-bottom-border="true"
        ></mpbp-cell>
        <mpbp-cell
            label="标题"
            sub-label="副标题"
            title="带链接可以跳转"
            link="https://i.meituan.com"
            has-arrow="true"
            has-bottom-border="true"
        ></mpbp-cell>
        <mpbp-cell
            label="标题"
            title="带右三角"
            has-arrow="true"
            has-bottom-border="true"
        ></mpbp-cell>
        <mpbp-cell
            title="只设置title"
            has-arrow="true"
            has-bottom-border="true"
        ></mpbp-cell>
        <mpbp-cell
            label="只设置label"
            has-arrow="true"
        ></mpbp-cell>
        <div class="category-wrapper">
            <text class="category">高级用法</text>
        </div>
        <mpbp-cell
            label="标题"
            title="带有描述性文本"
            desc="这是一段描述文本"
            has-arrow="true"
            has-bottom-border="true"
        ></mpbp-cell>
        <mpbp-cell
            title="自定义标题"
            has-arrow="true"
            has-bottom-border="true"
        >
            <text class="customize-label" slot="label">这是一个自定义的label</text>
        </mpbp-cell>
        <mpbp-cell
            has-arrow="true"
            has-bottom-border="true"
        >
            <text class="customize-value" slot="value">这是自定义value</text>
        </mpbp-cell>
        <mpbp-cell
            label="标题"
            has-arrow="true"
            has-bottom-border="true"
        >
            <text class="customize-value2" slot="value">这是自定义value</text>
        </mpbp-cell>
        <mpbp-cell>
            <text class="customize-value" slot="value">其他自定义内容会放在value右边</text>
            <image class="customize-image" src="https://x.sankuai.com/public/images/sprites/smileyXT@24x/smiley_xiaotuan_0.png"/>
        </mpbp-cell>
    </scroller>
</template>
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
label|String|N|null|跳转链接
arrowIcon|String|N|向右箭头|右侧箭头地址
hasArrow|Boolean|N|false|是否展示右侧箭头
hasTopBorder|Boolean|N|false|是否展示上边界线
hasBottomBorder|Boolean|N|false|是否展示下边界线
cellStyle|Object|N|{}|自定义单元格样式

* 事件回调

```
// `@mpbpCellClicked="mpbpCellClicked"` @returns { e }
```

### Dialog

```
import { mpbpDialog } from '@mtfe/mpbp-ui';

mpbpDialog({
    title: "开店宝",
    content: "'通知'可能包含提醒，声音和图标",
    actions: [
        {
            text: "取消",
            highlight: false
        },
        {
            text: "同意",
            highlight: true
        }
    ],
    callback (index) {

    }
})
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
title|String|Y|''|标题
content|String|N|''|内容
callback|Function|N|null|点击按钮的回调，回调的参数为选中的按钮index
actions|Array|N|[{text: “不允许”,highlight: false,},{text: “允许”,highlight: true,}]|自定义按钮的文案，高亮

### Filter

```
import { mpbpFilter } from '@mtfe/mpbp-ui';
const modal = weex.requireModule('modal');

mpbpFilter({
  selected: [0, 1, 2],
  columns: 2,
  tab: true,
  theme: 1,
  position: {
    x: 0,
    y: 100
  },
  data: [{
      text: '商区',
      custom: {
        tabId: 0
      },
      data: [{
          text: '朝阳',
          custom: {
            areaId: 2
          },
          data: [{
            text: '望京',
            custom: {
              subAreaId: 2
            }
          }]
        },
        {
          text: '东城',
          custom: {
            areaId: 1
          },
          data: [{
              text: '东直门',
              custom: {
                subAreaId: 4
              }
            },
            {
              text: '王府井',
              custom: {
                subAreaId: 5
              }
            }
          ]
        }
      ]
    },
    {
      text: '地铁',
      custom: {
        tabId: 1
      },
      data: [{
        text: '13号线',
        custom: {
          lineId: 13
        },
        data: [{
          text: '西二旗',
          custom: {
            subWayLine: 8
          }
        }]
      }]
    }
  ],
  callback(obj) {
    modal.toast({
      message: JSON.stringify(obj)
    })
  }
})
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
data|Array|Y|null|生成筛选所需的数据，数据结构相对固定，每一个item包含text，data，custom3个key
position|Object|Y|-|筛选框显示的位置
selected|Array|N|[]|每一级菜单选中的index，如果tab为true，第一个index表示选中的tab
columns|Number|N|2|筛选的层级（2/3）
tab|Boolean|N|false|是否包含tab
callback|Function|N|-|选中菜单的回调

### Loading

```
<template>
    <div class="container">
        <scroller class="scroller">
        <div class="category-wrapper">
            <text class="category">全局Loading</text>
        </div>
        <div class="main-wrapper">
            <text>位于屏幕正中间</text>
        </div>
        <div class="category-wrapper">
            <text class="category">局部Loading</text>
        </div>
        <div class="main-wrapper">
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}"></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :img-style="{height: '48px', width: '48px'}" loading-text="自定义图片样式..."></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :show-loading-img="false" loading-text="不显示Loading图片..."></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :show-loading-img="true" loading-text="自定义Loading图片..." loading-img="http://p1.meituan.net/codeman/406d1a5ea86129ce74369f278d1ee4de551.gif"></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :show-loading-img="true" loading-text="自定义Loading图片..." loading-img="http://p0.meituan.net/codeman/c8ad9845c9414424cb5854238af212b0729.gif"></mpbp-part-loading>
            <mpbp-part-loading :show="true" loading-img="http://p0.meituan.net/codeman/7ccf189d6d1acf572208144e6a4439b61737.gif">
                <div slot="text">自定义text区域...</div>
            </mpbp-part-loading>
        </div>
        </scroller>
        <mpbp-loading @mpbpLoadingMaskClicked="onMaskClicked" :show="true" loading-text="加载中..." :need-mask="true" interval="2000"></mpbp-loading>
    </div>
</template>
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
show|Bool|Y|false|是否显示全局loading
loading-text|String|N|-|loading图片url
text-style|Object|N|{}|文案样式

* 事件回调

```
// `@mpbpLoadingMaskClicked="mpbpLoadingMaskClicked"` 将会返回 { e }
```

### PartLoading

```
<template>
    <div class="container">
        <scroller class="scroller">
        <div class="category-wrapper">
            <text class="category">全局Loading</text>
        </div>
        <div class="main-wrapper">
            <text>位于屏幕正中间</text>
        </div>
        <div class="category-wrapper">
            <text class="category">局部Loading</text>
        </div>
        <div class="main-wrapper">
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}"></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :img-style="{height: '48px', width: '48px'}" loading-text="自定义图片样式..."></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :show-loading-img="false" loading-text="不显示Loading图片..."></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :show-loading-img="true" loading-text="自定义Loading图片..." loading-img="http://p1.meituan.net/codeman/406d1a5ea86129ce74369f278d1ee4de551.gif"></mpbp-part-loading>
            <mpbp-part-loading :show="true" :loading-style="{marginBottom: '20px'}" :show-loading-img="true" loading-text="自定义Loading图片..." loading-img="http://p0.meituan.net/codeman/c8ad9845c9414424cb5854238af212b0729.gif"></mpbp-part-loading>
            <mpbp-part-loading :show="true" loading-img="http://p0.meituan.net/codeman/7ccf189d6d1acf572208144e6a4439b61737.gif">
                <div slot="text">自定义text区域...</div>
            </mpbp-part-loading>
        </div>
        </scroller>
        <mpbp-loading @mpbpLoadingMaskClicked="onMaskClicked" :show="true" loading-text="加载中..." :need-mask="true" interval="2000"></mpbp-loading>
    </div>
</template>
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
show|Bool|Y|false|是否显示loading
showLoadingImg|Bool|N|true|是否显示loading图片
loadingText|String|N|‘加载中…’|loading文案
loadingImg|String|N|‘默认gif’|loading图片
loadingStyle|Object|N|{}|自定义loading样式
imgStyle|Object|N|{}|自定义img样式

### Searchbar

```
 // TODO
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
mod|String|N|‘default’|搜索框样式，‘default’，圆角黑背景的样式；‘open’，无边框
top|Boolean|N|false|顶栏搜索，配合mod为’open’使用。开启后搜索框整体居中，可以返回，取消
placeholder|String|N|‘搜索’|input placeholder
input-type|String|N|‘text’|text, password, url, email, tel
return-key-type|String|N|‘default’|键盘返回键的类型 default/go/next/search/send/done
cancel-label|String|N|‘取消’|右侧按钮文案
search-label|String|N|‘搜索’|搜索按钮文案，只有在top模式下才能生效
autofocus|Boolean|N|false|是否在页面加载时控件自动获取输入焦点
default-value|String|N|""|默认值
disabled|Boolean|N|false|是否禁用
bar-style|Object|N|{}|自定义样式

* 事件类型

```
@mpbpSearchInputOnFocus
@mpbpSearchInputOnBlur
@mpbpSearchInputReturned
@mpbpSearchCloseClicked
@mpbpSearchInputOnInput = (e) => this.value = e.value
@mpbpSearchInputChange = (e) => this.value = e.value
@mpbpSearchCancelClicked @mpbpSearchInputDisableClicked
```

### Timepicker

```
import { mpbpTimepicker } from '@mtfe/mpbp-ui';
mpbpTimepicker({
  	title: '请选择日期',
    selectedDate: ['2018-07-10', '2018-07-20'],
    dateRange: ['2017-01-01', '2018-12-31'],
    unavailableBefore: '2018-01-01',
    unavailableAfter: '2018-08-30',
    selectedNote: {
        begin: '启程',
        end: '返程',
        today: '今日',
        selected: '已选'
    },
    onSelect (selDate) {
        console.log('beginDate', selDate.begin);
        console.log('endDate', selDate.end);
    }
})
```

* 参数配置

属性|类型|必填|默认值|描述
:--|:--|:--|:--|:--
title|String|N|'日历'|标题
selectedDate|Array|N|[]|选中日期
dateRange|Array|Y|[]|可以看到的时间范围
unavailableBefore|String/Date/Number|N|-|在某日期之前不可选，这里的String格式必须为“YYYY-MM-dd”
unavailableAfter|String/Date/Number|N|-|在某日期之后不可选
selectedNote|Object|N|{begin: '开始',end: '结束',today: '今天',selected: '已选'}|自定义文案
onSelect|Function|N|-|选中日期的回调


## 7. API

### 开店宝 Module (KDB)

---

#### getMerchantInfo

获取商家信息

* 参数

无

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1
data.bizName|String|商家名称|0.0.1
data.branchArray|Array|商家门店|0.0.1
data.bizacctId|Number|商家账号id|0.0.1
data.currentPoi.poiId|Number|商家ID|0.0.1
data.currentPoi.name|String|商家名称|0.0.1

示例
```
import {kaidianbao} from '@mtfe/weex-api'
kaidianbao.getMerchantInfo().then(output=>{
	console.log(output);
})
```


### 日志 Module (MTLog)

---

#### reportAnalytics

打点汇报

* 参数

参数|类型|必填|默认值|描述|最低版本
:---:|:--:|:---:|:--:|:---:|:--:
category|string|否|merchant|渠道名|0.0.1
nm|string|是|moduleClick|埋点类型:<br>moduleClick(点击)<br>pageView（pv）|0.0.1
cid|string|是|NAN|埋点cid|0.0.1
bid|string|是|NAN|埋点bid|0.0.1
lab|obj|否|NAN|附加信息|0.0.1

* 返回值

参数|类型|说明|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1

示例
```
import {apm} from '@mtfe/weex-api';
apm.reportAnalytics({
	category:"merchant",
  nm:'moduleClick',
  cid:'1111',
  bid:'1111'
  lab:null,
}).then(output=>{
	console.log(output);
})
```

### 导航 Module (MTNavigation)

---

#### setNavigationRButton

设置页面右边按钮name

* 参数

参数|类型|必填|默认值|描述|最低版本
:---:|:--:|:---:|:--:|:---:|:--:
name|string|是|无|button名字|0.0.1
callback|function|否|null|回调方法|0.0.1

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1

示例

```
import {navigation} from '@mtfe/weex-api'
navigation.setNavigationRButton(
  {
    name:'这是当前页',
    callback:(out)=>{
    	console.log(out);
    }
  }
)
```


#### setNavigationTitle

设置页面title

* 参数

参数|类型|必填|默认值|描述|最低版本
:---:|:--:|:---:|:--:|:---:|:--:
title|string|是|无|title值|0.0.1

* 返回值

参数|类型|说明|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1

示例

```
import {navigation} from '@mtfe/weex-api'
navigation.setNavigationTitle({
  title:'这是当前页',
}).then(output=>{});
```

#### navigateTo

新起页面跳转

* 参数

参数|类型|必填|默认值|描述|最低版本
:---:|:--:|:---:|:--:|:---:|:--:
url|string|是|无|小程序或者https页面|0.0.1
query|json|否|无|参数|0.0.1
clearCurrent|boolean|否|无|是否关闭当前页|0.0.1

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1

示例
```
import {navigation} from '@mtfe/weex-api'
navigation.navigateTo({
  url:'123.sankuai.com',
  query:"{xxx:xxx}",
  clearCurrent:false,

}).then(output=>{});
```

#### close

关闭当前页

* 参数

无

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1

示例
```
import {navigation} from '@mtfe/weex-api'
navigation.close().then(out=>{
	console.log(out);
})
```

### 网络 Module (MTNet)

---

#### request

分享

* 参数

参数|类型|必填|默认值|描述|最低版本
:---:|:--:|:---:|:--:|:---:|:--:
url|string|是||开发者服务器接口地址|0.0.2
body|json|否||请求的参数|0.0.2
header|json|否||设置请求的 header|0.0.2
method|String|否|GET|（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT|0.0.2
timeout|int|否|20|超时毫秒数|0.0.2

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.2
errorCode|Number|方法调用失败码|0.0.2
errorMsg|String|方法调用失败说明|0.0.2
data|json|返回的数据|0.0.2

示例
```
import {network} from '@mtfe/weex-api';
network.request({
  url:"www.meituan.com",
  body:"",
  header:"",
  method:"GET",
  timeout:50,
}).then(output=>{console.log(output});
```

### 储存 Module (MTStorage)

---

#### setStorage

储存数据

* 参数

参数|类型|必填|默认值|描述|最低版本
:---:|:--:|:---:|:--:|:---:|:--:
key|string|是|mc|key值|0.0.1
value|string|是|NAN|value|0.0.1

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1

示例
```
import {storage} from '@mtfe/weex-api';
storage.setStorage({
	key:"name",
  value:'哈利',
}).then(output=>{
	console.log(output);
})
```


#### getStorage

获取数据

* 参数

参数|类型|必填|默认值|描述|最低版本
:---:|:--:|:---:|:--:|:---:|:--:
key|string|是|mc|key值|0.0.1

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1
value|String|值|0.0.1

示例
```
import {storage} from '@mtfe/weex-api';
storage.getStorage({
	key:"name",
}).then(output=>{
	console.log(output);
})
```

### 系统 Module(MTSystem)

---

#### getSystemInfo

获取系统信息

* 参数

无

* 返回值

参数|类型|描述|最低版本
:---:|:--:|:---:|:--:
status|String|方法调用状态：success、fail|0.0.1
errorCode|Number|方法调用失败码|0.0.1
errorMsg|String|方法调用失败说明|0.0.1
data.screenWidth|Number|屏幕宽度|0.0.1
data.screenHeight|Number|屏幕高度|0.0.1
data.brand|string|手机品牌|0.0.1
data.model|string|手机型号|0.0.1
data.pixelRatio|string|string|0.0.1
data.statusBarHeight|Number|状态栏的高度|0.0.1
data.version|string|开店宝版本号|0.0.1
data.system|string|操作系统版本|0.0.1
data.SDKVersion|string|基础API版本|0.0.1
data.netEnvironment|Number|0 ： 代表线上环境<br>1 :    代表test环境<br>2 ： 代表st环境|0.0.1

示例

```
import {system} from '@mtfe/weex-api'
system.getSystemInfo().then(
	output=>{
  	console.log(output);
  }
)
```

