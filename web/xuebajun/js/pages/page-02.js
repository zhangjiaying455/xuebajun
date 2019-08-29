//基本信息
var url=window.location.href; //url

$(function () {
    $('#phone01').bind('input propertychange',function () {
        var Phone=$("#phone01").val().trim().length;
        if (Phone === 11 ){
            $("#code01").css({
                background:'#fff5f6',
                color:'#ffabb1'
            })
        }else{
            $("#code01").css({
                background:'#fafafa',
                color:'#dcdcdc'
            })
        }
    })

    $('#phone02').bind('input propertychange',function () {
        var Phone=$("#phone02").val().trim().length;
        if (Phone === 11 ){
            $("#code02").css({
                background:'#fff5f6',
                color:'#ffabb1'
            })
        }else{
            $("#code02").css({
                background:'#fafafa',
                color:'#dcdcdc'
            })
        }
    })
    //保存页面初始化信息
    $.ajax({
        type:'POST',
        url: 'http://47.92.205.63:21668/sms/setVisitInfo',
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        data:{
            'type':5,
            'url':url,
        },
        dataType: 'json',
        success: function(data){
            // console.log(data);
         },
        error: function(error){
            console.log(error);
        }
    });
 })
/*点击按钮领取 -- top*/
$('#btn01').click(function (val) {
        let obj=val.target;
        var phone=$("#phone01").val().trim();
        var code=$("#code_text01").val().trim();
        var myreg= /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        let RecurrenceId = getRequestByName("ID");
        if(RecurrenceId==""){
            RecurrenceId='test-00000000';
        }
        let remark={"id":RecurrenceId,"url":url};
        if (!phone){
            $('.modal-h3').html("请输入手机号")
            getDialog();
        }else if (!myreg.test(phone)){
            $('.modal-h3').html("手机号格式不正确")
            getDialog();
        }else{
            if(!code){
                $('.modal-h3').html("请输入验证码")
                getDialog();
            }else{
                 $.ajax({
                     type:'POST',
                     url: 'http://47.92.205.63:21668/sms/getCode?mobile='+phone+'&code='+code+'&type=5',
                     headers:{"Content-Type":"application/x-www-form-urlencoded"},
                     dataType: 'json',
                     success: function(data){
                         //在按钮提交之后和AJAX提交之前将按钮设置禁用
                         $("#btn01").attr('disabled',true)
                         $.ajax({
                                 type:'POST',
                                 url: 'http://47.92.205.63:21668/info/setInfo',
                                 headers:{"Content-Type":"application/x-www-form-urlencoded"},
                                 data:{
                                     'stype':5,
                                     'mobile':phone,
                                     'remark':JSON.stringify(remark),
                                 },
                                 dataType: 'json',
                                 success: function(result){
                                     if (result.resp === "201"){
                                         $('.modal-h3').html("您已领取过")
                                         getDialog();
                                     } else{
                                         $('.modal-h3').html("抢课成功")
                                         getDialog();
                                     }
                                     $("#phone01").val("");
                                     $('#code_input01').css('display','none')
                                     $("#btn01").attr('disabled',false)
                                     countDown(obj,1)
                                 },
                                 error: function(error){
                                     $('.modal-h3').html("抢课失败")
                                     getDialog();
                                     $("#phone01").val("");
                                     $('#code_input01').css('display','none')
                                     $("#btn01").attr('disabled',false)
                                     countDown(obj,1)
                                 }
                             });
                     },
                     error: function(error){
                         $('.modal-h3').html("验证码错误")
                         getDialog();
                     }
                 })
            }
        }
})

/*点击按钮领取 -- bottom*/
$('#btn02').click(function (val) {
    let obj=val.target;
    var phone=$("#phone02").val().trim();
    var code=$("#code_text02").val().trim();
    var myreg= /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    let RecurrenceId = getRequestByName("ID");
    if(RecurrenceId==""){
        RecurrenceId='test-00000000';
    }
    let remark={"id":RecurrenceId,"url":url};
    if (!phone){
        $('.modal-h3').html("请输入手机号")
        getDialog();
    }else if (!myreg.test(phone)){
        $('.modal-h3').html("手机号格式不正确")
        getDialog();
    }else{
        if(!code){
            $('.modal-h3').html("请输入验证码")
            getDialog();
        }else{
            $.ajax({
                type:'POST',
                url: 'http://47.92.205.63:21668/sms/getCode?mobile='+phone+'&code='+code+'&type=5',
                headers:{"Content-Type":"application/x-www-form-urlencoded"},
                dataType: 'json',
                success: function(data){
                    //在按钮提交之后和AJAX提交之前将按钮设置禁用
                    $("#btn02").attr('disabled',true)
                    $.ajax({
                        type:'POST',
                        url: 'http://47.92.205.63:21668/info/setInfo',
                        headers:{"Content-Type":"application/x-www-form-urlencoded"},
                        data:{
                            'stype':5,
                            'mobile':phone,
                            'remark':JSON.stringify(remark)
                        },
                        dataType: 'json',
                        success: function(result){
                            // console.log(data)
                            if (result.resp === "201"){
                                $('.modal-h3').html("您已领取过")
                                getDialog();
                            } else{
                                $('.modal-h3').html("抢课成功")
                                getDialog();
                            }
                            $("#phone02").val("");
                            $('#code_input02').css('display','none')
                            $("#btn02").attr('disabled',false)
                            countDown(obj,1)
                        },
                        error: function(error){
                            $('.modal-h3').html("抢课失败")
                            getDialog();
                            $("#phone02").val("");
                            $('#code_input02').css('display','none')
                            $("#btn02").attr('disabled',false)
                            countDown(obj,1)
                        }
                    });
                },
                error: function(error){
                    $('.modal-h3').html("验证码错误")
                    getDialog();
                }
            })
        }
    }
})

/*获取验证码   -- top*/
$('#code01').click(function (val) {
    let obj=val.target;
    var phone=$("#phone01").val().trim()
    var myreg= /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!phone){
        $('.modal-h3').html("请输入手机号")
        getDialog();
    }else if(!myreg.test(phone)){
        $('.modal-h3').html("手机号格式不正确")
        getDialog();
    }else{
        $('#code_input01').css('display','block')
        $.ajax({
            type:'POST',
            url: 'http://47.92.205.63:21668/sms/sendCode?mobile='+phone+'&type=5',
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            dataType: 'json',
            success: function(data){
                $('.modal-h3').html("验证码已发送")
                countDown(obj,2);
                getDialog();
            },
            error: function(error){
                $('.modal-h3').html("验证码发送失败")
                getDialog();
            }
        })
    }
})

/*获取验证码   -- bottom*/
$('#code02').click(function (val) {
    let obj=val.target;
    var phone=$("#phone02").val().trim()
    var myreg= /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!phone){
        $('.modal-h3').html("请输入手机号")
        getDialog();
    }else if(!myreg.test(phone)){
        $('.modal-h3').html("手机号格式不正确")
        getDialog();
    }else{
        $('#code_input02').css('display','block')
        $.ajax({
            type:'POST',
            url: 'http://47.92.205.63:21668/sms/sendCode?mobile='+phone+'&type=5',
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            dataType: 'json',
            success: function(data){
                $('.modal-h3').html("验证码已发送")
                countDown(obj,2);
                getDialog();
            },
            error: function(error){
                $('.modal-h3').html("验证码发送失败")
                getDialog();
            }
        })
    }
})

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
//弹窗2秒后消失
function getDialog() {
    $('.modal').css('display','block')
    setTimeout(function () {
        $('.modal').css('display','none')
    },2000)
}
//验证码倒计时
function countDown(objs,type) {
    let objs_type=objs.id;
    var countdown=60;
    var timer=null;
    if (type === 1){
        clearInterval(timers);
        objs.removeAttribute("disabled");
        $(".getCode").val("获取验证码");
        $(".getCode").css({
            background:'#fafafa',
            color:'#dcdcdc',
            width: '83px'
        })
    } else if (type === 2) {
        timers=setInterval(function() {
            countdown--;
           objs.setAttribute("disabled", true);
           objs.value=countdown + "s";
           if (objs_type == 'code01') {
               $("#code01").css({
                   background:'#fafafa',
                   color:'#dcdcdc',
                   width:'43px'
               })
           }else if (objs_type == 'code02') {
               $("#code02").css({
                   background: '#fafafa',
                   color: '#dcdcdc',
                   width: '43px'
               })
           }
            if(countdown===0){
                objs.removeAttribute("disabled");
                objs.value="获取验证码";
                clearInterval(timers);
                if (objs_type == 'code01') {
                    $("#code01").css({
                        background:'#fff5f6',
                        color:'#ffabb1',
                        width: '83px'
                    })
                }else if (objs_type == 'code02'){
                    $("#code02").css({
                        background:'#fff5f6',
                        color:'#ffabb1',
                        width: '83px'
                    })
                }
            }
        },1000)
    }

}




