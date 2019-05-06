//基本信息
var company='xuebajun';                                              //品牌
var userId =  randomRange(8)+(new Date()).getTime().toString().slice(11);//userId
var url=window.location.href;                                            //url
var ip=returnCitySN["cip"];                                              //ip
var userAgent=navigator.userAgent;                                       //代理信息
var sign=getRequestByName("sign");

$(function () {
    //保存页面初始化信息
     $.ajax({
        type:'POST',
        url: 'http://mm.jnrise.cn/loading/server/enter',
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        data:{
            'company':company,
            'userId':userId,
            'userAgent':userAgent,
            'ip':ip,
            'url':url,
            'sign':sign,
            'flag':2
        },
        dataType: 'json',
        success: function(data){
            // console.log(data);
        },
        error: function(error){
            console.log(error);
        }
    });
    //每秒刷新页面停留时间
      var second=0;
        var timer=window.setInterval(function () {
            second++;
            if (second <= 90){
                $.ajax({
                    type:'POST',
                    url:'http://mm.jnrise.cn/loading/server/stay',
                    headers:{"Content-Type":"application/x-www-form-urlencoded"},
                    data:{
                        'company':company,
                        'userId':userId,
                        'url':url,
                        'ip':ip,
                        'userAgent':userAgent,
                        'sign':sign,
                        'totalTime':second,
                        'otherInfo':''
                    },
                    dataType:'json',
                    success:function (data) {
                        // console.log(data)
                    },
                    error:function (error) {
                        console.log(error)
                    }
                })
            }else{
                console.log("stop!");
                window.clearInterval(timer);
            }
        },1000);

    var device=0;
    if(/Android|iPhone|BlackBerry/i.test(navigator.userAgent)) {
        device=1;
    }else{
        device=0;
    }
    //用户信息留资信息
    $("#submit-top").click(function(){
        var phone=$.trim($("#phone-top").val());
        var name=$.trim($("#name-top").val());
        var grade=$.trim($("#grade-top").val());
        var validate=true;

        if(phone==""){
            validate=false;
            $("#phone-top").parent(".form-item").find(".verificat").html("请输入家长电话");
        }else if(!checkPhone(phone)){
            validate=false;
            $("#phone-top").parent(".form-item").find(".verificat").html("请输入正确手机号码");
        }else{
            $("#phone-top").parent(".form-item").find(".verificat").html("");
        }
        if(name==""){
            validate=false;
            $("#name-top").parent(".form-item").find(".verificat").html("请输入家长贵姓");
        }else{
            $("#name-top").parent(".form-item").find(".verificat").html("");
        }

        if(grade==""){
            validate=false;
            $("#grade-top").parent(".form-item").find(".verificat").html("请选择同学年级");
        }else{
            $("#grade-top").parent(".form-item").find(".verificat").html("");
        }

        if(validate){
            // console.log("phone:"+phone+"|name:"+name+"|grade:"+grade);
            $.ajax({
                type:'POST',
                url: 'http://mm.jnrise.cn/loading/server/info',
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                data:{
                    'company':company,
                    'userId':userId,
                    'phone':phone,
                    'name':name,
                    'age':0,
                    'gender':0,
                    'school':grade,
                    'sign':sign
                },
                dataType: 'json',
                success: function(data){
                    // console.log(data);
                    if(data.info === null){
                        $('#dialog-top').css('display',"block").html("您已注册过测评课");
                        dialog();
                    }else{
                        $('#dialog-top').css('display',"block").html("注册成功");
                        dialog();
                    }
                },
                error: function(error){
                    console.log(error);
                    $('#dialog-top').css('display',"block").html("注册失败，请重新注册");
                    dialog();
                }
            });
        }
    });
})

//随机生成10位用户id
function randomRange(min, max){
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max-min)) + min : min),
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(var i=0; i<range; i++){
        var index = Math.round(Math.random() * (arr.length-1));
        returnStr += arr[index];
    }
    return returnStr;
}
//获取Url参数
function getRequestByName(name) {
    var url = window.location.search; //获取url中"?"符后的字串
    var result="";
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            if(strs[i].indexOf(name+"=")!=-1){
                result= unescape(strs[i].substring(name.length+1,strs[i].length));
            }
        }
    }
    return result;
}
//移动号码验证
function checkPhone(str) {
    if ((/^1(3|4|5|7|8)\d{9}$/.test(str))) {
        return true;
    } else {
        return false;
    }
}
//弹窗
function dialog() {
    setTimeout(function () {
        $('#dialog-top').css('display',"none");
    },2000);
}






