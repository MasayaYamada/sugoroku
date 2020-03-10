phina.globalize();

const screenWidth = 960;
const screenheight = 550;

//パラメータ
var dice;　　　　　// サイコロ
var leftVal = 0;     // 残りコマ数
// var progressVal；// 進行度
// var stopVal;     // 停止位置
// var goalVal;     // ゴール値
// var goalStatus;  // ゴールステータス
// var eventVal;    // イベント値
var total = 100;　//コマ数
var redSquareFlag = false;

phina.define("MainScene", {  
  // 継承  
  superClass: 'DisplayScene',  
  // コンストラクタ  
  init: function() {  
    // 親クラス初期化  
    this.superInit({  
      // 画面サイズ  
      width: screenWidth,  
      height: screenheight,
    });

    // 背景色 
    this.backgroundColor = '#cccccc';

    var button = Button({
      x: 200,             // x座標
      y: 50,             // y座標
      width: 100,         // 横サイズ
      height: 50,        // 縦サイズ
      text: "サイコロを振る",     // 表示文字
      fontSize: 12,       // 文字サイズ
      fontColor: 'black', // 文字色
      cornerRadius: 10,   // 角丸み
      fill: 'skyblue',    // ボタン色
      stroke: 'blue',     // 枠色
      strokeWidth: 5,     // 枠太さ

    }).addChildTo(this);

    var cnt = 0;
    var diceLabel = Label({x:380,y:50,fill:'black',text:cnt}).addChildTo(this);
    var leftValLabel = Label({x:380,y:100,fill:'black',text:cnt}).addChildTo(this);
    var leftLavel = Label({x:200,y:100,fill:'black',text:cnt}).addChildTo(this);
    leftLavel.text = "残りのコマ："
    leftValLabel.text = total

    button.onpointend = function(){
      // ボタンが押されたときの処理
      // ランダム値を出力
      dice = Math.floor(Math.random() * 6) + 1 ;
      diceLabel.text = dice;
      
      if (leftVal == 0) {
        leftVal = total - dice;
      } else {
        leftVal = leftVal - dice;
      }

      leftValLabel.text = leftVal

      // 上がったら、ポップアップを出して、リロードする
      if (leftVal <= 0) {
        window.alert('あがりました。ゲームを終了します');
        location.reload();
        return false;
      }
    };

    //スタートコマの描写
    var start = CircleShape({
        fill: 'yellow',
        radius: 30,
        x:100,
        y:450
    }).addChildTo(this);


      // マスの描写
      for (var i = 2; i <= total; i++) {

      var xposition = i * 100;

      if (xposition % 500 == 0) {
          redSquareFlag = true;
          var square = CircleShape({
            fill: 'red',
            radius: 30,
            x:xposition,
            y:450
          }).addChildTo(this);
      } else {
        var square = CircleShape({
           fill: 'white',
           radius: 30,
           x:xposition,
           y:450
        }).addChildTo(this);
      }
      }

      //コマの描写
      var frameImg = {image: {'framePoint': 'img/koma,png'}};
      var point = Sprite({'framePoint', x:xposition + 30, y:450}).addChildTo(this);


  },  
}); 



// メイン処理
phina.main(function() {  
  // アプリケーションを生成  
  let app = GameApp({  
    // MainScene から開始  
    startLabel: 'main',  
    // 画面サイズ  
    width: screenWidth,  
    height: screenheight,  
  }); 
  app.run();  
});  
