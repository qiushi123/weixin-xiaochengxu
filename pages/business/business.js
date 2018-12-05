// pages/business/business.js
const app = getApp()
Page({


 //生命周期函数--监听页面加载
 onLoad: function(options) {
 },

 copyWeChat: function() {
  app._copyWechatId();
 },

 //用户点击右上角分享
 onShareAppMessage: function () {
  return {
   title: '零基础入门小程序开发，30天实战入门，30天让你成为技术大牛',
   desc: '零基础入门小程序开发，30天实战入门小程序，30天让你成为技术大牛',
   path: '/pages/index/index',
  }
 },
 //广告加载成功事件统计
 clickAD: function (e) {
  console.log("客服页广告加载成功");
  app._lookAD();
 },
})