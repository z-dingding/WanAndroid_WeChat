// pages/system/index.js
const app = getApp()
const wxapi =require('../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选中的tab
   selTab:0,
   //体系数据
   systemDatas:[],
   //导航数据
   navigationDatas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this =this;
    //请求体系数据
    wxapi.systemDatas().then(res =>{
      if (res.data.errorCode == 0) {
        _this.setData({
          systemDatas: res.data.data
        })
      } else {
        app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
      }
    })
       //请求导航数据
       wxapi.navigationDatas().then(res =>{
        if (res.data.errorCode == 0) {
          _this.setData({
            navigationDatas: res.data.data
          })
        } else {
          app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
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
   * tab项的点击
   */
  tabClick:function(e){
   this.setData({
     selTab:e.target.dataset.index,
   })
  },
    /**
   * item点击事件
   */
  itemClick: function (e) {

    if(this.data.selTab == 0){
      //导航
      wx.navigateTo({
        url: '../subsystem/index?title=' + e.target.dataset.title + '&articalId=' + e.target.dataset.articalid,
      })
     
    }else{
      wx.navigateTo({
        url: '../webview/webview?type=1&urlPath=' + e.target.dataset.url + '&title=' + e.target.dataset.title + '&articalId=' + e.target.dataset.articalid,
      })
      //体系
    }
  
  },
})