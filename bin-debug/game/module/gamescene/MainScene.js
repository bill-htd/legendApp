var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this) || this;
    }
    MainScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.addLayerAt(LayerManager.Game_Bg, 1);
        this.addLayerAt(LayerManager.Game_Main, 2);
        this.addLayer(LayerManager.Main_View);
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Main2);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Tips);
        ViewManager.ins().open(GameSceneView);
        ViewManager.ins().open(ChatMainUI);
        ViewManager.ins().open(UIView2);
        ViewManager.ins().open(TipsView);
        SoundManager.ins().stopBg();
        GameApp.ins().postLoginInit();
        if (DeviceUtils.IsMobile) {
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchPlaySound, this);
        }
    };
    MainScene.prototype.onTouchPlaySound = function () {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchPlaySound, this);
        SoundUtil.ins().playEffect(SoundUtil.WINDOW);
    };
    MainScene.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return MainScene;
}(BaseScene));
__reflect(MainScene.prototype, "MainScene");
//# sourceMappingURL=MainScene.js.map