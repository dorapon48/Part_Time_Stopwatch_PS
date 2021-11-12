<?php
// DBのデータを削除するやつ
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

// クライアント側（js）から削除したいIDを受け取る
$id = filter_input(INPUT_POST, "deleteid");

try {
    $stmt = $pdo->prepare('DELETE FROM todolist WHERE id = :id');
    $stmt->bindValue(':id', $id, PDO::PARAM_STR);
    $result = $stmt->execute();
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }
    $res_arrays["error"] = 0;
    echo "削除しました。";
    die();
} catch (Exception $e) {
    $res_arrays["errormessage"] = "不明なエラー";
    echo json_encode($res_arrays);
    die();
}
