/**
 * Created by Administrator on 2016/5/4.
 */
//年份、月份下拉框添加数据
function select(){
    for(var i=1900;i<=2050;i++){
        $("#selectYear").append("<option>"+i+"年"+"</option>");
    }
    for(var j=1;j<=12;j++){
        $("#selectMonth").append("<option>"+j+"月"+"</option>");
    }
}
//table添加行和列
function table(){
    var table=document.getElementById("table");
    for(var i=0;i<6;i++){
        var tr=document.createElement("tr");
        for(var j=0;j<7;j++){
            var td=document.createElement("td");
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}
//页面布局函数初始化
function addOptionAndTr(){
    select();
    table();
}
//判断某月有多少天
function getDaysInMonth(year,month){
    var days;
    if(month==2){
        days=year%4==0?29:28;
    }else if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
        days=31;
    }else {
        days=30;
    }
    return days;
}
//初始化日历面板
function initDate(){
    var myDate=new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth()+1;
    var d = myDate.getDate();
    myDate.setDate(1);
    var w = myDate.getDay();
    //初始化默认年、月下拉框
    $("#selectYear").val(y+"年");
    $("#selectMonth").val(m+"月");
    var ds=getDaysInMonth(y,m);
    //当月的日期打印到表格中
    var td=document.getElementsByTagName("td");
    for(var i=0;i<ds;i++){
        td[i+w].innerHTML=i+1;
    }
    for(var j=0;j<td.length;j++){
        if(td[j].innerHTML==d){
            td[j].style.background="#59ACFF";
        }
    }
    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;
    $("#dateText").val(y+'-'+m+'-'+d);
    selectMonth(y);
    selectYear(m-1);
}
//自行设定日期
function setDate(year,month){
    //当前日期
    var myDate=new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth()+1;
    var d = myDate.getDate();
    //设定日期
    myDate.setFullYear(year);
    myDate.setMonth(month);
    myDate.setDate(1);
    //获取设定之后的日期
    var y1 = myDate.getFullYear();
    var m1 = myDate.getMonth()+1;
    var d1 = myDate.getDate();
    var w = myDate.getDay();
    var ds=getDaysInMonth(y1,m1);
    var td=document.getElementsByTagName("td");
    for(var i=0;i<td.length;i++){
        td[i].innerHTML=null;
        td[i].style=null;
    }
    for(var j=0;j<ds;j++){
        td[j+w].innerHTML=j+1;
    }
    for(var k=0;k<td.length;k++){
        if(y1==y&&m1==m&&td[k].innerHTML==d){
            td[k].style.background="#59ACFF";
        }
    }
}
//selectMonth下拉框添加onchange事件
function selectMonth(year){
    var selectMonth=document.getElementById("selectMonth");
    selectMonth.onchange=function(){
        var m=selectMonth.selectedIndex;
        for(var i=0;i<12;i++){
            if(m==i){
                setDate(year,i);
                selectYear(i);
            }
        }
    }
}
//selectYear下拉框添加onchange事件
function selectYear(month){
    var selectYear=document.getElementById("selectYear");
    selectYear.onchange=function(){
        var y=selectYear.selectedIndex;
        for(var i=0;i<151;i++){
            if(y==i){
                setDate(i+1900,month);
                selectMonth(i+1900);
            }
        }
    }
}
//选中日期的函数
function clickDate(){
    var td=document.getElementsByTagName("td");
    for(var i=0;i<td.length;i++){
        td[i].onclick=function(){
            for (var j = 0; j < td.length; j++) {
                td[j].style.background = "#fff";
            }
            if(this.innerHTML==""){
                this.style.background = "#fff";
            }else{
                this.style.background = "#59ACFF";
                var y=Number($("#selectYear").val().replace("年",""));
                var m=Number($("#selectMonth").val().replace("月",""));
                m = m < 10 ? '0' + m : m;
                var d=Number(this.innerHTML);
                d = d < 10 ? '0' + d : d;
                $("#dateText").val(y+'-'+m+'-'+d);
            }
        }
    }
}
//其余按钮添加点击事件
function addListener(){
    $("#btnToday").bind("click",function(){
        var td=document.getElementsByTagName("td");
        for (var i = 0; i < td.length; i++) {
            td[i].style.background = "#fff";
        }
        initDate();
    });
    $("#lastMonth").bind("click",function(){
        var y=Number($("#selectYear").val().replace("年",""));
        var m=Number($("#selectMonth").val().replace("月",""));
        if(m==1){
            $("#selectYear").val(y-1+"年");
            $("#selectMonth").val(12+"月");
            setDate(y-1,11);
        }else{
            setDate(y,m-2);
            $("#selectMonth").val(m-1+"月");
        }
    });
    $("#nextMonth").bind("click",function(){
        var y=Number($("#selectYear").val().replace("年",""));
        var m=Number($("#selectMonth").val().replace("月",""));
        if(m==12){
            $("#selectYear").val(y+1+"年");
            $("#selectMonth").val(1+"月");
            setDate(y+1,0);
        }else{
            setDate(y,m);
            $("#selectMonth").val(m+1+"月");
        }
    })
}
//从输入框中获取数据显示在日历面板中
function dateText(){
    var dateText=document.getElementById("dateText").innerHTML;
    IsDate(dateText)
}
function IsDate(mystring) {
    var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
    var str = mystring;
    var arr = reg.exec(str);
    if (str=="") return true;
    if (!reg.test(str)&&RegExp.$2<=12&&RegExp.$3<=31){
        alert("请保证输入的日期格式为yyyy-mm-dd或正确的日期!");
        return false;
    }
    return true;
}
//初始化
function init(){
    addOptionAndTr();
    initDate();
    addListener();
    clickDate();
    dateText();
}
init();
