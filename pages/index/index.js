// index.js
// 获取应用实例
const app = getApp()
const wxapi =require("../wxapi/main")

Page({
  data: {
    banners:[],
    //首页置顶数据
    topArticalList:[],
  },
  onLoad() {
    //绑定search函数到当前page(固定写法)
    this.setData({
      search: this.search.bind(this)
  })
  //请求首页banner
  let _this =this
  wxapi.banner().then(function(res){
    if(res.data.errorCode == 0 ){
      _this.setData({
        "banners" : res.data.data
      })
    }else{
      app.checkCodeDeal(res.data.errorCode,res.data.errorMsg)
    }
  })
  //请求首页置顶数据
  wxapi.topArtical().then(function(res){
    if(res.data.errorCode == 0 ){
      _this.setData({
        "topArticalList" : res.data.data
      })
    }else{
      app.checkCodeDeal(res.data.errorCode,res.data.errorMsg)
    }
  })
  },
  search(e){
    wx.navigateTo({
      url: '../homesearch/homesearch',
    })
  },
 

})
