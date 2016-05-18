/**
 * Created by Administrator on 2016/5/12.
 */

var photos=["images/0.jpg","images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg",
    "images/5.jpg","images/6.jpg","images/7.jpg","images/8.jpg","images/9.jpg",
    "images/10.jpg","images/11.jpg","images/12.jpg","images/13.jpg","images/14.jpg",
    "images/15.jpg","images/16.jpg","images/17.jpg","images/18.jpg","images/19.jpg"];

var addImages=["addImages/img1.jpg","addImages/img2.jpg","addImages/img3.jpg",
                "addImages/img4.jpg","addImages/img5.jpg","addImages/img6.jpg"];


window.onload=function(){
    //初始页面
    ifeAlbum.setImage(photos);
    //添加图片
    ifeAlbum.addImage(photos,addImages);
    //删除图片
    ifeAlbum.removeImage(photos);

};



