const db = wx.cloud.database(); //云数据库初始化
const DBList = db.collection('asklist'); //表白墙列表数据库
const app = getApp();
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
  DBList.get({
   success: function(res) { //请求成功
    wx.stopPullDownRefresh(); //停止刷新
    var dataList = res.data;
    console.log(dataList)
    if (dataList === undefined || dataList.length == 0) {
     wx.showToast({
      title: '没有数据',
     })
    } else {
     that.setData({ //获取数据成功后的数据绑定
      dataList: dataList,
      isShowArticle: true
     });
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