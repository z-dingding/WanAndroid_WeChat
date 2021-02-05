// pages/webview/webview.js
const nodes = `
<p>由于个人小程序不支持打开网页链接，故，你可以采取曲线救国的方式：</p>
<ul>
   <li>复制链接地址手机浏览器(微信粘贴后)打开链接</li>
</ul>
`
const wxapi = require('../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes,
    //区分是加载本地标签还是url地址（0为本地，1为url地址）
    type: '3',
    urlPath: '',
    title: '',
    articalId:'',
    //是否可以使用web-view
    showWebview: false,
    //是否已经收藏该文章
    isCollected: false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == '1') {
      this.setData({
        type: '1',
        urlPath: options.urlPath,
        title: options.title,
        articalId:options.articalId,
      })
    }
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
  onShareAppMessage: function () {},
  /**
   * 点击复制链接
   */
  copyEvent: function () {
    wx.setClipboardData({
      data: this.data.urlPath,
    })
  },
  /**
   * 收藏按钮的点击
   */
  collectionClick: function (e) {
    let _this = this;
    this.setData({
      isCollected: !e.target.dataset.img,
    })
    if (this.data.isCollected) {
 
      wxapi.collecteArtical(this.data.articalId).then(function (res) {
        if(res.data.errorCode == 0 ){
          _this.setData({
            isCollected: true
          })
          wx.showToast({
            title: '收藏成功',
          })
        }else{
          app.checkCodeDeal(res.data.errorCode,res.data.errorMsg)
        }
      })
    } else {
   
      wxapi.collecteCancel(this.data.articalId).then(function (res) {
        if(res.data.errorCode == 0 ){
          _this.setData({
            isCollected: false
          })
          wx.showToast({
            title: '取消收藏成功',
          })
        }else{
          app.checkCodeDeal(res.data.errorCode,res.data.errorMsg)
        }
      })
    }
  }

})