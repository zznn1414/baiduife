/**
 * Created by Administrator on 2016/4/17.
 */
/*定义数组存放获得的数据*/
var queueData=[];
/*默认条形图*/
function initQueue(initNum){
    initNum=initNum||16;
    for(var i=0;i<initNum;i++){
        var random=Math.ceil(Math.random()*90+10);
        queueData.push(random);
    }
    drawLi();
}
/*画出li标签*/
function drawLi(array){
    array=array||queueData;
    var queue=document.getElementById("queue");
    var html="";
    for(var i=0;i<array.length;i++){
        html+='<li>'+'</li>';
    }
    queue.innerHTML=html;
    var li=document.getElementsByTagName("li");
    for(var j=0;j<array.length;j++){
        li[j].style.height=array[j]*2+'px';
        li[j].style.marginTop=(200-array[j]*2)+'px';
    }
}
/*定义函数，给按钮添加监听事件*/
function addListener(argument){
    /*获取需要的对象*/
    var leftIn=document.getElementById("left-in");
    var rightIn=document.getElementById("right-in");
    var leftOut=document.getElementById("left-out");
    var rightOut=document.getElementById("right-out");
    /*给左侧入添加点击事件*/
    leftIn.onclick=function(e){
        handleQueue(this);
    };
    /*给右侧入添加点击事件*/
    rightIn.onclick=function(e){
        handleQueue(this);
    };
    /*给左侧出添加点击事件*/
    leftOut.onclick=function(e){
        var value=document.getElementById("number").value.trim();
        queueData.shift(value);
        drawLi();
    };
    /*给右侧出添加点击事件*/
    rightOut.onclick=function(e){
        var value=document.getElementById("number").value.trim();
        queueData.pop(value);
        drawLi();
    }
}
function handleQueue(e) {
    var value=document.getElementById("number").value.trim();
    /*判断输入的值必须在10-100之间*/
    if(check(value)) {
        /*if-else if写法*/
        if(e.id=="left-in") {
            if(check2(queueData.length)){
                queueData.unshift(value);
            }else{
                alert("超出队列范围！")
            }
            drawLi();
        } else if(e.id=="right-in") {
            if(check2(queueData.length)){
                queueData.push(value);
            }else{
                alert("超出队列范围！")
            }
            drawLi();
        }

    } else {
        alert("输入的值必须在10-100之间");
    }
}
/*验证函数*/
function check(value){
    return value>=10&&value<=100;
}
function check2(length){
    return length>=0&&length<60;
}

/*执行函数*/
function init(){
    initQueue(40);
    addListener();
    /*随机生成添加点击事件*/
    var random=document.getElementById("random");
    random.onclick=function(){
        queueData=[];
        initQueue(60);
    };
    var sort=document.getElementById("sort");
    sort.onclick=function(){
        var shotArr=sortData(queueData).shotData;
        var interval = setInterval(function(){
            if(shotArr.length == 0) {
                clearInterval(interval);
            } else {
                drawLi(shotArr.shift());
            }
        },20);


    }
}
init();
/*冒泡排序*/
function sortData(data){

    var temp;
    var arr=[];
    for(var i=0;i<data.length-1;i++){
        for(var j=i+1;j<data.length;j++){
            if(data[i]>data[j]){
                temp=data[i];
                data[i]=data[j];
                data[j]=temp;
                arr.push(copy(data));
            }
        }
    }
    var result = {"sortData":data,"shotData":arr};
    return result;
}
function copy(data){
    var data2=[];
    for(var i=0;i<data.length;i++){
        data2[i]=data[i];
    }
    return data2;
}
/**
 * Created by Administrator on 2016/5/9.
 */
