/**
 * Created by Administrator on 2016/5/12.
 */
(function (window) {

    // 由于是第三方库，我们使用严格模式，尽可能发现潜在问题
    'use strict';



    function IfeAlbum() {

        // 布局的枚举类型
        this.LAYOUT = {
            PUZZLE: 1,    // 拼图布局
            WATERFALL: 2, // 瀑布布局
            BARREL: 3     // 木桶布局
        };

        // 公有变量可以写在这里
        // this.xxx = ...

    }

    // 私有变量可以写在这里
    // var xxx = ...


    /************* 以下是本库提供的公有方法 *************/


    /**
     * 图片预加载
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     */
    IfeAlbum.prototype.preLoadImages=function(image){
        var newImages=[],loadedImages=0;
        var postAction=function(){};
        //确保参数总是数组
        var arr=(typeof image!="object")?[image]:image;
        function imageLoadPost(){
            loadedImages++;
            if(loadedImages==arr.length){
                postAction(newImages);
            }
        }
        for(var i=0;i<arr.length;i++){
            newImages[i]=new Image();
            newImages[i].src=image[i];
            newImages[i].onload=function(){
                imageLoadPost();
            };
            newImages[i].onerror=function(){
                imageLoadPost();
            }
        }
        return {
            done:function(f){
                postAction=f||postAction;
            }
        }
    };


    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    IfeAlbum.prototype.setImage = function (image, option) {

        if (typeof image === 'string') {
            // 包装成数组处理
            this.setImage([image]);
            return;
        }

        // 你的实现

        //页面添加标签，并添加内容
        var gallery="<div id='gallery'>";
        for(var i=0;i<image.length;i++){
            gallery+="<div class='pic'>";
            gallery+="<img src="+image[i]+">";
            gallery+="<input type='checkbox' class='checkbox' name="+i+" style='width:20px;height:20px;position:absolute;top: 0;margin-left: -10px;display: none'>";
            gallery+="</div>";
        }
        gallery+="</div>";
        $("#main").html(gallery);

        //设置相册默认布局
        ifeAlbum.preLoadImages(image).done(function(){
            ifeAlbum.setLayout(2);
        });

    };




    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    IfeAlbum.prototype.getImageDomElements = function() {

    };



    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     * @param {(string|string[])} addImages 一张图片的 URL 或多张图片 URL 组成的数组，要添加的数组
     */
    IfeAlbum.prototype.addImage = function (image,addImages) {

        $("#confirmBtn").click(function(){
            var imgNum=$("#imgNum").val();
            if(imgNum>0&&imgNum<=addImages.length){
                for(var i=0;i<imgNum;i++){
                    image.push(addImages[i]);
                    $("#imgNum").val("");
                }
            }else{
                for(var j=0;j<addImages.length;j++){
                    image.push(addImages[j]);
                    $("#imgNum").val("");
                }
            }
            ifeAlbum.setImage(image);
        });

    };



    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (image) {


        $("#start").click(function(){
            var checkbox=$(".checkbox");
            checkbox.css("display","block");
        });
        $("#delete").click(function(){
            var checkbox=$(".checkbox");
            for(var i=image.length-1;i>=0;i--){
                if(checkbox.eq(i).attr("checked")=='checked'){
                    image.splice(i,1);
                }
            }
            ifeAlbum.setImage(image);
        });

    };






    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (layout) {

        if(layout==1){

            //拼图布局

        }

        else if(layout==2){
            //瀑布布局
            var gallery=$("#gallery");
            var pic=$(".pic");
            pic.css({
                'padding':10,
                'border':'1px solid #CCC',
                'border-radius':5,
                'box-shadow':'0 0 6px #CCC',
                'float':'left'
            });
            $(".pic img").css({
                'width':165,
                'height':'auto',
                'cursor':'pointer'
            });
            var picW=pic.eq(0).outerWidth();
            var num=Math.floor(gallery.outerWidth()/picW);
            gallery.css({
                'position':'relative',
                'width':picW*num,
                'margin':"0 auto"
            });
            var picHArr=[];
            pic.each(function(index,value){
                var picH=pic.eq(index).height();
                if(index<num){
                    picHArr[index]=picH;
                }else{
                    var minH=Math.min.apply(null,picHArr);
                    var minHIndex= $.inArray(minH,picHArr);
                    $(value).css({
                        'position':'absolute',
                        'top':minH+20,
                        'left':pic.eq(minHIndex).position().left
                    });
                    picHArr[minHIndex]+=pic.eq(index).height()+20;
                }
            });

            //可以全屏预览
            ifeAlbum.enableFullscreen();
        }

        else if(layout==3){

        }


    };

    /**
     * 拼图布局
     */
    IfeAlbum.prototype.puzzleLayout=function(image){

        var gallery = $('#gallery');
        gallery.html('');
        $("#confirmBtn").click(function(){
            var imgNum = $("#imgNum").val();
            var imgNumArr = [1,2,3,4,5,6];
            for(var i=0; i<imgNumArr.length; i++){
                if(imgNum==imgNumArr[i]){
                    var box = $('<div id="box">');
                    for(var j=0; j<imgNum; j++){
                        var html = $('<img src='+image[j]+'>');
                        html.appendTo(box);
                    }
                    gallery.html(box);
                }
                $("#imgNum").val("");
            }
            var imgBox = $('#box').css({
                'width': 600,
                'height': 400,
                'margin': '40px auto 0',
                'position': 'relative'
            });
            var img = $('#gallery img').addClass('items');
            if(img.length == 1){
                img.addClass('layout_1');
            }else if(img.length == 2){
                imgBox.addClass('layout_2');
                img.eq(0).addClass('layout_2 items_1');
                img.eq(1).addClass('layout_2 items_2');
            }else if(img.length == 3){
                imgBox.addClass('layout_3');
                img.eq(0).addClass('layout_3 items_1');
                img.eq(1).addClass('layout_3 items_2');
                img.eq(2).addClass('layout_3 items_3');
            }else if(img.length == 4){
                imgBox.addClass('layout_4');
            }else if(img.length == 5){
                imgBox.addClass('layout_5');
                img.eq(0).addClass('layout_5 items_1');
                img.eq(1).addClass('layout_5 items_2');
                img.eq(2).addClass('layout_5 items_3');
                img.eq(3).addClass('layout_5 items_4');
                img.eq(4).addClass('layout_5 items_5');
            }else if(img.length == 6){
                imgBox.addClass('layout_6');
                img.eq(0).addClass('layout_6 items_1');
                img.eq(1).addClass('layout_6 items_2');
                img.eq(2).addClass('layout_6 items_3');
                img.eq(3).addClass('layout_6 items_4');
                img.eq(4).addClass('layout_6 items_5');
                img.eq(5).addClass('layout_6 items_6');
            }

        });


    };



    /**
     * 木桶布局
     */
    IfeAlbum.prototype.barrelLayout = function(image){
        var container = $('#gallery');
        container.html('');
        for(var i=0;i<image.length;i++){
            var img_1 = $('<img src='+image[i]+'>');
            img_1.appendTo(container);
        }
        var minH = 200;
        var conWidth = container.width();
        $("#gallery img").css({'height':minH,'display':'inline-block'});

        var height = 0, tmpWidth = 0, imgWidth = 0;
        var tmpArr = [];
        for (var i=0; i<image.length; i++) {
            var img = $("#gallery img").eq(i);
            imgWidth = img.width()*img.height()/minH;
            tmpArr.push(img);

            if(tmpWidth + imgWidth > conWidth) {
                if(conWidth-tmpWidth < imgWidth/2) {//y>x
                    height = Math.floor(minH/(tmpWidth + imgWidth) * conWidth);
                    //重新加载tmpArr   reload(tmpArr, height);
                    for(var j=0;j<tmpArr.length;j++){
                        tmpArr[j].css('height',height);
                    }

                } else if(conWidth-tmpWidth > imgWidth/2){ //y<x
                    height = Math.floor(minH/tmpWidth * conWidth);
                    tmpArr.pop();
                    i = i-1;
                    //重新加载tmpArr   reload(tmpArr, height);
                    for(var j=0;j<tmpArr.length;j++){
                        tmpArr[j].css('height',height);
                    }
                }
                tmpArr = [];
                tmpWidth = 0;
            } else {
                tmpWidth = tmpWidth + imgWidth;
            }
        }

    };




    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    IfeAlbum.prototype.getLayout = function(image) {

        $("#puzzleBtn").click(function(){
            $('#addLabel').text('设定图片张数');
            $('#deleteDiv').css('display','none');
            ifeAlbum.puzzleLayout(image);
        });
        $("#waterfallBtn").click(function(){
            $('#addLabel').text('添加图片');
            $('#deleteDiv').css('display','block');
            ifeAlbum.setImage(image);
        });
        $("#barrelBtn").click(function(){
            ifeAlbum.barrelLayout(image);
        });

    };



    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    IfeAlbum.prototype.setGutter = function (x, y) {


    };



    /**
     * 允许点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.enableFullscreen = function () {

        var images=document.getElementById("main").getElementsByTagName("img");
        var fullScreen=document.getElementById("fullScreen");
        var curImg=fullScreen.getElementsByTagName("img")[0];
        var left=document.getElementById("left");
        var right=document.getElementById("right");
        for(var i=0;i<images.length;i++){
            images[i].onclick=function(event){
                event = event||window.event;
                var target = document.elementFromPoint(event.clientX, event.clientY);
                showBig(target.src);
            };
        }
        function showBig(src){
            curImg.src = src;
            fullScreen.style.display = "block";
        }
        curImg.onclick = function (){
            fullScreen.style.display = "none";
        };
        left.onclick=function(){
            for(var i=1;i<images.length;i++){
                if(curImg.src==images[i].src){
                    fullScreen.style.display = "block";
                    curImg.src=images[i-1].src;
                }
            }
            /*if(curImg.src==images[0].src){
                alert("已经是第1张图片！")
            }*/
        };
        right.onclick=function(){
            for(var i=images.length-2;i>=0;i--){
                if(curImg.src==images[i].src){
                    fullScreen.style.display = "block";
                    curImg.src=images[i+1].src;
                }
            }
            /*if(curImg.src==images[images.length-1].src){
                alert("已经是最后1张图片！")
            }*/
        };

    };



    /**
     * 禁止点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.disableFullscreen = function () {



    };



    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {

    };


    /**
     * 设置木桶模式每行图片数的上下限
     * @param {number} min 最少图片数（含）
     * @param {number} max 最多图片数（含）
     */
    IfeAlbum.prototype.setBarrelBin = function (min, max) {

        // 注意异常情况的处理，做一个健壮的库
        if (min === undefined || max === undefined || min > max) {
            console.error('...');
            return;
        }

        // 你的实现

    };



    /**
     * 获取木桶模式每行图片数的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMax = function () {

    };



    /**
     * 获取木桶模式每行图片数的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelBinMin = function () {

    };



    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     * @param {number} max 最大高度
     */
    IfeAlbum.prototype.setBarrelHeight = function (min, max) {

    };



    /**
     * 获取木桶模式每行高度的上限
     * @return {number} 最多图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMax = function () {

    };



    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {

    };



    // 你想增加的其他接口



    /************* 以上是本库提供的公有方法 *************/



    // 实例化
    if (typeof window.ifeAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.ifeAlbum = new IfeAlbum();
    }

}(window));