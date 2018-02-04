$(function(){
	//获取验证码时间计时
	var code;
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

        timer = setInterval(function(){
            i();
        }, 1000);

        var mobile = $("mobile").val();
         // 获取验证码
        $.ajax({
            url:"http://test.docren.com.cn/common/send-code",
            type: "post",
            data: {
                 "mobile": mobile
            },
            dataType: "json",
            timeout:0,
            success: function (data) {
             console.log(data);//
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
             // $(".fail-page").show();
             // $(".fail-page p").html(textStatus);
            }
        });
    })


    // 下一步
    $(".next-btn").on("click",function(){
    	var mobile = $("mobile").val();
    	var code = $("code").val();
    	var psd = $("psd").val();
    	var re-psd = $("re-psd").val();
    	$.ajax({
            url:"http://test.docren.com.cn/auth/first-check?",
            type: "post",
            data:{
            	"password":psd,
            	"re_password":re-psd,
            	"mobile":mobile,
            	"code":code
            },
            dataType: "json",
            timeout:0,
            success: function (data) {
             console.log(data)
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
             // $(".fail-page").show();
             // $(".fail-page p").html(textStatus);
            }
        });
    })

})