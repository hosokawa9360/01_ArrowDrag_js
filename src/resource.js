//resource.js
var res = {
    HelloWorld_png : "res/HelloWorld.png",
    cocos_png : "res/cocos.png",
    drop01_png : "res/drop01.png",
    drop02_png : "res/drop02.png",
    drop03_png : "res/drop03.png",
    drop04_png : "res/drop04.png",
    drop05_png : "res/drop05.png",
    
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
