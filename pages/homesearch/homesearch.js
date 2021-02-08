// pages/homesearch/homesearch.js
const app = getApp()
const searchKey ='searchKey';
const wxapi = require('../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否展示清除按钮
    showClear:'',
    //当前搜索的页面，默认0开始
    pageIndex:0,
    //搜索关键字
    searchKey:'',
    //上次搜索的关键字
    searchKeyOld:'',
    //热门搜索的数据源
    hotSearchArr:[],
    //搜索结果的数据源
    searchResultArr:[],
    //历史搜索
    historySearchArr:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this= this;
    //热门搜索数据请求
    wxapi.hotSearch().then(function(res){
      if (res.data.errorCode == 0) {
        _this.setData({
          hotSearchArr: res.data.data,
        })
      } else {
        app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
      }
    })
      //获取所有历史搜索数据
      let searchKeyArry = wx.getStorageSync(searchKey);
      if(searchKeyArry != ''){
        this.setData({
          historySearchArr:searchKeyArry
         })
      }else{
        wx.setStorageSync(searchKey,[])
      }

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
   * 实时获取input输入的内容
   */
  inputContent(e){
    if(e.detail.value != null && e.detail.value != ''){
      this.setData({
        searchKey:e.detail.value,
        showClear:'../../images/search_clear.png'
      })
    }else{
      this.setData({
        searchKey:'',
        showClear:''
      })
    }
      
  },
clearEvent:function(e){
    this.setData({
      searchKey:'',
      showClear:''
    })
  },
  /**
   * 执行搜索请求
   */
  searchEvent: function () {
    if(this.data.searchKey != null && this.data.searchKey != ''){
      //避免多次请求
      if(this.data.searchKeyOld != this.data.searchKey){
      //先获取所有存储的数据
     let searchKeyArry = wx.getStorageSync(searchKey);
     //搜索结果记录并存储
     if(!this.isContainKey(searchKeyArry,this.data.searchKey)){
      searchKeyArry.push(this.data.searchKey)
      wx.setStorageSync(searchKey, searchKeyArry)
     }
      //立刻更新历史记录
      this.setData({
        historySearchArr: wx.getStorageSync(searchKey),
        searchKeyOld:this.data.searchKey,
       })
     let _this =this;
      wxapi.search(this.data.pageIndex, this.data.searchKey).then(function (res) {
        if (res.data.errorCode == 0) {
          _this.setData({
            searchResultArr:res.data.data.datas,
          })
        } else {
          app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
        }
      })  
    }
    }else{
       wx.showModal({
         showCancel: false,
         content:'关键字不能为空!',
         title:'提示'
       })
    }
       
  },
  //选择搜索结果的事件
  selectResult: function (e) {
   wx.navigateTo({
     url: '../webview/webview?type=1&urlPath='+e.currentTarget.dataset.url+'&title='+e.currentTarget.dataset.title+'&articalId='+e.currentTarget.dataset.articalid,
   })
  },
  /**
   * 热门搜索的点击
   */
  hotitemclick:function(e){
    this.setData({
      searchKey:e.target.dataset.text,
      showClear:'../../images/search_clear.png',
    })
  },
  /**
   * 历史搜索的清除按钮
   */
  clearHistoryKey: function(e){
    wx.removeStorageSync(searchKey)
   wx.setStorageSync(searchKey, [])
   this.setData({
     historySearchArr:[]
    })
  },
  /**
   * 判断数组是否以包含该元素
   */
  isContainKey:function(arry,sKey){
    let bol =false;
    for(let i=0;i<arry.length;i++){
       if(arry[i] == sKey){
        bol  = true;
        return bol;
       }
    }
    return bol;
  }






})