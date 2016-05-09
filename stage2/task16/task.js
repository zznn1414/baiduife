/**
 * Created by Administrator on 2016/4/13.
 */
//定义一个对象aqiData，存储用户输入的空气指数数据
var aqiData = {};
//定义变量获取用户输入的数据
var cityInput=document.getElementById("aqi-city-input");
var aqiInput=document.getElementById("aqi-value-input");
//定义函数把获取的数据存入aqiData
function addAqiData() {
    //获取用户输入文本框的内容
    var city=cityInput.value.trim();
    var aqi=aqiInput.value.trim();
    //对用户输入的数据进行判断，输入格式不正确则弹出警告对话框，然后返回继续输入
    if(check(city,aqi)){
        //输入格式正确，则存储数据
        aqiData.city=aqi;
    }else {
        alert("城市名称必须为中英文字符，空气质量指数必须为整数！")
    }
}
function check(x,y){
    return x.match(/^[\u4E00-\u9FA5a-zA-Z]+$/)&&y.match(/^\d+$/g);
}
//添加表格数据函数
function renderAqiList() {
    //通过id获取需要的表格
    var table=document.getElementById("aqi-table");
    //创建表格元素并添加
    var tr=document.createElement("tr");
    var td1=document.createElement("td");
    var td2=document.createElement("td");
    var td3=document.createElement("td");
    var a=document.createElement("a");
    a.innerText="删除";
    a.href="#";
    td1.innerText=cityInput.value;
    td2.innerText=aqiData.city;
    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td3.appendChild(a);
    //为a添加点击事件
    a.onclick=function(){
        delBtnHandle(this);
    };
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}
//表格行删除函数
function delBtnHandle(e) {
    //获取表格对象
    var table=document.getElementById("aqi-table");
    //获取被点击对象的tr对象
    var tr = e.parentNode.parentNode;
    //表格对象删除该tr对象
    table.tBodies[0].removeChild(tr);
    renderAqiList();
}
function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btn=document.getElementById("add-btn");
    btn.addEventListener('click',addBtnHandle,false);
}
init();


/**
 * Created by Administrator on 2016/5/9.
 */
