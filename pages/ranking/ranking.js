// pages/ranking/ranking.js

const wxapi = require('../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexPage:1 ,
    itemList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this =this;
    wx.showLoading({
      title: '正在加载',
    })
 wxapi.integralRanking(_this.data.indexPage).then(function(res){
   wx.hideLoading()
  if (res.data.errorCode == 0) {
    _this.setData({
      itemList:res.data.data.datas,
    })
  } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: res.data.errorMsg
      })
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

  }
})