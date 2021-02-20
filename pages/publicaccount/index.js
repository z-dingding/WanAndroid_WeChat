// pages/publicaccount/index.js
const app =getApp()
const wxapi =require('../wxapi/main')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //数据源
   publicDatas:[],
   //左侧公众号名称选中的id
   publicAccountSel:0,
   //选中左侧对应的右侧scroll-into-view的值
   contentToView:'',
   //右侧滚动对应的左侧scroll-into-view的值
   publicNameToView:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this =this;
    wxapi.getPublicAccount().then(res =>{
      if (res.data.errorCode == 0) {
        let datas = [];
        for(let i =0;i<res.data.data.length;i++){
          let obj = {};
          obj.id = res.data.data[i].id;
          //自己生成一个属性scrollId
          obj.scrollId = "s" + res.data.data[i].id;
          obj.name=res.data.data[i].name;
          obj.children=[]
          datas.push(obj)
        }
        _this.setData({
          publicDatas:datas,
          publicAccountSel:datas[0].scrollId
        })
        //紧接着请求公众号对应的列表内容
          _this.publicAccountArticall(datas)
      } else {
        app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
      }
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
   * 左边项的点击
   */
  leftItemClick:function(e){
    //自己定义的scrollId
    let id = e.currentTarget.dataset.id;

   this.setData({
    publicAccountSel:id,
    contentToView:id,
   })
  },
  /**
   * 请求公众号对应的文章列表详情(只请求第一页展示)
   */
  async publicAccountArticall(datas){
    //注意forEach 增加async
    datas.forEach( async (item,index) => {
      //await返回的不是promise,而是obj
      let response = await wxapi.getPublicArticalList(item.id,1);
      if (response.data.errorCode == 0) {
        const datas = this.data.publicDatas;
        datas[index].children = response.data.data.datas;
        //最后一个请求返回
        if(index == datas.length-1){
            this.setData({
              publicDatas:datas
            })
        }
      }else {
        app.checkCodeDeal(response.data.errorCode, response.data.errorMsg)
      }
    });
  },
  /**
   * 点击列表项事件
   * data-xxx小写获取
   */
  itemClick: function (e) {
    wx.navigateTo({
      url: '../webview/webview?type=1&urlPath=' + e.currentTarget.dataset.url + '&title=' + e.currentTarget.dataset.title + '&articalId=' + e.currentTarget.dataset.articalid
    })
  },
  scroll: function(e) {
  
   //距离顶部的距离
    let scrollTop = e.detail.scrollTop;
   
 
    let offset = 0;
    let isBreak = false;
    for (let g = 0; g < this.data.publicDatas.length; g++) {
      let child = this.data.publicDatas[g];

      offset += 30;
      if (scrollTop <= offset) {
        if (this.data.publicNameToView != child.scrollId) {
          this.setData({
            publicAccountSel: child.scrollId,
            publicNameToView: child.scrollId,
          })
        }
        break;
      }

     //注意，我们每个公众号只展示了两个item
      for (let i = 0; i < 2; i++) {

        offset += 30;

        if (scrollTop <= offset) {

          if (this.data.publicNameToView != child.scrollId) {
            this.setData({
              publicAccountSel: child.scrollId,
              publicNameToView: child.scrollId,
            })
          }

          isBreak = true;
          break;
        }
      }

      if (isBreak){
        break;
      }


    }

  
  }



})