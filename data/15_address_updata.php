<?php
/***
*接收客户端提交的userid,在数据库中找到对应的数据表
*/
header('Content-Type: application/json;charset=UTF-8');

@$userid = $_REQUEST['userid'] or die('{"code": 2, "msg":"userid required"}');
@$name = $_REQUEST['name'] or die('{"code": 3, "msg":"name required"}');
@$phone = $_REQUEST['addphone'] or die('{"code": 4, "msg":"phone required"}');
@$postcode = $_REQUEST['postcode'] or die('{"code": 5, "msg":"postcode required"}');
@$area = $_REQUEST['area'] or die('{"code": 6, "msg":"area required"}');
@$detail = $_REQUEST['detail'] or die('{"code": 7, "msg":"detail required"}');

require('1_init.php');

//更新用户资料表单
$sql = "UPDATE address SET  name='$name',
							phone='$phone',
							postcode='$postcode',
							area='$area',
							detail='$detail' WHERE userid=$userid";
$result = mysqli_query($conn,$sql);

//DML:  false 或 true
if($result===false){  //SQL执行失败-SQL语法错误
    //echo '{"code":5, "msg":"insert err", "sql":"'.$sql.'"}';
    $output['code'] = 0;
    $output['msg'] = '地址更新失败';
    $output['sql'] = $sql;
}else{
    $output['code'] = 1;
    $output['userid'] = $userid;
}

echo json_encode($output);
?>