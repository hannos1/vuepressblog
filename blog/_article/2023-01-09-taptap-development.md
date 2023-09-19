---
title: 微信小程序开发
date: 2023-09-20
author: hannos1
location: China
tags:
  - JavaScript
  - 微信小程序
  - wechat
---

## 前言

最近学习了一些微信小程序的开发，于是迫不及待地对我个人很喜欢的 taptap 社区进行了模仿。本文主要分享我在开发小程序时的一些思路和坑。抛砖引玉、抛砖引玉，当然本项目仅供学习使用，尊重版权。

## 开发准备

- 微信开发者工具
- VScode 代码编辑器
- taptap 微信小程序
- [阿里巴巴矢量图标库](https://link.juejin.cn/?target=https%3A%2F%2Fwww.iconfont.cn%2Fsearch%2Findex%3FsearchType%3Dicon "https://www.iconfont.cn/search/index?searchType=icon")
- [markman](https://link.juejin.cn/?target=http%3A%2F%2Fwww.getmarkman.com%2F "http://www.getmarkman.com/")
- [fastmock 在线接口](https://www.fastmock.site/#/)

## 总体架构

本项目是一个基于小程序的纯前端项目，没有使用云开发。使用小程序所支持的 wxml + wxss + js 开发模式，命名采用 BEM 命名规范。数据主要通过 fastmock 在线接口平台来编写提供。纯小白没有使用其他框架组件(大佬可以 run 了)。

## 项目解构

以下是我目前实现的 taptap 小程序界面

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e19ee539fbc4dbd939a5d0276077491~tplv-k3u1fbpfcp-watermark.image?" alt="010817515449_0QQ图片20230108175127.png" width="80%" />

### 全局样式

```css
.page,
page {
  height: 100vh;
  background: #ffffff;
  font-size: 0;
} /* 复制到app.wxss */
```

接下来对每个页面的细节进行解构。

## 首页

![SVID_20230108_211122_1.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dd2f83920cb40e0a71f63e29847f2ae~tplv-k3u1fbpfcp-watermark.image?)

### 布局框架

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4593dc1e198c4864875378b75e93c0cf~tplv-k3u1fbpfcp-watermark.image?" alt="QQ图片20230108180435.png" width="70%" />

```js
<view class="page">
    <view class="searchbar_container">
        <!-- 用于以后写搜索栏 -->
    </view>

    <view class="page_bd">
        <block wx:if="{{bar == 0}}">
            <scroll-view class="page_scroll">
            <!-- 首页主体，用block块控制主体的渲染来实现下面的tabbar  -->
            </scroll-view>
        </block>
    </view>

    <view class="page_ft">
        <!-- tabbar部分  -->
    </view>
</view>
```

这里我没有使用小程序官方的 tabbar 组件来实现 tabbar(成功跳进一个坑，我是 🐖)，但是可以展现另一种思路(~~强行解释，就是自己蠢了~~)。

### 主体

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85e55792d0fa44779d712f3cee4fe51c~tplv-k3u1fbpfcp-watermark.image?" alt="010819560459_0QQ图片20230108195338.png" width="100%" />

#### 最近浏览

```js
<view class="page_recent">
    <view class="page_recent__title">
        <label for="" class="page_title__label">最近浏览</label>
    </view>
    <view class="page_recent__bd">
    <scroll-view class="page_recent__scroll" scroll-x="true">
        <block wx:for="{{recentgames}}" wx:key="id">
        <view class="page_recent__item">
            <view class="page_recent_imagemask" style="background-image:url({{item.pic}});">
            </view>
            <view class="page_item_labelmask">
                <label class="page_item__label">{{item.title}}</label>
                </view>
            </view>
        </block>
    </scroll-view>
    </view>
</view>
```

这里有一个坑，就是 scroll-view 需要给定 height 值才能滚动，同时父元素要给相应滚动方向设置 overflow 为滚动。

#### 关注的游戏论坛

```js
<view class="page_concern">
    <view class="page_concern__title">
        <label for="" class="page_title__label">关注的游戏论坛</label>
        <a href="" class="page_a__showmore">查看更多</a>
    </view>
    <view class="page_concern__bd">
    <view class="page_concern_bdmask">
    <block wx:for="{{concerns}}" wx:key="id">
        <view class="page_concern__item">
        <view class="page_concern__itemmask">
            <view class="page_concern__imagemask" style="background-image:url({{item.pic}});"></view>
            <view class="page_concern__itemtitle">{{item.title}}</view>
            <view class="page_concern__itemnumber">主贴:{{item.numbers}}</view>
        </view>
        </view>
    </block>
    </view>
    </view>
</view>
```

#### 热门游戏论坛

```js
<view class="page_hot">
    <view class="page_hot__title">
        <label for="" class="page_title__label">热门的游戏论坛</label>
        <a href="" class="page_a__showmore">查看更多</a>
    </view>
    <view class="page_hot__bd">
    <scroll-view class="page_hot__scroll" scroll-x="true">
    <block wx:for="{{hots}}" wx:key="id">
        <view class="page_hot__item">
        <view class="page_hot_itemmask">
            <view class="page_hot_bgmask" style="background-image: url({{item.backgroundimage}});"></view>
            <view class="page_hot_imagemask" style="background-image: url({{item.pic}});"></view>
            <view class="page_hot_titlelabel">{{item.title}}</view>
            <view class="page_hot_numbers">主贴:{{item.numbers}}</view>
        </view>
        </view>
    </block>
    </scroll-view>
    </view>
</view>
```

#### 官方论坛

```js
<view class="page_official">
    <view class="page_official__title">
        <label for="" class="page_title__label">官方论坛</label>
        <a href="" class="page_a__showmore">查看更多</a>
    </view>
    <view class="page_official__bd">
    <view class="page_official_bdmask">
    <block wx:for="{{officials}}" wx:key="id">
    <view class="page_official__item">
    <view class="page_official__itemmask">
        <view class="page_official__imagemask" style="background-image:url({{item.pic}});"></view>
        <view class="page_official__itemtitle">{{item.title}}</view>
        <view class="page_official__itemnumber">主贴:{{item.numbers}}</view>
    </view>
    </view>
    </block>
    </view>
    </view>
</view>
```

这里主要是用行内的 style 来控制图片的地址，利用字符串模板{{}}来获取 data 里的数据。js 里存放了已经从 fastmock 里获取的数据。

### 接口数据结构

```js
"data": {
    "recentgames":[
      {
          "id":number,
          "pic":string,
          "title":string
      }
    ],
    "concerns":[
      {
          "id":number,
          "pic":string,
          "title":string,
          "numbers":string
      }
    ],
    "hots":[
      {
          "id":number,
          "pic":string,
          "backgroundimage":string,
          "title":string,
          "numbers":string
      }
    ],
    "officials":[
      {
          "id":number,
          "pic":string,
          "title":string,
          "numbers":string
      }
    ],
}
```

numbers 可以用数值类型。接口数据主要用来测试，没啥特殊要求。

## 动态

![SVID_20230108_211132_1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f551e62abef048c4b9f43273ebc17153~tplv-k3u1fbpfcp-watermark.image?)

### 布局框架

![QQ图片20230108205908.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33c3f6bbc5e14b9b9a9a0dce541b1f89~tplv-k3u1fbpfcp-watermark.image?)

```js
<block wx:if="{{bar == 1}}">
<view class="message_swiperbar">
        <!-- 这里是绑定swiper的推荐和关注按钮 -->
</view>
</block>

<view class="page">
    <view class="searchbar_container">
        <!-- 用于以后写搜索栏 -->
    </view>

    <view class="page_bd">
        <block wx:if="{{bar == 0}}">
            <scroll-view class="page_scroll">
            <!-- 首页主体  -->
            </scroll-view>
        </block>

        <block wx:if="{{bar == 1}}">
            <swiper class="message_swiper">
            <swiper-item class="message_swiperitem">
                <scroll-view class="message_swiperitem__scrollview">
                </scroll-view>
            </swiper-item>
            <!-- 动态页面  -->
            <swiper-item class="message_swiperitem">
                <scroll-view class="message_swiperitem__scrollview">
                </scroll-view>
            </swiper-item>
            </swiper>
        </block>
    </view>

    <view class="page_ft">
        <!-- tabbar部分  -->
    </view>
</view>
```

### 主体

```js
<block wx:if="{{bar == 1}}">
<view class="message_swiperbar">
<view class="message_swiperbar__baritem" bindtap="selectmessage" data-message="0">
<view class="message_swiperbar__barlabel {{message == 0 && 'message_swiperbar__barlabelcheck'}}">推荐</view>
<view class="{{message == 0 && 'message_swiperbar__barborder'}}"></view>
</view>
<view class="message_swiperbar__baritem" bindtap="selectmessage" data-message="1">
<view class="message_swiperbar__barlabel {{message == 1 && 'message_swiperbar__barlabelcheck'}}">关注</view>
<view class="{{message == 1 && 'message_swiperbar__barborder'}}"></view>
</view>
</view>
</block>

<swiper class="message_swiper" current="{{message}}" bindchange="messageswiper">
  <swiper-item class="message_swiperitem">
     <scroll-view class="message_swiperitem__scrollview">
    <!-- <block wx:if="{{message == 0}}"> -->
     <block wx:for="{{suggest}}"  wx:key="id">
       <view class="message_item__suggest">
        <view class="message_item__hd">
          <view class="message_item__hdimg" style="background-image:url({{item.userimg}});"></view>
          <view class="message_item__name">{{item.username}}</view>
          <view class="message_item_tsmask">
          <view class="message_item__time">{{item.datetime}}</view>
          <view class="message_item__section">{{item.section}}</view>
          </view>
        </view>
        <view class="message_item__bd">
          <view class="message_item__bdtitle">{{item.title}}</view>
          <view class="message_item__bdartical">{{item.artical}}</view>
          <view class="message_item__bdimg" hidden="{{item.backgroundimage === ''}}" style="background-image:url({{item.backgroundimage}});"></view>
          <video
          hidden="{{item.backgroundimage !== '' || item.video === ''}}"
          id="suggestvideo-{{item.id}}"
          bindplay="videoplay"
          class="message_item__vedio"
          object-fit="cover"
          src="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
          poster="{{item.poster}}"
          />
        </view>
        <view class="message_item__ft">
          <view class="message_item__support">
            <view class="message_item__supportimg"></view>
            <view class="message_item__supportnumber">{{item.support}}</view>
          </view>
          <view class="message_item__comments">
            <view class="message_item__commentsimg"></view>
            <view class="message_item__commentsnumber">{{item.comments}}</view>
          </view>
        </view>
       </view>
      </block>
    <!-- </block> -->
     </scroll-view>
  </swiper-item>
  <swiper-item class="message_swiperitem">
     <scroll-view class="message_swiperitem__scrollview">
      <!-- <block wx:if="{{message == 1}}"> -->
      <block wx:for="{{concern}}"  wx:key="id">
       <view class="message_item__suggest">
        <view class="message_item__hd">
          <view class="message_item__hdimg" style="background-image:url({{item.userimg}});"></view>
          <view class="message_item__name">{{item.username}}</view>
          <view class="message_item_tsmask">
          <view class="message_item__time">{{item.datetime}}</view>
          <view class="message_item__section">{{item.section}}</view>
          </view>
        </view>
        <view class="message_item__bd">
          <view class="message_item__bdtitle">{{item.title}}</view>
          <view class="message_item__bdartical">{{item.artical}}</view>
          <view class="message_item__bdimg" hidden="{{item.backgroundimage === ''}}" style="background-image:url({{item.backgroundimage}});"></view>
          <video
          hidden="{{item.backgroundimage !== '' || item.video === ''}}"
          id="concernvideo-{{item.id}}"
          bindplay="videoplay"
          class="message_item__vedio"
          object-fit="cover"
          src="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
          poster="{{item.poster}}"
          />
        </view>
        <view class="message_item__ft">
          <view class="message_item__support">
            <view class="message_item__supportimg"></view>
            <view class="message_item__supportnumber">{{item.support}}</view>
          </view>
          <view class="message_item__comments">
            <view class="message_item__commentsimg"></view>
            <view class="message_item__commentsnumber">{{item.comments}}</view>
          </view>
        </view>
       </view>
      </block>
    <!-- </block> -->
     </scroll-view>
  </swiper-item>
</swiper>
```

这里需要注意的是文章内容达到 3 行就要让它隐藏，同时高度需要自适应。此外，视频播放功能有一个细节，当点击其他视频时上一个视频应该要停止播放。同时视频和预览图片应该是互斥出现的。

### 视频播放

```js
data: {
    currentvideo:null,
},

videoplay(e){
    let lastcurrentvideo = this.data.currentvideo;
    let currentvideo = wx.createVideoContext(e.target.id)
    this.setData({
      currentvideo:currentvideo
    })
    if(lastcurrentvideo && lastcurrentvideo !== currentvideo){
      lastcurrentvideo.pause();
    }
},
```

### swiper 和切换按钮双向绑定

```js
  data: {
    message:0,
    },

  selectmessage(e){
    let message = e.currentTarget.dataset.message;
    this.setData({
      message:message
    })
  },

  messageswiper(e){
    if(e.detail.source == 'touch'){
      let message = e.detail.current;
      this.setData({
        message:message
      })
    }
  },
```

当 swiper 触发时改变 message 的值，这个值会通过
`{{message == 0 && 'message_swiperbar__barborder'}}`
影响按钮上的样式`message_swiperbar__barborder`存在，从而达到`swiper->按钮`方向的绑定。而`按钮->swiper`的绑定是通过 dataset 来改变 message 的值，这个值是 swiper 的 current 属性，会让它翻到指定的页。

### 接口数据结构

```js
"data": {
     "suggest":[
      {
        "id":number,
        "userimg":string,
        "username":string,
        "datetime":string,
        "section":string,
        "title":string,
        "artical":string,
        "backgroundimage":string,
        "poster":string,
        "support":number,
        "comments":number
         },
      ],
      "concern":[
      {
        "id":number,
        "userimg":string,
        "username":string,
        "datetime":string,
        "section":string,
        "title":string,
        "artical":string,
        "backgroundimage":string,
        "poster":string,
        "support":number,
        "comments":number
      },
    ],
}
```

## 我

![SVID_20230108_211146_1.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b91bdec94544209a88c415724884fd9~tplv-k3u1fbpfcp-watermark.image?)

### 布局框架

![QQ图片20230108214057.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7ac4ebd997148a997aad71f334ad67d~tplv-k3u1fbpfcp-watermark.image?)

```js
<block wx:if="{{bar==2}}">
    <view class="searchbar_title" style="top:{{navTop}}px;height:{{objectheight}}px;line-height:{{objectheight}}px">TapTap</view>
</block>

<view class="page">
    <view class="searchbar_container">
        <!-- 用于以后写搜索栏 -->
    </view>

    <view class="page_bd">
        <block wx:if="{{bar == 0}}">
            <scroll-view class="page_scroll">
            <!-- 首页主体  -->
            </scroll-view>
        </block>

        <block wx:if="{{bar == 1}}">
            <swiper class="message_swiper">
            <swiper-item class="message_swiperitem">
                <scroll-view class="message_swiperitem__scrollview">
                </scroll-view>
            </swiper-item>
            <!-- 动态页面  -->
            <swiper-item class="message_swiperitem">
                <scroll-view class="message_swiperitem__scrollview">
                </scroll-view>
            </swiper-item>
            </swiper>
        </block>
    </view>

    <block wx:if="{{bar == 2}}">
    <scroll-view class="message_swiperitem__scrollview">
        <!-- 我  -->
    </scroll-view>
    </block>

    <view class="page_ft">
        <!-- tabbar部分  -->
    </view>
</view>
```

### 主体

```js
<scroll-view class="message_swiperitem__scrollview">
<view class="me_contianer">
  <view class="me_title_image"></view>
  <view class="me_user__cardmask">
    <view class="me_user__cardbd">
    <view class="me_user__img" style="background-image: url({{userinfo.img}});"></view>
    <view class="me_user__name">{{userinfo.name}}</view>
    <view class="me_user__id">ID: {{userinfo.userid}}</view>
    <view class="me_user__description">{{userinfo.descript}}</view>
    </view>
    <view class="me_user__ft">
      <view class="me_user__fans">
        <view class="me_user__number">{{userinfo.fans}}</view>
        <view class="me_user__label">粉丝</view>
      </view>
      <view class="me_user__concern">
        <view class="me_user__number">{{userinfo.concern}}</view>
        <view class="me_user__label">关注</view>
      </view>
    </view>
  </view>
  <!-- <view style="width:100%;height:260rpx;"></view> -->
  <view class="message_swiperbar">
  <view class="message_swiperbar__baritem"  bindtap="selectmymessage" data-mymessage="0">
  <view class="message_swiperbar__barlabel  {{mymessage == 0 && 'message_swiperbar__barlabelcheck'}}">评价</view>
  <view class="{{mymessage == 0 && 'message_swiperbar__barborder'}}"></view>
  </view>
  <view class="message_swiperbar__baritem"  bindtap="selectmymessage" data-mymessage="1">
  <view class="message_swiperbar__barlabel {{mymessage == 1 && 'message_swiperbar__barlabelcheck'}}">内容</view>
  <view class="{{mymessage == 1 && 'message_swiperbar__barborder'}}"></view>
  </view>
  </view>
      <block wx:if="{{mymessage == 0}}">
      <view class="message_item__suggest" wx:for="{{appraise}}" wx:key="id">
        <view class="message_item__hd">
          <view class="message_item__hdimg" style="background-image:url({{userinfo.img}});"></view>
          <view class="message_item__name">{{userinfo.name}}</view>
          <view class="message_item_tsmask">
          <view class="message_item__time">{{item.datatime}}</view>
          <view class="message_item__section" style="color:#717171">游戏时长 {{item.totaltime}}小时 ({{item.phonetype}})</view>
          </view>
        </view>
        <view class="message_item__bd">
          <view class="message_item__bdartical"><text wx:for="{{item.star}}" wx:key="i">★ </text>{{item.descript}}</view>
          <view class="game_card__type1">
            <view class="game_card__img1" style="background-image: url({{item.gameimg}});"></view>
            <view class="game_card__name1">{{item.gamename}}</view>
            <view class="game_card__comments1">评分:{{item.grade}}({{item.number}}人)</view>
          </view>
        </view>
        <view class="message_item__ft">
          <view class="message_item__support">
            <view class="message_item__supportimg"></view>
            <view class="message_item__supportnumber">{{item.support}}</view>
          </view>
          <view class="message_item__comments">
            <view class="message_item__commentsimg"></view>
            <view class="message_item__commentsnumber">{{item.comments}}</view>
          </view>
        </view>
       </view>
      </block>

      <block wx:if="{{mymessage == 1}}">
        <view class="message_item__suggest" wx:for="{{content}}" wx:key="id">
        <view class="message_item__hd">
          <view class="message_item__hdimg" style="background-image:url({{userinfo.img}});"></view>
          <view class="message_item__name">{{userinfo.name}}</view>
          <view class="message_item_tsmask">
          <view class="message_item__time" style="color:#22bdba">{{item.section}}</view>
          <view class="message_item__section" style="color:#717171;">{{item.datetime}}</view>
          </view>
        </view>
        <view class="message_item__bd">
          <view class="message_item__bdtitle">{{item.title}}</view>
          <view class="message_item__bdartical">{{item.artical}}</view>
          <view class="message_item__bdimg" hidden="{{item.backgroundimage === ''}}" style="background-image:url({{item.backgroundimage}});"></view>
          <video
          hidden="{{item.backgroundimage !== '' || item.video === ''}}"
          id="suggestvideo-{{item.id}}"
          bindplay="videoplay"
          class="message_item__vedio"
          object-fit="cover"
          src="https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4"
          poster="{{item.poster}}"
          />
        </view>
        <view class="message_item__ft">
          <view class="message_item__support">
            <view class="message_item__supportimg"></view>
            <view class="message_item__supportnumber">{{item.support}}</view>
          </view>
          <view class="message_item__comments">
            <view class="message_item__commentsimg"></view>
            <view class="message_item__commentsnumber">{{item.comments}}</view>
          </view>
        </view>
       </view>
      </block>
      <view class="page_end">
        <label class="page_end__lable">暂无更多</label>
      </view>
</view>
</scroll-view>
```

这里的 swiper 和按钮是单向绑定，只能通过按钮触发 swiper。同时内容栏目和动态是一致的。

### swiper 单向绑定

```js
data: {
    mymessage:0,
    },

selectmymessage(e){
    let mymessage = e.currentTarget.dataset.mymessage;
    this.setData({
      mymessage:mymessage
    })
  },
```

通过更改 swiper 的 current 属性来切换内容。

### 接口数据结构

```js
"data": {
     "me":{
      "info":{
        "img":string,
        "name":string,
        "userid":string,
        "descript":string,
        "fans":number,
        "concern":number
      },
      "appraise":[
        {
          "id":number,
          "datatime":string,
          "totaltime":number,
          "phonetype":string,
          "star":number,
          "descript":string,
          "gamename":string,
          "gameimg":string,
          "grade":number,
          "number":number,
          "support":number,
          "comments":number
        }
      ],
      "content":[
        {
          "id":number,
          "datetime":string,
          "section":string,
          "title":string,
          "artical":string,
          "backgroundimage":string,
          "poster":string,
          "support":number,
          "comments":number
        },
      ]
    }
}
```

## 搜索界面

![SVID_20230108_211159_1.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19d73120f5984ff0936604ecc40031aa~tplv-k3u1fbpfcp-watermark.image?)

### 布局框架

![QQ图片20230108221641.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb1d75b0ca734cc8811f250eb7b84880~tplv-k3u1fbpfcp-watermark.image?)

### 主体

```js
<view class="page">
<view class="page_bd">
  <view class="page_search">
    <view class="search_search__inputmask">
      <input class="search_search__input" placeholder-class="label" placeholder="搜索"></input>
      <view class="cancelmask">
        <view class="cancel"></view>
      </view>
    </view>
    <view class="page_search__searchlist">
      <view class="page_search__searchlistitem" wx:for="{{searchhistory}}" wx:key="index">
        <view class="page_search__itembox">
        <view class="page_search__itemimgmask">
          <view class="page_search__itemimg" style="background-image: url('#')></view>
          <!--  这里的图片用的矢量库转base64的图片，太长了省略#  -->
        </view>
        <view class="page_search__itemlabel">{{item.context}}</view>
        </view>
        <view class="cancelmask">
        <view class="cancel"></view>
        </view>
      </view>
    </view>
  </view>
  <view class="page_hot">
    <view class="page_hot__title">热门搜索</view>
    <view class="hot_bd">
      <view class="hot_bd__item" wx:for="{{items}}" wx:key="id">
        <view class="hot_bd__index">{{item.id}}</view>
        <view class="hot_bd__context">{{item.context}}</view>
      </view>
    </view>
  </view>
  <view class="page_hottag">
    <view class="hottag_title">热门游戏标签</view>
    <view class="hottag_taglist">
      <view class="hottag_item" wx:for="{{tags}}" wx:key="id">
      {{item.tagname}}
      </view>
    </view>
  </view>
</view>
</view>
```

由于微信小程序限制文件大小，本地的图片资源基本上用不了。所以一般把本地的图片资源转成 base64 格式在复制到样式上，但是这样非常长，记得开自动折行。搜索框可以写一个简单的 search suggest 和防抖，等有机会加上去再更新本文。

### js 数据结构

```js
      items:[
        {
          id:number,
          context:string
        }
      ],
      tags:[
        {
          id:number,
          tagname:string,
          hash:string
        }
      ],
      searchhistory:[
        {
          context:string,
          hash:string
        },
        {
          context:string,
          hash:string
        }
      ]
```

这里数据比较少，我就只在 js 写了一些测试数据,`searchhistory`的子属性没有 id，wx-for 时的 key 可以用 index

## tabbar 逻辑

### 结构

```js
<view class="page">
    <view class="searchbar_container">
        <!-- 用于以后写搜索栏 -->
    </view>

    <view class="page_bd">
        <block wx:if="{{bar == 0}}">
            <!-- 首页主体  -->
        </block>

        <block wx:if="{{bar == 1}}">
            <!-- 动态页面  -->
        </block>


        <block wx:if="{{bar == 2}}">
            <!-- 我  -->
        </block>

    </view>

    <view class="page_ft">
    <view class="page_bar">
        <view bindtap="selectbar" data-bar="0" class="page_bar__index">
            <view class="{{bar != 0 && 'page_bar__image'}} {{bar == 0 && 'page_bar__homefill'}}">
            </view>
            <label for="" class="page_bar__label">首页</label>
        </view>
    <view bindtap="selectbar" data-bar="1" class="page_bar__dynamic">
        <view class="{{bar != 1 && 'page_bar__image'}} {{bar == 1 && 'page_bar__dynamicfill'}}">
        </view>
        <label for="" class="page_bar__label">动态</label>
    </view>
    <view bindtap="selectbar" data-bar="2" class="page_bar__me">
        <view class="{{bar != 2 && 'page_bar__image'}} {{bar == 2 && 'page_bar__myfill'}}">
        </view>
        <label for="" class="page_bar__label">我</label>
    </view>
    </view>
    </view>
</view>
```

主页中通过 tabbar 上的 bindtap 来改变 bar 的值，从而觉得 wx-if 代码块的渲染，这样做比使用 hidden 开销更大，可以把 block 代码块换成 view，在改变它的 hidden 属性。使用官方的 tabbar 当然更省事啦，而且官方的代码肯定更强壮，但是这样做可以定制更好看的 tabbar(如果真的有需要的话)

### js

```js
  data: {
    bar:0,
    }

  selectbar(e){
    let bar = e.currentTarget.dataset.bar;
    this.setData({
      bar:bar
    })
  },
```

## 定制搜索框

![SVID_20230108_224133_1.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5da5fc3482964415bda73fedb6570b0f~tplv-k3u1fbpfcp-watermark.image?)

可以看到四个页面中出现了两种搜索框，如果你使用的是官方的 tabbar 组件，因为会有 4 个页面文件，那么只有首页和动态页面需要修改 json 文件，往里面加入`"navigationStyle": "custom"`。而本项目由于这个 tabbar 的坑(成功撞到南墙)，我需要通过 block 语句来控制一些标签的渲染来达到同样的效果，当然 hidden 同理。

### 搜索框结构

![QQ图片20230108225159.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e625d8ee538c4c818f2d1b89dab84e7d~tplv-k3u1fbpfcp-watermark.image?)

为了适配其他机型，我们不能单纯地用 markman 测量大小之后就给死样式。这时候需要用到系统的数据来控制样式。

![QQ图片20230108233218.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3facd6e5f924ecb88ab9651d863b2e3~tplv-k3u1fbpfcp-watermark.image?)

从图片中我们可以发现，要使用最少的代码达到相同的效果，至少需要三个值，它们分别是当前`按钮到页面顶部的距离navTop`、`按钮高度objectheight`、`搜索栏高度navHeight`。这些值在定制各页面都有可能出现，所以我放入 app.js 中作为全局的数据供各页面选择性引入。

### app.js

```js
onLaunch() {
    wx.getSystemInfo({
      success: res => {
        let menuButtonObject = wx.getMenuButtonBoundingClientRect();
        let statusBarHeight = res.statusBarHeight; // 信息栏高度
        let navHeight = menuButtonObject.height + menuButtonObject.top + (menuButtonObject.top - statusBarHeight)
        let navTop = menuButtonObject.top
        let objectheight = menuButtonObject.height;
        Object.assign(this.globalData,{
          navHeight,
          navTop,
          objectheight
        })
      }
    })
  },
  globalData: {
    navHeight:0,
    navTop:0,
    objectheight:0
  }
```

### index.js

```js
const app = getApp(); // 获取app实例

Page({
  data: {
    bar: 0, // tabbar会改变这个值，不同页的搜索框会有不同的内容
    navHeight: app.globalData.navHeight,
    navTop: app.globalData.navTop,
    objectheight: app.globalData.objectheight,
  },
});
```

### index.wxml

```js
<view class="searchbar_container" style="height:{{navHeight}}px;">
    <block wx:if="{{bar!=2}}">
            <view class="searchbar_img" style="top:{{navTop}}px;width:{{objectheight*2.58}}px;height:{{objectheight}}px;background-image:url('https://img2.tapimg.com/bbcode/images/1a667685a3d219cfd780ee3f0592a067.png');"></view>
            <view class="searchbar_box" style="top:{{navTop}}px;height:{{objectheight}}px;" bindtap="searchbar">
                <view class="searchbar_box__img" style="width:{{0.74*objectheight}}px;height:{{0.74*objectheight}}px;"></view>
                <view class="searchbar_box__label" style="height:{{objectheight}}px;line-height:{{objectheight}}px">搜游戏攻略、社区</view>
            </view>
    </block>
<block wx:if="{{bar==2}}">
    <view class="searchbar_title" style="top:{{navTop}}px;height:{{objectheight}}px;line-height:{{objectheight}}px">TapTap</view>
</block>
</view>

<block wx:if="{{bar == 1}}">
    <view class="message_swiperbar">
        <view class="message_swiperbar__baritem" bindtap="selectmessage" data-message="0">
            <view class="message_swiperbar__barlabel {{message == 0 && 'message_swiperbar__barlabelcheck'}}">推荐</view>
            <view class="{{message == 0 && 'message_swiperbar__barborder'}}"></view>
        </view>
        <view class="message_swiperbar__baritem" bindtap="selectmessage" data-message="1">
            <view class="message_swiperbar__barlabel {{message == 1 && 'message_swiperbar__barlabelcheck'}}">关注</view>
            <view class="{{message == 1 && 'message_swiperbar__barborder'}}"></view>
        </view>
    </view>
</block>
```

### 搜索框跳转

```js
searchbar(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
},
```

## 项目总结

本项目属于纯前端项目，难度较低，适合用于微信小程序本体的开发练手和熟悉响应式编程思想。当然可以在此基础上进行拓展，加入组件化的手法或者使用外部框架。

同时由于是纯前端项目，数据由 fastmock 的外部接口提供，需要勾选右上角'详情' -> '本地设置' -> '不校验合法域名' ，否则数据会被拦截。

## 源码

[项目源码](https://github.com/hannos1/taptap.git)

## 拓展

更多功能将会在这里拓展更新，敬请期待。
