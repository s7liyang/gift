<?php
/***
*接收客户端的 price, sumCount(商品数量)，userId，
*返回：{"code":1, "orderId": 9234234134}
*/
header('Content-Type: application/json;charset=UTF-8');

@$price = $_REQUEST['price'] or die('{"code":4,"msg":"price required"}');
@$sumCount = $_REQUEST['sumCount'] or die('{"code":5,"msg":"sumCount required"}');
@$userId = $_REQUEST['userId'] or die('{"code":6,"msg":"userId required"}');
@$product = $_REQUEST['productID'] or die('{"code":7,"msg":"productID required"}');
@$couponid = $_REQUEST['couponid'];
$orderTime = time()*1000;
$status = 1;  //刚下的订单，默认状态为配货中
//$product = strtr($product,"[]","()");

require('1_init.php');

//SQL0：根据用户名查询用户钱包的金额
$sql="SELECT money FROM user WHERE userid= '$userId' ";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);

if($row[0]<$price){
	$output['code']=0;
	$output['msg']='余额不足，请充值后再下单。。。';
}else{
	$newmoney = $row[0] - $price;
	
	//SQL1：向my_order表中插入一行记录，得到oid
	$sql = "INSERT INTO my_order VALUES(NULL,'$price','$sumCount','$orderTime','$status','$userId')";
	$result = mysqli_query($conn,$sql);
	$orderId = mysqli_insert_id($conn);
	
	//SQL2：读取当前用户购物车中的条目，获取所有商品编号
	$sql = "SELECT productId,count FROM cart_detail WHERE cartid=(SELECT cartid FROM cart WHERE userid=$userId) AND productId in ($product)";
	$result = mysqli_query($conn,$sql);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	
	
	//SQL3：（循环）针对每个购物车项执行INSERT，插入到order_detail
	foreach($list as $p){
	  $sql = "INSERT INTO order_detail VALUES(NULL,'$orderId','$p[productId]','$p[count]')";
	  mysqli_query($conn,$sql);
	}
	
	//SQL4：删除当前用户购物车中的条目
	$sql = "DELETE FROM cart_detail WHERE cartid=(SELECT cartid FROM cart WHERE userid=$userId) AND productId in ($product)";
	mysqli_query($conn,$sql);
	
	//SQL5：更新用户优惠券中的条目
	$sql = "UPDATE coupon SET status=2 WHERE cid=$couponid AND userId=$userId";
	mysqli_query($conn,$sql);
	
	//SQL6：更新用户钱包金额
	$sql = "UPDATE user SET money=$newmoney WHERE userid=$userId";
	$result = mysqli_query($conn,$sql);
	
	$output['code']=1;
	$output['orderId']=$orderId;
}


echo json_encode($output);
?>

