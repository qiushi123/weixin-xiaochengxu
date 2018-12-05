// pages/me/me.js
const app = getApp();
Page({

 // 页面的初始数据
 data: {
  isShowUserName: false,
  userInfo: null,
 },

 // button获取用户信息
 onGotUserInfo: function(e) {
  if (e.detail.userInfo) {
   var user = e.detail.userInfo;
   this.setData({
    isShowUserName: true,
    userInfo: e.detail.userInfo,
   })
   user.openid = app.globalData.openid;
   app._saveUserInfo(user);
  } else {
   app._showSettingToast('登陆需要允许授权');
  }
 },

 //加群主进学习群
 goToBusiness: function (event) {
  var fromType = event.currentTarget.dataset.type;
  wx.navigateTo({
   url: '../business/business',
  })
 },
 
 //生命周期函数--监听页面加载
 onLoad: function(options) {
  var that = this;
  var user = app.globalData.userInfo;
  if (user) {
   that.setData({
    isShowUserName: true,
    userInfo: user,
   })
  } else {
   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
   // 所以此处加入 callback 以防止这种情况
   app.userInfoReadyCallback = res => {
    that.setData({
     userInfo: res.userInfo,
     isShowUserName: true
    })
   }
  }
 },


 //用户点击右上角分享
 onShareAppMessage: function () {
  return {
   title: '零基础入门小程序开发，30天实战入门，30天让你成为技术大牛',
   desc: '零基础入门小程序开发，30天实战入门小程序，30天让你成为技术大牛',
   path: '/pages/index/index',
  }
 },
})