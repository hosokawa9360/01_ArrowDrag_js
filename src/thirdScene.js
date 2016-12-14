//thirdScene.js
//nextScene.js
var ThirdLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();

      var label = cc.LabelTTF.create("This is thrtd Scene", "Arial", 26);
      label.setColor(cc.color(255, 0, 0, 0, 128));
      label.setPosition(size.width / 2, size.height * 5 / 6);
      this.addChild(label, 1);


      var label2 = cc.LabelTTF.create("Click Goto Forth Scene", "Arial", 20);
      label2.setPosition(size.width / 2, size.height * 1 / 10);
      this.addChild(label2, 4);
      var color = cc.color(255, 0, 255, 128);
      label2.setColor(color);

      // タップイベントリスナーを登録する
      cc.eventManager.addListener({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: this.onTouchBegan,
         onTouchMoved: this.onTouchMoved,
         onTouchEnded: this.onTouchEnded
      }, this);
      return true;
   },
   onTouchBegan: function(touch, event) {
      return true;
   },
   onTouchMoved: function(touch, event) {},
   onTouchEnded: function(touch, event) {
      cc.director.runScene(new ForthScene());
   },
});
//格子状にドロップを配置するレイヤ

var latticeLayer = cc.Layer.extend({
   sprite: null,
   // ブロックを保持しておく配列
   dropSpriteArray: null,
   // 配列の宣言　ブロックの名前を指定
   dropArray: [res.drop01_png, res.drop02_png, res.drop03_png, res.drop04_png, res.drop05_png],
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();

      //this.dropSpriteArray = new Array();
      for (var i = 0; i < 5; i++) {
         for (var j = 0; j < 5; j++) {
            var rnd = Math.floor(Math.random() * 5);
            this.sprite = new cc.Sprite(this.dropArray[rnd]);
            this.sprite.attr({
               x: size.height * 0.1 + 50 * j,
               y: size.height * 0.2 + 50 * i,
               scale: 1.0,
               rotation: 0
            });
            this.addChild(this.sprite, 0);
            //this.dropSpriteArray.push(this.sprite);
            //this.addChild(this.dropSpriteArray[i], 0);
         }
      }
   }
});

var ThirdScene = cc.Scene.extend({
   onEnter: function() {
      this._super();

      // 背景レイヤーをその場で作る
      var backgroundLayer = new cc.LayerColor(new cc.Color(0, 200, 140, 128));
      this.addChild(backgroundLayer);
      //格子状に配置するレイヤー
      var layer4 = new latticeLayer();
      this.addChild(layer4);
      //ラベルとタップイベント取得
      var layer3 = new ThirdLayer();
      this.addChild(layer3);

   }
});
