//进入页面首先打印用户名
console.log("用户的id："+localStorage['LoginUid']+" 用户的username："+localStorage['LoginName']);

/**功能点1：检查用户的登录情况，则没有登录信息，必须跳转到登录页**/
if(!localStorage['LoginName']){
  $.toast("请先登录");
  setTimeout(function(){
    location.href = 'user.html';
  },2000);
}

/**功能点2：如果用户已经登录，异步请求当前用户的头像和昵称**/
$.ajax({
  url: '/data/12_user.php',
  data: {userid: localStorage['LoginUid']},
  success: function(user){
    console.log(user[0]);
    $("#userimg").attr("src",user[0].userimg);
    $("#userNick").text(user[0].nickname);
  },
  error: function(){
    $.toast('异步请求用户资料失败！请检查Network！');
  }
});

/**功能点3：退出登录，销毁localStorage，跳转到登录页**/
$('#signout').click(function(){
    localStorage.clear();
    $.toast('退出成功');
});

/**功能点4：为“意见反馈提交”按钮绑定监听函数**/
$('#bt-feedback').click(function(){
  //收集用户在表单中的输入，可以使用“表单序列化”
  $('#feedback-userid').val(localStorage['LoginUid']);
  var data = $('#form-feedback').serialize();
  data += `&userid=${localStorage['LoginUid']}`;
  console.log(data);
  //使用$.ajax()发起异步请求
  $.ajax({
    type: 'POST',
    url: '/data/13_feedback.php',
    data: data,
    success: function(result){
      if(result.code===1){
        $.toast("提交成功！谢谢你的反馈");
        setTimeout(function(){
          location.href ='me.html';
        },2000);
      }else {
        $.toast('提交失败！原因为：'+result.msg);
      }
    },
    error: function(){
      $.toast('响应消息有问题！请检查Network！');
    }
  });
});
