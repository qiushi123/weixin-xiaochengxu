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
  this._getArticleList();
 },
 //页面相关事件处理函数--监听用户下拉动作
 onPullDownRefresh: function () {
  this._getArticleList();
 },

 // 获取当前用户的所有订单
 _getArticleList: function() {
  var that = this;
  //获取当前用户的订单列表
  wx.request({
   url: app.globalData.baseUrl + "/article/list",
   success: function(res) {
    wx.stopPullDownRefresh(); //停止刷新
    if (res.statusCode != 200) {
     wx.showToast({
      title: '请求数据失败',
      icon: 'loading',
      duration: 1500
     })
    } else { //请求成功
     var dataList = res.data.data;
     console.log(dataList)
     if (dataList === undefined || dataList.length == 0) {
      wx.showToast({
       title: '文章列表为空',
      })
     } else {
      that.setData({ //获取数据成功后的数据绑定
       dataList: dataList,
       isShowArticle: true
      });
     }
    }
   },
   fail: function(res) {
    wx.stopPullDownRefresh(); //停止刷新
    wx.showToast({
     title: '请求失败',
     icon: 'none',
     duration: 1500
    })
   }
  })
 },
 //去文章详情页
 goDetail: function(event) {
  var aid = event.currentTarget.dataset.aid;
  console.log(aid);
  console.log(event);
  wx.navigateTo({
   //1我的订单页,2添加客服微信页,3加盟合作页,4下单页
   url: '../markdown/markdown?aid=' + aid,
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
 //广告加载成功事件统计
 clickAD: function (e) {
  console.log("首页广告加载成功");
  app._lookAD();
 },
})