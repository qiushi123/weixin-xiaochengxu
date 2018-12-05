//app.js
const Towxml = require('/towxml/main'); //引入towxml库
App({
 //创建towxml对象，供小程序页面使用
 towxml: new Towxml(),
 globalData: {
  userInfo: null,
  openid: null,
  // baseUrl: 'http://localhost:8080',
  baseUrl: 'https://30paotui.com'
 },
 onLaunch: function() {
  this.getOpenid();
  this._getUserInfo(); //为了广告统计，这里需要提前获取用户信息
 },
 // 获取用户openid
 getOpenid: function() {
  var app = this;
  var openidStor = wx.getStorageSync('openid');
  if (openidStor) {
   console.log('本地获取openid:' + openidStor);
   app.globalData.openid = openidStor;
   app._getUserInfo();
  } else {
   //获取openid不需要授权
   wx.login({
    success: function(res) {
     //请求自己后台获取用户openid
     wx.request({
      url: app.globalData.baseUrl + '/user/wechat',
      data: {
       appid: 'wx7c54942dfc87f4d8',
       secret: '79f737d1d2f9473b0a659f52ff404067',
       code: res.code
      },
      success: function(response) {
       var openid = response.data.openid;
       app.globalData.openid = openid;
       console.log('请求获取openid:' + openid);
       wx.setStorageSync('openid', openid)
       app._getUserInfo();
      }
     })
    }
   })
  }
 },

 // 获取用户信息，如果用户没有授权，就获取不到
 _getUserInfo: function() {
  var app = this;
  wx.getUserInfo({ //从网络获取最新用户信息
   success: function(res) {
    var user = res.userInfo;
    user.openid = app.globalData.openid;
    app.globalData.userInfo = user;
    console.log('请求获取user成功')
    console.log(user)
    app._saveUserInfo(user);
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (app.userInfoReadyCallback) {
     app.userInfoReadyCallback(res)
    }
   },
   fail: function(res) { //请求网络失败时，再读本地数据
    console.log('请求获取user失败')
    var userStor = wx.getStorageSync('user');
    if (userStor) {
     console.log('本地获取user')
     app.globalData.userInfo = userStor;
    }
   }
  })
 },

 // 保存userinfo
 _saveUserInfo: function(user) {
  //缓存全局变量
  this.globalData.userInfo = user;
  //缓存到sd卡里
  wx.setStorageSync('user', user);
 },
 // 打开权限设置页提示框
 _showSettingToast: function(e) {
  wx.showModal({
   title: '提示！',
   confirmText: '去设置',
   showCancel: false,
   content: e,
   success: function(res) {
    if (res.confirm) {
     wx.navigateTo({
      url: '../setting/setting',
     })
    }
   }
  })
 },
 // 复制老师微信
 _copyWechatId: function() {
  wx.setClipboardData({
   data: '2501902696',
   success: function(res) {
    wx.getClipboardData({
     success: function(res) {
      console.log('复制成功')
      console.log(res.data) // data
     }
    })
   }
  })
 },

 
 //获取今天是本月第几周
 _getWeek: function() {
  // 将字符串转为标准时间格式
  let date = new Date();
  let month = date.getMonth() + 1;
  let week = this.getWeekFromDate(date);
  if (week === 0) { //第0周归于上月的最后一周
   month = date.getMonth();
   let dateLast = new Date();
   let dayLast = new Date(dateLast.getFullYear(), dateLast.getMonth(), 0).getDate();
   let timestamp = new Date(new Date().getFullYear(), new Date().getMonth() - 1, dayLast);
   week = this.getWeekFromDate(new Date(timestamp));
  }
  let time = month + "月第" + week + "周";
  return time;
 },

 getWeekFromDate: function(date) {
  // 将字符串转为标准时间格式
  let w = date.getDay(); //周几
  if (w === 0) {
   w = 7;
  }
  let week = Math.ceil((date.getDate() + 6 - w) / 7) - 1;
  return week;
 },
})