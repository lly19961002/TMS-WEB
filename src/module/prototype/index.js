
export default {
 dateChange (date) {
  if(date&&date!==''){
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m > 9 ? m : "0" + m;
    var d = date.getDate();
    d = d > 9 ? d : "0" + d;
    return y + "-" + m + "-" + d
  }else{
    return ''
  }
},

//data [0,1]类型的日期转换
dateRangeChange(date) {
  if(date&&date!==''){
    var date0 = new Date(date[0]);
    var date1 = new Date(date[1]);
    date0 = this.dateChange(date0) + ' 00:00:00';
    date1 = this.dateChange(date1) + ' 23:59:59';
    return [date0,date1]
  }else{
    return ''
  }
},
 timeChange (date) {
  if(date&&date!==''){
    date = new Date(date);
    var y= date.getFullYear();
    var m = date.getMonth()+1;
    m = m > 9 ? m : "0"+m;
    var d = date.getDate();
    d = d > 9 ? d : "0"+d;
    var h = date.getHours();
    h = h > 9 ? h : "0"+h;
    var mi = date.getMinutes();
    mi = mi > 9 ? mi : "0"+mi;
    var se = date.getSeconds();
    se = se > 9 ? se : "0"+se;
    return y+"-"+m+"-"+d+" "+h+":"+mi+":"+se
  }else{
    return ''
  }
},
 numberCheck (cur, old) {
  let value = '';
  if(cur == Number(cur)){
    value = cur ? Number(cur) : cur;
    if(value.length>1){
      value = value.replace(/\b(0+)/gi,"");
      value = value == '' ? 0 :value
    }
  }else{
    value = old
  }
  return value
},
  deepClone(obj) {
  obj = JSON.stringify(obj)
  return JSON.parse(obj)
},
formParamsFilter(form) {
  let newForm = {};
  for(let item in form){
    if(form[item] && form[item]!=''){
      newForm[item] = form[item]
    }
  }
  return newForm
},

  dateFormat() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  }
}
