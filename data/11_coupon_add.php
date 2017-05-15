<?php
/***
*接收客户端的 price, userId，
*返回：{"code":1, "couponId": 1}
*/
header('Content-Type: application/json;charset=UTF-8');

@$price = $_REQUEST['price'] or die('{"code":4,"msg":"price required"}');
@$userId = $_REQUEST['userId'] or die('{"code":5,"msg":"userId required"}');
$couponTime = time()*1000;
$status = 1;  //刚得到的优惠券，默认状态为未使用


require('1_init.php');

//SQL1：向coupon表中插入一行记录，得到cid
$sql = "INSERT INTO coupon VALUES(NULL,'$price','$couponTime','$status','$userId')";
$result = mysqli_query($conn,$sql);
$couponId = mysqli_insert_id($conn);

$output['code']=1;
$output['orderId']=$couponId;

echo json_encode($output);
?>
