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

        /*页面添加标签，并添加内容*/
        var main=document.getElementById("main");
        var gallery=document.createElement("div");
        gallery.id="gallery";
        main.appendChild(gallery);
        for(var i=0;i<image.length;i++){
            var picture=document.createElement("div");
            picture.className="picture";
            gallery.appendChild(picture);
            var img=document.createElement("img");
            img.src=image[i];
            picture.appendChild(img);
        }

        /*图片预加载函数*/
        var preLoadImages=function(image){
            var newImages=[],loadedImages=0;
            var postAction=function(){};
            var arr=(typeof image!="object")?[image]:image;//确保参数总是数组
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

        /*调用设置相册布局对象*/
        preLoadImages(image).done(function(){
            IfeAlbum.prototype.setLayout(2);
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
     */
    IfeAlbum.prototype.addImage = function (image) {

    };



    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (image) {

    };



    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (layout) {
        if(layout==1){

        }

        else if(layout==2){

            /*通过父级和子元素的class类 获取该同类子元素的数组*/
            var getClassObj=function(parent,className){
                var obj=parent.getElementsByTagName('*');
                var pinS=[];
                for(var i=0;i<obj.length;i++){
                    if(obj[i].className==className){
                        pinS.push(obj[i]);
                    }
                }
                return pinS;
            };
            /*获取 pin高度 最小值的索引index*/
            var getMinHIndex=function(arr,minH){
                for(var i in arr){
                    if(arr[i]==minH){
                        return i;
                    }
                }
            };
            /*瀑布布局*/
            var main=document.getElementById("main");
            var oParent=document.getElementById("gallery");//父级对象
            var oPin=getClassObj(oParent,'picture');//获取存储块框的数组oPin
            var oPinW=oPin[0].offsetWidth;//一个块框的宽
            var num=Math.floor(main.offsetWidth/oPinW);//每行中容纳块框个数
            oParent.style.cssText="width:"+oPinW*num+"px;margin:0 auto";//设置父级元素居中样式，定宽
            var pinHArr=[];//用于存储每列中的所有块框相加的高度
            for(var i=0;i<oPin.length;i++){
                if(i<num){
                    pinHArr.push(oPin[i].offsetHeight);
                }else {
                    var minH=Math.min.apply(null,pinHArr);
                    var minHIndex=getMinHIndex(pinHArr,minH);
                    oPin[i].style.position="absolute";
                    oPin[i].style.top=minH+'px';
                    oPin[i].style.left=oPin[minHIndex].offsetLeft+'px';
                    pinHArr[minHIndex]+=oPin[i].offsetHeight;
                }
            }

        }

        else if(layout==3){

        }

    };



    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    IfeAlbum.prototype.getLayout = function() {

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