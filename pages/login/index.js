//引入网络模块
const WXAPI = require('../wxapi/main')
const app = getApp()





Page({

  /**
   * 页面的初始数据
   */
  data: {
    //toptips组件的提示文字
    error:"",
    rules_Array:[
      {
        name:"account",
        rules:{required : true , message:"账号不能为空"}
      },
      {
        name:"pwd",
        rules:{required : true , message:"密码不能为空"}
      },
    ],
    formData:{},
    //账号
    account:"",
    //密码
    pwd:"",
    //登录按钮前是否展示登录图标
    isShowLoading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('来自'+options.page+'页面')
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
 * models中需要校验的表单的数据
 */
  formInputChange(e) {
     if(e.currentTarget.dataset.field == "account"){
      this.setData({
        account: e.detail.value
       })
     }else{
      this.setData({
        pwd: e.detail.value
       })
     }
    //field="account"
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
},
/**
 * 账号输入的监听
 */
inputAccoutEvent(e){
  this.setData({
    account : e.detail.value
  })
},
/**
 * 密码输入的监听
 */
  inputPwdEvent(e){
    this.setData({
      pwd :  e.detail.value
    })
},
  /**
   * 登录按钮的监听
   */
  loginEvent: function(){
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })
          }
      } else {
        //执行登录请求
        this.setData({
          //展示登录图标，登录按钮不可点击
          isShowLoading: true,
      })
        let pwd = this.data.pwd
        let account =this.data.account
        let _this = this
        WXAPI.login(account,pwd).then(function(res){
          _this.setData({
            //隐藏登录图标，登录按钮可点击
            isShowLoading: false,
        })
           if(res.data.errorCode == 0){
             //登录成功，回调数据给上一个界面
              const eventChannel = _this.getOpenerEventChannel()
              eventChannel.emit('acceptDataFromOpenedPage', {loginResult: 'success'});
              let cookie = res.header["Set-Cookie"];
              if (cookie != null) {
              wx.setStorageSync('sessionid', cookie)
              }
             //更新app全局状态
             app.globalData.isLogin = true
            //登录成功,关闭当前页面，返回上一级页面
            wx.navigateBack()
           }else{
             wx.showModal({
               title:'提示',
               showCancel:false,
               content:res.data.errorMsg
             })
           }
        })
      }
  })
  },
  /**
   * 注册事件
   */
  rigister:function(){
   wx.navigateTo({
     url: '../register/index'
   })
  }
});