<?php
// DBから登録した内容を取ってくるやつ
// せってい
$serverName = "localhost";
$user = "root";
$pw = "";
$dbname = "todo";
$dsn = 'mysql:dbname=' . $dbname . ';host=' . $serverName . ';charset=utf8';
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET CHARACTER SET 'utf8', NAMES utf8", PDO::ATTR_EMULATE_PREPARES => false);
$pdo = new PDO($dsn, $user, $pw, $options);

// やり取りするデータ
$res_arrays = array();
$res_arrays["error"] = 1;
$res_srrays["errormessage"] = "";

try {
    $stmt = $pdo->prepare('SELECT * FROM todolist');
    $result = $stmt->execute();
    // エラー処理
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }
    // DBのデータを配列に入れなおして整理する
    $items = array();
    while ($row = $stmt->fetch()) {
        $items[] = array(
            'id' => $row['id'],
            'item' => $row['item'],
            'done' => $row['done']
        );
    }
    $res_arrays["error"] = 0;
    $res_arrays["data"] = $items;
    echo json_encode($res_arrays["data"], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    // エラー処理
    $res_arrays["errormessage"] = "不明なエラー";
    echo json_encode($res_arrays, JSON_UNESCAPED_UNICODE);
    die();
}
