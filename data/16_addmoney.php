<?php
/***
*接收客户端提交的userid,在数据库中找到对应的数据表
*/
header('Content-Type: application/json;charset=UTF-8');

@$userid = $_REQUEST['userid'] or die('{"code": 2, "msg":"userid required"}');
@$addmoney = $_REQUEST['addmoney'] or die('{"code": 3, "msg":"addmoney required"}');

require('1_init.php');

//SQL1：根据用户编号查询出钱包已有金额
$sql="SELECT money FROM user WHERE userid=$userid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
$addmoney +=intval($row[0]);
 
//更新用户资料表单
$sql = "UPDATE user SET money=$addmoney WHERE userid=$userid";
$result = mysqli_query($conn,$sql);

//DML:  false 或 true
if($result===false){  //SQL执行失败-SQL语法错误
    //echo '{"code":5, "msg":"insert err", "sql":"'.$sql.'"}';
    $output['code'] = 0;
    $output['msg'] = '充值出现问题。。';
    $output['sql'] = $sql;
}else{
    $output['code'] = 1;
    $output['allmoney'] = $addmoney;
}

echo json_encode($output);
?>