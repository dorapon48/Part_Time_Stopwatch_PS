
//メインページのスクリプト

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

    post_start_time(info).then(function (value){
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

    input_info_popup_init(info);
    show_input_info_popup();
    //change_show_button(true);
}

/**
 * 情報入力のポップアップの完了ボタンを押したときに呼び出される．
 * ポップアップを閉じる．
 * change_show_button(true)，post_part_timesを呼び出す
 */
function input_confirm_button(){
    change_show_button(true);
}

/**
 * excel出力ボタンを押したときに呼び出される．
 * show_input_excel_popupを呼び出す
 */
function excel_button(){

}

/**
 * excelのポップアップの完了ボタンを押したときに呼び出される．
 * ポップアップを閉じる．
 * post_change_excelを呼び出す
 */
function excel_confirm_button(){

}

//php類

/**
 * add_start_time.phpにPOSTを投げる
 * postはstart_timeとuser_idを含む
 * @param {Object} info start_time, user_id
 * @returns promise に注意
 */
async function post_start_time(info){
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


//表示類

/**
 * trueの時スタートボタン，
 * falseの時終了ボタンを表示する
 * @param {bool} which どちらを表示するかを示す
 */
function change_show_button(which){
    //console.log(document.getElementById('start-end-button'));
    if (which){
        document.getElementById('start-end-button').innerHTML = "<button name=\"start\" type=\"button\" onclick=\"start_button('<?php echo $_SESSION['user_id'] ?>')\">スタート</button>";
    } else {
        document.getElementById('start-end-button').innerHTML = "<button name=\"end\" type=\"button\" onclick=\"end_button('<?php echo $_SESSION['user_id'] ?>')\">ストップ</button>";
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
 * 情報入力ポップアップに初期情報を入力する
 * @param {Object} info user_id, end_time
 */
function input_info_popup_init(info){
    console.log(info.end_time);
}

//その他
/**
 * 入力されたdateを
 * YYYY-MM-DD HH:MM:SSの形にして返す
 * @param {Date} date 入力
 * @returns YYYY-MM-DD HH:MM:SSのstring
 */
function time_format(date){
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' +('0' + date.getDate()).slice(-2) + ' ' +  ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + '.' + date.getMilliseconds();
}