<?php
/***
*接收客户端提交的用户编号，获取该用户对应的所有资料，
*以JSON格式返回：[{},{}...]
*/
header('Content-Type: application/json;charset=UTF-8');

@$uid = $_REQUEST['userid'] or die('{"code":2,"msg":"userid required"}');

require('1_init.php');

//SQL1：根据用户编号查询出其所有的资料
$sql = "SELECT * FROM coupon WHERE userid=$uid ANd status=1 ORDER BY price DESC";
$result = mysqli_query($conn,$sql);
$coupon = mysqli_fetch_all($result, MYSQLI_ASSOC);

//$coupon
echo  json_encode($coupon);
?>





