
//メインページのスクリプト

//ボタン類

/**
 * スタートボタンを押したときに呼び出される．
 * post_start_time，change_show_button(false)を呼び出す
 */
function start_button(){
    change_show_button(false);
}

/**
 * 終了ボタンを押したときに呼び出される．
 * show_input_info_popupを呼び出す
 */
function end_button(){
    change_show_button(true);
}

/**
 * 情報入力のポップアップの完了ボタンを押したときに呼び出される．
 * ポップアップを閉じる．
 * change_show_button(true)，post_part_timesを呼び出す
 */
function input_confirm_button(){
    
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

/**
 * trueの時スタートボタン，
 * falseの時終了ボタンを表示する
 * @param {bool} which どちらを表示するかを示す
 */
function change_show_button(which){
    //console.log(document.getElementById('start-end-button'));
    if (which){
        document.getElementById('start-end-button').innerHTML = "<button name=\"start\" type=\"button\" onclick=\"start_button()\">スタート</button>";
    } else {
        document.getElementById('start-end-button').innerHTML = "<button name=\"end\" type=\"button\" onclick=\"end_button()\">終了</button>";
    }
}