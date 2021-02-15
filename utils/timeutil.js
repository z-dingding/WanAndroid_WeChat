/**
 * 把时间戳格式化为指定格式
 */
function formatDateCommon(v, format) {
    if (!v) {
        return "";
    }
    var dateV = new Date(v);
    var year = dateV.getFullYear();
    var month = dateV.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var date = dateV.getDate();
    date = date < 10 ? ("0" + date) : date;
    var hour = dateV.getHours();
    hour = hour < 10 ? ("0" + hour) : hour;
    var minute = dateV.getMinutes();
    minute = minute < 10 ? ("0" + minute) : minute;
    var second = dateV.getSeconds();
    second = second < 10 ? ("0" + second) : second;
    var str1 = year + "-" + month + "-" + date
    var str2 = hour + ":" + minute + ":" + second;
    var str
    if ("yyyy-MM-dd" == format) {
        str = str1;
    } else {
        str = str1 + " " + str2
    }
    return str;
};


module.exports = {
  formatDate:(timeStamp,format)=>{
  return formatDateCommon(timeStamp,format);
  },
  getTimeStamp:function(){
   return Date.parse(new Date());
  }
}