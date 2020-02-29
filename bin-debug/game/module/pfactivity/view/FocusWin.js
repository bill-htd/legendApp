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
var FocusWin = (function (_super) {
    __extends(FocusWin, _super);
    function FocusWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "UpToDesktopSkin";
        return _this;
    }
    FocusWin.prototype.open = function () {
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.focusBtn, this.onTap);
        this.initList();
    };
    FocusWin.prototype.initList = function () {
        var award = GlobalConfig.WeiXiGuanZhuConst.awards;
        this.reward.itemRenderer = ItemBase;
        this.reward.dataProvider = new eui.ArrayCollection(award);
    };
    FocusWin.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        switch (tar) {
            case this.bgClose:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.focusBtn:
                window["showQRCode"] && window["showQRCode"]();
                ViewManager.ins().close(this);
                break;
        }
    };
    return FocusWin;
}(BaseEuiView));
__reflect(FocusWin.prototype, "FocusWin");
ViewManager.ins().reg(FocusWin, LayerManager.UI_Popup);
//# sourceMappingURL=FocusWin.js.map