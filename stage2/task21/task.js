/**
 * Created by Administrator on 2016/4/26.
 */
/*定义两个数组，分别存放tag和hobby*/
var tagData=['HTML5','JavaScript','CSS'];
var hobbyData=['游泳','瑜伽','摄影'];
/*封装两个函数，画初始li标签，以及添加内容*/
function initQueue(initNum,array,id){
    initNum=initNum||3;
    for(var i=0;i<initNum;i++){
        array.push();
    }
    drawLi(id,array);
}
function drawLi(id,array){
    var html="";
    for(var i=0;i<array.length;i++){
        html+="<li>"+array[i]+"</li>";
    }
    document.getElementById(id).innerHTML=html;
}
/*tag函数*/
function tag(){
    /*获取tag里的数据*/
    var tag=document.getElementById("tag-text");
    /*添加键盘事件*/
    tag.onkeyup=function(e) {
        var tagText = tag.value.trim();
        if ((e.keyCode == 32 || e.keyCode == 188 || e.keyCode == 13) && (tagText != "")) {
            /*判断队列长度不超过10*/
            if (check(tagData.length)) {
                /*输入“，”时，不将逗号添加到队列元素中*/
                if (e.keyCode == 188) {
                    tagText = tagText.substr(0, tagText.length - 1);
                }
                repeat(tagData,tagText);
                drawLi("tag-queue", tagData);
                /*队列元素添加完成后，清空输入框*/
                tag.value = "";
            }else {
                repeat2(tagData,tagText);
                drawLi("tag-queue", tagData);
                tag.value = "";
            }
        }
    }
}
function repeat(array,text){
    var exist = false;
    for(var i=0;i<array.length;i++){
        if(text==array[i]){
            exist = true;
            alert("已经存在");
            break;
        }
    }
    if(!exist) {
        array.push(text);
    }
}
function repeat2(array,text){
    var exist = false;
    for(var i=0;i<array.length;i++){
        if(text==array[i]){
            exist = true;
            alert("已经存在");
            break;
        }
    }
    if(!exist) {
        array.push(text);
        array.shift(text);
    }
}
/*校验队列长度的函数*/
function check(length){
    return length>=0&&length<10;
}
/*delTag函数*/
function delTag(){
    var tagQueue=document.getElementById("tag-queue").children;
    for(var i=0;i<tagQueue.length;i++){
        tagQueue[i].onmouseover=function(e){
            this.innerHTML='点击删除'+this.innerHTML;
            this.style.background="red";
        }
        tagQueue[i].onmouseout=function(e){
            this.innerHTML=this.innerHTML.substr(4,this.innerHTML.length-2);
            this.style.background="#8CC8FA";
        }
        tagQueue[i].onclick=function(e){
            var ulTag=document.getElementById("tag-queue");
            ulTag.removeChild(this);
        }
    }
}
/*hobby函数*/
function hobby(e){
    var hobbyBtn=document.getElementById("hobby-btn");
    var hobbyT=document.getElementById("hobby-text");
    hobbyBtn.onclick=function(){
        var hobbyArr=separator();
        for(var i=0;i<hobbyArr.length;i++){
            var hobby=hobbyArr[i].trim();
            if(check(hobbyData.length)) {
                repeat(hobbyData,hobby);
                drawLi("hobby-queue", hobbyData);
                hobbyT.value = "";
            }else {
                repeat2(hobbyData,hobby);
                drawLi("hobby-queue", hobbyData);
                hobbyT.value = "";
            }
        }
    }
}
/**/
function separator(){
    var str=document.getElementById("hobby-text").value;
    var array=str.split(/[,，;；、\s\n#*]+/);
    var array2=[array[0]];
    /*数组去重*/
    for(var i=1;i<array.length;i++){
        var repeat=false;
        for(var j=0;j<array2.length;j++){
            if(array[i]==array2[j]){
                repeat=true;
                break;
            }
        }
        if(!repeat){
            array2.push(array[i]);
        }
    }
    return array2;
}
/*执行函数*/
function init(){
    initQueue(3,tagData,"tag-queue");
    initQueue(3,hobbyData,"hobby-queue");
    tag();
    delTag();
    hobby();
}
init();/**
 * Created by Administrator on 2016/5/9.
 */
