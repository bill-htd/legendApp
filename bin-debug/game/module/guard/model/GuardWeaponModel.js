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
var GuardWeaponModel = (function (_super) {
    __extends(GuardWeaponModel, _super);
    function GuardWeaponModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isShowSweep = false;
        _this.guardCopyInfo = new GuardCopyInfo();
        return _this;
    }
    GuardWeaponModel.ins = function () {
        return _super.ins.call(this);
    };
    GuardWeaponModel.prototype.canChallenge = function () {
        return this.isOpen() && GlobalConfig.GuardGodWeaponConf.dailyCount > this.challengeTimes;
    };
    GuardWeaponModel.prototype.isOpen = function () {
        var ary = GlobalConfig.GuardGodWeaponConf.opencondition;
        var zsLv = ary[0];
        var openDay = ary[1];
        return UserZs.ins().lv >= zsLv && (GameServer.serverOpenDay + 1) >= openDay;
    };
    GuardWeaponModel.prototype.getDesc = function () {
        var ary = GlobalConfig.GuardGodWeaponConf.opencondition;
        var zsLv = ary[0];
        var openDay = ary[1];
        return "\u89D2\u8272" + zsLv + "\u8F6C\uFF0C\u5E76\u4E14\u5F00\u670D\u7B2C" + openDay + "\u5929\u5F00\u542F";
    };
    GuardWeaponModel.prototype.getMaxWaves = function () {
        var list = GlobalConfig.GGWWaveConf[UserZs.ins().lv] || {};
        return Object.keys(list).length;
    };
    GuardWeaponModel.prototype.getWaveTime = function (wave) {
        if (wave == 0)
            return GlobalConfig.GuardGodWeaponConf.starDelayRsf;
        return GlobalConfig.GGWWaveConf[UserZs.ins().lv][wave].time;
    };
    GuardWeaponModel.prototype.isCanCallBoss = function () {
        return this.getCallBossTimes() > 0;
    };
    GuardWeaponModel.prototype.getCallBossTimes = function () {
        var wave = this.guardCopyInfo.wave;
        var times = 0;
        for (var i in GlobalConfig.GuardGodWeaponConf.sSummonLimit) {
            if (wave >= +i) {
                times += GlobalConfig.GuardGodWeaponConf.sSummonLimit[i];
            }
        }
        return times - this.guardCopyInfo.callBossNum;
    };
    GuardWeaponModel.prototype.callBossMoney = function () {
        var times = this.getCallBossTimes();
        return GlobalConfig.GuardGodWeaponConf.sSummonCost[times - 1];
    };
    GuardWeaponModel.prototype.getKillWave = function () {
        return this.guardCopyInfo.wave;
    };
    return GuardWeaponModel;
}(BaseClass));
__reflect(GuardWeaponModel.prototype, "GuardWeaponModel");
//# sourceMappingURL=GuardWeaponModel.js.map