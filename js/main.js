//phina.jsをグローバルに展開
phina.globalize();

const screenWidth = 1000;
const screenheight = 500;

//アセット
var ASSETS = {
    image: {
        'koma': 'img/koma.png'
    },
};

//どこからでも参照できるようにする
var map = []; //マップを格納する配列
var event = []; //イベントを有無を格納する配列
var goal = []; //ゴールの有無を格納する配列
var floorLen = 0; //地面の長さ
var leftVal = 100; //残りコマ数表示
var total = 100; //コマ数
var dice;
var btnPushFlag = false;
var koma;
var goalFlg = false;

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
        };


        var scrollLayer = DisplayElement({
            width: 2000,
            height: 880,
            x: 30,
            y: 20,
        });

        // スクロールできるようにする
        scrollLayer.scrollable = Scrollable().attachTo(scrollLayer).setScrollType('x');
        // scrollLayer を 追加
        scrollLayer.addChildTo(this);

        //コマの描写
        koma = Sprite('koma').addChildTo(scrollLayer).setPosition(40, 330);
        koma.width = 50;
        koma.height = 70;

        // マスの描写
        (101).times(function(i) {

            //マップをMainSceneに追加
            if (i == 0) {
                map[i] = CircleShape({ fill: 'yellow', radius: 30 }).addChildTo(this);
                event[i] = i;
                goal[i] = i;
                // console.log(map[i]);
                console.log(event[i]);
                console.log(goal[i]);
            } else if (i % 5 == 0 && i != 100) {
                map[i] = CircleShape({ fill: 'red', radius: 30 }).addChildTo(this);
                event[i] = i;
                goal[i] = i;
                // console.log(map[i]);
                console.log(event[i]);
                console.log(goal[i]);
            } else if (i == 100) {
                map[i] = CircleShape({ fill: 'lightgreen', radius: 30 }).addChildTo(this);
                event[i] = i;
                goal[i] = i;
                // console.log(map[i]);
                console.log(event[i]);
                console.log(goal[i]);
            } else {
                map[i] = CircleShape({ fill: 'white', radius: 30 }).addChildTo(this);
                event[i] = i;
                goal[i] = i;
                // console.log(map[i]);
                console.log(event[i]);
                console.log(goal[i]);
            }
            //基準点を左上にする
            map[i].setOrigin(0, 0);
            //位置をセット
            map[i].setPosition(i * 100, 360);
        }, scrollLayer);
    },

    // update時の処理
    update: function() {

        // サイコロを振ったあとの、マスとコマの動き
        if (btnPushFlag == true) {

            // TODO: サイコロの目の値を取得
            // var resultDice = dice;

            // TODO: サイコロの目分、コマを動かす
            koma.x += dice * 100;
            console.log(koma.x);

            // if (koma.x >= 800){
            //     koma.x -= 400*dice;
            // }

            // TODO：サイコロの目分マスを動かす
            // if (koma.x > 800) {
            //     (101).times(function(i) {
            //         //マップをスクロール
            //         map[i].x -= 800;
            //         event[i] -= 8;
            //         goal[i] -= 8;
            //         console.log(map[i].x);
            //     });
            //     koma.x -= 800;
            // }

            if (leftVal <= 0) {
                koma.x = dice;
                window.alert('あがりました。ゲームを終了します');
                this.exit();
            }
            btnPushFlag = false;
        }
    }
});

//メイン処理
phina.main(function() {
    // アプリケーションを生成
    var app = GameApp({
        // startLabel: 'splash',//splashから開始
        title: 'すごろくゲーム', //タイトル
        backgroundColor: '#42a5f5', //背景色

        fps: 20, //fps
        assets: ASSETS, //アセット
        width: screenWidth,
        height: screenheight,
    });
    // app.enableStats();//fpsの表示、重いので要らなければコメントアウトする
    app.run(); // 実行
});