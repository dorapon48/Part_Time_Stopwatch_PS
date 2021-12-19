<?php

// database
$serverName = "localhost";
$user = "root";
$pw = "";
$dbname = "todo";
$dsn = 'mysql:dbname=' . $dbname . ';host=' . $serverName . ';charset=utf8';
$pdo = new PDO($dsn, $user, $pw);

// やり取りに使う配列とエラーメッセージ等
$res_arrays = array();
$res_arrays["error"] = 1;
$res_arrays["errormessage"] = "";

// POSTの入力
$user_id = filter_input(INPUT_POST, "user_id");
$password = filter_input(INPUT_POST, "password");

// SQL文
$sql = "SELECT COUNT(*) 
        FROM user 
        WHERE user_id = :user_id
        AND password = :password";

try
{
    //prepareがsql文の準備
    //bindValueで指定した文字列に代入
    //executeでsqlを実行
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);
    $result = $stmt->execute();

    //エラー時処理
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }

    //ログイン処理
    if ($stmt->fetch() == 0) {
        $res_arrays["errormessage"] = "ユーザIDかパスワードが違います。";
    } else {
        $res_arrays["error"] = 0;
    }

    echo json_encode($res_arrays);
    die();

} catch (PDOException $e) {
    // エラー処理
    $res_arrays["errormessage"] = "不明なエラー";
    echo json_encode($res_arrays);
    die();
}

?>