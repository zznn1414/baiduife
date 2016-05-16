/**
 * Created by Administrator on 2016/4/16.
 */
var queueData=[];
function initQueue(initNum){
    initNum=initNum||6;
    for(var i=0;i<=initNum;i++){
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
    li=document.getElementsByTagName("li");
    for(var i=0;i<li.length;i++) {
        li[i].onclick=function(e){
            var ul=document.getElementById("queue");
            ul.removeChild(this);
        }
        queueData[i]=document.getElementsByTagName("li")[i].innerText;
    }
}
function addListener(argument){
    document.getElementById("left-in").onclick=function(e){
        var value=document.getElementById("number").value;
        queueData.unshift(value);
        drawLi();
    };
    document.getElementById("right-in").onclick=function(e){
        var value=document.getElementById("number").value;
        queueData.push(value);
        drawLi();
    };
    document.getElementById("left-out").onclick=function(e){
        var value=document.getElementById("number").value;
        queueData.shift(value);
        drawLi();
    };
    document.getElementById("right-out").onclick=function(e){
        var value=document.getElementById("number").value;
        queueData.pop(value);
        drawLi();
    }
}
(function(){
    initQueue(5);
    addListener();
})();/**
 * Created by Administrator on 2016/5/9.
 */
