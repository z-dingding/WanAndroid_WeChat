// pages/todoadd/index.js
const app =getApp();
const wxapi =require('../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    type:1,
    title:'',
    content:'',
    rankArray:['工作','生活','娱乐'],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  pickerClick:function(e){
   let value =e.detail.value;
   this.setData({
     index:value,
     type:++value,
   })
  },
  titleInput:function(e){
    this.setData({
      title:e.detail.value,
    })
  },
  contentInput:function(e){
    this.setData({
    content:e.detail.value,
  })
  },
  completeClick:function(){
    let _this = this;
    wxapi.addToDo(this.data.title,this.data.content,this.data.type).then((res)=>{
      if (res.data.errorCode == 0) {
        wx.showToast({
          title: '新增成功',
        })
        wx.navigateBack()
      } else {
        app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
      }
    })
  }
})