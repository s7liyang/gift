//swiper
var mySwiper = new Swiper ('.swiper-container', {
    loop: true,//循环
    autoplay:2000,//自动播放
		pagination:".swiper-pagination",	//声明分页器
		paginationClickable:true,		//分页器可以点击
})

// menu
$("#menu").on("click",function(){
  console.log("ok");
  if ($("#menubox").css("display")=="none") {
    $("#menubox").show();
  } else {
    $("#menubox").hide();
  }
});