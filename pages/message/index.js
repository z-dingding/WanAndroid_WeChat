// pages/message/index.js
//自己编的数据
const historyData ='[{"type": "系统消息","author": "鸿洋","date": "2020-11-12 22:53","title": "字节跳动-懂车帝-大力招Android研发,站长所在团队哈，一起并肩作战."}, {"type": "系统消息","author": "鸿洋","date": "2020-11-12 22:53","title": "自定义控件测量模式真的和math_parent,wrap_content一一对应吗？"}]';

// const historyData ='{"data":[{"type": "系统消息","author": "鸿洋","date": "2020-11-12 22:53","title": "字节跳动-懂车帝-大力招Android研发,站长所在团队哈，一起并肩作战."}, {"type": "系统消息","author": "鸿洋","date": "2020-11-12 22:53","title": "自定义控件测量模式真的和math_parent,wrap_content一一对应吗？"}]}';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        "text": "新消息",
        "iconPath": "/images/message_new_nor.png",
        "selectedIconPath": "/images/message_new_sel.png",
         //是否展示tab的圆点
        dot: false
      },
      {
        "text": "历史消息",
        // 此处用绝对路径
        "iconPath": "/images/message_history_nor.png",
        "selectedIconPath": "/images/message_history_sel.png",
        //tab提示文字内容
        badge: ''
      }
    ],
    //当前选中tab索引
    currentTab:0,
    showMessage:'暂无数据',
    //新消息的数据源
    newMesList:[],
    //历史消息的数据源
    historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
       //由JSON字符串转换为JSON对象
      historyList: JSON.parse(historyData)
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
  tabChange(e){
    this.setData({
      currentTab:e.detail.index
    })
  }
})