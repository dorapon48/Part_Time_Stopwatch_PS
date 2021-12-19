
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
    post_login(info);
    
}

/**
 * login.phpにPOSTを投げる．
 * ログインできるときはtrueを返す
 * @param {object} info user_id, passwordを含むオブジェクト型
 * @returns bool
 */
async function post_login(info){
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
            return false;
        } else {
            return true;
        }

    }).fail(function () {
        window.alert("サーバとの接続に失敗しました。");
    });
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

/*
var app = new Vue({
    //html内のdivタグのidに紐づけ
    el: '#login',
    //使用するデータはココにまとめる
    data: {
        newItem: "",
        todos: []
    },
    // ページ読み込み時にデータ取得と表示
    created: async function() {
    },
    //関数とかはココにまとめる
    methods: {
        // データ追加から表示までのセット
        multipleHandler: async function () {
            await this.addItem();
            await this.getItem();
            await this.displayItem();
        },
        //タスク取得
        getItem: async function () {
            await $.ajax({
                type: 'GET',
                url: 'get.php',
                async: false
            }).done(function (data) {
                list = JSON.parse(data);
                console.log(list);
            }).fail(function () {
                window.alert("取得に失敗しました。");
            });
        },
        //タスク表示
        displayItem: async function () {
            this.todos = [];
            for (var i = 0; i < list.length; i++) {
                var todo = {
                    id: list[i].id,
                    item: list[i].item, //入力された文字列を格納
                    isDone: list[i].done //完了済みかどうかのパラメータ
                };
                this.todos.push(todo);
            }
            console.log(this.todos);
            return;
        },
        //タスク追加
        addItem: async function (event) {
            //入力フォームが空なら何もしない
            if (this.newItem === "")
                return;

            await $.post('send.php', this.newItem.value)
                    .done(function (data) {
                        if (data["error"] === 1) {
                            window.alert(data["errormessage"]);
                            return;
                        }
                    });
            await $.ajax({
                type: 'POST',
                url: 'send.php',
                scriptCharset: 'utf-8',
                async: false,
                data: {
                    todoitem: this.newItem
                }
            }).done(function (data) {
                if (data["error"] === 1) {
                    window.alert(data["errormessage"]);
                    return;
                }
                console.log("追加しました。");
                return;
            }).fail(function () {
                window.alert("サーバとの接続に失敗しました。");
                return;
            });

            //入力フォームをクリア
            this.newItem = "";
        },
        //タスク削除
        deleteItem: function (index) {
            //削除したいタスクのid
            let idTodelete = this.todos[index].id;
            console.log(idTodelete);
            $.post('delete.php', idTodelete)
                    .done(function (data) {
                        if (data["error"] === 1) {
                            window.alert(data["errormessage"]);
                            return;
                        }
                        ;
                    });
            $.ajax({
                type: 'POST',
                url: 'delete.php',
                scriptCharset: 'utf-8',
                async: false,
                data: {
                    deleteid: idTodelete
                }
            }).done(function (data) {
                if (data["error"] === 1) {
                    window.alert(data["errormessage"]);
                    return;
                }
                console.log(data);
                return;
            }).fail(function() {
                window.alert("サーバとの接続に失敗しました。");
                return;
            });
            //spliceは場所(index)と削除する個数(１)を引数にとる
            this.todos.splice(index, 1);
        },
        //完了済みかどうかの更新
        updateItem: function(index) {
            let idToupdate = this.todos[index].id;
            
            $.post('update.php', idToupdate)
                    .done(function (data) {
                        if (data["error"] === 1) {
                            window.alert(data["errormessage"]);
                            return;
                        };
                    });
            $.ajax({
                type: 'POST',
                url: 'update.php',
                scriptCharset: 'utf-8',
                async: false,
                data: {
                    updateid: idToupdate
                }
            }).done(function (data) {
                if (data["error"] === 1) {
                    window.alert(data["errormessage"]);
                    return;
                }
                console.log(data);
                return;
            }).fail(function() {
                window.alert("サーバとの接続に失敗しました。");
                return;
            });
            
        }
    }
});
*/