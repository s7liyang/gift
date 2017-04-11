/**功能点1：当页面加载完后，异步请求产品列表**/
loadProductByPage(1);
//异步请求商品数据(分页)，修改商品列表，修改分页条内容
function loadProductByPage(pageNum){
  $.ajax({
    type: 'GET',
    url: '../../data/4_product_list.php',
    data: {pageNum: pageNum},
    success: function(pager){ //服务器返回分页对象
      //遍历分页对象中的产品数据
      // console.log(pager);
      var html = '';  //产品内容
      $.each(pager.data, function(i, p){ //遍历每一个商品
        html += `
          <a href="details.php?${p.pid}" external>
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
    },
    error: function(){
      alert('产品列表响应完成,出现问题');
    }
  });
}
/**功能点2：为分页条中的每个超链接绑定事件监听**/
$('#pager').on('click', 'div', function(){
  // console.log($(this).text());
  var pn = $(this).text(); //要显示的页号
  loadProductByPage(pn); //异步加载商品数据
});