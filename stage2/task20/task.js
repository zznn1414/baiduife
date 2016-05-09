/**
 * Created by Administrator on 2016/5/9.
 */
/**
 * Created by Administrator on 2016/4/26.
 */
/*第一步：定义数组queueData存放队列数据*/
var queueData=[];
/*第二步：获取数据画出默认队列：initQueue函数，drawLi函数*/
function initQueue(initNum){
    initNum=initNum||6;
    for(var i=0;i<initNum;i++){
        queueData.push(i);
    }
    drawLi();
}
function drawLi(){
    var queue=document.getElementById("queue");
    var html="";
    for(var i=0;i<queueData.length;i++){
        html+="<li>"+queueData[i]+"</li>";
    }
    queue.innerHTML=html;
}
/*第三步：左侧入，左侧出，右侧入，右侧出四个按钮添加click事件*/
function addListener(e){
    /*获取所需按钮对象*/
    var leftIn=document.getElementById("left-in");
    var rightIn=document.getElementById("right-in");
    var leftOut=document.getElementById("left-out");
    var rightOut=document.getElementById("right-out");
    /*添加onclick事件*/
    leftIn.onclick=function(e){
        handleQueue(this);
    };
    rightIn.onclick=function(e){
        handleQueue(this);
    };
    leftOut.onclick=function(e){
        var value=document.getElementById("text").innerHTML;
        queueData.shift(value);
        drawLi();
    };
    rightOut.onclick=function(e){
        var value=document.getElementById("text").innerHTML;
        queueData.pop(value);
        drawLi();
    }
}
function handleQueue(e){
    if(e.id=="left-in"){
        var arr=check();
        for(var i=0;i<arr.length;i++){
            queueData.unshift(arr[i]);
        }
    }else if(e.id=="right-in"){
        var arr=check();
        for(var i=0;i<arr.length;i++){
            queueData.push(arr[i]);
        }
    }
    drawLi();
}
function check(){
    /*text里可以输入任意字符，获取text里所输入的字符串*/
    var str=document.getElementById("text").value;
    /*判断不同内容之间是哪个字符*/
    var array=str.split(/[,，;；、\s\n#*]+/);
    return array;
}
/*第四步：查询功能实现*/
function searchQueue(){
    var sBtn=document.getElementById("search");
    sBtn.onclick=function(){
        var text=document.getElementById("search-text").value;
        var li=document.getElementsByTagName("li");
        for(var i=0;i<queueData.length;i++){
            li[i].style.background="#CCC";
        }
        for(var i=0;i<queueData.length;i++){
            if(li[i].innerHTML.indexOf(text)>=0){
                li[i].style.background="red";
            }
        }
    }
}
/*第五步：执行函数init*/
function init(){
    initQueue();
    addListener();
    searchQueue();
}
init();
