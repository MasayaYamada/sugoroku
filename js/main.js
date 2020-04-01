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

//グローバル変数
var map = []; //マップを格納する配列
var event = []; //イベントを有無を格納する配列
var leftVal = 100; //残りコマ数表示
var total = 100; //コマ数
var dice;
var btnPushFlag = false;
var koma;
var goalFlg = false;
var progressVal = 0; // コマの論理位置

//ラベル系
var diceLabel;
var leftValLabel;
var leftLavel;
var eventLabels = ["進む", "戻る"];
// var eventDiceLabel;
// var eventProceLabel;

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
        diceLabel = Label({ x: 380, y: 50, fill: 'black', text: 0 }).addChildTo(this);
        leftValLabel = Label({ x: 380, y: 100, fill: 'black', text: 0 }).addChildTo(this);
        leftLavel = Label({ x: 200, y: 100, fill: 'black', text: leftVal }).addChildTo(this);
        leftLavel.text = "残りのコマ：";
        leftValLabel.text = total;

        // ボタンの描写
        button.onpointend = function() {
            // ボタンが押されたときの処理
            // ランダム値を出力
            dice = Math.floor(Math.random() * 6) + 1;
            diceLabel.text = dice;
            btnPushFlag = true;
        };

        //スクロールの挙動域設定
        var scrollLayer = DisplayElement({
            width: 2000,
            height: 880,
            x: 30,
            y: 20,
        });

        // スクロールできるようにする
        scrollLayer.scrollable = Scrollable().attachTo(scrollLayer).setScrollType('x');
        // scrollLayer を追加
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
                event[i] = false;
                // console.log(map[i]);
                console.log(event[i]);
            } else if (i % 5 == 0 && i != 100) {
                map[i] = CircleShape({ fill: 'red', radius: 30 }).addChildTo(this);
                event[i] = true;
                // console.log(map[i]);
                console.log(event[i]);
            } else if (i == 100) {
                map[i] = CircleShape({ fill: 'lightgreen', radius: 30 }).addChildTo(this);
                event[i] == false;
                // console.log(map[i]);
                console.log(event[i]);
            } else {
                map[i] = CircleShape({ fill: 'white', radius: 30 }).addChildTo(this);
                event[i] == false;
                // console.log(map[i]);
                console.log(event[i]);
            }
            //基準点を左上にする
            map[i].setOrigin(0, 0);
            //位置をセット
            map[i].setPosition(i * 100, 360);
        }, scrollLayer);

        // this.update = function(app) {
        //     if (btnPushFlag == true) {
        //         // テキスト表示変更
        //         leftVal = leftVal - dice;
        //         leftValLabel.text = leftVal;

        //         // サイコロの目分、コマを動かす
        //         koma.x += dice * 100; // 表示位置
        //         progressVal += dice * 100; //論理位置

        //         btnPushFlag = false;
        //     }
        // };

        // if (progressVal % 500 == 0 && progressVal != 0) {
        //     this.update = function(app) {
        //         var ramd = Math.floor(Math.random() * 2);
        //         var ramdDice = Math.floor(Math.random() * 6) + 1;
        //         if (ramd == 1) {
        //             console.log(ramd);
        //             koma.x -= ramdDice * 100;
        //             progressVal -= ramdDice * 100;
        //             Label({ x: 550, y: 200, fill: 'black', text: ramdDice }).addChildTo(this);
        //             Label({ x: 600, y: 200, fill: 'black', text: eventLabels[ramd] }).addChildTo(this);
        //         } else {
        //             koma.x += ramdDice * 100;
        //             progressVal += ramdDice * 100;
        //             Label({ x: 550, y: 200, fill: 'black', text: ramdDice }).addChildTo(this);
        //             Label({ x: 600, y: 200, fill: 'black', text: eventLabels[ramd] }).addChildTo(this);
        //         }
        //     };
        // }

    },

    // update時の処理
    update: function() {

        var eventDiceLabel; 
        var eventProceLabel;

        // サイコロを振ったあとの、マスとコマの動き
        if (btnPushFlag == true) {
            // テキスト表示変更
            leftVal = leftVal - dice;
            leftValLabel.text = leftVal;

            // サイコロの目分、コマを動かす
            koma.x += dice * 100; // 表示位置
            progressVal += dice * 100; //論理位置

            console.log(koma.x);
            console.log(progressVal);

            if (progressVal % 500 == 0) {
                var ramd = Math.floor(Math.random() * 2);
                var ramdDice = Math.floor(Math.random() * 6) + 1;
                if (ramd == 1) {
                    eventDiceLabel = Label({ x: 550, y: 200, fill: 'black', text: ramdDice }).addChildTo(this);
                    eventProceLabel = Label({ x: 600, y: 200, fill: 'black', text: eventLabels[ramd] }).addChildTo(this);
                    koma.x -= ramdDice * 100;
                    progressVal -= ramdDice * 100;

                } else {
                    eventDiceLabel = Label({ x: 550, y: 200, fill: 'black', text: ramdDice }).addChildTo(this);
                    eventProceLabel = Label({ x: 600, y: 200, fill: 'black', text: eventLabels[ramd] }).addChildTo(this);
                    koma.x += ramdDice * 100;
                    progressVal += ramdDice * 100;
                }
            }
        }
        btnPushFlag = false;
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