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
var WJBattlefieldWin = (function (_super) {
    __extends(WJBattlefieldWin, _super);
    function WJBattlefieldWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "WJBattleSkin";
        _this.isTopLevel = true;
        return _this;
    }
    WJBattlefieldWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.getAwardBtn, this.onTouch);
        this.addTouchEvent(this.matchBtn, this.onTouch);
        this.addTouchEvent(this.shopLink, this.onTouch);
        this.addTouchEvent(this.viewArea, this.onTouch);
        this.upData();
    };
    WJBattlefieldWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    WJBattlefieldWin.prototype.initUI = function () {
        this.awardList.itemRenderer = ItemBase;
        this.shopLink.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.shopLink.text);
    };
    WJBattlefieldWin.prototype.upData = function () {
        this.timesLabel.text = "\u5269\u4F59\u53C2\u4E0E\u6B21\u6570\uFF1A" + WJBattlefieldSys.ins().overCounts;
    };
    WJBattlefieldWin.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.getAwardBtn:
                break;
            case this.matchBtn:
                if (WJBattlefieldSys.ins().matchingTime == 0) {
                    WJBattlefieldSys.ins().sendMatch(this.autoCheckBox.selected);
                }
                else {
                    ViewManager.ins().open(WJBattlefieldMatchPanel);
                }
                break;
            case this.shopLink:
                ViewManager.ins().open(ShopWin);
                break;
            case this.viewArea:
                WJBattlefieldSys.ins().sendViewDataInfo();
                break;
        }
    };
    return WJBattlefieldWin;
}(BaseEuiView));
__reflect(WJBattlefieldWin.prototype, "WJBattlefieldWin");
ViewManager.ins().reg(WJBattlefieldWin, LayerManager.UI_Main);
//# sourceMappingURL=WJBattlefieldWin.js.map