// 默认必须要执行$.init(),实际业务里一般不会在HTML文档里执行，通常是在业务页面代码的最后执行
$.init();
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
