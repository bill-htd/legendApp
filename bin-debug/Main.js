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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        RES.setMaxLoadingThread(4);
        StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_WIDTH);
        StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
        if (DeviceUtils.IsPC) {
            StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_HEIGHT);
            StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
        }
        if (navigator.userAgent.indexOf("iPad") != -1) {
            StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_HEIGHT);
            StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
        }
        window["onorientationchange"] = function () {
            var or = window["orientation"];
            if (or == 90 || or == -90) {
                StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_HEIGHT);
                StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
            }
            else {
                StageUtils.ins().setScaleMode(egret.StageScaleMode.FIXED_WIDTH);
                StageUtils.ins().getStage().orientation = egret.OrientationMode.AUTO;
            }
        };
        egret.lifecycle.onPause = function () {
            SoundManager.ins().setEffectOn(false);
        };
        egret.lifecycle.onResume = function () {
            if (SysSetting.ins().getBool(SysSetting.SOUND_EFFECT) == undefined) {
                SoundManager.ins().setEffectOn(true);
            }
            else {
                SoundManager.ins().setEffectOn(SysSetting.ins().getBool(SysSetting.SOUND_EFFECT));
            }
        };
        var NativeName = window['getNative']();
        if (NativeName == 'web') {
        }
        else {
            this.loadingView = new LoadingUI();
            this.loadingView.width = this.stage.stageWidth;
            this.loadingView.height = this.stage.stageHeight;
            this.loadingView.createView();
            this.stage.addChild(this.loadingView);
        }
        LocationProperty.init();
        FixUtil.fixAll();
        egret.ImageLoader.crossOrigin = "anonymous";
        ResVersionManager.ins().loadConfig(this.loadResVersionComplete, this);
        if (window['getNative']() == 'web') {
            LocationProperty.setLoadProgress(30, "(加载游戏配置)");
        }
        else {
            this.loadingView.setProgress(30, '(加载游戏配置)');
        }
    };
    Main.prototype.loadResVersionComplete = function () {
        var version = window['getVersion']();
        ResourceUtils.ins().addConfig(RES_RESOURCE + "default.res.json?v=" + version, "" + RES_RESOURCE);
        ResourceUtils.ins().loadConfig(this.onConfigComplete, this);
    };
    Main.prototype.onConfigComplete = function () {
        var version = window['getVersion']();
        if (window['getNative']() == 'web') {
            LocationProperty.setLoadProgress(40, "(加载游戏主题文件)");
        }
        else {
            this.loadingView.setProgress(40, '(加载游戏主题文件)');
        }
        var theme = new eui.Theme(RES_RESOURCE + "default.thm.json?v=" + version, this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    Main.prototype.onThemeLoadComplete = function () {
        if (window['getNative']() == 'web') {
            GameApp.ins().loadWeb();
        }
        else {
            var loginWinUi = new login();
            loginWinUi.width = this.stage.stageWidth;
            loginWinUi.height = this.stage.stageHeight;
            this.stage.addChild(loginWinUi);
            this.loadingView.hideLoadingTrp();
        }
    };
    Main.closesocket = function () {
        GameSocket.ins().close();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map