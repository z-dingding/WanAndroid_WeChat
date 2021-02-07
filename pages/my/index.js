// pages/my/index.js
const app = getApp()
const wxapi = require('../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //我的积分
    integralNum: 0,
    //用户名
    username: '',
    //等级
    level: '',
    //排名
    rank: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    //首次进入我的页面,登录失效,登录页面返回请求我的积分(该接口需要登录后请求)
    if (this.data.integralNum == 0) {
      wxapi.integral().then(function (res) {
        if (res.data.errorCode == 0) {
          _this.setData({
            integralNum: res.data.data.coinCount,
            username: res.data.data.username,
            level: res.data.data.level,
            rank: res.data.data.rank,
          })
        } else {
          app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   *检查用户是否已经登录
   */
  checkPermission: function (e) {
    //获取全局的登录状态,没有登录就去登录
    if (!app.globalData.isLogin) {
      wx.navigateTo({
        url: '../login/index?page=login',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data) {
            //登录成功的回调接口
            if (data.loginResult == "success") {}
          },
        }
      })
    } else {
      let field = e.currentTarget.dataset.field
      switch (field) {
        case "integral":
          if (this.data.integralNum > 0) {
            wx.navigateTo({
              url: '../integral/integral?integral=' + this.data.integralNum
            })
          }
          break;
        case "share":
        
          break;
        case "collection":
          wx.navigateTo({
            url: '../collection/index'
          })
          break;
      }
    }
  },
  /**
   * 扫一扫
   */
  scanCodeEvent(e) {
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        wx.showModal({
          showCancel: false,
          title: '提示',
          content:'扫码结果为:'+res.result
        })
      }
    })
  },
  /**
   * 消息通知
   */
  messageEevent : function(){
    wx.navigateTo({
      url: '../message/index',
    })
  }
})