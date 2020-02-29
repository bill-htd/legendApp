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
var CdkeyPanle = (function (_super) {
    __extends(CdkeyPanle, _super);
    function CdkeyPanle() {
        var _this = _super.call(this) || this;
        _this.skinName = "CDkeySkin";
        _this.input.maxChars = 28;
        return _this;
    }
    CdkeyPanle.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.sendBtn, this.onTap);
    };
    CdkeyPanle.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.sendBtn, this.onTap);
    };
    CdkeyPanle.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.sendBtn:
                CDKey.ins().sendCdkey(this.input.text);
                break;
        }
    };
    return CdkeyPanle;
}(BaseView));
__reflect(CdkeyPanle.prototype, "CdkeyPanle");
//# sourceMappingURL=CdkeyPanle.js.map