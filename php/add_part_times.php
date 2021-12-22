<?php

// database
$serverName = "localhost";
$user = "root";
$pw = "";
$dbname = "ps";
$dsn = 'mysql:dbname=' . $dbname . ';host=' . $serverName . ';charset=utf8';
$pdo = new PDO($dsn, $user, $pw);

// やり取りに使う配列とエラーメッセージ等
$res_arrays = array();
$res_arrays["error"] = 1;
$res_arrays["errormessage"] = "";

// POSTの入力
$user_id = filter_input(INPUT_POST, "user_id");
$start_time = filter_input(INPUT_POST, "start_time");
$end_time = filter_input(INPUT_POST, "end_time");
$job_info = filter_input(INPUT_POST, "job_info");
$others = filter_input(INPUT_POST, "others");
$job_id = uniqid();

// SQL文
$sql = "INSERT INTO part_times (job_id, user_id, start_time, end_time, job_info, others) VALUES (:job_id, :user_id, :start_time, :end_time, :job_info, :others)";

try
{
    //prepareがsql文の準備
    //bindValueで指定した文字列に代入
    //executeでsqlを実行
    $s_t = date('Y-m-d H:i:s', strtotime($start_time)); //dateフォーマットに合わせてstringを送る
    $e_t = date('Y-m-d H:i:s', strtotime($end_time));
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":user_id", $user_id, PDO::PARAM_STR);
    $stmt->bindValue(":start_time", $s_t, PDO::PARAM_STR);
    $stmt->bindValue(":end_time", $e_t, PDO::PARAM_STR);
    $stmt->bindValue(":job_id", $job_id, PDO::PARAM_STR);
    $stmt->bindValue(":job_info", $job_info, PDO::PARAM_STR);
    $stmt->bindValue(":others", $others, PDO::PARAM_STR);
    $result = $stmt->execute();

    //エラー時処理
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }
    $res_arrays["error"] = 0;

    //返却
    echo json_encode($res_arrays);
    die();

} catch (PDOException $e) {
    // エラー処理
    //$res_arrays["errormessage"] = "不明なエラー";
    $res_arrays["errormessage"] = $e;
    echo json_encode($res_arrays);
    die();
}

?>