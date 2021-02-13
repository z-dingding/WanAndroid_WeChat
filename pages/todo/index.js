// pages/todo/index.js

const app =getApp()
const wxapi =require('../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultIndex: 0,
    // 创建时传入的类型, 默认全部展示工作1；生活2；娱乐3；
    type: 0,
    // status 状态， 1-完成；0未完成; 默认全部展示；
    status:-1,
    //页码从1开始，拼接在url 上
    pageNum:1,
    rangeArray: ['全部', '工作', '生活', '娱乐'],
    //orderby 1:完成日期顺序；2.完成日期逆序；3.创建日期顺序；4.创建日期逆序(默认)；
    orderby:3,
    //当前页面
    curPage:1,
    pageCount:1,
    todolist: [],
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
    let _this = this;
  wxapi.todoList(this.data.pageNum,this.data.status,this.data.type,this.data.orderby).then(res => {
    if (res.data.errorCode == 0) {
      _this.setData({
        curPage:res.data.data.curPage,
        pageCount:res.data.data.pageCount,
        todolist:res.data.data.datas,
      })
    } else {
      app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
    }
  })
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
   * 类别选择器
   */
  typeBindEvent: function (e) {
    let value = e.detail.value
    this.setData({
      defaultIndex: value,
      type:value,
    })
  },
  /**
   * 增加todo按钮
   */
  addClick: function () {
    wx.navigateTo({
      url: '../todoadd/index',
    })
  }














})