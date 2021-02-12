// pages/readhistory/index.js

const app =getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMessage:'暂无数据',
    datas:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arrays = wx.getStorageSync(app.globalData.key_readHistory)
    this.setData({
      datas:arrays.reverse(),
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
   * itme的点击
   */
itemClick: function (e) {
    wx.navigateTo({
      url: '../webview/webview?type=1&urlPath=' + e.currentTarget.dataset.url + '&title=' + e.currentTarget.dataset.title+'&isShowCollection=false',
    })
  },
})