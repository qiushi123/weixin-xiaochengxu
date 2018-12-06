//index.js
//获取应用实例
const app = getApp()

Page({
 //页面的初始数据
 data: {
  isShowArticle: false,
  dataList: null
 },
 onLoad: function() {
  this.getAskList();
 },
 //页面相关事件处理函数--监听用户下拉动作
 onPullDownRefresh: function() {
  this.getAskList();
 },
 publish() {
  wx.navigateTo({
   url: '../ask/ask',
  })
 },
 //从云开发数据库里列表
 getAskList() {
  let that = this;
  wx.cloud.callFunction({
   // 要调用的云函数名称
   name: 'getHome',
   success: res => {
    wx.stopPullDownRefresh(); //停止刷新
    // console.log(res)
    if (res.result) {
     let dataList = res.result.data;
     console.log({
      dataList
     })
     if (dataList === undefined || dataList.length == 0) {
      wx.showToast({
       title: '没有数据',
      })
     } else {
      that.setData({ //获取数据成功后的数据绑定
       isShowArticle: true,
       dataList: dataList,
      });
     }
    } else {
     wx.showToast({
      title: '没有数据',
     })
    }
   },
   fail: err => {
    wx.stopPullDownRefresh(); //停止刷新
    wx.showToast({
     title: '没有数据',
    })
   }
  })

 },
 //去问答详情页
 goAskDetail: function(event) {
  var id = event.currentTarget.dataset.id;
  console.log(id);
  console.log(event);
  wx.navigateTo({
   url: '../askdetail/askdetail?id=' + id,
  })
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