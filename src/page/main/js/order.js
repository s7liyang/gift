/**功能点1：检查用户是否已经登录，若没有，则跳转到登录页面**/
if(!localStorage['LoginName']){
  //未登录，跳转到登录页
  location.href='user.html';
}

/**功能点2：当页面加载完成，异步请求当前用户的所有订单**/
$.ajax({
  url: '/data/9_my_order.php',
  data: {uid: localStorage['LoginUid']},
  success: function(list){
    // console.log(list);
    if (list.length) {
      var html = '';
      $.each(list, function(i, order){
        html += `
        <div class="container-order">
          <div class="container-title">
              <span>订单号：20170000${order.oid}</span>
              <span>金额：￥${order.price}</span>
          </div>
          <div class="container-card-goods">
              <ul>`;
        //注意此处的字符串拼接
        $.each(order.productList, function(j,p){
          html += `<li><img src="${p.pic}" alt=""></li>`;
        });
        html +=`</ul>
              <div> <span class="all_goods">共${order.sumCount}件</span> </div>
          </div>
          <div class="container-bottom">
              <span>时间：<span class="orderTime">${order.orderTime}</span></span>
              <span>状态：<span class="orderStatus">${order.status}</span></span>
          </div>
        </div>
        `;
      });
      $('#tab1').html(html);
      orderStatus();
    } else {
      var html = `
                  <div class="content-block">
                      <div class="not_paying">
                          <div class="not_paying_basket">
                              <img src="/assert/img/cart-no.png" alt="">
                          </div>
                          <div class="not_pay_title">还空着呢,再去逛逛吧!</div>
                          <button class="go_shop"><a href="index.html" external>去逛逛</a></button>
                      </div>
                  </div>`;
      $('#tab1').html(html);
    }
  },
  error: function(){
    $.toast('异步请求用户订单数据失败！请检查Network！');
  }
});

//订单数据处理函数
function orderStatus(){
  //把订单状态由1/2/...改为有效的说明文字
  $('.orderStatus').each(function(){
    var t = $(this).html();
    switch (t){
      case '1':
        t = '待发货';
        break;
      case '2':
        t = '已发货';
        break;
      case '3':
        t = '已完成';
        break;
      default:
        t = '不可识别的状态'
    }
    $(this).html(t);
  });
  //把下单时间由BIGINT转换为y-m-d<br>h:m:s格式
  $('.orderTime').each(function(){
    var t = $(this).html();
    t = parseInt(t);
    t = new Date(t);
    t = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+' '+t.getHours()+':'+t.getMinutes();
    $(this).html(t);
  });
}

/**功能点3：当页面加载完成，异步请求当前用户的所有优惠券**/
$.ajax({
  url: '/data/20_coupon.php',
  data: {uid: localStorage['LoginUid']},
  success: function(list){
    // console.log(list);
    if (list.length) {
      var html = '';
      $.each(list, function(i, coupon){
        html += `
        <div class="container-order">
          <div class="container-title">
              <span>编号：20170000${coupon.cid}</span>
              <span class="couponStatus">${coupon.status}</span>
          </div>
          <div class="container-card-goods">
              <ul>
                <li>
                    <div>￥${coupon.price}</div>
                </li>
              </ul>
              <div> <span class="all_goods">领取时间：<span class="couponTime">${coupon.couponTime}</span></span> </div>
          </div>
          <div class="container-bottom">
              <span>使用说明：商品金额满100可使用</span>
          </div>
        </div>
        `;
      });
      $('#tab4').html(html);
      couponStatus();
    } else {
      var html = `
                  <div class="content-block">
                      <div class="not_paying">
                          <div class="not_paying_basket">
                              <img src="/assert/img/coupon-no.svg" alt="">
                          </div>
                          <div class="not_pay_title">还空着呢!</div>
                      </div>
                  </div>`;
      $('#tab4').html(html);
    }
  },
  error: function(){
    $.toast('异步请求用户订单数据失败！请检查Network！');
  }
});

//优惠券数据处理函数
function couponStatus(){
  //把优惠券状态由1/2/...改为有效的说明文字
  $('.couponStatus').each(function(){
    var t = $(this).html();
    switch (t){
      case '1':
        t = '未使用';
        break;
      case '2':
        t = '已使用';
        break;
      case '3':
        t = '已过期';
        break;
      default:
        t = '不可识别的状态'
    }
    $(this).html(t);
  });
  //把下单时间由BIGINT转换为y-m-d<br>h:m:s格式
  $('.couponTime').each(function(){
    var t = $(this).html();
    t = parseInt(t);
    t = new Date(t);
    t = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()+' '+t.getHours()+':'+t.getMinutes();
    $(this).html(t);
  });
}