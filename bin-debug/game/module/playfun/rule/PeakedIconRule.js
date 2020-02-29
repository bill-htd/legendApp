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
var PeakedIconRule = (function (_super) {
    __extends(PeakedIconRule, _super);
    function PeakedIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            SpecialRing.ins().postActiveRing,
            GameApp.ins().postZeroInit,
            UserZs.ins().postZsLv
        ];
        _this.updateMessage = [
            PeakedRedpoint.ins().postRedPoint,
        ];
        return _this;
    }
    PeakedIconRule.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.tar["txt"]) {
            if (PeakedSys.ins().isKf()) {
                if (PeakedSys.ins().kfStatusIsEnd && PeakedSys.ins().kfStatus < KF_PeakStatus.Finals) {
                    this.tar["txt"].text = PeakedData.STATE_KF_ICON_CN[PeakedSys.ins().kfStatus + 1];
                }
                else {
                    this.tar["txt"].text = PeakedData.STATE_KF_ICON_CN[PeakedSys.ins().kfStatus];
                }
            }
            else {
                if (PeakedSys.ins().bfStatusIsEnd && PeakedSys.ins().bfStatus < BF_PeakStatus.Finals) {
                    this.tar["txt"].text = PeakedData.STATE_ICON_CN[PeakedSys.ins().bfStatus + 1];
                }
                else {
                    this.tar["txt"].text = PeakedData.STATE_ICON_CN[PeakedSys.ins().bfStatus];
                }
            }
        }
    };
    PeakedIconRule.prototype.checkShowIcon = function () {
        return PeakedSys.ins().isOpen();
    };
    PeakedIconRule.prototype.checkShowRedPoint = function () {
        return PeakedRedpoint.ins().redpoint;
    };
    PeakedIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(PeakedMainWin);
    };
    return PeakedIconRule;
}(RuleIconBase));
__reflect(PeakedIconRule.prototype, "PeakedIconRule");
//# sourceMappingURL=PeakedIconRule.js.map