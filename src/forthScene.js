var startTouch;
var endTouch;
var touching = false;

var cocos_box;
var arrow_node;
var arrow_line;
var debug_label1;
var debug_label2;
var forthLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();

      debug_label1 = cc.LabelTTF.create("Click", "Arial", 26);
      debug_label1.setPosition(size.width / 2, size.height * 0.8);
      this.addChild(debug_label1, 1);
      debug_label2 = cc.LabelTTF.create(" and Drag", "Arial", 26);
      debug_label2.setPosition(size.width * 2 / 3, size.height * 0.74);
      this.addChild(debug_label2, 1);

      cocos_box = cc.Sprite.create(res.cocos_png);
      cocos_box.setScale(0.5);
      cocos_box.setPosition(size.width / 2, size.height / 2);

      this.addChild(cocos_box, 1);
      //cocos_box.setVisible(false);

      arrow_node = new cc.DrawNode();
      this.addChild(arrow_node, 10);
      arrow_line = new cc.DrawNode();
      this.addChild(arrow_line, 11);

      var points = [new cc.Point(0, 0),
         new cc.Point(-8, -10),
         new cc.Point(-3, -10),
         new cc.Point(0, -20),
         new cc.Point(3, -10),
         new cc.Point(8, -10),
      ]

      var fillColor = new cc.Color(128, 128, 128, 128);
      var lineWidth = 1;
      var lineColor = new cc.Color(255, 255, 255, 128);
      arrow_node.drawPoly(points, fillColor, lineWidth, lineColor);
      arrow_node.setPosition(size.width / 2, size.height / 2);

      this.scheduleUpdate();

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
      startTouch = touch.getLocation();

      cocos_box.setPosition(startTouch);
      arrow_node.setPosition(startTouch);

      return true;
   },
   onTouchMoved: function(touch, event) {
      endTouch = touch.getLocation();
      touching = true;
   },
   onTouchEnded: function(touch, event) {
      endTouch = touch.getLocation();
      touching = false;
      //cc.director.runScene(new MyScene());
   },

   update: function(dt) {
      if (touching) {
         //現在タッチしているX座標と前回の座標の差分をとる
         arrow_line.setVisible(true);
         arrow_node.setVisible(true);

         this.calcDirection();
      } else {
         arrow_line.setVisible(false);
         arrow_line.clear();
         arrow_node.setVisible(false);
         arrow_node.clear();
      }

   },
   calcDirection: function() {
      var dX = endTouch.x - startTouch.x;
      var dY = endTouch.y - startTouch.y;
      var dZ = Math.sqrt(dX * dX + dY * dY);

      debug_label1.setString(Math.floor(dZ * Math.pow(10, 2)) / Math.pow(10, 2));

      //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
      if (dZ > 60) {

         //  if (Math.abs(dX) > 5 || Math.abs(dY) > 5) {
         //角度（ラジアン）を求める
         var radian = Math.atan2(dY, dX)
            //角度（ラジアン）を角度（度数）に変換
         var angle = radian * 180 / Math.PI;
         //矢印を回転させる

         //前回の描画を消す
         arrow_line.clear();
         arrow_node.clear();

         var pos = cocos_box.getPosition();
         //中央に線を引いてみた　これはなくてもいいな
         arrow_line.drawSegment(cc.p(pos.x, pos.y),
            cc.p(endTouch.x, endTouch.y), 1,
            new cc.Color(255, 255, 255, 64));
         debug_label2.setString(Math.floor(angle * Math.pow(10, 2)) / Math.pow(10, 2));

         //ドラックした長さを矢印のしっぽの位置にする
         var points = [new cc.Point(0, 0),
            new cc.Point(-35, -35),
            new cc.Point(-15, -35),
            new cc.Point(0, -(dZ - 10)),
            new cc.Point(15, -35),
            new cc.Point(35, -35),
         ]

         //矢印を描画する
         var fillColor = new cc.Color(128, 128, 128, 128);
         var lineWidth = 1;
         var lineColor = new cc.Color(255, 255, 255, 128);
         arrow_node.drawPoly(points, fillColor, lineWidth, lineColor);
         //矢印はもともと270度の位置にあるので、回転角度を減算する
         arrow_node.setRotation(270 - angle);

      }



   },

});

var ForthScene = cc.Scene.extend({
   onEnter: function() {
      this._super();

      // 背景レイヤーをその場で作る
      var backgroundLayer = new cc.LayerColor(new cc.Color(0, 100, 140, 128));
      this.addChild(backgroundLayer);
      //ラベルとタップイベント取得
      var layer = new forthLayer();
      this.addChild(layer);

   }
});
