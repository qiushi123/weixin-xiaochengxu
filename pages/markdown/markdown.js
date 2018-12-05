// pages/markdown.js
const app = getApp();
Page({
 data: {
  //article将用来存储towxml数据
  article: {},
  idnum: 0
 },
 //复制博主微信
 copyWeChat: function() {
  app._copyWechatId();
 },

 onLoad: function(options) {
  var that = this;

  var aid = options.aid;
  //随机显示广告位
  that.setData({
   idnum: aid % 5
  });

  //请求文章详情页
  wx.request({
   url: app.globalData.baseUrl + "/article/one?aid=" + aid,
   success: function(response) {
    // console.log(response.data.data);
    //标题
    var title = response.data.data.title;
    if (title != null && title != undefined && title != "") {
     wx.setNavigationBarTitle({
      title: title,
     })
    }
    //正文
    var str = response.data.data.content;
    var content = "内容为空";
    if (str != null && str != undefined && str != "") {
     content = str;
    }
    //将markdown内容转换为towxml数据
    let data = app.towxml.toJson(content, 'markdown');
    //设置文档显示主题，默认'light'
    data.theme = 'main';
    //设置数据
    that.setData({
     article: data
    });
   }
  })

 },

 //用户点击右上角分享
 onShareAppMessage: function() {
  return {
   title: '零基础入门小程序开发，30天实战入门，30天让你成为技术大牛',
   desc: '零基础入门小程序开发，30天实战入门小程序，30天让你成为技术大牛',
   path: '/pages/index/index',
  }
 },
})