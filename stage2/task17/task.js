// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
var aqiSourceData = {
    "beijing": randomBuildData(500),
    "shanghai": randomBuildData(300),
    "guangzhou": randomBuildData(200),
    "shenzhen": randomBuildData(100),
    "chengdu": randomBuildData(300),
    "xian": randomBuildData(500),
    "fuzhou": randomBuildData(100),
    "xiamen": randomBuildData(100),
    "shenyang": randomBuildData(500)
};
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

var aqiDayData=[],
    aqiWeekData=[],
    aqiMonthData=[];

//画图函数
function drawChart(array,w,color){
    //画出li
    var drawLi="";
    for(var i=0;i<array.length;i++){
        drawLi+="<li>"+"</li>";
    }
    document.getElementById("aqi-chart").innerHTML=drawLi;
    //做li的样式，高为每天的aqi数据，即aqiDayData中的数据
    var li=document.getElementsByTagName("li");
    for(var j=0;j<li.length;j++){
        li[j].style.height=array[j]+'px';
        li[j].style.marginTop=(500-array[j])+'px';
        li[j].style.width=w+'px';
        li[j].style.background=color;
        //时间还不晓得咋获取？？？
        li[j].title='空气质量:'+array[j];
    }
}

//初始数据函数
function initAqiData(city){
    //获取北京2016年1月到3月每天的aqi数据,存入数组aqiDayData
    var x,
        html="",
        obj=aqiSourceData[city];
    for(x in obj){
        html+=obj[x]+" ";
    }
    return aqiDayData=html.substr(1,html.length-2).split(" ");
}

//周平均值计算函数
function weekAve(city){
    var arr=initAqiData(city);
    //计算3个月中每周数据的平均值，存入数组aqiWeekData
    var date = new Date("2016-01-01");
    var weekday=date.getDay();
    var firstWeekDays;
    if(weekday==0){
        firstWeekDays=1;
    }else {
        firstWeekDays=7-weekday+1;
    }
    var lastWeekDays=(91-firstWeekDays)%7;
    var middleWeeks=(91-firstWeekDays-lastWeekDays)/7;
    var weeks=middleWeeks+2;
    //第一周平均
    for(var i= 0,sum1=0;i<firstWeekDays;i++){
        sum1+=Number(arr[i]);
    }
    aqiWeekData[0]=Math.ceil(sum1/firstWeekDays);
    //最后一周平均数据
    for(var j= 91-lastWeekDays+1,sum14=0;j<91;j++){
        sum14+=Number(arr[j]);
    }
    aqiWeekData[weeks-1]=Math.ceil(sum14/lastWeekDays);
    //算出完整周的平均数据函数
    function aqiWeek(n){
        var ave;
        for(var m=firstWeekDays+7*n,sum=0;m<firstWeekDays+7*(n+1);m++){
            sum+=Number(arr[m]);
        }
        return ave=Math.ceil(sum/7);;
    }
    for(var k=0;k<middleWeeks;k++){
        aqiWeekData[k+1]=aqiWeek(k);
    }
    return aqiWeekData;
}

//计算月平均数据
function monthAve(city){
    var arr=initAqiData(city);
    var date=new Date("2016-01-01");
    //求出1-3月每个月共有多少天
    var month1=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    var month2=new Date(date.getFullYear(),date.getMonth()+2,0).getDate();
    var month3=new Date(date.getFullYear(),date.getMonth()+3,0).getDate();
    for(var i= 0,sum1=0;i<month1;i++){
        sum1+=Number(arr[i]);
    }
    aqiMonthData[0]=Math.ceil(sum1/month1);
    for(var j= month1,sum2=0;j<month1+month2;j++){
        sum2+=Number(arr[j]);
    }
    aqiMonthData[1]=Math.ceil(sum2/month2);
    for(var k= month1+month2,sum3=0;k<month1+month2+month3;k++){
        sum3+=Number(arr[k]);
    }
    aqiMonthData[2]=Math.ceil(sum3/month3);
    return aqiMonthData;
}

//时间选择函数
function radioCheck(city){
    var rDay=document.getElementById("day");
    var rWeek=document.getElementById("week");
    var rMonth=document.getElementById("month");
    rDay.onclick=function(){
        initAqiData(city);
        drawChart(aqiDayData,10,"#99B4CE");
    };
    rWeek.onclick=function(){
        weekAve(city);
        drawChart(aqiWeekData,60,"#EDAE9E");
    };
    rMonth.onclick=function(){
        monthAve(city);
        drawChart(aqiMonthData,200,"#5A4563");
    }
}

//城市选择函数
function citySelect(){
    var city=document.getElementById("city");
    city.onchange=function(){
        var n=city.selectedIndex;
        switch (n){
            case 0:
                radioCheck("beijing");
                check("beijing");
                break;
            case 1:
                radioCheck("shanghai");
                check("shanghai");
                break;
            case 2:
                radioCheck("guangzhou");
                check("guangzhou");
                break;
            case 3:
                radioCheck("shenzhen");
                check("shenzhen");
                break;
            case 4:
                radioCheck("chengdu");
                check("chengdu");
                break;
            case 5:
                radioCheck("xian");
                check("xian");
                break;
            case 6:
                radioCheck("fuzhou");
                check("fuzhou");
                break;
            case 7:
                radioCheck("xiamen");
                check("xiamen");
                break;
            case 8:
                radioCheck("shenyang");
                check("shenyang");
                break;
        }
    }
}

function check(city){
    var rDay=document.getElementById("day");
    var rWeek=document.getElementById("week");
    var rMonth=document.getElementById("month");
    if(rDay.checked){
        initAqiData(city);
        drawChart(aqiDayData,10,"#99B4CE");
    }else if(rWeek.checked){
        weekAve(city);
        drawChart(aqiWeekData,60,"#EDAE9E");
    }else {
        monthAve(city);
        drawChart(aqiMonthData,200,"#5A4563");
    }
}

function init() {
    initAqiData("beijing");
    drawChart(aqiDayData,10,"#99B4CE");
    radioCheck("beijing");
    citySelect();
}
init();
/**
 * Created by Administrator on 2016/5/9.
 */
