/**
 * Created by Administrator on 2016/4/19.
 */
/*定义数组header存放表头数据*/
var header=['姓名','语文', '数学', '英语', '总分'];
/*定义多维数组data存放表格内容*/
var data=[
    ['小明','80','90','70','240'],
    ['小红','90','60','90','240'],
    ['小亮','60','100','70','230'],
    ['小绿','70','80','100','250'],
    ['小明','80','90','70','240'],
    ['小红','90','60','90','240'],
    ['小亮','60','100','70','230'],
    ['小绿','70','80','100','250'],
    ['小明','80','90','70','240'],
    ['小红','90','60','90','240'],
    ['小亮','60','100','70','230'],
    ['小绿','70','80','100','250'],
    ['小明','80','90','70','240'],
    ['小红','90','60','90','240'],
    ['小亮','60','100','70','230'],
    ['小绿','70','80','100','250'],
];
/*创建表格函数*/
function createTable(){
    var table=document.createElement("table");
    var tableBox=document.getElementById("tableBox");
    tableBox.appendChild(table);
    /*表头*/
    var thead=table.createTHead();
    var tr0=document.createElement("tr");
    for(var i=0;i<header.length;i++){
        var th=document.createElement("th");
        th.innerHTML=header[i];
        tr0.appendChild(th);
        //添加排序按钮图片
        var img1=document.createElement("img");
        var img2=document.createElement("img");
        img1.style.position="absolute";
        img2.style.position="absolute";
        img1.style.marginLeft="26px";
        img2.style.marginLeft="25px";
        img2.style.marginTop="15px";
        img1.setAttribute("src","images/img1.jpg");
        img2.setAttribute("src","images/img2.jpg");
        th.appendChild(img1);
        th.appendChild(img2);
    }
    thead.appendChild(tr0);
    //隐藏姓名一栏的排序按钮
    var img=document.getElementsByTagName("img");
    img[0].style.display="none";
    img[1].style.display="none";
    //添加点击函数
    img[2].onclick=function(){
        addListener(sortData(data,1));
    };
    img[4].onclick=function(){
        addListener(sortData(data,2));
    };
    img[6].onclick=function(){
        addListener(sortData(data,3));
    };
    img[8].onclick=function(){
        addListener(sortData(data,4));
    };
    img[3].onclick= function(){
        addListener(sortData2(data,1));
    };
    img[5].onclick= function(){
        addListener(sortData2(data,2));
    };
    img[7].onclick= function(){
        addListener(sortData2(data,3));
    };
    img[9].onclick= function(){
        addListener(sortData2(data,4));
    };

    /*表格内容*/
    for(var i=0;i<data.length;i++){
        var tr=document.createElement("tr");
        for(var j=0;j<data[0].length;j++){
            var td=document.createElement("td");
            td.innerHTML=data[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
//排序函数,从小到大
function sortData(data,col){
    data.sort(function(a,b){
        return a[col]-b[col];
    });
    return data;
}
//从大到小
function sortData2(data,col){
    data.sort(function(a,b){
        return b[col]-a[col];
    });
    return data;
}

/*点击图片调用的函数*/
function addListener(fun){
    var array=fun;
    var td=document.getElementsByTagName("td");
    var tds=[];
    for(var i=0;i<td.length;i=i+5){
        tds.push(Array.prototype.slice.call(td,i,i+5));
    }
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data[0].length;j++){
            tds[i][j].innerHTML=array[i][j];
        }
    }
}

//冻结函数
function freeze(){
    var table=document.getElementsByTagName("table")[0];
    var tHead=table.childNodes[0];
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    if(table.offsetTop-scrollTop<=0){
        tHead.style.position="fixed";
        tHead.style.top="0";
        if(scrollTop>table.offsetTop+table.offsetHeight){
            tHead.style.position="absolute";
        }
    }else {
        tHead.style.position="static";
    }
}

//执行函数
function init(){
    var btn=document.getElementById("createTable");
    btn.onclick=function(){
        createTable();
    };
    window.onscroll=function(){
        freeze();
    }
}
init();

