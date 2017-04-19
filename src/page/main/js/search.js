//点击搜索按钮
$("#go2search").on("click",function(){
  var key = $("#search").val()
  if(key){
    console.log(key);
    location.href = `search.html?key=${key}`;
  }
});

/**功能点0：js获取url传递过来的关键字key**/
var url = encodeURI(location.search); //获取url中"?"符后的字串
var theRequest = new Object();
if (url.indexOf("?") != -1) {
  var str = url.substr(1);
  var strs = str.split("&");
  for(var i = 0; i < strs.length; i ++) {
    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
  }
}
// console.log(decodeURI(theRequest.key));
$('#listTitle').text(decodeURI(theRequest.key));

/**功能点1：当页面加载完后，异步请求产品列表**/
loadProductByPage(1,decodeURI(theRequest.key));
//异步请求商品数据(分页)，修改商品列表，修改分页条内容
function loadProductByPage(pageNum,key){
  $.ajax({
    type: 'GET',
    url: '/data/21_product_search.php',
    data: {pageNum: pageNum,key:key},
    success: function(pager){ //服务器返回分页对象
      //遍历分页对象中的产品数据
      console.log(pager);
      var html = '';  //产品内容
      $.each(pager.data, function(i, p){ //遍历每一个商品
        html += `
          <a href="detail.html?pid=${p.pid}" external>
              <img src="${p.pic}" alt="">
              <p class="name">${p.pname}</p>
              <p class="price">￥${p.price}</p>
          </a>
        `;
      });
      $('#product-list').html(html);
      //修改分页条中的内容
      var html = '';  //分页条中的内容
      html += `<div>${pager.pageNum-2}</div>`;
      html += `<div>${pager.pageNum-1}</div>`;
      html += `<div class="active">${pager.pageNum}</div>`;
      html += `<div>${pager.pageNum+1}</div>`;
      html += `<div>${pager.pageNum+2}</div>`;
      $('#pager').html(html);
      var pages = $('#pager div');
      $.each( pages, function(i, n){
        // console.log($(n).text());
        if(parseInt($(n).text())<=0||parseInt($(n).text())>pager.pageCount){
          $(n).remove();
        }
      });
      if(pager.recordCount==0) {
         $('#pager').html("没有找到与"+"\“ "+key+" \”"+"相关的商品。。。");
      }
    },
    error: function(){
      $.toast('产品列表响应完成,出现问题');
    }
  });
}

/**功能点2：为分页条中的每个超链接绑定事件监听**/
$('#pager').on('click', 'div', function(){
  // console.log($(this).text());
  var pn = $(this).text(); //要显示的页号
  loadProductByPage(pn); //异步加载商品数据
});