const API_BASE_URL = "https://www.wanandroid.com/"


const request = (url,method,data) =>{
  let _url = API_BASE_URL+url;
  let header = {
    'Content-Type':'application/x-www-form-urlencoded',
    //读取本地保存好的上一次cookie
    'cookie': wx.getStorageSync("sessionid") 
  };
  return new  Promise((resolve,reject)=>{
   wx.request({
     url:_url,
     data: data,
     method:method,
     header:header,
     success(request){
      resolve(request)
     },
     fail(error){
      reject(error.data)
     },
   complete(aaa) {
        // 加载完成
      }
   })
  })
}

module.exports = {
  //登录请求
login:(account,pwd) =>{
  return request("user/login","post",{username :account , password:pwd })
},
//首页banner请求
banner:()=>{
  return request("banner/json","get",{})
},
//首页置顶数据
topArtical:()=>{
 return request("article/top/json","get",{})
},
/**
 * 首页列表接口
 */
homeArticalList:(pageIndex)=>{
  return request('article/list/'+pageIndex+'/json',"get",{})
},
//搜索接口
search:(pageIndex,searchKey)=>{
  return request('article/query/'+pageIndex+'/json',"post",{k:searchKey})
},
//热门搜索数据
hotSearch:()=>{
  return request('hotkey/json',"get",{})
},
//我的积分接口
integral:() =>{
  return request("lg/coin/userinfo/json","get",{})
},
//积分获取列表接口
integralList:(page) =>{
  return request('lg/coin/list/'+page+'/json',"get",{})
},
//积分排行榜接口
integralRanking:(indexPage) =>{
  return request('coin/rank/'+indexPage+'/json',"get",{})
},
//我的消息-新消息(失效)
messageNew :() =>{
  return request('message/lg/list/1',"get",{})
},
//我的消息-历史消息(失效)
messageHistroy :()=>{
  return request('message/lg/history/list/1',"get",{})
},
//收藏文章接口
collecteArtical:(articalId)=>{
  return request('lg/collect/'+articalId+'/json',"post",{})
},
//取消文章收藏接口(文章列表页面)
collecteCancel:(articalId)=>{
  return request('lg/uncollect_originId/'+articalId+'/json',"post",{})
  
},
//取消文章收藏接口(收藏列表页面)
collecteCancelList:(articalId)=>{
  return request('lg/uncollect/'+articalId+'/json',"post",{originId:-1})
  
},
//收藏文章列表接口
collecteList:(pageIndex)=>{
  return request('lg/collect/list/'+pageIndex+'/json',"get",{})
},
/**
 * 问答列表接口
 */
answerQuestion:(pageIndex)=>{
  return request('wenda/list/'+pageIndex+'/json',"get",{})
},
/**
 * 体系数据
 */
systemDatas:()  =>{
  return request('tree/json',"get",{})
},
/**
 * 导航数据
 */
navigationDatas:()  =>{
  return request('navi/json',"get",{})
},
/**
 * 体系二级列表数据
 */
onSubSystemList:(pageIndex,cid) =>{
  return request('article/list/'+pageIndex+'/json',"get",{cid:cid})
},
/**
 * 退出登录
 */
loginOut:() =>{
  return request('user/logout/json','get',{})
},
/**
 *注册账号
 */
registerAccount:(account,pwd,surePwd) =>{
  return request('user/register','post',{username:account,password:pwd,repassword:surePwd})
},
/**
 * 新增todo
 */
addToDo:(title,content,type) =>{
  return request('lg/todo/add/json','post',{title:title,content:content,type:type})
},
/**
 * todo列表
 */
todoList:(pagenum,status,type,orderby)=>{
  return request('lg/todo/v2/list/'+pagenum+'/json','post',{status:status,type:type,orderby:orderby})
},
/**
 * 仅更新todo完成状态
 */
updateTodoStatus:(id,status)=>{
  return request('lg/todo/done/'+id+'/json','post',{status:status})
},
/**
 * 更新todo
 */
updateTodo:(id,title,content,date,status,type)=>{
  return request('lg/todo/update/'+id+'/json','post',{title:title,content:content,date:date,status:status,type:type})
},
/**
 * 获取公众号列表
 */
getPublicAccount(){
  return request('wxarticle/chapters/json ','get',{})
},
/**
 * 获取公众号内容列表
 */
getPublicArticalList(id,pageIndex){
return request('wxarticle/list/'+id+'/'+pageIndex+'/json','get',{});
}

}