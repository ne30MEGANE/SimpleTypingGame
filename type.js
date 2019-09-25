window.onload = Main;
document.onkeydown = typeGame;

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
var gamearea, dropDown, tweetbutton;
let Q_num = 3; //難易度の内部データ
let difficulty = "EASY" //難易度名前
let Q = new Array; //問題
let Qest = new Array; //全部の問題
let length = 10; //1問の文字数
let mondai = "";
let cnt = ""; //何文字目か
let Qn = 0; //何問目か
let misstype = 0;//間違えた回数
let tweet = "https://twitter.com/intent/tweet?hashtags=ガバタイピングゲーム%0a&url=https://ne30megane.github.io/SimpleTypingGame/";


function Main() {
    startbutton = document.getElementById("startbutton");
    gamearea = document.getElementById("gamearea");
    dataarea = document.getElementById("data");
    startbutton.addEventListener("click", buttonAction);

    dropDown = document.getElementById('difficultyselecter');
    dropDown.addEventListener('change', changedifficulty);

    tweetbutton = document.getElementById('tweet');
    tweetbutton.href = tweet;
}
function buttonAction() {
    Qn = 0; //スタートが押されたら1問目に戻す
    misstype = 0;
    gameSet();
    //console.log(Qest);//for debug
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
        difficulty = "EASY";
    } else if (dropDown.value == "NORMAL") {
        Q_num = 5;
        difficulty = "NORMAL";
    } else if (dropDown.value == "HARD") {
        Q_num = 10;
        difficulty = "HARD";
    }
    //console.log(dropDown.value); //for debug
    //console.log(Q_num); // for debug
}

function gameSet() {
    mondai = "";
    cnt = 0;
    Qn = 0;
    Qest.length = 0; //問題の配列をリセットする
    NewQest(Q_num, length);
    for (let i = 0; i < length; i++) { //問題を表示
        mondai = mondai + moji[Qest[Qn][i]];
    }
    gamearea.innerHTML = mondai;
    dataarea.innerHTML = "ミスタイプ" + misstype + "回";
}

//タイムに関するグローバル変数
var typStart, typEnd;
let tweetmessage = "";

function typeGame(evt) {
    let kc; //入力されたキーのキーコードを格納する
    //if (document.all) {
    kc = event.keyCode;
    // console.log(kc);  //for debug
    //} else {
    //kc = eve.which;
    //}

    if (cnt == 0 && Qn == 0) {//開始秒記録
        typStart = new Date();
    }

    if (kc == kcode[Qest[Qn][cnt]]) {//正解したら
        cnt++;
        // console.log(cnt);  //for debug
        if (cnt < 10) {
            mondai = mondai.substring(1, mondai.length);
            gamearea.innerHTML = mondai;
        } else {//10文字正解した
            // console.log("b"); //debug
            cnt = 0; //1問目に戻す
            Qn++;
            if (Qn < Q_num) {
                if (Qn != Q_num) {
                    mondai = "";
                    for (let i = 0; i < length; i++) { //問題を表示
                        mondai = mondai + moji[Qest[Qn][i]];
                    }
                    // console.log(mondai); //for debug
                }
                gamearea.innerHTML = mondai;
                // console.log(Qn);
            } else {//全部問題終わったら
                typEnd = new Date();
                var keika = typEnd - typStart;
                var sec = Math.floor(keika / 1000);
                var msec = keika % 1000;
                var message = "ミスタイプ：" + misstype + "回<br>時間：" + sec + "秒" + msec;
                gamearea.innerHTML = message;
                dataarea.innerHTML = ""
                tweetmessage = "https://twitter.com/intent/tweet?text=難易度" + difficulty + "を" + sec + "秒" + msec + "でクリアしました。%20ミスタイプ：" + misstype + "%0a%23ガバタイピングゲーム%0a&url=https://ne30megane.github.io/SimpleTypingGame/";
                tweetbutton.href = tweetmessage;
            }
        }

    } else {//間違えたとき}
        misstype++;
        dataarea.innerHTML = "ミスタイプ" + misstype + "回";
    }

}
