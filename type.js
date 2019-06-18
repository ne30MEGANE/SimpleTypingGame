window.onload = Main;

//文字を格納する配列
var moji = new Array("Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ",
    "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ",
    "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ");

//キーコードを格納する配列
var kcode = new Array(65, 66, 67, 68, 69, 70, 71, 72, 73,
    74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90);

//グローバル変数たち
let startbutton;
var gamearea;
var dropDown;
let Q_num = 3; //難易度の内部データ
let Q = new Array; //問題
let Qest = new Array; //全部の問題
let length = 10; //1問の文字数
let mondai = "";
let cnt = ""; //何文字目か
let Qn = 1; //何問目か
let misstype = 0;//間違えた回数

function Main() {
    startbutton = document.getElementById("startbutton");
    gamearea = document.getElementById("gamearea");
    startbutton.addEventListener("click", buttonAction);

    dropDown = document.getElementById('difficultyselecter');
    dropDown.addEventListener('change', changedifficulty);

}
function buttonAction() {
    gamearea.innerHTML = "START BUTTON pressed";
    NewQest(Q_num, length);
    Qn = 0; //スタートが押されたら1問目に戻す
}
function NewQest(n, len) { //n個の問題を作成する
    for (let i = 0; i < n; i++) {
        ransu(len); //10文字の問題を作る
    }
}
function ransu(len) { //len文字の問題を作る
    let Q = new Array;
    for (let i = 0; i < len; i++) {
        Q[i] = Math.floor(Math.random() * 26);
    }
    Qest.push(Q);
}
function changedifficulty() { //難易度に応じて出題数を変える
    if (dropDown.value == "EASY") {
        Q_num = 3;
    } else if (dropDown.value == "NORMAL") {
        Q_num = 5;
    } else if (dropDown.value == "HARD") {
        Q_num = 10;
    }
    console.log(dropDown.value); //for debug
    console.log(Q_num); // for debug
}

function gameSet() {
    mondai = "";
    cnt = 0;
    NewQest(Q_num, len);
    for (let i = 0; i < len; i++) { //問題を表示
        mondai = mondai + mozi[Qest[Qn][i]]
    }
    gamearea.innerHTML = mondai;
}

function typeGame(evt) {
    let kc; //入力されたキーのキーコードを格納する
    if (document.all) {
        kc = event.keyCode;
    } else {
        kc = eve.which;
    }

    if (kc == kcode[Qest[Qn][cnt]]) {//正解したら
        cnt++;
        if (cnt < 10) {//
            mondai = mondai.substring(1, mondai.length);
            gamearea.innerHTML = mondai;
        } else {//10文字正解した
            gamearea.innerHTML = "終了！　間違えた回数：" + misstype;
        }
    } else {//間違えたとき}
        misstype++;
    }

}