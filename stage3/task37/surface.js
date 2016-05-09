/**
 * Created by Administrator on 2016/4/18.
 */
//获取元素
var btn=document.getElementById("btn");
var surface=document.getElementById("surface");
var surfaceTop=document.getElementById("surfaceTop");
var back=document.getElementById("back");
var confirm=document.getElementById("confirm");
var cancel=document.getElementById("cancel");
//浮出层效果
function surf(){
    surface.style.display="block";
    back.style.backgroundColor="#000000";
    back.style.opacity="0.5";
    back.style.filter="alpha(opacity=50)";
}
function bac(){
    surface.style.display="none";
    back.style.backgroundColor="#ffffff";
    back.style.opacity="0";
    back.style.filter="alpha(opacity=0)"
}
function conf(){
    surface.style.display="none";
    back.style.backgroundColor="#ffffff";
    back.style.opacity="0";
    back.style.filter="alpha(opacity=0)"
}
function can(){
    surface.style.display="none";
    back.style.backgroundColor="#ffffff";
    back.style.opacity="0";
    back.style.filter="alpha(opacity=0)"
}
btn.addEventListener('click',surf,false);
back.addEventListener('click',bac,false);
confirm.addEventListener('click',conf,false);
cancel.addEventListener('click',can,false);
//拖拽移动效果
window.onload=drag;
function drag(){
    surfaceTop.onmousedown=fnDown;
}
function fnDown(e){
    e = e||window.event;
    //光标按下时，光标和面板之间的距离
    disX= e.clientX-surface.offsetLeft;
    disY= e.clientY-surface.offsetTop;
    //移动
    document.onmousemove=function(e){
        e = e||window.event;
        fnMove(e,disX,disY);
    }
    //释放
    document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    }
}
function fnMove(e,PosX,PosY){
    var l= e.clientX-disX;
    var t= e.clientY-disY;
    winW=document.documentElement.clientWidth||document.body.clientWidth;
    winH=document.documentElement.clientHeight||document.body.clientHeight;
    maxW=winW-surface.offsetWidth;
    maxH=winH-surface.offsetHeight;
    if(l<0){
        l=0
    }else if(l>maxW){
        l=maxW;
    }
    if(t<0){
        t=0
    }else if(t>maxH){
        t=maxH;
    }
    surface.style.left=(l+300)+'px';
    surface.style.top=(t+150)+'px';
}
