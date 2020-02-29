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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    StartGameView.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        ResourceUtils.ins().addConfig("startgame/default.res.json", "startgame/");
        ResourceUtils.ins().loadConfig(this.onConfigComplete, this);
    };
    StartGameView.prototype.onConfigComplete = function () {
        EXML.load("startgame/StartGameSkin.exml", this.onLoaded, this);
    };
    StartGameView.prototype.onLoaded = function (clazz, url) {
        this.skinName = clazz;
        this.selectServer.textFlow = new egret.HtmlTextParser().parser('<u>' + this.curServer.text + '</u>');
        this.account.text = egret.localStorage.getItem("account");
        this.curServer.text = "版署服务器";
        this.selectServer.visible = false;
        this.start.skinName = "<?xml version='1.0' encoding='utf-8'?>\n\t\t\t\t\t\t\t\t<e:Skin class=\"Btn0Skin\" states=\"up,down,disabled\" minHeight=\"25\" minWidth=\"25\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\">\n\t\t\t\t\t\t\t\t<w:Config id=\"1586b67282f\"/>\n\t\t\t\t\t\t\t\t<e:Image id=\"iconDisplay\" width=\"100%\" height=\"100%\" alpha.disabled=\"0.5\"\n\t\t\t\t\t\t\t\tsource=\"\" x.down=\"0\" y.down=\"0\"  scaleX.down=\"0.95\" scaleY.down=\"0.95\" pixelHitTest=\"true\"/>\n\t\t\t\t\t\t\t\t</e:Skin>";
        this.showIPListView();
        this.open();
    };
    StartGameView.prototype.showIPListView = function () {
        this.select = new euiextension.DropDownList();
        var arr1 = window['serverList'];
        this.select.setDataIP(arr1);
        var arr2 = window['resList'];
        this.select.setDataRES(arr2);
        this.addChild(this.select);
    };
    StartGameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.start, this.onClick);
        this.addTouchEvent(this.selectServer, this.onClick);
    };
    StartGameView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.start, this.onClick);
        this.removeTouchEvent(this.selectServer, this.onClick);
        this.select.destructor();
    };
    StartGameView.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.start:
                this.callbackFun();
                break;
            case this.selectServer:
                ViewManager.ins().open(SelectServerView);
                break;
        }
    };
    StartGameView.prototype.gameResComplete = function () {
        LocationProperty.openID = this.account.text;
        egret.localStorage.setItem("account", this.account.text);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.ins().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map