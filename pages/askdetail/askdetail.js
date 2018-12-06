const app = getApp();
let detailId;
Page({
 data: {
  //表白详情
  biaobaiDeatil: null,
  pinglun: '',
  pinglunArr: [], //评论列表
  isShowWeiZhi: false, //是否显示位置按钮
  inputBoxShow: false,
  isScroll: true,
 },
 //点击去评论
 formSubmit() {
  this.showInputBox();
 },
 //弹起评论框
 showInputBox() {
  this.setData({
   inputBoxShow: true,
   isScroll: false
  });
 },

 invisible() {
  this.setData({
   inputBoxShow: false,
   isScroll: true
  });
 },

 //获取评论内容
 bindinputPingLun(e) {
  this.setData({
   pinglun: e.detail.value
  })
 },
 //发布评论
 fabiaoPingLun() {
  let that = this;
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

  let name = app.globalData.userInfo.nickName;
  if (name === null || name === undefined) {
   app.getOpenid();
   wx.showToast({ //这里提示失败原因
    title: '您还没有登陆！',
    duration: 1500
   })
   return;
  }

  let neirong = that.data.pinglun;
  let pinglunArrOld = that.data.pinglunArr;
  if (neirong.length == 0) {
   app.showErrorToastUtils('评论不能为空')
  } else if (neirong.length < 2) {
   app.showErrorToastUtils('评论至少2个字')
  } else {
   console.log({
    pinglunArrOld
   })
   pinglunArrOld.push({
    name: name, //评论者名字
    neirong: neirong, //评论内容
    time: app._getCurrentTime(), //评论时间
   });
   console.log({
    pinglunArrOld
   })
   wx.cloud.callFunction({
    name: 'addPingLun',
    data: {
     detailId: detailId,
     pinglunArr: pinglunArrOld
    },
    complete: res => {
     console.log('云函数提交评论的结果', res.result)
     if (res.result) {
      wx.showToast({
       title: '信息提交成功', //这里成功
       icon: 'success',
       duration: 1000
      });
      that.getOneBiaoBai(detailId); //刷新评论列表
      that.invisible(); //隐藏评论弹起框
     } else {
      wx.showToast({
       title: '提交失败',
      })
     }
    }
   })
  }
 },
 onLoad: function(options) {
  let spoorid = options.id;
  // let spoorid = "XAh-QJT75u22VRLx";
  detailId = spoorid;
  console.log({
   spoorid
  });
  this.getOneBiaoBai(spoorid);
 },
 //获取单个表白详情
 getOneBiaoBai: function(spoorid) {
  let that = this;
  wx.cloud.callFunction({
   name: 'getDetail',
   data: {
    detailId: spoorid
   },
   complete: res => {
    console.log('云函数获取到详情', res.result.data)
    if (res.result) {
     var bean = res.result.data;
     console.log(bean)
     if (bean === undefined || bean === null) {
      wx.showToast({
       title: '没有数据',
      })
     } else {
      that.setData({ //获取数据成功后的数据绑定
       biaobaiDeatil: bean,
      });
      if (bean.longitude>0){
       that.setData({ //获取数据成功后显示查看位置按钮
        isShowWeiZhi: true,
       });
      }else{
       that.setData({ 
        isShowWeiZhi: false,
       });
      }
      if (bean.pinglun) {
       that.setData({ //获取数据成功后的数据绑定
        pinglunArr: bean.pinglun,
       });
      }
     }
    } else {
     wx.showToast({
      title: '没有数据',
     })
    }
   }
  })

 },
 //用户点击右上角分享
 onShareAppMessage: function () {
  return {
   title: '零基础入门小程序开发，10天实战入门，30天让你成为技术大牛',
   desc: '零基础入门小程序开发，10天实战入门小程序，30天让你成为技术大牛',
   path: '/pages/index/index',
  }
 },

})