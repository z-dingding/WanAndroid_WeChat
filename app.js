// app.js
App({
  //小程序初始化完成时触发，全局只触发一次
  onLaunch() {
    let sessionid =  wx.getStorageSync("sessionid") ;
    if(sessionid == null && sessionid==""){
      this.globalData.isLogin = false
    }else{
      this.globalData.isLogin = true
    }
  },
  //跳转到登录页面
  goLoginPageTimeOut : function(){
   this.globalData.isLogin = false
   wx.navigateTo({
     url: '/pages/login/index',
   })
  },
  //判断请求返回的code码的情况(登录失效)
  checkCodeDeal:function(code,errorMsg){
    let _this =this;
    if(code == -1001){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: errorMsg,
        success (touch) {
          if (touch.confirm) {
    
              _this.goLoginPageTimeOut();

          } 
      }
      })
    }else{
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: errorMsg
      })
    }
  },
  //全局变量的存储区域
  globalData: {
    userInfo: null,
    /**是否已经登录的标识，false没有登录*/
    isLogin:false
  }
})
