// pages/collection/index.js
/**
 * 储存收藏文章的key
 */
const key_collectionId='collectionid'
const app =getApp()
const wxApi =require('../wxapi/main')
const arrayutil =require('../../utils/arrayutil')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页码从0开始
    pageIndex:0,
    //当前第几页
    curPage:0,
    //总页数
    pageCount:1,
   //收藏列表数据源
    datas:[]
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
    this.collectionList();
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
   * 重写页面上拉加载功能
   */
  onReachBottom:function(){
   this.loadMore();
  },
  /**
   *请求收藏文章列表
   */
  collectionList(){
    let _this=this;
    wxApi.collecteList(this.data.pageIndex).then(function(res){
     if (res.data.errorCode == 0) {
       _this.setData({
         curPage: res.data.data.curPage,
         pageCount: res.data.data.pageCount,
         datas: res.data.data.datas,
       })
       //每次请求就同步本地存储的collectionId
       _this.syncCollectionId(res.data.data.datas)
     } else {
       app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
     }
    })
  },
  /**
   * 收藏按钮的点击
   */
  imgClick:function(e){
    let _this = this;
    //点击取消收藏要重新请求第一页数据(类似于刷新)
    _this.setData({
      pageIndex:0
    })
    wxApi.collecteCancelList(e.target.dataset.id).then(function (res) {
        if(res.data.errorCode == 0 ){
          _this.collectionList();
          //取消收藏，从本地的记录中删除
          let articalIdArr = wx.getStorageSync(key_collectionId) ;
          if(articalIdArr.length>0 ){
            //注意收藏的id不是原始的id,原始id的字段为originId
            let newArr=  arrayutil.removeArrayEle(articalIdArr,e.target.dataset.originid)
          wx.setStorageSync(key_collectionId,newArr);
          }
          wx.showToast({
            title: '取消收藏成功',
          })
        }else{
          app.checkCodeDeal(res.data.errorCode,res.data.errorMsg)
        }
      })
  },
    /**
   * item点击事件
   */
  itemClick: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../webview/webview?type=1&urlPath='+e.currentTarget.dataset.url+'&title='+e.currentTarget.dataset.title+'&articalId='+e.currentTarget.dataset.articalid,
    })
  },
  /**
   * 同步本地存储的收藏id
   */
  syncCollectionId(array){
    let newArray =[]
    wx.removeStorageSync(key_collectionId)
    for(let i =0;i<array.length ;i++){
      newArray.push(array[i].originId);
    }
    wx.setStorageSync(key_collectionId, newArray)
  },
  /**
   * 加载更多的方法
   */
  loadMore(){
    let _this =this;
    let page = ++this.data.pageIndex
    if (this.data.curPage < this.data.pageCount) {
      wxApi.collecteList(page).then(res => {
        if (res.data.errorCode == 0) {
          let array = _this.data.datas;
          _this.setData({
            pageIndex: page,
            curPage: res.data.data.curPage,
            totalCount: res.data.data.totalCount,
            //concat返回新数组，不改变原数组
            datas: array.concat(res.data.data.datas),
          })
             //每次请求就同步本地存储的collectionId
         _this.syncCollectionId(res.data.data.datas)
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