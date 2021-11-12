<?php

// いつもの
$serverName = "localhost";
$user = "root";
$pw = "";
$dbname = "todo";
$dsn = 'mysql:dbname=' . $dbname . ';host=' . $serverName . ';charset=utf8';
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET 'utf8', NAMES utf8", PDO::ATTR_EMULATE_PREPARES => false);
$pdo = new PDO($dsn, $user, $pw, $options);

// エラーメッセージとかはここまでちゃんとやらなくてもいいかも
$res_arrays = array();
$res_arrays["error"] = 1;
$res_srrays["errormessage"] = "";

// クライアント側（js）から更新したいIDを受け取る
$id = filter_input(INPUT_POST, "updateid");

try {
    //doneが０なら１，１なら０に変える
    $stmt = $pdo->prepare('UPDATE todolist SET done = CASE WHEN done = 0 THEN 1 ELSE 0 END WHERE id = :id');
    $stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $result = $stmt->execute();
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }
    $res_arrays["error"] = 0;
    echo "更新しました。";
    die();
} catch (Exception $e) {
    $res_arrays["errormessage"] = "不明なエラー";
    echo json_encode($res_arrays);
    die();
}