<?php
/***
*接收客户端提交的用户编号，获取该用户对应的所有资料，
*返回用户剩余的抽奖次数
*/
header('Content-Type: application/json;charset=UTF-8');

@$userid = $_REQUEST['userid'] or die('{"code":2,"msg":"userid required"}');

require('1_init.php');

//SQL1：根据用户编号查询剩余的抽奖次数
$sql="SELECT time FROM user WHERE userid=$userid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
$time=intval($row[0])-1;

//更新用户资料表单
$sql = "UPDATE user SET time=$time WHERE userid=$userid";
$result = mysqli_query($conn,$sql);

//最终得到的用户数据返回用户剩余的抽奖次数
echo  $time;
?>