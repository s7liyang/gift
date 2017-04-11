/**功能点1：为“注册”按钮绑定监听函数**/
$('#bt-register').click(function(){
  //收集用户在表单中的输入，可以使用“表单序列化”
  var data = $('#form-register').serialize();
  console.log(data);
  //使用$.ajax()发起异步请求
  $.ajax({
    type: 'POST',
    url: '../../data/7_user_add.php',
    data: data,
    success: function(result){
      if(result.code===1){
        $.toast("注册成功！2秒钟后跳转到登录页面");
        setTimeout(function(){
          location.href ='user.html';
        },2000);
      }else {
        $.toast('注册失败！原因为：'+result.msg);
      }
    },
    error: function(){
      $.toast('响应消息有问题！请检查Network！');
    }
  });
});

/**功能点2：为登录按钮绑定事件监听，实现异步的用户登录**/
$('#bt-login').click(function(){
  //收集用户的输入，组成一个k=v&k=v形式字符串
  var data = $('#form-login').serialize();
  console.log(data);
  //发起异步请求，进行服务器验证
  $.ajax({
    type: 'POST',
    url:'../../data/2_user_login.php',
    data: data,
    success: function(result){
      if(result.code!==1){  //登录验证失败
        $.toast(result.msg);
      }else{//登录验证成功
        //把登录相关数据保存在客户端浏览器中，供后续的页面使用
        console.log("id:"+result.id,"username:"+result.username);
        localStorage['LoginName'] = result.username;
        localStorage['LoginUid'] = result.id;
        $.toast('登录成功');
        setTimeout(function(){
          location.href ='me.html';
        },2000);
      }
    },
    error: function(){ 
      $.toast('响应完成,登录失败');
      console.log(arguments);
    }
  });
});

/**功能点3：我的资料页面**/
function downdata(){
    $.ajax({
    url: '../../data/12_user.php',
    data: {userid: localStorage['LoginUid']},
    success: function(user){
      console.log(user[0]);
      $("#money").text(user[0].money);
      $("#nickname").val(user[0].nickname);
      $("#email").val(user[0].email);
      $("#phone").val(user[0].phone);
      if (user[0].sex==1) {
        $("#sex").val("男");
      }else{
        $("#sex").val("女");
      }
      $("#birth").val(user[0].birth);
      $("#sign").val(user[0].sign);
    },
    error: function(){
      $.toast('异步请求用户资料失败！请检查Network！');
    }
  });
}
downdata();

/**功能点4：地址管理页面**/
function downadd(){
  $.ajax({
    url: '../../data/14_address.php',
    data: {userid: localStorage['LoginUid']},
    success: function(address){
      console.log(address[0]);
      $("#name").val(address[0].name);
      $("#addphone").val(address[0].phone);
      $("#postcode").val(address[0].postcode);
      $("#city-picker").val(address[0].area);
      $("#detail").val(address[0].detail);
    },
    error: function(){
      $.toast('异步请求用户资料失败！请检查Network！');
    }
  });
}
downadd();


