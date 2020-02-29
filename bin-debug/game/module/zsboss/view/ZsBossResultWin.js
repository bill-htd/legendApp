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
var ZsBossResultWin = (function (_super) {
    __extends(ZsBossResultWin, _super);
    function ZsBossResultWin() {
        return _super.call(this) || this;
    }
    ZsBossResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZsBossResultSkin";
        this.closeBtn.name = "领取奖励";
        this.isTopLevel = true;
    };
    ZsBossResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var params = param;
        this.first.text = params[0][0];
        this.kill.text = params[0][1];
        this.myrank.text = "我的排名：" + params[0][2];
        this.list.dataProvider = new eui.ArrayCollection(params[1]);
        this.s = 10;
        this.updateCloseBtnLabel();
        TimerManager.ins().doTimer(1000, 10, this.updateCloseBtnLabel, this);
        this.addTouchEvent(this.closeBtn, this.onTap);
    };
    ZsBossResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        if (GameMap.fubenID > 0) {
            UserFb.ins().sendExitFb();
        }
    };
    ZsBossResultWin.prototype.onTap = function () {
        ViewManager.ins().close(this);
    };
    ZsBossResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        this.closeBtn.label = this.closeBtn.name + "(" + this.s + "s)";
    };
    return ZsBossResultWin;
}(BaseEuiView));
__reflect(ZsBossResultWin.prototype, "ZsBossResultWin");
ViewManager.ins().reg(ZsBossResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=ZsBossResultWin.js.map