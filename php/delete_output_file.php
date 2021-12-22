<?php

// やり取りに使う配列とエラーメッセージ等
$res_arrays = array();
$res_arrays["error"] = 1;
$res_arrays["errormessage"] = "";

try
{
    $file_path = '../output/output.xlsx';
    if (unlink($file_path)){
        $res_arrays["error"] = 0;
    } else {
        $res_arrays["errormessage"] = "ファイルの削除に失敗...";
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