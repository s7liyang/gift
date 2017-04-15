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

// 加载分类菜单列表
$.get(
    "/data/menu.json",
    function(data){
      console.log("分类菜单:",data);
      function loadData(list){
        var html="";
        $.each( list, function(i, n){
          html += `<a class="item close-panel" href="list.html?key=${n.key}">
                    <i class="${n.icon}"></i></br>
                    ${n.key}
                   </a>`;
        });
        return html;
      }
      $("#fenlei").html(loadData(data));
    }
)

//点击搜索按钮
$("#go2search").on("click",function(){
  var key = $("#search").val()
  console.log(key);
  if(key){
    location.href = `list.html?key=${key}`;
  }
});