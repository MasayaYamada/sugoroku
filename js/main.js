//phina.jsをグローバルに展開
phina.globalize();

const screenWidth = 860;
const screenheight = 500;

//アセット
var ASSETS = {
    image: {
        'koma': 'img/koma.png'
    },
};

//どこからでも参照できるようにする
var map = []; //マップを格納する配列
var floorLen = 0; //地面の長さ
var leftVal = 100; //残りコマ数表示
var total = 100; //コマ数
var dice;
var btnPushFlag = false;

//MainSceneを定義
phina.define('MainScene', {
    //DisplaySceneクラスを継承
    superClass: 'DisplayScene',
    //コンストラクタ
    init: function() {
        //親クラス初期化
        this.superInit({
            // 画面サイズ  
            width: screenWidth,
            height: screenheight,
        });


        var button = Button({
            x: 200, // x座標
            y: 50, // y座標
            width: 100, // 横サイズ
            height: 50, // 縦サイズ
            text: "サイコロを振る", // 表示文字
            fontSize: 12, // 文字サイズ
            fontColor: 'black', // 文字色
            cornerRadius: 10, // 角丸み
            fill: 'skyblue', // ボタン色
            stroke: 'blue', // 枠色
            strokeWidth: 5, // 枠太さ
        }).addChildTo(this);

        //ラベル類の初期値
        var cnt = 0;
        var diceLabel = Label({ x: 380, y: 50, fill: 'black', text: cnt }).addChildTo(this);
        var leftValLabel = Label({ x: 380, y: 100, fill: 'black', text: cnt }).addChildTo(this);
        var leftLavel = Label({ x: 200, y: 100, fill: 'black', text: leftVal }).addChildTo(this);
        leftLavel.text = "残りのコマ：";
        leftValLabel.text = total;

        // ボタンの描写
        button.onpointend = function() {
            // ボタンが押されたときの処理
            // ランダム値を出力
            dice = Math.floor(Math.random() * 6) + 1;
            diceLabel.text = dice;
            leftVal = leftVal - dice;
            leftValLabel.text = leftVal;
            btnPushFlag = true;

            if (leftVal <= 0) {
                window.alert('あがりました。ゲームを終了します');
                location.reload();
                return false;
            }
        };

        //コマの描写


        // マスの描写
        (101).times(function(i) {
            //マップをMainSceneに追加
            if (i == 0) {
                map[i] = CircleShape({ fill: 'yellow', radius: 30 }).addChildTo(this);
                console.log(i);
            } else if (i % 5 == 0 && i != 100) {
                map[i] = CircleShape({ fill: 'red', radius: 30 }).addChildTo(this);
                console.log(i);
            } else if (i == 100) {
            	map[i] = CircleShape({ fill: 'lightgreen', radius: 30 }).addChildTo(this);
                console.log(i);
            } else {
                map[i] = CircleShape({ fill: 'white', radius: 30 }).addChildTo(this);
                console.log(i)
            }
            //基準点を左上にする
            map[i].setOrigin(0, 0);
            //位置をセット
            map[i].setPosition(i * 100, 360);
        }, this);

        // if (btnPushFlag == true) {
        //     update();
        // }


    },

    // update時の処理
    update: function() {

        // サイコロを振ったあとの、マスとコマの動き
        if (btnPushFlag == true) {

            // TODO: サイコロの目の値を取得

            // TODO: サイコロの目分、コマを動かす	

            // TODO：サイコロの目分マスを動かす
            (101).times(function(i) {
                //マップをスクロール
                map[i].x -= 500;
            });
            btnPushFlag = false;
        }
    }
});

//メイン処理
phina.main(function() {
    // アプリケーションを生成
    var app = GameApp({
        // startLabel: 'splash',//splashから開始
        title: 'アクションゲーム', //タイトル
        backgroundColor: '#42a5f5', //背景色

        // fps: 30,//fps
        assets: ASSETS, //アセット
        width: screenWidth,
        height: screenheight,
    });
    // app.enableStats();//fpsの表示、重いので要らなければコメントアウトする
    app.run(); // 実行
});