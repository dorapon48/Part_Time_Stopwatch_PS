<!--直接読み込みをはじく-->
<?php
session_start();

if(!isset($_SESSION["user_id"])) {
    $no_login_url = "index.html";
    header("Location: {$no_login_url}");
    exit;
}
?>


<!DOCTYPE html>
<html>
    <head>
        <title>PS</title>
        <meta charset="UTF-8">
        <!--css-->
        <link rel="stylesheet" href="../bootstrap-5.1.3-dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/contents.css">
        <!--jquery-->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="../bootstrap-5.1.3-dist/js/bootstrap.min.js"></script>
        <script>const SESSION_user_id = "<?php echo $_SESSION['user_id'] ?>" </script>
        <script src="js/contents.js"></script>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <h1>記録画面</h1>
                    <div class="main">
                        <div id="start-end-button">
                            <button name="start" type="button" class="btn btn-success btn-lg" onclick="start_button('<?php echo $_SESSION['user_id'] ?>')">計測スタート</button>
                        </div>
                        <div class="table-responsive">
                            <table id="logs" class="table table-striped">
                                <thead>
                                    <h1>仕事ログ</h1>
                                    <tr>
                                        <th>日付</th>
                                        <th>開始時間</th>
                                        <th>終了時間</th>
                                        <th>仕事内容</th>
                                        <th>補足</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <button name="add" type="button" class="btn btn-outline-success btn-sl" id="add-log-button" onclick="add_button()">追加</button>
                        <br>
                        <button name="excel_output" class="btn btn-success btn-lg" id="add-excel-button" type="button" onclick="excel_button()">excel出力</button>
                    </div>
                    <!-- 仕事内容入力ポップアップ -->
                    <div class="modal fade" id="job-info-modal" tabindex="-1" aria-labelledby="job-info-modal-label" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3>仕事内容入力画面</h3>
                                </div>
                                <div class="modal-body">
                                    <span>日付 : </span>
                                    <span>
                                        <?php $date = new DateTime();
                                        echo $date->format('Y/m/d'); ?>
                                    </span>
                                    <form name="input_job_info">
                                        <div class="row mb-4">
                                            <div class="col-md-6">
                                                <label class="form-label">開始時間:</label>
                                                <input type="datetime-local" name="start_time" id="start-time" class="form-control">
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">終了時間:</label>
                                                <input type="datetime-local" name="end_time" id="end-time" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-mb-12">
                                                <label class="form-label">仕事内容:</label>
                                                <input type="text" name="job_info" id="job-info" class="form-control">
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-mb-12">
                                                <label class="form-label">補足:</label>
                                                <input type="text" name="others" id="others" class="form-control">
                                            </div>
                                        </div>
                                    </form>
                                    <button name="complete" type="button" class="btn btn-success" onclick="input_confirm_button('<?php echo $_SESSION['user_id'] ?>')">完了</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Excelファイル入力ポップアップ -->
                    <div class="modal fade" id="excel-modal" tabindex="-1" aria-labelledby="excel-modal-label" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3>Excelファイル入力画面</h3>
                                </div>
                                <div class="modal-body">
                                    <form name="input_excel" enctype="multipart/form-data">
                                        <div class="row mb-12">
                                            <div class="col-md-12">
                                                <label>Excelファイルを入力してください</label>
                                                <input type="file" name="excel" class="form-control" accept=".xlsx">
                                                <input type="hidden" name="user_id" value="<?php echo $_SESSION['user_id'] ?>">
                                            </div>
                                        </div>
                                    </form>
                                    <button name="complete" type="button" class="btn btn-success" onclick="excel_confirm_button()">完了</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>