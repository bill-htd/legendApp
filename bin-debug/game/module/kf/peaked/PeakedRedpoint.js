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
var PeakedRedpoint = (function (_super) {
    __extends(PeakedRedpoint, _super);
    function PeakedRedpoint() {
        var _this = _super.call(this) || this;
        _this.redpoint1 = 0;
        _this.redpoint2 = 0;
        _this.redpoint3 = 0;
        _this.redpoint = 0;
        _this.associated(_this.postRedPoint, PeakedSys.ins().postSignUp, PeakedSys.ins().postState, PeakedSys.ins().postWorship, PeakedSys.ins().postKFInfoList, UserZs.ins().postZsLv);
        return _this;
    }
    PeakedRedpoint.ins = function () {
        return _super.ins.call(this);
    };
    PeakedRedpoint.prototype.postRedPoint = function () {
        this.redpoint1 = 0;
        this.redpoint2 = 0;
        this.redpoint3 = 0;
        this.redpoint = 0;
        if (!PeakedSys.ins().isOpen()) {
            return this.redpoint;
        }
        if (UserZs.ins().lv < GlobalConfig.PeakRaceBase.needZsLv)
            return this.redpoint;
        if (PeakedSys.ins().bfStatus == BF_PeakStatus.SignUp && PeakedSys.ins().isSignUp == 0 && PeakedSys.ins().canSignUp()) {
            this.redpoint1 = 1;
        }
        if (PeakedSys.ins().isKf() && PeakedHelp.canSupport()) {
            if (PeakedSys.ins().kfStatus > KF_PeakStatus.Knockout || (PeakedSys.ins().kfStatus == KF_PeakStatus.Knockout && PeakedSys.ins().kfStatusIsEnd)) {
                this.redpoint2 = GlobalConfig.PeakRaceBase.likeCount - PeakedSys.ins().kideNum;
            }
        }
        else {
            if ((PeakedSys.ins().bfStatus > BF_PeakStatus.Knockout || (PeakedSys.ins().bfStatus == BF_PeakStatus.Knockout && PeakedSys.ins().bfStatusIsEnd)) && PeakedSys.ins().bfStatus < BF_PeakStatus.Over && PeakedHelp.canSupport()) {
                this.redpoint2 = GlobalConfig.PeakRaceBase.likeCount - PeakedSys.ins().kideNum;
            }
        }
        this.redpoint3 = PeakedSys.ins().worshipNum < GlobalConfig.PeakRaceBase.mobaiNum && PeakedSys.ins().kfPlayer2Data && PeakedSys.ins().kfPlayer2Data.winId && PeakedSys.ins().kfStatus >= KF_PeakStatus.Knockout && PeakedSys.ins().kfStatusIsEnd ? 1 : 0;
        this.redpoint = this.redpoint1 + this.redpoint2 + this.redpoint3;
        return this.redpoint;
    };
    return PeakedRedpoint;
}(BaseSystem));
__reflect(PeakedRedpoint.prototype, "PeakedRedpoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.peakedRedpoint = PeakedRedpoint.ins.bind(PeakedRedpoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=PeakedRedpoint.js.map