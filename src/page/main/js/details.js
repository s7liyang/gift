// 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行
//$.init();
// swiper配置文件
var swiperconfig = {
  loop: true,//循环
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