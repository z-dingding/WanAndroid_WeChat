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
//首页置顶
topArtical:()=>{
 return request("article/top/json","get",{})
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
}


}