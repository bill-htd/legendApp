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
var TargetMemberHeadRender = (function (_super) {
    __extends(TargetMemberHeadRender, _super);
    function TargetMemberHeadRender() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        return _this;
    }
    TargetMemberHeadRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.removeAttEffect();
    };
    TargetMemberHeadRender.prototype.onTap = function (e) {
        if (!isNaN(this.data)) {
            this.showEffect();
            SysSetting.ins().setValue("mapClickTx", 0);
            SysSetting.ins().setValue("mapClickTy", 0);
            if (KFBossSys.ins().flagHandle == parseInt(this.data)) {
                if (KFBossSys.ins().flagCD - egret.getTimer() > 0) {
                    UserTips.ins().showTips("|C:" + ColorUtil.RED + "&T:\u65D7\u5B50\u672A\u5237\u65B0\uFF01|");
                }
                else {
                    KFBossSys.ins().sendCollectFlag();
                }
            }
            else if (KfArenaSys.ins().flagHandle == parseInt(this.data)) {
                if (KfArenaSys.ins().flagCD - egret.getTimer() > 0) {
                    UserTips.ins().showTips("|C:" + ColorUtil.RED + "&T:\u65D7\u5B50\u672A\u5237\u65B0\uFF01|");
                }
                else {
                    KfArenaSys.ins().sendCollectFlag();
                }
            }
            else
                GameLogic.ins().postChangeAttrPoint(this.data);
        }
    };
    return TargetMemberHeadRender;
}(WorldBossHeadRender));
__reflect(TargetMemberHeadRender.prototype, "TargetMemberHeadRender");
//# sourceMappingURL=TargetMemberHeadRender.js.map