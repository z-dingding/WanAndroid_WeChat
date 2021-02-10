// pages/register/index.js
const app =getApp()
const wxapi =require('../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNum:'',
    account:'',
    pwd:'',
    surePwd:''
   
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
   * 输入框获取焦点
   */
  inputFocusEvent:function(e){
    let num = '';
    switch(e.target.dataset.num){
     case'0':
     num ='0';
     break;
     case'1':
     num ='1';
     break;
     case'2':
     num ='2';
     break;
    }
    this.setData({
      activeNum:num
    })
  },
  /**
   * 输入框失去焦点
   */
  inputBlurEvent:function(){
    this.setData({
      inputIsActive:false
    })
  },
  /**
   * 账号输入的监听
   */
  accountEvent:function(e){
    this.setData({
      account:e.detail.value,
    })
  },

  pwdEvent:function(e){
    this.setData({
      pwd:e.detail.value,
    })
  },

  surePwdEvent:function(e){
    this.setData({
      surePwd:e.detail.value,
    })
  },
 registerEvent(){
   if(this.data.account != '' || this.data.pwd != '' ||  this.data.surePwd != ''){
     if(this.data.pwd == this.data.surePwd){
      wxapi.registerAccount(this.data.account,this.data.pwd,this.data.surePwd).then((res)=>{
        if (res.data.errorCode == 0) {
          wx.showToast({
            title: '注册账号成功'
          })
          wx.navigateBack()
        } else {
          app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
        }
       })
     }else{
      wx.showToast({
        title: '两次密码不一致'
      })
     }
   }else{
    wx.showToast({
      title: '提交内容不能为空'
    })
   }
  
 }








})