// pages/subsystem/index.js
const app =getApp()
const wxapi =require('../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex : 0,
    curPage:1,
    pageCount:1,
     title:'',
    cid:'',
    subSystemDatas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        title: options.title,
        cid:options.articalId,
      })
      this.onSubSystemList(this.data.pageIndex);
    //根据不同文章标题设置page标题
    wx.setNavigationBarTitle({
      title: options.title,
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
 * 请求体系二级列表数据
 */
onSubSystemList:function(pageIndex){
     let _this =this;
      wxapi.onSubSystemList(pageIndex,this.data.cid).then(res =>{
        if (res.data.errorCode == 0) {
          _this.setData({
            curPage:res.data.data.curPage,
            pageCount:res.data.data.pageCount,
            subSystemDatas: res.data.data.datas,
          })
        } else {
          app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
        }
      })
},
  /**
   * item点击事件
   */
  itemClick: function (e) {
    wx.navigateTo({
      url: '../webview/webview?type=1&urlPath='+e.currentTarget.dataset.url+'&title='+e.currentTarget.dataset.title+'&articalId='+e.currentTarget.dataset.articalid,
    })
  }
})