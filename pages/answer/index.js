// pages/answer/index.js

const app =getApp()
const wxapi = require('../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //请求页码
    pageIndex:1,
    //当前页
    curPage:1,
    //总页数
    pageCount:1,
    //数据源
     datas:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    //请求第一页数据
    wxapi.answerQuestion(this.data.pageIndex).then(res =>{
      if (res.data.errorCode == 0) {
        _this.setData({
          pageCount:res.data.data.pageCount,
          curPage:res.data.data.curPage,
          datas: res.data.data.datas,
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
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击首页列表项事件(注意,方法名不能和其他页面重复)
   * data-xxx小写获取
   */
  itemClick: function (e) {
    wx.navigateTo({
      url: '../webview/webview?type=1&urlPath=' + e.target.dataset.url + '&title=' + e.target.dataset.title + '&articalId=' + e.target.dataset.articalid,
    })
  },
   /**
   * 加载更多请求
   */
  loadMoreData: function () {
    let _this =this;
    let page = ++this.data.pageIndex
    if (this.data.curPage < this.data.pageCount) {
      wxapi.answerQuestion(page).then(res => {
        if (res.data.errorCode == 0) {
          let array = _this.data.datas;
          _this.setData({
            pageIndex: page,
            curPage: res.data.data.curPage,
            totalCount: res.data.data.totalCount,
            //concat返回新数组，不改变原数组
            datas: array.concat(res.data.data.datas),
          })
        } else {
          app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
        }
      })
    }else {
      wx.showModal({
        showCancel: false,
        title:'提示',
        content:'已是最后一页!'
      })
    }
  }
})