/**
 * Created by Administrator on 2016/5/8.
 */
//定义数组存放图片
var imgArr=[
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg"
];
//动态插入图片
function insertImg(imgNum){
    var gallery=document.getElementById("gallery");
    for(var i=0;i<imgNum;i++){
        var div=document.createElement("div");
        div.setAttribute("id","layout_"+(i+1));
        div.setAttribute("class","");
        for(var j= 0;j<imgNum;j++){
            var img=document.createElement("img");
            img.setAttribute("id","items_"+(j+1));
            img.setAttribute("src",imgArr[j]);
            div.appendChild(img);
        }
    }
    gallery.appendChild(div);
}
function insertImages(layNum){
    for(var i=1;i<=layNum;i++) {
        insertImg(i);
    }
}
function init(){
    insertImages(6);
}
init();