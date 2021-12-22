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
$res_arrays["start_time"] = "";

// POSTの入力
$user_id = filter_input(INPUT_POST, "user_id");

// SQL文
$sql = "SELECT * FROM stock_times WHERE user_id = :user_id";

try
{
    //prepareがsql文の準備
    //bindValueで指定した文字列に代入
    //executeでsqlを実行
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":user_id", $user_id, PDO::PARAM_STR);
    $result = $stmt->execute();

    //エラー時処理
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }
    
    //返却の成形
    $row = $stmt->fetch();
    if ($row) {
        $res_arrays["start_time"] = $row['start_time'];
        $res_arrays["error"] = 0;
    } else {
        $res_arrays["errormessage"] = "時間の登録なし";
    }

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