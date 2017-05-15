<?php
/**
*接收客户端提交的pid，向客户端输出该pid产品的详细产品信息，以JSON格式：		
{
	pid：1             //商品id
  pname: 森林幻想曲,	  //商品名称
  price: 166.0,	    //商品价格
  pic: /assert/img/product1.jpg,    //商品图片链接
  swiper: ["/assert/img/product1_swiper1.jpg","/assert/img/product1_swiper2.jpg","/assert/img/product1_swiper3.jpg"]  //商品轮播图
  detail: ["/assert/img/product1_detail1.jpg","/assert/img/product1_detail2.jpg","/assert/img/product1_detail3.jpg"]  //商品介绍图
}
*/
header('Content-Type: application/json;charset=UTF-8');

@$pId = $_REQUEST['pid'];
if($pId===null){ //客户端未提交pId，默认值为4
	$pId = 1;
}else { //客户端提交了pId，把字符串解析为整数
	$pId = intval($pId); 
}

//将要向客户端输出的商品详情数据
$output = [
	'data'=>null,
	'detail'=>null,
	'swiper'=>null
];
require('1_init.php');

//SQL1: 查询pid的资料
$sql = "SELECT * FROM product WHERE pid=$pId";
$result = mysqli_query($conn,$sql);

//SQL2: 查询pid的详情介绍图片
$sql2 = "SELECT * FROM product_detail WHERE pid=$pId";
$result2 = mysqli_query($conn,$sql2);

//SQL3: 查询pid的轮播图片
$sql3 = "SELECT * FROM product_swiper WHERE pid=$pId";
$result3 = mysqli_query($conn,$sql3);

$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
$output['detail'] = mysqli_fetch_all($result2, MYSQLI_ASSOC);
$output['swiper'] = mysqli_fetch_all($result3, MYSQLI_ASSOC);
echo json_encode($output);
?>