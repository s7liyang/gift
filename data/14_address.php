<?php
/***
*接收客户端提交的用户编号，获取该用户对应的地址管理页面资料，
*以JSON格式返回：[{},{}...]
*/
header('Content-Type: application/json;charset=UTF-8');

@$uid = $_REQUEST['userid'] or die('{"code":2,"msg":"userid required"}');

require('1_init.php');

//SQL1：根据用户编号查询出其所有的资料
$sql = "SELECT * FROM address WHERE userid=$uid";
$result = mysqli_query($conn,$sql);
$address = mysqli_fetch_all($result, MYSQLI_ASSOC);

//最终得到的订单列表$list是一个四维数组
echo  json_encode($address);
?>




