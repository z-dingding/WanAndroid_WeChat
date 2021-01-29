// pages/integral/integral.js
const wxapi = require('../wxapi/main')
const timeutil = require('../../utils/timeutil')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 0,
    //请求的页码，从1开始
    currentPage: 1,
    //总页数
    pageCount: 1,
    //数据源列表
    itemList: [],
    //是否正在刷新
    isRefresh: false,
    //是否正在加载更多
    isLoadMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      integral: options.integral
    })
    this.onRequest(this.data.currentPage, this.data.isRefresh)
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
   * 滚动到底部/右边时触发
   */
  lower: function (e) {
    if (this.data.isLoadMore) return
   
     if(this.data.currentPage < this.data.pageCount){
      this.setData({
        isRefresh: false,
        isLoadMore:true,
      })
      this.onRequest(++this.data.currentPage, this.data.isRefresh,this.data.isLoadMore);
     }else{
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '没有更多数据了!'
      })
     }
   
  },
  /**
   * 下拉刷新的回调
   */
  onRefersh: function () {
    if (this.data.isRefresh) return
    this.setData({
      isRefresh: true,
      isLoadMore:false,
      itemList: [],
    })
    this.onRequest(1, this.data.isRefresh);
  },
  /**
   * 请求获取积分列表接口
   */
  onRequest(pageIndex, isRefresh,isLoadMore) {
    if (!isRefresh) {
      wx.showLoading({
        title: '正在加载...',
      })
    }

    let _this = this;
    wxapi.integralList(pageIndex).then(function (res) {
      if (!isRefresh) {
      wx.hideLoading()
    }
      if (res.data.errorCode == 0) {
        let dealList = res.data.data.datas.map(item => {
          item.date = timeutil.formatDate(item.date, ' yyyy-MM-dd HH:mm:ss')
          item.desc = '签到积分' + item.desc.substring(item.desc.lastIndexOf('：'))
          return item;
        })
        _this.setData({
          pageCount: res.data.data.pageCount,
          currentPage: res.data.data.curPage,
          itemList: isLoadMore ? _this.data.itemList.concat(dealList) : dealList,
          isRefresh: isRefresh ? !isRefresh : isRefresh,
          isLoadMore: isLoadMore ? !isLoadMore : isLoadMore
        })
      } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.errorMsg
          })
          _this.setData({
            isRefresh: isRefresh ? !isRefresh : isRefresh,
            isLoadMore: isLoadMore ? !isLoadMore : isLoadMore
          })
      }
    })

  },
})