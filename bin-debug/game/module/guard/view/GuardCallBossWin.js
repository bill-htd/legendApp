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
var GuardCallBossWin = (function (_super) {
    __extends(GuardCallBossWin, _super);
    function GuardCallBossWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "guardGodWeaponBossTips";
        _this.isTopLevel = true;
        return _this;
    }
    GuardCallBossWin.prototype.open = function () {
        var time = GuardWeaponModel.ins().getCallBossTimes();
        var money = GuardWeaponModel.ins().callBossMoney();
        this.callTimesLable.text = "" + time;
        if (time == 0)
            money = 0;
        this.zb0.text = "" + money;
        this.time = time;
        this.money = money;
        this.addTouchEvent(this.closeBtn, this.closeWin);
        this.addTouchEvent(this.up, this.callBoss);
    };
    GuardCallBossWin.prototype.callBoss = function () {
        if (this.time > 0) {
            if (Actor.yb < this.money) {
                UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
            }
            else {
                UserFb.ins().callGuardBoss();
            }
        }
        else {
            UserTips.ins().showTips("没有召唤BOSS次数");
        }
        this.closeWin();
    };
    GuardCallBossWin.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    return GuardCallBossWin;
}(BaseEuiView));
__reflect(GuardCallBossWin.prototype, "GuardCallBossWin");
ViewManager.ins().reg(GuardCallBossWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuardCallBossWin.js.map