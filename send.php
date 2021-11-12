<?php
//入力した内容を送信するやつ
// DB接続設定
$serverName = "localhost"; //DBの場所。
$user = "root"; //DBのユーザー名
$pw = ""; //DBのパスワード
$dbname = "todo";  //DB名
$dsn = 'mysql:dbname=' . $dbname . ';host=' . $serverName . ';charset=utf8';
$pdo = new PDO($dsn, $user, $pw);

// やり取りに使う配列とエラーメッセージ等
$res_arrays = array();
$res_arrays["error"] = 1;
$res_srrays["errormessage"] = "";

// DBに登録するやつ
$id = uniqid();  //uniqid()を使うとランダムなIDを自動で作ってくれる！！！
$item = filter_input(INPUT_POST, "todoitem");  //jsから受け取るやつ

// SQL文
$sql = 'INSERT INTO todolist (id, item, done) VALUES (:id, :item, 0)';

try {
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $stmt->bindValue(':item', $item, PDO::PARAM_STR);
    $result = $stmt->execute();  //DBに登録
    //エラー処理
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }
    $res_arrays["error"] = 0;
    // echoでjsに配列を渡す
    echo json_encode($res_arrays);
    // セッション終了
    die();
} catch (PDOException $e) {
    // エラー処理
    $res_arrays["errormessage"] = "不明なエラー";
    echo json_encode($res_arrays);
    die();
}
?>
