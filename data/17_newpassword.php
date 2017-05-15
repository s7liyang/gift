<?php
/***
*接收客户端提交的userid,在数据库中找到对应的数据表
*/
header('Content-Type: application/json;charset=UTF-8');

@$userid = $_REQUEST['userid'] or die('{"code": 2, "msg":"userid required"}');
@$newpassword = $_REQUEST['newpassword'] or die('{"code": 3, "msg":"newpassword required"}');

require('1_init.php');
 
//更新用户资料表单
$sql = "UPDATE user SET password='$newpassword' WHERE userid=$userid";
$result = mysqli_query($conn,$sql);

//DML:  false 或 true
if($result===false){  //SQL执行失败-SQL语法错误
    //echo '{"code":5, "msg":"insert err", "sql":"'.$sql.'"}';
    $output['code'] = 0;
    $output['msg'] = '修改密码出错';
    $output['sql'] = $sql;
}else{
    $output['code'] = 1;
}

echo json_encode($output);
?>