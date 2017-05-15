<?php
/***
*接收客户端提交的userid,在数据库中找到对应的数据表
*接收客户端的 nickname, email, phone, sex, birth,sign,userimg;
*/
header('Content-Type: application/json;charset=UTF-8');

@$userid = $_REQUEST['userid'] or die('{"code": 2, "msg":"userid required"}');
@$nickname = $_REQUEST['nickname'] or die('{"code": 3, "msg":"nickname required"}');
@$email = $_REQUEST['email'] or die('{"code": 4, "msg":"email required"}');
@$phone = $_REQUEST['phone'] or die('{"code": 5, "msg":"phone required"}');
@$sex = $_REQUEST['sex'] or die('{"code": 6, "msg":"sex required"}');
@$birth = $_REQUEST['birth'] or die('{"code": 7, "msg":"birth required"}');
@$sign = $_REQUEST['sign'] or die('{"code": 8, "msg":"sign required"}');
@$userimg = $_REQUEST['userimg'] or die('{"code": 9, "msg":"userimg required"}');

require('1_init.php');

//更新用户资料表单
$sql = "UPDATE user SET nickname='$nickname',
						email='$email',
						phone='$phone',
						sex='$sex',
						birth='$birth',
						sign='$sign',
						userimg='$userimg' WHERE userid=$userid";
$result = mysqli_query($conn,$sql);

//DML:  false 或 true
if($result===false){  //SQL执行失败-SQL语法错误
    //echo '{"code":5, "msg":"insert err", "sql":"'.$sql.'"}';
    $output['code'] = 0;
    $output['msg'] = '用户资料提交失败';
    $output['sql'] = $sql;
}else{
    $output['code'] = 1;
    $output['userid'] = mysqli_insert_id($conn);
}

echo json_encode($output);
?>





