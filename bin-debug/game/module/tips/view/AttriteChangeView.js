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
var AttriteChangeView = (function (_super) {
    __extends(AttriteChangeView, _super);
    function AttriteChangeView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = _this.touchChildren = false;
        _this.initView();
        return _this;
    }
    AttriteChangeView.prototype.initView = function () {
        this._sp = new egret.Sprite();
        this.addChild(this._sp);
        this._bgImg = new eui.Image();
        this._sp.addChild(this._bgImg);
    };
    AttriteChangeView.prototype.setLabelText = function (type, value) {
        var _this = this;
        this._sp.x = 0;
        this._sp.alpha = 1;
        this._bgImg.source = "attr" + type;
        var powerImg = BitmapNumber.ins().createNumPic(value, "attr", 5);
        powerImg.x = 90;
        powerImg.y = 10;
        this._sp.addChild(powerImg);
        var t1 = egret.Tween.get(this._sp);
        t1.wait(1000).to({ "alpha": 0, "x": -300 }, 500).call(function () {
            BitmapNumber.ins().desstroyNumPic(powerImg);
            powerImg.x = 0;
            powerImg.y = 0;
            DisplayUtils.removeFromParent(_this);
        }, this);
    };
    return AttriteChangeView;
}(BaseView));
__reflect(AttriteChangeView.prototype, "AttriteChangeView");
//# sourceMappingURL=AttriteChangeView.js.map