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
let errorArea;
let Q_num = 3; //難易度の内部データ
let difficulty; //難易度の名前
let Q = new Array; //問題
let Qest = new Array; //全部の問題
let length = 10; //1問の文字数
let mondai = "";
let cnt = ""; //何文字目か
let Qn = 0; //何問目か
let misstype = 0; //間違えた回数
let tweetmessage = "";
let tweet = "https://twitter.com/intent/tweet?hashtags=ガバタイピングゲーム%0a&url=https://ne30megane.github.io/SimpleTypingGame/";

let score = 0;
let difnum;

let scorearea;
let timerarea;
let misstypearea;

function Main() {
    startbutton = document.getElementById("startbutton");
    gamearea = document.getElementById("gamearea");
    errorArea = document.getElementById('error');
    scorearea = document.getElementById("score");
    timerarea = document.getElementById('time');
    misstypearea = document.getElementById('misstype');

    difficultyform = document.getElementsByName('diff');
    startButton = document.getElementById('startbutton');
    startButton.addEventListener("click", buttonAction);

    tweetbutton = document.getElementById('tweet');
    tweetbutton.href = tweet;
}

function buttonAction() {
    Qn = 0; //スタートが押されたら1問目に戻す
    misstype = 0;
    errorArea.innerHTML = ""

    for (let i = 0; i < difficultyform.length; i++) { //難易度を取得
        if (difficultyform[i].checked) {
            difficulty = difficultyform[i].value;
            break;
        }
    }
    if (difficulty == undefined) { // 未選択の時
        errorArea.innerHTML = "難易度を選んでください。";
    } else {
        changedifficulty(difficulty);
        gameSet();
        typStart = new Date();
        timerStart();
    }
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

function changedifficulty(d) { //難易度に応じて出題数を変える
    switch (d) {
        case "EASY":
            Q_num = 3;
            difnum = 24;
            difficulty = "EASY";
            break;
        case "NORMAL":
            Q_num = 5;
            difnum = 40;
            difficulty = "NORMAL";
            break;
        case "HARD":
            Q_num = 10;
            difnum = 100;
            difficulty = "HARD";
            break;
        default: //難易度を選ばずにスタートが押されたとき
            break;
    }
}

function gameSet() {
    mondai = "";
    cnt = 0;
    Qn = 0;
    score = 0;
    Qest.length = 0; //問題の配列をリセットする
    NewQest(Q_num, length);
    for (let i = 0; i < length; i++) { //問題を表示
        mondai = mondai + moji[Qest[Qn][i]];
    }
    gamearea.innerHTML = mondai;
    timerarea.innerHTML = '時間: ' + elapsedTime + '秒';
    misstypearea.innerHTML = "ミスタイプ: " + misstype;
    scorearea.innerHTML = "スコア: " + score;
}


//タイムに関するグローバル変数
let elapsedTime = 0;
var typStart, timer, nowTime;

function timerStart() {
    timer = setInterval(showSecond, 1000);
}

function showSecond() {
    nowTime = new Date();
    elapsedTime = Math.floor((nowTime - typStart) / 1000);
    let str = '時間: ' + elapsedTime + '秒';

    timerarea.innerHTML = str;
}

function typeGame(evt) {
    let kc; //入力されたキーのキーコードを格納する
    kc = event.keyCode;

    if (kc == kcode[Qest[Qn][cnt]]) { //正解したら
        cnt++;
        score += 2;
        if (cnt < 10) {
            mondai = mondai.substring(1, mondai.length);
            gamearea.innerHTML = mondai;
        } else { //10文字正解した
            cnt = 0; //1問目に戻す
            Qn++;
            if (Qn < Q_num) {
                if (Qn != Q_num) {
                    mondai = "";
                    for (let i = 0; i < length; i++) { //問題を表示
                        mondai = mondai + moji[Qest[Qn][i]];
                    }
                }
                gamearea.innerHTML = mondai;
            } else { //全部問題終わったら
                clearInterval(timer);
                let timebonus = difnum - elapsedTime;
                score += timebonus;

                tweetmessage = "https://twitter.com/intent/tweet?text=難易度" + difficulty + "で" + score + "点獲得しました！%20(時間:" + elapsedTime + "秒%20ミスタイプ:" + misstype + "回)%0a%23ガバタイピングゲーム%0a&url=https://ne30megane.github.io/SimpleTypingGame/";
                gamearea.innerHTML = "クリア！<br><a target='_blank' class='kit-button' href = " + tweetmessage + ">結果をツイートする</a>";

            }
        }

    } else { //間違えたとき}
        misstype++;
        misstypearea.innerHTML = "ミスタイプ: " + misstype;
        if (score - 5 > 0) score -= 5;
        else score = 0;
    }
    scorearea.innerHTML = "スコア: " + score;
}