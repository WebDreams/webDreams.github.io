$(function(){
	var storage=window.localStorage;
    var json=storage.getItem("tk");
    if(json){
       // 展示信息 http://test.docren.com.cn/user/user-info?token=json
       $.ajax({
                url:"http://test.docren.com.cn/user/user-info?token=" + json,
                type: "get",
                data: {
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
    }
    if(!json){
        window.location.href="login.html"
    }
})