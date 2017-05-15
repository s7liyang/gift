<?php
/**
*接收客户端提交uid、pid，添加入购物车详情表，若已有该商品，则购买数量+1，返回JSON响应，形如：
{"code":1, "count": 4, "did":6}
*/
header('Content-Type: application/json');

@$uid = $_REQUEST['uid'] or die('{"code":2,"msg":"uid required"}');
@$pid = $_REQUEST['pid'] or die('{"code":3,"msg":"pid required"}');
//@$num = $_REQUEST['num'] or die('{"code":3,"msg":"num required"}');

require('1_init.php');
//SQL1：根据用户编号查询出购物车编号
$sql="SELECT cartid FROM cart WHERE userid=$uid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
if($row!==null){	//数据库中当前有购物车编号
	$cid = $row[0];
}else {
	//SQL2：若没有购物车编号则创建一个购物车，得到购物车编号
	$sql="INSERT INTO cart VALUES(NULL,$uid)";
	mysqli_query($conn,$sql);
	$cid = mysqli_insert_id($conn);
}

//SQL3：根据购物车编号和产品编号查询是否已买过该商品
$sql="SELECT * FROM cart_detail WHERE cartid=$cid AND productId=$pid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);

if($row!==null){
	//SQL4：已购买过则购买数量+num
	$did = $row['did'];	//详情编号
	$count = intval($row['count']);
	//$count=$num;   //购买数量直接 变成num
	$sql = "DELETE FROM cart_detail WHERE did=$did";
	mysqli_query($conn,$sql);
}else {
	//SQL5：未购买过则添加购买记录，数量为1
	$sql = "INSERT INTO cart_detail VALUES(NULL, $cid, $pid, $num)";
	mysqli_query($conn,$sql);
	$count = $num;
	$did = mysqli_insert_id($conn);
}

$output = [
	'code'=>1,
	'did'=>$did,
	'pid'=>$pid,
	'count'=>$count
];
echo json_encode($output);
?>