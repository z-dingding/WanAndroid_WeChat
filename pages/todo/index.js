// pages/todo/index.js

const app =getApp()
const wxapi =require('../wxapi/main')
const  time =require('../../utils/timeutil')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rangeArray: ['全部', '工作', '生活', '娱乐'],
     // 创建时传入的类型, 默认0全部展示工作1；生活2；娱乐3；
     type: 0,
    //orderby 1:完成日期顺序；2.完成日期逆序；3.创建日期顺序；4.创建日期逆序(默认)；
    orderby:3,
    //页码从1开始，拼接在url 上
    pageNum:0,
    //当前页面
    curPage:0,
    pageCount:1,
    todolist: [],
       // status 状态， 1-完成；0未完成; 默认全部展示-1；
      statusArray:[{desc:'全部' ,status:-1},{desc:'未完成' ,status:0},{desc:'完成' ,status:1}],
      //记录当前选中状态在数组中的下标
      statusIndex:0,
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
    this.setData({
      //每次可见就重新加载
      pageNum:0,
      curPage:0,
      pageCount:1,
      todolist: [],
    })
    this.loadMore();
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
   * 重写页面上拉加载功能
   */
  onReachBottom:function(){
    this.loadMore();
   },
  /**
   * 类别选择器
   */
  typeBindEvent: function (e) {
    let value = e.detail.value
    if(this.data.type != value){
      this.setData({
        type:value,
         //每次切换就重新设置页码和清空数组
         pageNum:0,
         todolist: [],
         curPage:0,
         pageCount:1,
      })
     
      this.loadMore();
    }
 
  },
  /**
   * 状态选择器
   */
  pickerStatusClick:function(e){
    let value =e.detail.value;
    //如果跟上一次的选择不同，执行网络请求
    if(value != this.data.statusIndex){
      this.setData({
        statusIndex:value,
          //每次切换就重新设置页码和清空数组
          pageNum:0,
          todolist: [],
          curPage:0,
          pageCount:1,
      })
 
      this.loadMore();
    }
   },
  /**
   * 增加todo按钮
   */
  addClick: function () {
    wx.navigateTo({
      url: '../todoadd/index',
    })
  },
  /**
   * 请求todo列表
   */
  // getToDoList(){
  //   let _this = this;
  //   wxapi.todoList(this.data.pageNum,this.data.statusArray[parseInt(this.data.statusIndex)].status,this.data.type,this.data.orderby).then(res => {
  //     if (res.data.errorCode == 0) {
  //       _this.setData({
  //         curPage:res.data.data.curPage,
  //         pageCount:res.data.data.pageCount,
  //         todolist:res.data.data.datas,
  //       })
  //     } else {
  //       app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
  //     }
  //   })
  // },
  /**
   * 完成或未完成事件的点击
   */
  completeClick:function(e){
    let _this = this;
    let index =  e.target.dataset.index;
    let obj = e.target.dataset.obj;
    let status = obj.status == 0?1:0;
    wxapi.updateTodoStatus(obj.id,status).then((res)=>{
      if (res.data.errorCode == 0) {
        let obj =res.data.data;
        let array = _this.data.todolist;
        //如果修改后的状态和当前展示的状态是一致的
        //当前状态未全部和完成或全部和未完成
        if(_this.data.statusIndex == 0 ||  obj.status == _this.data.status){
          //修改
          array[parseInt(index)] = obj
        }else{
          //删除
          array.splice(index,1)
        }
        _this.setData({
          todolist:array,
        })
        wx.showToast({
          title: '修改成功',
        })
      } else {
        app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
      }
    })
  },
/**
 * item点击
 */
itemClick(e){
 wx.navigateTo({
   url: '../todoadd/index?obj='+JSON.stringify(e.currentTarget.dataset.obj),
 })
},
/**
   * 加载更多的方法
   */
  loadMore(){
    let _this =this;
    let page = ++this.data.pageNum;
    if (this.data.curPage < this.data.pageCount) {
      wxapi.todoList(page,this.data.statusArray[parseInt(this.data.statusIndex)].status,this.data.type,this.data.orderby).then(res => {
        if (res.data.errorCode == 0) {
          let array = _this.data.todolist;
          _this.setData({
            curPage:res.data.data.curPage,
            pageCount:res.data.data.pageCount,
            todolist:array.concat(res.data.data.datas),
          })
        } else {
          app.checkCodeDeal(res.data.errorCode, res.data.errorMsg)
        }
      })
    }else {
      wx.showModal({
        showCancel: false,
        title:'提示',
        content:'已是最后一页!'
      })
    }
  }
 













})