// pages/my/index.js
const app = getApp()
const wxapi = require('../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //我的积分
    integralNum: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wxapi.integral().then(function (res) {
      if (res.data.errorCode == 0) {
        _this.setData({
          integralNum:res.data.data.coinCount
        })
      } else {
        app.checkCodeDeal(res.data.errorCode,res.data.errorMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
            if (data.loginResult == "success") {
            }
          },
        }
      })
    } else {
      let field = e.currentTarget.dataset.field
      switch (field) {
        case "integral":

          break;
        case "share":
          current = "我的分享"
          break;
        case "collection":
          current = "我的收藏"
          break;
      }
    }
  }
})