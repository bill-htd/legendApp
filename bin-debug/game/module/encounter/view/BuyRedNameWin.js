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
var BuyRedNameWin = (function (_super) {
    __extends(BuyRedNameWin, _super);
    function BuyRedNameWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ZaoYuQueSkin";
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        return _this;
    }
    BuyRedNameWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btnBuy, this.onTap);
        this.addTouchEvent(this.btnClose, this.onTap);
        this.updateText();
    };
    BuyRedNameWin.prototype.updateText = function () {
        this.pkNow.text = "" + EncounterModel.redName;
        this.ybNum.text = "" + (EncounterModel.redName - GlobalConfig.SkirmishBaseConfig.maxPkval + 1) * GlobalConfig.SkirmishBaseConfig.subPkvalCost;
        this.pkValue.text = "" + (EncounterModel.redName - GlobalConfig.SkirmishBaseConfig.maxPkval + 1);
    };
    BuyRedNameWin.prototype.close = function () {
        this.removeTouchEvent(this.btnBuy, this.onTap);
        this.removeTouchEvent(this.btnClose, this.onTap);
    };
    BuyRedNameWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnBuy:
                if (Actor.yb >= (EncounterModel.redName - GlobalConfig.SkirmishBaseConfig.maxPkval + 1) * GlobalConfig.SkirmishBaseConfig.subPkvalCost) {
                    Encounter.ins().sendCleanRedName();
                    Encounter.ins().buyAndFight = true;
                }
                else {
                    UserTips.ins().showTips("元宝不足");
                    ViewManager.ins().close(this);
                    break;
                }
        }
        ViewManager.ins().close(BuyRedNameWin);
    };
    return BuyRedNameWin;
}(BaseEuiView));
__reflect(BuyRedNameWin.prototype, "BuyRedNameWin");
ViewManager.ins().reg(BuyRedNameWin, LayerManager.UI_Popup);
//# sourceMappingURL=BuyRedNameWin.js.map