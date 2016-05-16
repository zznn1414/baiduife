/**
 * Created by Administrator on 2016/5/10.
 */
//json对象存放图像数据
var dataInt={
    "data":
        [{'src':'images/0.jpg'}, {'src':'images/1.jpg'}, {'src':'images/2.jpg'},
            {'src':'images/3.jpg'},{'src':'images/4.jpg'},{'src':'images/5.jpg'},
            {'src':'images/6.jpg'},{'src':'images/7.jpg'},{'src':'images/8.jpg'},
            {'src':'images/9.jpg'},{'src':'images/10.jpg'},{'src':'images/11.jpg'},
            {'src':'images/12.jpg'},{'src':'images/13.jpg'},{'src':'images/14.jpg'},
            {'src':'images/15.jpg'},{'src':'images/16.jpg'},{'src':'images/17.jpg'},
            {'src':'images/18.jpg'},{'src':'images/19.jpg'}]
};
//插入图片函数
function insertImages() {
    var oParent = document.getElementById("main");
    for (var i = 0; i < dataInt.data.length; i++) {
        var oBox = document.createElement("div");
        oBox.className = "box";
        oParent.appendChild(oBox);
        var oPic = document.createElement("div");
        oPic.className = "pic";
        oBox.appendChild(oPic);
        var oImg = document.createElement("img");
        oImg.src = dataInt.data[i].src;
        oPic.appendChild(oImg);
    }
}
//封装一个通过类获得对象的方法
function getByClass(parent,clsName){
    var boxArr=[];
    var oElements=document.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
//获取最小值高度索引的函数
function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}
//瀑布流函数
function waterfall(parent,box){
    var oParent=document.getElementById(parent);
    //获取盒子对象
    var oBoxs=getByClass(oParent,box);
    //计算整个页面显示图片的列数（浏览器宽度/盒子的宽度）
    var oBoxW=oBoxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main盒子宽度
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
    /*图片排序*/
    //存放每列高度的数组，else表明已经到了第二行，第一行不需要排序
    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH=Math.min.apply(null,hArr);
            var index=getMinhIndex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            oBoxs[i].style.left=oBoxW*index+'px';
            //oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
}
//检测是否具备加载数据块的条件
function checkScrollSlide(){
    var oParent=document.getElementById('main');
    var oBoxs=getByClass(oParent,'box');
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    return lastBoxH<(scrollTop+height)?true:false;
}
//初始化函数
function init(){
    insertImages();
    waterfall('main','box');
    window.onscroll=function(){
        if(checkScrollSlide){
            insertImages();
            waterfall('main','box');
        }
    }
}
init();
