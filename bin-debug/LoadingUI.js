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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.bgUrl = "resource/image/bg/bg.png";
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        var urlLoader = new egret.URLLoader();
        urlLoader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        urlLoader.load(new egret.URLRequest(this.bgUrl));
        this.loadingBg = new egret.Bitmap();
        this.loadingBg.width = this.width;
        this.loadingBg.height = this.height;
        this.addChildAt(this.loadingBg, 0);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.height - 50;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.size = 25;
        this.textField.textAlign = "center";
        this.textField.text = "\u6211\u662F\u8FDB\u5EA6\u6761\uFF01\uFF01\uFF01";
    };
    LoadingUI.prototype.onComplete = function (e) {
        var urlLoader = e.target;
        var texture = urlLoader.data;
        if (urlLoader._request.url == this.bgUrl) {
            this.loadingBg.texture = texture;
        }
    };
    LoadingUI.prototype.hideLoadingTrp = function () {
        this.textField.visible = false;
    };
    LoadingUI.prototype.testLoginLoading = function () {
        this.loadingBg = new egret.Bitmap();
        this.loadingBg.width = this.width;
        this.loadingBg.height = this.height;
        this.addChildAt(this.loadingBg, 0);
    };
    LoadingUI.prototype.setProgress = function (progress, txt) {
        this.textField.text = txt + '...';
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.DisplayObjectContainer));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map