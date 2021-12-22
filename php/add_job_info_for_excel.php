<?php
require '../../vendor/autoload.php';
use PhpOffice\PhpSpreadsheet\IOFactory;

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

try
{
    // POSTの入力
    $file = $_FILES['excel'];
    $user_id = $_POST['user_id'];

    //excelファイルを開く
    $reader = IOFactory::createReader('Xlsx');
    $spreadsheet = $reader->load($file["tmp_name"]);
    $sheet = $spreadsheet->setActiveSheetIndex(0);

    // SQL文
    $sql = "SELECT * FROM part_times WHERE user_id = :user_id AND start_time BETWEEN :ss_time AND :se_time";

    $sql_year = $sheet->getCell('A1')->getValue();
    $sql_month = $sheet->getCell('A2')->getValue();
    $y_m = (string)$sql_year . "-" . (string)$sql_month;
    $start_month_range = $y_m . "-01 00:00:00";
    $end_month_range = (new DateTimeImmutable)->modify('last day of ' . $y_m)->format('Y-m-d') . " 23:59:59";
    
    //$res_arrays["errormessage"] = $start_month_range . "***" . $end_month_range;

    //prepareがsql文の準備
    //bindValueで指定した文字列に代入
    //executeでsqlを実行
    /*
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":user_id", $user_id, PDO::PARAM_STR);
    
    $result = $stmt->execute();

    //エラー時処理
    if ($result != 1) {
        $res_arrays["errormessage"] = "接続に失敗しました。";
        echo json_encode($res_arrays);
        die();
    }
    */
    $res_arrays["error"] = 0;

    $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
    $writer->save('../output/output.xlsx');
    //返却
    echo json_encode($res_arrays);
    die();

} catch (PDOException $e) {
    // エラー処理
    $res_arrays["errormessage"] = "不明なエラー";
    //$res_arrays["errormessage"] = $e;
    echo json_encode($res_arrays);
    die();
}

?>