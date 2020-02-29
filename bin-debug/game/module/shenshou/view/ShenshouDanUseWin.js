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
var ShenshouDanUseWin = (function (_super) {
    __extends(ShenshouDanUseWin, _super);
    function ShenshouDanUseWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SsItemUseTips";
        return _this;
    }
    ShenshouDanUseWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.useBtn, this.onTouch);
        this.addTouchEvent(this.cancelBtn, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        var itemConfig = args[0];
        this.itemIcon.data = itemConfig.id;
        this.ownCount.text = "(\u5F53\u524D\u62E5\u6709" + UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, GlobalConfig.ShenShouConfig.battleCountItem) + "\u4E2A\uFF09";
        this.itemIcon.hideName();
    };
    ShenshouDanUseWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
            case this.cancelBtn:
                ViewManager.ins().close(this);
                break;
            case this.useBtn:
                ShenshouSys.ins().sendUpLimitMax();
                break;
        }
    };
    return ShenshouDanUseWin;
}(BaseEuiView));
__reflect(ShenshouDanUseWin.prototype, "ShenshouDanUseWin");
ViewManager.ins().reg(ShenshouDanUseWin, LayerManager.UI_Popup);
//# sourceMappingURL=ShenshouDanUseWin.js.map