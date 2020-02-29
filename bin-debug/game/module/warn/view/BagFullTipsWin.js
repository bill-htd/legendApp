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
var BagFullTipsWin = (function (_super) {
    __extends(BagFullTipsWin, _super);
    function BagFullTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "FullBagSkin";
        return _this;
    }
    BagFullTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
        var num = 20;
        if (param[0])
            num = param[0];
        this.numText.text = "" + num;
    };
    BagFullTipsWin.prototype.close = function () {
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.sureBtn, this.onTap);
    };
    BagFullTipsWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.sureBtn:
                ViewManager.ins().close(this);
                ViewManager.ins().open(SmeltEquipTotalWin);
                break;
        }
    };
    return BagFullTipsWin;
}(BaseEuiView));
__reflect(BagFullTipsWin.prototype, "BagFullTipsWin");
ViewManager.ins().reg(BagFullTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=BagFullTipsWin.js.map