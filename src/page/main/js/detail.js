// swiper配置文件
var swiperconfig = {
  // loop: true,//循环
  autoplay:2000,//自动播放
  pagination:".swiper-pagination",	//声明分页器
  paginationClickable:true,		//分页器可以点击
}
$(function() {
  $(".swiper-container").swiper(swiperconfig);
});
//切换规格大小
var buttons = $(".guige button")
buttons.on("click", function () {
	$(this).addClass("active").siblings().removeClass("active");
});
var cirnum = 1;
//数量增加
var add = $("#add"),
	reduce = $("#reduce"),
	amount = $("#amount");
add.on("click", function () {
	var num = parseInt(amount.text());
	cirnum = num + 1;
	amount.text(cirnum);
});
//数量减少
reduce.on("click", function () {
	var num = parseInt(amount.text());
	if (num > 1) {
		cirnum = num - 1;
		amount.text(cirnum);
	}
});

/*-----------------详情页数据加载------------------*/
/**功能点0：js获取url传递过来的商品pid**/
var url = location.search; //获取url中"?"符后的字串
var theRequest = new Object();
if (url.indexOf("?") != -1) {
  var str = url.substr(1);
  var strs = str.split("&");
  for(var i = 0; i < strs.length; i ++) {
    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
  }
}
// console.log(theRequest.pid);

/**功能点1：当页面加载完后，异步请求商品详情**/
loadProductById(theRequest.pid);
//异步请求商品详情(id)
function loadProductById(pid){
  $.ajax({
    type: 'GET',
    url: '/data/3_product_detail.php',
    data: {pid: pid},
    success: function(productData){ //服务器返回分页对象
      // console.log(productData.swiper[0]);
      $('#product_pname').text(productData.data[0].pname);
      $('#product_price').text(productData.data[0].price);
      if (productData.detail[0]) {
        $('#product_detail').html(`<img src="${productData.detail[0].src1}"><img src="${productData.detail[0].src2}"><img src="${productData.detail[0].src3}">`);
      }else{
        $('#product_detail').html(`<img src="${productData.data[0].pic}"><img src="${productData.data[0].pic}"><img src="${productData.data[0].pic}">`);
      }
      if (productData.swiper[0]) {
        $('#product_swiper1').attr("src",`${productData.swiper[0].src1}`);
        $('#product_swiper2').attr("src",`${productData.swiper[0].src2}`);
        $('#product_swiper3').attr("src",`${productData.swiper[0].src3}`);
      }else{
        $('#product_swiper1').attr("src",`${productData.data[0].pic}`);
        $('#product_swiper2').attr("src",`${productData.data[0].pic}`);
        $('#product_swiper3').attr("src",`${productData.data[0].pic}`);
      }

    },
    error: function(){
      alert('商品详情响应完，出现问题');
    }
  });
}

/**功能点2：为每个“添加到购物车”超链接绑定单击事件监听**/
$('#product_add').on('click', function(){
  console.log("加入购物车");
  var pid = theRequest.pid,
      num = parseInt($("#amount").text());
  //异步请求，实现添加到购物车
  $.ajax({
    type: 'POST',
    url: '/data/5_cart_product_add.php',
    data: {uid: localStorage['LoginUid'], pid: pid, num:num},
    success: function(result){
      //////处理购物车添加结果//////
      if(result.code===1){
        $.toast('添加成功！该商品数量：'+result.count);
        showcart();
      }else {
        $.toast('添加失败！错误消息：'+result.msg);
      }
    }
  });
});

/**功能点3：显示购物车已有商品件数和商品总额**/
function showcart(){
  var sumPrice=0, sumCount=0;
  $.ajax({  
    type: 'GET',
    url: '/data/6_cart_detail_select.php',
    data: {uid: localStorage['LoginUid']},
    success: function(list){
        // console.log(list);
        //遍历购物车中的每个商品，生成总数量和总价
        $.each(list, function (i, p){
            sumPrice += p.price * p.count; //商品总金额
            sumCount += parseInt(p.count); //商品总数量
        });
        $('#cir').text(sumCount);
        $('#total').text(sumPrice);
    }
  })
}
showcart();


