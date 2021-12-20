<!DOCTYPE html>
<html>
    <head>
        <title>PS</title>
        <meta charset="UTF-8">
        <!--css-->
        <link rel="stylesheet" href="css/contents.css">
        <!--jquery-->
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    </head>
    <body>
        <h1>TEST</h1>
        <div class="main">
            <button name="start" type="button" onclick="">スタート</button>
            <table id="logs">
                <tr>
                    <th>日付</th>
                    <th>開始時間</th>
                    <th>終了時間</th>
                    <th>就業時間</th>
                    <th>仕事内容</th>
                    <th>補足</th>
                </tr>
            </table>
            <button name="add" type="button" onclick="">追加</button>
            <br>
            <button name="excel_output" type="button" onclick="">excel出力</button>
        </div>
        <!-- 仕事内容入力ポップアップ -->
        <div id="job-info-modal" class="modal">
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
                        <div class="titles">
                            <span id="start-title">開始時間</span>
                            <span id="end-title">終了時間</span>
                            <span id="time-title">就業時間</span>
                        </div>
                        <div class="input-times">
                            <input type="time" name="start_time">
                            <input type="time" name="end_time">
                            <span>時間</span>
                        </div>
                        <p>仕事内容</p>
                        <input type="text" name="job_info">
                        <p>補足</p>
                        <input type="text" name="others">
                    </form>
                    <button name="complete" type="button" onclick="">完了</button>
                </div>
            </div>
        </div>
        <!-- Excelファイル入力ポップアップ -->
        <div id="excel-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Excelファイル入力画面</h3>
                </div>
                <div class="modal-body">
                    <p>Excelファイル入力してください</p>
                    <form name="input_excel">
                        <input type="file" name="excel" accept=".xlsx">
                    </form>
                    <button name="complete" type="button" onclick="">完了</button>
                </div>
            </div>
        </div>
    </body>
</html>