// index.js
// 获取应用实例
const app = getApp()
const wxapi =require("../wxapi/main")

Page({
  data: {
    banners:[]
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
      wx.showModal({
        title:'提示',
        showCancel:false,
        content:res.data.errorMsg
      })
    }
  })
  },
  search:function(value){
   return new Promise((resolve, reject) => {
     //实时(500ms)执行网络请求
   })
  }

})
