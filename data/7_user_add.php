<?php
/***
*接收客户端提交的uname和upwd，添加到数据库中，返回{"code":1,"userid": 2}
*/
header('Content-Type: application/json');

@$n = $_REQUEST['username'] or die('{"code": 2, "msg":"username required"}');
@$p = $_REQUEST['password'] or die('{"code": 3, "msg":"password required"}');

require('1_init.php');

//SQL1：根据用户名查询用户是否已经注册了
$sql="SELECT username FROM user WHERE username= '$n' ";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);

if($row){//数据库中有当前用户名
	$output['code'] = 0;
    $output['msg'] = '用户名已经存在';
    $output['sql'] = $sql;
}
else {
	//创建用户资料表单
	$sql = "INSERT INTO user VALUES(NULL,'$n','$p',NULL,0,NULL,NULL,NULL,1,NULL,NULL,5)";
	$result = mysqli_query($conn,$sql);
	$userId = mysqli_insert_id($conn);
	
	$output['code'] = 1;
    $output['userid'] = mysqli_insert_id($conn);
	//继续创建用户的收货地址表单
	$sql = "INSERT INTO address VALUES(NULL,'$userId',NULL,NULL,NULL,NULL,NULL)";
	$result = mysqli_query($conn,$sql);
}
//DML:  false 或 true
//if($result===false){  //SQL执行失败-SQL语法错误
//  //echo '{"code":5, "msg":"insert err", "sql":"'.$sql.'"}';
//  $output['code'] = 5;
//  $output['msg'] = 'insert err';
//  $output['sql'] = $sql;
//}else{
//  $output['code'] = 1;
//  $output['userid'] = mysqli_insert_id($conn);
//}

echo json_encode($output);
?>







