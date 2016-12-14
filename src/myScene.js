//myScene.js
var MyLayer = cc.Layer.extend({
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();
        /*
                var sprite = cc.Sprite.create(res.HelloWorld_png);
                sprite.setPosition(size.width / 2, size.height / 2);
                sprite.setScale(0.8);
                this.addChild(sprite, 0);
        */
        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
        label.setPosition(size.width / 2, size.height * 4 / 5);
        this.addChild(label, 4);


        var label2 = cc.LabelTTF.create("Click Goto Next Scene", "Arial", 20);
        label2.setPosition(size.width / 2, size.height * 1 / 10);
        this.addChild(label2, 4);
        var color = cc.color(255, 0, 0, 128);
        label2.setColor(color);

        var cocos_png = cc.Sprite.create(res.cocos_png);
         cocos_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(cocos_png);
        //add code

        var drop01 = cc.Sprite.create(res.drop01_png);　
        drop01.setPosition(size.width * 1 / 6, size.height / 5);　
        this.addChild(drop01);

        var drop02 = cc.Sprite.create(res.drop02_png);　
        drop02.setPosition(size.width * 2 / 6, size.height / 5);　
        this.addChild(drop02);

        var drop03 = cc.Sprite.create(res.drop03_png);　
        drop03.setPosition(size.width * 3 / 6, size.height / 5);　
        this.addChild(drop03);

        var drop04 = cc.Sprite.create(res.drop04_png);　
        drop04.setPosition(size.width * 4 / 6, size.height / 5);　
        this.addChild(drop04);

        var drop05 = cc.Sprite.create(res.drop05_png);　
        drop05.setPosition(size.width * 5 / 6, size.height / 5);　
        this.addChild(drop05);

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
        // 次のシーンに切り替える
        cc.director.runScene(new NextScene());
    },
});

var MyScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
    }
});
