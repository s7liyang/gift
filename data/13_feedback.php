<?php
/***
*接收客户端提交的意见反馈 userid phone和txt，添加到数据库中，返回{"code":1,"userid": 2}
*/
header('Content-Type: application/json');

@$id = $_REQUEST['userid'] or die('{"code": 2, "msg":"userid required"}');
@$n = $_REQUEST['phone'] or die('{"code": 2, "msg":"phone required"}');
@$p = $_REQUEST['txt'] or die('{"code": 3, "msg":"txt required"}');

require('1_init.php');

$sql = "INSERT INTO feedback VALUES(NULL,'$id','$n','$p')";
$result = mysqli_query($conn,$sql);
//DML:  false 或 true
if($result===false){  //SQL执行失败-SQL语法错误
    //echo '{"code":5, "msg":"insert err", "sql":"'.$sql.'"}';
    $output['code'] = 5;
    $output['msg'] = 'insert err';
    $output['sql'] = $sql;
}else{
    $output['code'] = 1;
    $output['userid'] = mysqli_insert_id($conn);
}
echo json_encode($output);
?>







