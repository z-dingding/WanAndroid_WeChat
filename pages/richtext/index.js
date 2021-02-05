// pages/richtext/index.js

const htmlSnip =
  `
<div class="div_class">
    <h1>本站积分规则</h1>
    <p>为了感谢在本站比较活跃的用户，本站开发了签到积分功能。</p>
    <p>后续将根据积分，暂定每月赠送一些小礼品给大家，目前礼品还没想法，可能是图书、电子产品一类，排行榜待开发，到时候会在首页宣布获奖者。</p>
    <h2>积分规则</h2>
    <h3>获取积分</h3>
    <ol >
        <li> <b>每日登陆积分 ： 基数 + 登陆次数</b> </li>
        <p>只看登陆天数，不管中间间断没间断。基数默认为 10，每个基数对应最大值为 10 + 29，然后基数增加为 11 ，从 11 + 0 ~ 11 + 29 ，周而复始。</p>
        <li><b>分享文章</b> </li>
        <p>每天仅第一篇会增加积分，避免不必要分享。</p>
    </ol>
    <h2>积分用途</h2>
    <ol>
        <li>领取本站合作礼包，例如：<a style="text-decoration: none;" href="https://market.geekbang.org/activity/channelcoupon/15?utm_source=web&utm_medium=wananzhuo&utm_campaign=changweiliuliang&utm_term=zhanghongyang003&utm_content=0530">极客时间 199 礼包</a></li>
        <li>投递文章免审核（一定积分开启）</li>
        <li> 投递文章直接进入首页（一定积分开启）</li>
        <li>开放上传文件入口（1500积分开启，入口(没有 1500 分会到达首页)</li>
        <li> 开发文章功能（一定积分开启）</li>
    </ol>
    <h2>每天积分打满</h2>
    <ol>
        <li>登录一次</li>
        <li>在广场 tab 分享一次文章（必须要登录，可以无视 1）</li>
    </ol>
    <h2>特殊奖励</h2>
    <ol>
    <li>报备严重 bug，例如 首页崩溃，严重影响用户体验 +66
        </li>
    <li>报备其他 bug，或者优化 +10</li>
</ol>
  </div>
`
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlSnip:htmlSnip
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

  }
})