
//ログインページのスクリプト

/**
 * ログインボタンを押したときに呼び出される．
 * If(post_login){show_contents_page}を行う
 */
function login_button(){
    let form = document.forms.info;
    //表示
    console.log(form.user_id.value);
    console.log(create_hash(form.password.value));

    //引数用のオブジェクト
    let info = {user_id: form.user_id.value,
        password: create_hash(form.password.value)};
    
    //呼び出し
    //promise型は，thenで戻り値を取り出す
    post_login(info).then(function (value){
        if (value){
            show_contents_page();
        }
    });
}

/**
 * login.phpにPOSTを投げる．
 * ログインできるときはtrueを返す
 * @param {object} info user_id, passwordを含むオブジェクト型
 * @returns bool (promise型に注意)
 */
async function post_login(info){
    let checker = false;
    await $.ajax(
        {
        type: 'POST',
        url: 'php/login.php',
        async: false,
        data:{
            user_id: info.user_id,
            password: info.password
        }
    }).done(function (data) {
        let result = JSON.parse(data);
        console.log(result);

        if (result.login != 1){
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
 * contents.phpを表示する
 */
function show_contents_page(){
    window.location.href = 'contents.php'
}

/**
 * 文字列をハッシュ化する
 * @param {string} str ハッシュ化したい文字列 
 * @returns ハッシュ値
 */
function create_hash(str){
    const sha = new jsSHA("SHA-256","TEXT");
    sha.update(str);
    return sha.getHash("HEX");
}

