
//メインページのスクリプト

//onload
window.onload = function() {
    info = {user_id: SESSION_user_id};
    input_info_logs(info).then(function (value){
        get_start_time(info).then(function (value2){
            if (value2.start_time){
                change_show_button(false);
            }
        });
    });
    
};


//ボタン類

/**
 * スタートボタンを押したときに呼び出される．
 * post_start_time，change_show_button(false)を呼び出す
 * @param {String} user_id ユーザID
 */
function start_button(user_id){
    console.log(user_id);
    const time = new Date();
    let info = {user_id: user_id, start_time: time_format(time)};

    add_start_time(info).then(function (value){
        if (value){
            change_show_button(false);
        }
    });
}

/**
 * 終了ボタンを押したときに呼び出される．
 * show_input_info_popupを呼び出す
 */
function end_button(user_id){
    const time = new Date();
    let info = {user_id: user_id, end_time: time_format(time)};

    input_info_popup_init(info).then(function (value){
        if(value){
            show_input_info_popup();
        }
    });
    //change_show_button(true);
}

/**
 * 情報入力のポップアップの完了ボタンを押したときに呼び出される．
 * ポップアップを閉じる．
 * change_show_button(true)，post_part_timesを呼び出す
 */
function input_confirm_button(user_id){
    let form = document.forms.input_job_info;
    let info = {start_time: null, end_time: null, user_id: null, job_info: null, others: null};

    //入力確認
    if (!input_info_check(form)){
        return 0;
    }

    //dateの入力はYYYY-MM-DD HH:MMなので，Tを変換
    info.start_time = form.start_time.value.replace('T', ' ');
    info.end_time = form.end_time.value.replace('T', ' ');
    info.job_info = form.job_info.value;
    info.others = form.others.value;
    info.user_id = user_id;

    //post
    add_part_times(info).then(function (value){
        if (value){
            delete_start_time(info).then(function (value2){
                if (value2){
                    close_input_info_popup();
                    change_show_button(true);
                    input_info_logs(info);
                }
            });
        }
    });
}

/**
 * excel出力ボタンを押したときに呼び出される．
 * show_input_excel_popupを呼び出す
 */
function excel_button(){
    show_input_excel_popup();
}

/**
 * excelのポップアップの完了ボタンを押したときに呼び出される．
 * ポップアップを閉じる．
 * post_change_excelを呼び出す
 */
function excel_confirm_button(){
    let form = document.forms.input_excel;
    let info = new FormData(form);
    
    if (!form.excel.value){
        window.alert("ファイルを入力してください．");
        return 0;
    }

    post_change_excel(info).then(function (value){
        if (value){
            download_output_file();
            delete_output_file().then(function (value2){
                if (value2){
                    close_input_excel_popup();
                }
            });
        }
    });
}

//post, get類

/**
 * add_start_time.phpにPOSTを投げる
 * postはstart_timeとuser_idを含む
 * @param {Object} info start_time, user_id
 * @returns promise(bool) に注意
 */
async function add_start_time(info){
    let checker = false;

    await $.ajax(
        {
        type: 'POST',
        url: 'php/add_start_time.php',
        async: false,
        data:{
            user_id: info.user_id,
            start_time: info.start_time
        }
    }).done(function (data) {
        let result = JSON.parse(data);
        console.log(result);

        if (result.error == 1){
            window.alert(result.errormessage);
        } else {
            checker = true;
        }
    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
    return checker;
}

/**
 * stock_timesテーブルの情報を取ってくる．
 * get_start_time.phpにPOSTを投げる
 * なければnullを返す
 * @param {Object} info user_id
 * @returns promise (start_time)
 */
async function get_start_time(info){
    let re_info = {start_time: null};

    await $.ajax(
        {
        type: 'POST',
        url: 'php/get_start_time.php',
        async: false,
        data:{
            user_id: info.user_id
        }
    }).done(function (data) {
        let result = JSON.parse(data);
        console.log(result);

        if (result.error != 1){
            re_info.start_time = result.start_time;
        }
    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
    return re_info;
}

/**
 * stock_timesテーブルのuser_idの情報を削除する
 * delete_start_time.phpにPOSTを投げる
 * @param {Object} info user_id
 * @returns promise(bool)
 */
async function delete_start_time(info){
    let checker = false;

    await $.ajax(
        {
        type: 'POST',
        url: 'php/delete_start_time.php',
        async: false,
        data:{
            user_id: info.user_id
        }
    }).done(function (data) {
        let result = JSON.parse(data);

        if (result.error != 1){
            checker = true;
        }
    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
    return checker;
}

/**
 * part_timesテーブルに情報を追加する
 * add_part_times.phpにPOSTを投げる
 * @param {Object} info start_time, end_time, user_id, job_info, others
 * @returns promise(bool)
 */
async function add_part_times(info){
    let checker = false;

    await $.ajax(
        {
        type: 'POST',
        url: 'php/add_part_times.php',
        async: false,
        data:{
            user_id: info.user_id,
            start_time: info.start_time,
            end_time: info.end_time,
            job_info: info.job_info,
            others: info.others
        }
    }).done(function (data) {
        let result = JSON.parse(data);

        if (result.error != 1){
            checker = true;
        }
    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
    return checker;
}

/**
 * add_job_info_for_excel.phpにPOSTを投げる
 * @param {Object} info user_id, file
 * @returns 
 */
async function post_change_excel(info){
    let checker = false;

    await $.ajax(
        {
        type: 'POST',
        url: 'php/add_job_info_for_excel.php',
        async: false,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 50000,
        data: info
    }).done(function (data) {
        let result = JSON.parse(data);
        //console.log(result);
        if (result.error != 1){
            checker = true;
        }
    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
    return checker;
}

/**
 * 一時的に生成したoutput.xlsxを
 * 削除するためのGETを投げる
 * @returns primise(bool)
 */
async function delete_output_file(){
    let checker = false;

    await $.ajax(
        {
        type: 'GET',
        url: 'php/delete_output_file.php',
        async: false
    }).done(function (data) {
        let result = JSON.parse(data);

        if (result.error != 1){
            checker = true;
        }
    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
    return checker;
}

/**
 * part_timesテーブルの情報を取ってくる．
 * get_part_times.phpにPOSTを投げる
 * @param {Object} info user_id
 * @returns start_time, end_time, job_info, others を含むリスト
 */
async function get_logs(info){
    let re_info = null;

    await $.ajax(
        {
        type: 'POST',
        url: 'php/get_part_times.php',
        async: false,
        data:{
            user_id: info.user_id
        }
    }).done(function (data) {
        let result = JSON.parse(data);
        console.log(result);

        if (result.error != 1){
            re_info = result.data;
        }
    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
    return re_info;
}

//表示類

/**
 * trueの時スタートボタン，
 * falseの時終了ボタンを表示する
 * @param {bool} which どちらを表示するかを示す
 */
function change_show_button(which){
    //console.log(document.getElementById('start-end-button'));
    if (which){
        document.getElementById('start-end-button').innerHTML = "<button name=\"start\" type=\"button\" onclick=\"start_button('" + SESSION_user_id + "')\">スタート</button>";
    } else {
        document.getElementById('start-end-button').innerHTML = "<button name=\"end\" type=\"button\" onclick=\"end_button('" + SESSION_user_id + "')\">ストップ</button>";
    }
}

/**
 * 終了ボタンを押したときに呼び出される．
 * 情報入力ポップアップを表示する
 */
function show_input_info_popup(){
    let target = document.getElementById('job-info-modal');
    target.style.display = "block";
}

/**
 * 情報入力ポップアップを閉じる
 */
function close_input_info_popup(){
    let target = document.getElementById('job-info-modal');
    target.style.display = "none";
}

/**
 * excel入力ポップアップを表示する
 */
function show_input_excel_popup(){
    let target = document.getElementById('excel-modal');
    target.style.display = "block";
}

/**
 * excel入力ポップアップを閉じる
 */
function close_input_excel_popup(){
    let target = document.getElementById('excel-modal');
    target.style.display = "none";
}

/**
 * 情報入力ポップアップに初期情報を入力する
 * start_timeがとってこれなかった時はfalseを返す
 * @param {Object} info user_id, end_time
 * @returns promise(bool)
 */
async function input_info_popup_init(info){
    let checker = false;
    let times = {s: null, e: null};

    times.e = datetime_local_format(info.end_time);
    await get_start_time(info).then(function (value){
        if (value.start_time != null){
            times.s = datetime_local_format(value.start_time);
            document.getElementById('start-time').value = times.s;
            document.getElementById('end-time').value = times.e;
            checker = true;
        } else {
            window.alert("不明のエラー");
        }
    });
    return checker;
}

/**
 * ログ表示をする
 * @param {Object} info user_id
 * @returns promise(bool)
 */
async function input_info_logs(info){
    let checker = false;

    await get_logs(info).then(function (value){
        //console.log(value);
        if (value) { checker = true; }

        let table = document.getElementById("logs");
        let init = `
        <thead>
        <tr>
            <th>日付</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th id='set-width'>仕事内容</th>
            <th id='set-width'>補足</th>
        </tr>
        </thead>
        <tbody>`;
        for (let i = 0; i < value.length; i++){
            let d = "<tr>";
            //日付
            d += "<td>" + value[i].start_time.split(' ')[0] +"</td>";
            //開始時刻
            d += "<td>" + value[i].start_time.split(' ')[1] +"</td>";
            //終了時刻
            d += "<td>" + value[i].end_time.split(' ')[1] +"</td>";
            //仕事内容
            d += "<td id='set-width'>" + value[i].job_info +"</td>";
            //補足
            d += "<td id='set-width'>" + value[i].others +"</td>";
            d += "</tr>";
            init += d;
        }
        init += "</tbody>";
        table.innerHTML = init;
    });
    return checker;
}
//その他

/**
 * 入力されたdateを
 * YYYY-MM-DD HH:MM:SSの形にして返す
 * @param {Date} date 入力
 * @returns YYYY-MM-DD HH:MM:SSのstring
 */
function time_format(date){
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}

/**
 * 入力されたYYYY-MM-DD HH:MM:SS型のstringを
 * YYYY-MM-DDTHH:MMの形にして返す
 * @param {string} date 入力
 * @returns YYYY-MM-DDTHH:MMのstring
 */
function datetime_local_format(date){
    let s = date.split(' ');
    let s2 = s[1].split(':');
    return s[0] + 'T' + s2[0] + ':' + s2[1];
}

/**
 * formの情報が入力されているかを返す
 * 入力できていればtrue
 * @param {document.form} form 
 * @returns bool
 */
function input_info_check(form){
    let message = "";

    if (!form.start_time.value){ message += "開始時間が入力されていません\n"; }
    if (!form.end_time.value){ message += "終了時間が入力されていません\n"; }
    if (!form.job_info.value){ message += "仕事内容が入力されていません\n"; }
    if (message != "") {
        window.alert(message);
        return false;
    }
    return true;
}

/**
 * output.xlsxをダウンロードさせる
 */
function download_output_file(){
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    //ファイルの場所
    a.href = "output/output.xlsx";
    //ダウンロードさせるファイル名の生成
    a.download = "output.xlsx";
    //クリックイベント発火
    a.click();
}