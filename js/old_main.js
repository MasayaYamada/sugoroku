function init() {
var diceStage = new createjs.Stage("diceCanvas");

      // マウスオーバーを有効にする
      diceStage.enableMouseOver();

      var btnW = 240; // ボタンの横幅
      var btnH = 50; // ボタンの高さ
      var keyColor = "#563d7c";

      // ボタン要素をグループ化
      var button = new createjs.Container();
      button.x = 100;
      button.y = 40;
      button.cursor = "pointer"; // ホバー時にカーソルを変更する
      diceStage.addChild(button);

      // 通常時の座布団を作成
      var bgUp = new createjs.Shape();
      bgUp.graphics
              .setStrokeStyle(1)
              .beginStroke("#563d7c")
              .beginFill("white")
              .drawRoundRect(0, 0, btnW, btnH, 4);
      button.addChild(bgUp);
      bgUp.visible = true; // 表示する

      // ロールオーバー時の座布団を作成
      var bgOver = new createjs.Shape();
      bgOver.graphics
              .beginFill(keyColor)
              .drawRoundRect(0, 0, btnW, btnH, 4);
      bgOver.visible = false; // 非表示にする
      button.addChild(bgOver);

      // ボタンのラベルを作成
      var diceLabel = new createjs.Text("サイコロを振る", "24px sans-serif", keyColor);
      diceLabel.x = btnW / 2;
      diceLabel.y = btnH / 2;
      diceLabel.textAlign = "center";
      diceLabel.textBaseline = "middle";
      button.addChild(diceLabel);

      // ダイス結果のラベルを作成
      var diceNumber = 0;
      var numberLabel = new createjs.Text(diceNumber, "40px sans-serif", "#ff7700");
      numberLabel.x = 500;
      numberLabel.y = 50;
      numberLabel.textAlign = "center";
      numberLabel.textBaseline = "middle";
      button.addChild(numberLabel);

      // ロールオーバーイベントを登録
      button.addEventListener("mouseover", handleMouseOver);
      button.addEventListener("mouseout", handleMouseOut);
      function handleMouseOver(event) {
        bgUp.visble = false;
        bgOver.visible = true;
        diceLabel.color = "white";
      }
      function handleMouseOut(event) {
        bgUp.visble = true;
        bgOver.visible = false;
        diceLabel.color = keyColor;
      }

      // イベントを登録
      button.addEventListener("click", handleClick);
      function handleClick(event) {
        // クリックされた時の処理を記述
        diceNumber = Math.floor(Math.random() * 6) + 1;
        
      }

      createjs.Ticker.addEventListener("tick", handleTick);
      function handleTick() {
        // Stageの描画を更新
        diceStage.update();
      }
}

window.addEventListener("load", init);
init();