// pages/setting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   loading:false,
   version:'',
   currentSize:'',
   limitSize:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取版本号相关信息
    let version = this.getVersionInfo();
    //获取储存信息
    const res = wx.getStorageInfoSync();
    this.setData({
      version:version,
      currentSize:res.currentSize+'KB',
      limitSize:res.limitSize+'KB',
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
  onShareAppMessage: function () {

  },
  /**
   * 获取版本号相关信息
   */
  getVersionInfo(){
    
    console.log(wx.getAccountInfoSync())
    const accountInfo = wx.getAccountInfoSync();
    let version = '暂无信息'
    switch(accountInfo.miniProgram.envVersion){
      case 'develop':
        version = '开发版';
      break
      case 'trial':
        version = '体验版';
      break
      case 'release':
        version = accountInfo.version ;
      break
    }
    return version;
  },
/**
 *缓存大小点击
 */
checkStorageSize:function(){
  wx.showModal({
    showCancel:false,
    title:'提示',
    content:'当前使用:'+this.data.currentSize+',总计:'+this.data.limitSize+'.请放心使用.',
  })
},
checkVersion(){
  wx.showModal({
    showCancel:false,
    title:'提示',
    content:'小程序将自动更新,无需用户操作',
  })
}

















})