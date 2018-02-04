$(function(){
    var bt1 = $(".bt1");
    var flag = 1;//密码 或 验证码
    var tk;//存储token

    bt1.on("click",function(){
        if(flag==1){
            // 手机号
            $(".info-one").hide();
            $(".info-two").show();
            flag=0;
        }else{
             // 验证码
            $(".info-one").show();
            $(".info-two").hide();
            flag=1;
        }
    })

    //获取验证码时间计时
    var total = 61;
    var timer;
    var i = function(){   
            total--;
            $(".getYan").text(total +'  秒');
            $(".getYan").css("color","#C3CDC8");
            if(total==0){
                $(".getYan").text("获取验证码");
                $(".getYan").css("color","#E70010"); 
                total=5;
                clearInterval(timer);
            }
    }
    // 获取验证码
    $(".getYan").on("click",function(){
        timer = setInterval(function(){i();}, 1000);
        var tel2 = $("#tel2").val();
        $.ajax({
            url:"http://test.docren.com.cn/common/send-code",
            type: "post",
            data: {
                 "mobile": tel2
            },
            dataType: "json",
            timeout:0,
            success: function (data) {
             // var obj = data.content;
             // console.log(obj);
             alert(data)
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
             // $(".fail-page").show();
             // $(".fail-page p").html(textStatus);
            }
        });
    })

    $(".login-btn").on("click",function(){

        var tel1 = $("#tel1").val(),
        pass1 = $("#pass1").val(),
        tel2 = $("#tel2").val(),
        yan2 = $("#yan2").val();

        //提交登录表单  15010078636 123456
        //账号密码登录
        if(flag == 1){
          $.ajax({
                url:"http://test.docren.com.cn/auth/login",
                type: "post",
                data: {
                     "mobile": tel1,
                     "password": pass1
                },
                dataType: "json",
                timeout:0,
                success: function (data) {
                    console.log(data)
                    if(data.code==200){
                      tk = data.data.token;
                      console.log(tk)
                      localStorage.setItem('tk', tk);
                      window.location.href="main.html";
                    }
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                 // $(".fail-page").show();
                 // $(".fail-page p").html(textStatus);
                }
          });
        }
        else
        {
            //手机号 验证码登录应该直接登陆成功 
             $.ajax({
                url:"http://test.docren.com.cn/auth/login",
                type: "post",
                data: {
                     "mobile": tel2,
                     "password": yan2
                },
                dataType: "json",
                timeout:0,
                success: function (data) {
                   console.log(data);//？？ 返回该用户不存在   提醒注册 存在跳首页
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                
                }
            });
        }
    })

 
})



// localStorage.setItem('uinfo', 'Tom');
// //main
// index.controller('main',function($scope,$window) {
//     var storage=window.localStorage;
//     var json=storage.getItem("uinfo");
//     var jsonObj=JSON.parse(json);
//     if(json){
//         $scope.LogId=jsonObj.tk;
//         $scope.username=jsonObj.uname
//     }
//     if(!json){
//         window.location.href="login.html"
//     }
// })
//header
// index.controller('dealheader',function($scope,$window){
//     var storage=window.localStorage;
//     $scope.exit = function(){
//         storage.removeItem("tk");
//         for(var i=0;i<storage.length;i++){
//             var key=storage.key(i);
//             if(key=="uinfo"){
//                 storage.removeItem(key);
//                 window.location.href="login.html"
//             }
//         }
//     }
// })
// 
