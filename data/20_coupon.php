<?php
/***
*接收客户端提交的用户编号，获取该用户对应的所有订单，
*以JSON格式返回：[{},{}...]
*/
header('Content-Type: application/json;charset=UTF-8');

@$uid = $_REQUEST['uid'] or die('{"code":2,"msg":"uid required"}');

require('1_init.php');

//SQL1：根据用户编号查询出其所有的订单
$sql = "SELECT * FROM coupon WHERE userid=$uid";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo  json_encode($list);
?>




