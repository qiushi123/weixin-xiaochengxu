const db = wx.cloud.database(); //云数据库初始化
const DB = db.collection('asklist');
const app = getApp();

Page({
 //页面的初始数据
 data: {
  desc: '' //问题
 },

 // 获取用户输入的问题
 bindinputDesc: function(e) {
  this.setData({
   desc: e.detail.value
  })
 },

 //发布问题
 formSubmit: function() {
  var that = this;
  //如果openid不存在，就重新请求接口获取openid
  if (!app.globalData.userInfo) {
   wx.showToast({ //这里提示失败原因
    title: '您还没有登陆！',
    duration: 1500
   });
   wx.switchTab({
    url: '../me/me'
   })
   return;
  }

  var openid = app.globalData.openid;
  var name = app.globalData.userInfo.nickName;
  if (openid === null || openid === undefined ||
   name === null || name === undefined) {
   app.getOpenid();
   wx.showToast({ //这里提示失败原因
    title: '您还没有登陆！',
    duration: 1500
   });
   wx.switchTab({
    url: '../me/me'
   })
   return;
  }


  let desc = that.data.desc;
  if (desc.length == 0) {
   app.showErrorToastUtils('问题不能为空')
  } else if (desc.length <= 6) {
   app.showErrorToastUtils('问题太简单了,至少6位以上')
  } else {
   //云函数提交数据
   DB.add({
    data: {
     name: name, //用户名
     desc: desc, //问题详情
     answer:'等待老师回答',
     createTime: db.serverDate(),
     time: app._getCurrentTime() //发布时间
    },
    success: function(res) {
     console.log('提交成功：', res)
     wx.showToast({
      title: '信息提交成功', //这里成功
      icon: 'success',
      duration: 1000
     });
    },
    fail: function(err) {
     wx.showToast({
      title: '信息提交失败', //这里成功
      icon: 'success',
      duration: 1000
     });
    }
   })
  }
 },
 //用户点击右上角分享
 onShareAppMessage: function() {
  return {
   title: '零基础入门小程序开发，10天实战入门，30天让你成为技术大牛',
   desc: '零基础入门小程序开发，10天实战入门小程序，30天让你成为技术大牛',
   path: '/pages/index/index',
  }
 },

})