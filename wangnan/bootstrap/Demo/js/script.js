/**
 * Created by Administrator on 2016/6/2.
 */
$(function(){
    /*鼠标滑到导航栏phone按钮上显示二维码*/
    $("#phone").mouseover(function(){
        $(".phone").css('display','block');
    }).mouseout(function(){
        $(".phone").css('display','none');
    });

    /*点击查询按钮，显示文本框*/
    $("#input-addon").click(function(){
        $("#search input").toggle();
    });
    /*canvas画图*/
    function canvas(){
        var can1 = document.getElementById("can1");
        var can2 = document.getElementById("can2");
        var can3 = document.getElementById("can3");

        var ctx1 = can1.getContext('2d');
        var ctx2 = can2.getContext('2d');
        var ctx3 = can3.getContext('2d');
        /*第一部分*/
        ctx1.beginPath();
        ctx1.arc(90, 90, 60, 0, Math.PI*2, false);
        ctx1.moveTo(72,75);
        ctx1.lineTo(45,90);
        ctx1.lineTo(72,105);
        ctx1.moveTo(107,75);
        ctx1.lineTo(134,90);
        ctx1.lineTo(107,105);
        ctx1.moveTo(97,75);
        ctx1.lineTo(82,105);
        ctx1.moveTo(140,140);
        ctx1.lineTo(158,156);
        ctx1.moveTo(147,134);
        ctx1.lineTo(165,149);
        ctx1.arc(161, 152, 5, Math.PI*7/4, Math.PI*3/4, false);
        ctx1.stroke();
        /*第二部分*/
        ctx2.beginPath();
        ctx2.arc(90, 90, 60, 0, Math.PI*35/18, false);
        ctx2.stroke();
        ctx2.closePath();
        ctx2.beginPath();
        ctx2.arc(90, 90, 35, 0, Math.PI*29/15, false);
        ctx2.stroke();
        ctx2.closePath();
        ctx2.beginPath();
        ctx2.arc(90, 90, 10, 0, Math.PI*11/6, false);
        ctx2.moveTo(90,90);
        ctx2.lineTo(160,90);
        ctx2.moveTo(150,93);
        ctx2.lineTo(160,100);
        ctx2.moveTo(160,93);
        ctx2.lineTo(170,100);
        ctx2.moveTo(170,93);
        ctx2.lineTo(180,100);
        ctx2.moveTo(150,87);
        ctx2.lineTo(160,80);
        ctx2.moveTo(160,87);
        ctx2.lineTo(170,80);
        ctx2.moveTo(170,87);
        ctx2.lineTo(180,80);
        ctx2.moveTo(60,150);
        ctx2.lineTo(45,160);
        ctx2.moveTo(120,150);
        ctx2.lineTo(135,160);
        ctx2.stroke();
        /*第三部分*/
        ctx3.beginPath();
        ctx3.arc(90, 90, 60, Math.PI*7/4, Math.PI*3/4, false);
        ctx3.stroke();
        ctx3.closePath();
        ctx3.beginPath();
        ctx3.arc(90, 90, 60, Math.PI*41/24, Math.PI*19/24, true);
        ctx3.moveTo(140,40);
        ctx3.lineTo(40,140);
        ctx3.moveTo(79, 94);
        ctx3.bezierCurveTo(60, 95, 52, 48, 110, 62);
        ctx3.moveTo(86, 95);
        ctx3.bezierCurveTo(137, 98, 114, 147, 70, 124);
        ctx3.moveTo(90,50);
        ctx3.lineTo(90,60);
        ctx3.moveTo(90,130);
        ctx3.lineTo(90,140);
        ctx3.stroke();
    }
    canvas();




});

