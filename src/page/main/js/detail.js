/**功能点1：当页面加载完后，异步请求商品详情**/
loadProductById(1);
//异步请求商品详情(id)
function loadProductById(pid){
  $.ajax({
    type: 'GET',
    url: '../../data/3_product_detail.php',
    data: {pid: pid},
    success: function(productData){ //服务器返回分页对象
      console.log(productData);
    },
    error: function(){
      alert('商品详情响应完，出现问题');
    }
  });
}