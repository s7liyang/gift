/*-----------------1购物车数据加载------------------*/
/**功能点0：检查用户是否已经登录，若没有，则跳转到登录页面**/
if(!localStorage['LoginName']){
  $.toast("请先登录");
  setTimeout(function(){
    location.href = 'user.html';
  },2000);
}
//定义全局变量  等会提交给服务器端的price, sumCount(商品数量)，userId
var sumPrice = 0, 
    sumCount = 0, 
    factPrice = 0, 
    couponid ='',
    deletecid ='',
    couponPrice = 0, 
    product=[];

/**功能点1：页面加载完后，异步请求当前登录用户的可以使用的最大优惠券**/
$.ajax({  
  type: 'GET',
  url: '/data/24_coupon_use.php?userid=1',
  data: {userid: localStorage['LoginUid']},//localStorage['LoginUid']
  success: function(data){
    if (data[0]) {
      // console.log(data[0].price);
      couponid = parseInt(data[0].cid);
      couponPrice = parseInt(data[0].price);
    }
  },
  error: function(){
    $.toast('异步请求用户资料失败！请检查Network！');
  }
});

/**功能点2：页面加载完后，异步请求当前登录用户的购物车内容**/
$.ajax({  
  type: 'GET',
  url: '/data/6_cart_detail_select.php',
  data: {uid: localStorage['LoginUid']},
  success: function(list){
    //遍历购物车中的每个商品，生成列表
    // console.log(list);
    var html = '';
    $.each(list, function(i,p){
      html += `
              <div class="list" pid=${p.pid}>
                <div class="listTop">
                    <div class="listTopRadio" radioGroup="0">
                        <div class="listChecked"></div>
                    </div>
                    <div class="listTopDetail">
                        <div class="detailImg"><img src="${p.pic}" alt=""></div>
                        <div class="detailText">
                            <div class="textName">
                                <div>${p.pname}</div>
                                <div>￥<span class="listprice">${p.price}0</span></div>
                            </div>
                            <div class="textDiscription">规格：套餐一</div>
                        </div>
                    </div>
                </div>
                <div class="listBottom" pid=${p.pid}>
                    <div class="listBottomTitle">数量：</div>
                    <div class="subtraction"><span>-</span></div>
                    <div class="selectNumber">${p.count}</div>
                    <div class="addition"><span>+</span></div>
                </div>
            </div> `;
    });
    $('#cart-list').html(html);
    main();
    firsttotalMoney();
  }
});

/**功能点3：点击“结算”，更新数据到确认订单页面,**/
$('#go2buy').click(function(){
  //1订单信息展示
  // $.ajax({  
  //   type: 'GET',
  //   url: '/data/6_cart_detail_select.php',
  //   data: {uid: localStorage['LoginUid']},
  //   success: function(list){
  //       // console.log(list);
  //       //遍历购物车中的每个商品，生成总数量和总价
  //       $.each(list, function (i, p){
  //           sumPrice += p.price * p.count; //商品总金额
  //           sumCount += parseInt(p.count); //商品总数量
  //       });
  //       $('#sumCount').text(sumCount);
  //       $('#sumPrice').text(sumPrice);
  //       $('#factPrice').text(sumPrice);
  //   }
  // })
  $('#sumCount').text(sumCount);
  $('#sumPrice').text(sumPrice);
  if (sumPrice>=100){
    factPrice = sumPrice-couponPrice;
    deletecid = couponid;
    $('#couponPrice').text(couponPrice);
  } else {
    factPrice = sumPrice;
    deletecid = '';
    $('#couponPrice').text(0);
  }
  $('#factPrice').text(factPrice);
  //2地址请求 收货人 姓名 电话 邮编 地区 
  $.ajax({
    url: '/data/14_address.php',
    data: {userid: localStorage['LoginUid']},
    success: function(address){
    //   console.log(address[0]);
      $("#addName").text(address[0].name);
      $("#addPhone").text(address[0].phone);
      $("#addPost").text(address[0].postcode);
      $("#addarea").text(address[0].area+" "+address[0].detail);
    },
    error: function(){
      $.toast('异步请求用户资料失败！请检查Network！');
    }
  });
});

/**功能点4：为每个“数量添加和减少按钮”超链接绑定单击事件监听**/
function countChange(pid,num){
  console.log("数量变化");
  //异步请求，实现添加到购物车
  $.ajax({
    type: 'POST',
    url: '/data/22_product_count.php',
    data: {uid: localStorage['LoginUid'], pid: pid, num:num},
    success: function(result){
      //////处理购物车添加结果//////
      if(result.code===1){
        // $.toast('更改数量成功！该商品数量：'+result.count);
      }else {
        // $.toast('更改数量失败！错误消息：'+result.msg);
      }
    }
  });
}

/**功能点5：为每个“删除商品”超链接绑定单击事件监听**/
function productDelete(pid){
  console.log("删除商品");
  //异步请求，实现添加到购物车
  $.ajax({
    type: 'POST',
    url: '/data/23_product_delete.php',
    data: {uid: localStorage['LoginUid'], pid: pid},
    success: function(result){
      //////处理购物车添加结果//////
      if(result.code===1){
        $.toast('删除商品成功！该商品：'+result.pid);
      }else {
        $.toast('删除商品失败！错误消息：'+result.msg);
      }
    }
  });
}

/**功能点6：点击“提交订单”，将数据提交给服务器端order表单**/
// 提交给服务器端的price, sumCount(商品数量)，userId
$('#confirm').click(function(){
  console.log(product);
  var data = { price: factPrice,
               sumCount: sumCount,
               userId: parseInt(localStorage['LoginUid']),
               productID: product.toString(),
               couponid: deletecid
              };
  console.log(data);
  if (sumCount==0) {
    $.toast('你还没有选择商品，不能提交订单');
  } else {
    //异步提交用户输入/选中的数据,实现订单添加
    $.ajax({
      type: 'POST',
      url: '/data/8_order_add.php',
      data: data,
      success: function(result){
        if(result.code===1){  //订单生成成功
          $.toast("订单生成成功");
          localStorage['OrderId']=result.orderId;
          location.href = 'order.html';
        }else {
          $.toast('订单生成失败！失败原因：'+result.msg);
        }
      },
      error: function(){
        $.toast('异步提交订单数据失败！请检查Network！')
      }
    })
  }
});

/*----------------------2购物车方法---------------------*/
function main(){
//1商品列复选按钮
$('.listTop:not(.btn_disabled)>.listTopRadio').bind('click', function () { 
  if ($(this).children('div').hasClass('listUnchecked')) {
    $(this).children('div').addClass('listChecked').removeClass('listUnchecked');
  } else {
    $(this).children('div').addClass('listUnchecked').removeClass('listChecked');
  }
  //全部选中fasle   否则true
  var flag2 = false;
  var listCheckboxs2=$('.listTopRadio').children('div');
  for (var i=0,len=listCheckboxs2.length;i<len;i++) {
    if ($(listCheckboxs2[i]).hasClass('listUnchecked')) {
      flag2 = true;
    }
  }
  if (flag2) {
    console.log("取消全选");
    document.getElementById("allchoose").checked = false;
    changeallchoose();
  } else {
    console.log("全选");
    document.getElementById("allchoose").checked = true;
    changeallchoose();
  }
  $('.submit-it-mumber').text($('.listChecked').length);
  totalMoney();
});

//2全选按钮与其他复选按钮联动
$('#selectAllButton').bind('click', function () {
  //全部选中fasle   否则true
  var flag = false;
  var listCheckboxs=$('.listTopRadio').children('div');
  for (var i=0,len=listCheckboxs.length;i<len;i++) {
    if ($(listCheckboxs[i]).hasClass('listUnchecked')) {
      flag = true;
    }
  }
  if (flag) {
    $('.listTopRadio').children('div').addClass('listChecked').removeClass('listUnchecked');
    $('.submit-it-mumber').text($('.listChecked').length);
    totalMoney();
  } else {
    $('.listTopRadio').children('div').addClass('listUnchecked').removeClass('listChecked');
    $('.submit-it-mumber').text($('.listChecked').length);
    totalMoney();
  }
});

//3全选栏状态切换
function changeallchoose(){
  if ($('#allchoose').is(':checked')){
    $(".allchooseimg").addClass("active");
  } else {
    $(".allchooseimg").removeClass("active");
  }
}
$("#allchoose").on("change",function(){
  changeallchoose();
});

//4减少商品数量  -1
$('.subtraction').bind('click', function () { 
  var mypid = parseInt($(this).parent().attr("pid"));
  // console.log(mypid);
  var mynumber = parseInt($(this).siblings('.selectNumber').text());
  if (mynumber > 1) {
    mynumber--;
  }
  $(this).siblings('.selectNumber').text(mynumber);
  countChange(mypid,mynumber);
  if ($(this).parents('.list').find('.listTopRadio>div').hasClass('listChecked')) {
      totalMoney();
    }
});

//5增加商品数量 +1
$('.addition').bind('click', function () { 
  var mypid = parseInt($(this).parent().attr("pid"));
  var mynumber = parseInt($(this).siblings('.selectNumber').text());
  mynumber++;
  $(this).siblings('.selectNumber').text(mynumber);
  countChange(mypid,mynumber);
  if ($(this).parents('.list').find('.listTopRadio>div').hasClass('listChecked')) {
      totalMoney();
    }
});

//6计算总价格
function totalMoney() { 
  var total = 0, allnum = 0, allpid = [];
  for (var i = 0; i < $('.list').length; i++) {
    if ($('.list').eq(i).find('.listTopRadio>div').hasClass('listChecked')) {
      var tempdom = $('.list').eq(i);
      var pricetemp = parseInt(tempdom.find('.listprice').text());
      var numbertemp = parseInt(tempdom.find('.selectNumber').text());
      var pid = parseInt(tempdom.attr("pid"));
      total += pricetemp * numbertemp;
      allnum += numbertemp;
      allpid.push(pid);
    }
  }
  sumPrice = total;
  sumCount = allnum;
  product = allpid;
  $('#totalmoney').text(total);
}

//7删除按钮
$('#cancel').bind('click', function () {
  var lists = $('.list');
  for (var i = 0; i < lists.length; i++) {
    // console.log(lists[i]);
    if (lists.eq(i).find('.listTopRadio>div').hasClass('listChecked')){
      lists.eq(i).remove();
      console.log(parseInt(lists.eq(i).attr("pid")));
      productDelete(parseInt(lists.eq(i).attr("pid")));
    }
  }
  totalMoney();
});

}//main函数

function firsttotalMoney() { 
  var total = 0, allnum = 0, allpid = [];
  for (var i = 0; i < $('.list').length; i++) {
    if ($('.list').eq(i).find('.listTopRadio>div').hasClass('listChecked')) {
      var tempdom = $('.list').eq(i);
      var pricetemp = parseInt(tempdom.find('.listprice').text());
      var numbertemp = parseInt(tempdom.find('.selectNumber').text());
      var pid = parseInt(tempdom.attr("pid"));
      total += pricetemp * numbertemp;
      allnum += numbertemp;
      allpid.push(pid);
    }
  }
  sumPrice = total;
  sumCount = allnum;
  product = allpid;
  $('#totalmoney').text(total);
}

