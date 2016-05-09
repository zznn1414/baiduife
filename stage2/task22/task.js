/**
 * Created by Administrator on 2016/5/9.
 */
/**
 * Created by Administrator on 2016/4/29.
 */
//获取根节点节点
var headNode=document.getElementById("box");
//定义一个数组存放节点
var list=[];
//先序遍历
function preOrder(node){
    list.push(node);
    if (node.firstElementChild!==null) {
        preOrder(node.firstElementChild);
    }
    if (node.lastElementChild!==null) {
        preOrder(node.lastElementChild);
    }
}
//中序遍历
function inOrder(node){
    if (node.firstElementChild!==null) {
        inOrder(node.firstElementChild);
    }
    list.push(node);
    if (node.lastElementChild!==null) {
        inOrder(node.lastElementChild);
    }
}
//后序遍历
function postOrder(node){
    if (node.firstElementChild!==null) {
        postOrder(node.firstElementChild);
    }
    if (node.lastElementChild!==null) {
        postOrder(node.lastElementChild);
    }
    list.push(node);
}
//定时器函数
var timer=null;
function startInterval(){
    var i=0;
    list[i].style.background="#CCC";
    timer=setInterval(function(){
        i++;
        if(i<list.length){
            list[i-1].style.background="#fff";
            list[i].style.background="#CCC";
        }else{
            clearInterval(timer);
            list[list.length-1].style.background="#fff";
        }
    },500);
}
function styleReset(){
    var divs=document.getElementsByTagName("div");
    for(var i=0;i<divs.length;i++){
        divs[i].style.background="#fff";
    }
}
function init(){
    var preBtn=document.getElementById("preBtn"),
        inBtn=document.getElementById("inBtn"),
        postBtn=document.getElementById("postBtn");
    preBtn.onclick=function(){
        styleReset();
        clearInterval(timer);
        list=[];
        preOrder(headNode);
        startInterval();
    };
    inBtn.onclick=function(){
        styleReset();
        clearInterval(timer);
        list=[];
        inOrder(headNode);
        startInterval();
    };
    postBtn.onclick=function(){
        styleReset();
        clearInterval(timer);
        list=[];
        postOrder(headNode);
        startInterval();
    }
}
init();