// 地址选择
$("#city-picker").cityPicker({
  toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">选择收货地址</h1>\
  </header>'
});

/**功能点1：为“注册”按钮绑定监听函数**/
$('#bt-register').click(function(){
  //收集用户在表单中的输入，可以使用“表单序列化”
  var data = $('#form-register').serialize();
  console.log(data);
  //使用$.ajax()发起异步请求
  $.ajax({
    type: 'POST',
    url: '/data/7_user_add.php',
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
    url:'/data/2_user_login.php',
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
    url: '/data/12_user.php',
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

/**功能点4：修改我的资料**/
$("#updata-user").on("click",function(){
  //收集用户在表单中的输入，可以使用“表单序列化”
  var data = $('#form-user').serialize();
  data += `&userid=${localStorage['LoginUid']}&userimg=${userimg}`;
  data = decodeURI(data);
  console.log(data);
  $.ajax({
    type: 'POST',
    url: '/data/10_user_updata.php',
    data: data,
    success: function(result){
      if(result.code===1){
        $.toast("资料修改成功！2秒钟后跳转到我的主页");
        setTimeout(function(){
          location.href ='me.html';
        },2000);
      }else {
        $.toast('资料修改失败！原因为：'+result.msg);
      }
    },
    error: function(){
      $.toast('响应消息有问题！请检查Network！');
    }
  });
});
//获取到用户修改头像的图片名称
var userimg = null;
$("#userimg").on("change",function(){	
  var obj = document.getElementById("userimg");
  var len = obj.files.length;
  for (var i = 0; i < len; i++) {
    userimg = "/assert/img/"+obj.files[i].name;
    console.log(userimg);
  }
});



/**功能点5：地址管理页面**/
function downadd(){
  $.ajax({
    url: '/data/14_address.php',
    data: {userid: localStorage['LoginUid']},
    success: function(address){
      // console.log(address[0]);
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

/**功能点6：修改我的地址管理页面**/
$("#updata-address").on("click",function(){
  //收集用户在表单中的输入，可以使用“表单序列化”
  var data = $('#form-address').serialize();
  data += `&userid=${localStorage['LoginUid']}`;
  data = decodeURI(data);
  console.log(data);
  $.ajax({
    type: 'POST',
    url: '/data/15_address_updata.php',
    data: data,
    success: function(result){
      if(result.code===1){
        $.toast("收货地址更新成功！2秒钟后跳转到我的主页");
        setTimeout(function(){
          location.href ='me.html';
        },2000);
      }else {
        $.toast('地址更新失败！原因为：'+result.msg);
      }
    },
    error: function(){
      $.toast('响应消息有问题！请检查Network！');
    }
  });
});

/**功能点7：我的钱包充值功能**/
$("#updata-money").on("click",function(){
  //收集用户在表单中的输入，可以使用“表单序列化”
  var data = {addmoney:parseInt($('#addmoney').val()),userid:localStorage['LoginUid']};
  console.log(data);
  $.ajax({
    type: 'POST',
    url: '/data/16_addmoney.php',
    data: data,
    success: function(result){
      if(result.code===1){
        $.toast("钱包充值成功！总的金额："+result.allmoney);
        setTimeout(function(){
          location.href ='me.html';
        },2000);
      }else {
        $.toast('钱包充值失败！原因为：'+result.msg);
      }
    },
    error: function(){
      $.toast('响应消息有问题！请检查Network！');
    }
  });
});

/**功能点8：密码修改功能**/
$("#updata-password").on("click",function(){
  //收集用户在表单中的输入，可以使用“表单序列化”
  var newpassword1 = $("#newpassword1").val();
  var newpassword2 = $("#newpassword2").val();
  console.log(newpassword1,newpassword2);
  var data = {newpassword:newpassword1,userid:localStorage['LoginUid']};
  console.log(data);
  if (newpassword1===newpassword2) {
    $.ajax({
      type: 'POST',
      url: '/data/17_newpassword.php',
      data: data,
      success: function(result){
        if(result.code===1){
          $.toast("密码修改成功,请使用新密码从新登录");
          localStorage.clear();
          setTimeout(function(){
            location.href ='user.html';
          },1000);
        }else {
          $.toast('密码修改失败！原因为：'+result.msg);
        }
      },
      error: function(){
        $.toast('响应消息有问题！请检查Network！');
      }
    });
  } else {
    $.toast('两次输入密码不一致，重新输入');
  }
});



