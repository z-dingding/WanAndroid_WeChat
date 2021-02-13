/**
 * 判断数组中是否含有某元素
 */
 function isContainEle (array,ele){
   for(let i =0;i<array.length;i++){
     if(array[i] == ele){
      return true;
     }
   }
   return false;
 }
 /**
 * 判断数组中是否含有某元素(obj)
 */
function isContainEleObj(array,obj2){
  for(let i =0;i<array.length;i++){
    if(JSON.stringify(array[i]) === JSON.stringify(obj2)){
     return true;
    }
  }
  return false;
}
/**
 *删除数组中的指定元素
 */
function removeArrayEle(array,ele){
  for(let i =0;i<array.length;i++){
    if(array[i] == ele){
      array.splice(i,1)
      break;
    }
  }
  return array;
}


 module.exports = {
  isContainEle :(array,ele)=>{
   return isContainEle(array,ele);
  },
  removeArrayEle:(array,ele)=>{
     return removeArrayEle(array,ele);
  },
  isContainEleObj:(array,obj)=>{
    return isContainEleObj(array,obj);
  }
 }