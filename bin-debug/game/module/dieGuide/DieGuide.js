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
var DieGuide = (function (_super) {
    __extends(DieGuide, _super);
    function DieGuide() {
        var _this = _super.call(this) || this;
        _this.resImg = ["vipbn2_png", "vipbn2_1_png"];
        _this.observe(Encounter.ins().postFightResult, _this.postdieGuide);
        _this.observe(Recharge.ins().postRecharge1Data, _this.initRecharge1);
        _this.observe(Setting.ins().postInitSetting, _this.initSetting);
        return _this;
    }
    DieGuide.ins = function () {
        return _super.ins.call(this);
    };
    DieGuide.prototype.initRecharge1 = function () {
        this.isInitRecharge1 = true;
    };
    DieGuide.prototype.initSetting = function () {
        this.isInitSetting = true;
    };
    DieGuide.prototype.postdieGuide = function (result) {
        if (result)
            return;
        var dieTime = Setting.ins().getValue(ClientSet.diedFirstTime);
        if (!dieTime) {
            dieTime = Math.floor(new Date().getTime() / 1000);
            Setting.ins().setValue(ClientSet.diedFirstTime, dieTime);
        }
        var rch = Recharge.ins().getRechargeData(0);
        if (rch.num) {
            dieTime = Setting.ins().getValue(ClientSet.diedFirstTime2);
            if (!dieTime) {
                dieTime = Math.floor(new Date().getTime() / 1000);
                Setting.ins().setValue(ClientSet.diedFirstTime2, dieTime);
            }
        }
    };
    DieGuide.prototype.dieFbRedPoint = function (resetCount, fbId) {
        var fbconfig = GlobalConfig.DailyFubenConfig[fbId];
        if (!fbconfig)
            return false;
        if (UserZs.ins().lv < fbconfig.zsLevel || Actor.level < fbconfig.levelLimit)
            return false;
        var timer = Setting.ins().getValue(ClientSet.FB);
        if (timer) {
            var index = fbId - 3000;
            if ((timer >> index) & 1)
                return false;
        }
        var dieTime = Setting.ins().getValue(ClientSet.diedFirstTime);
        if (!dieTime)
            return false;
        var curTime = Math.floor(new Date().getTime() / 1000);
        if (curTime > (DateUtils.getTodayZeroSecond(new Date(dieTime * 1000)) + 60 * 60 * 24))
            return false;
        if (resetCount > 0) {
            return true;
        }
        return false;
    };
    DieGuide.prototype.checkFirstChargeOrVIPWin = function () {
        if (!this.isInitRecharge1 || !this.isInitSetting)
            return;
        if (UserFb.ins().pkGqboss)
            return;
        var rch = Recharge.ins().getRechargeData(0);
        if (!rch.num) {
            if (Actor.level >= 30) {
                var recharge = Setting.ins().getValue(ClientSet.recharge1);
                if (!recharge) {
                    var view = ViewManager.ins().getView(PlayFunView);
                    if (view) {
                        view.setDieGuide(DieGuide.RECHARGE);
                    }
                    Setting.ins().setValue(ClientSet.recharge1, DieGuide.Show);
                    return;
                }
            }
            var dieTime = Setting.ins().getValue(ClientSet.diedFirstTime);
            if (dieTime && dieTime > 0) {
                var recharge = Setting.ins().getValue(ClientSet.recharge2);
                if (!recharge) {
                    var view = ViewManager.ins().getView(PlayFunView);
                    if (view) {
                        view.setDieGuide(DieGuide.RECHARGE);
                    }
                    Setting.ins().setValue(ClientSet.recharge2, DieGuide.Show);
                    return;
                }
            }
        }
        else {
            var dieTime = Setting.ins().getValue(ClientSet.diedFirstTime2);
            if (dieTime && dieTime > 0) {
                if (UserVip.ins().lv < 3) {
                    var vipGuide = Setting.ins().getValue(ClientSet.vip);
                    if (!vipGuide) {
                        var view = ViewManager.ins().getView(PlayFunView);
                        if (view) {
                            view.setDieGuide(DieGuide.VIP);
                        }
                        Setting.ins().setValue(ClientSet.vip, DieGuide.Show);
                        return;
                    }
                }
            }
        }
    };
    DieGuide.prototype.getOpenRoles = function () {
        var id = Setting.ins().getValue(ClientSet.role);
        if (id == DieGuide.Show2) {
            if (SubRoles.ins().subRolesLen >= 3)
                return "";
        }
        var len = 3;
        for (var i = 1; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (!role) {
                if (!id) {
                    Setting.ins().setValue(ClientSet.role, DieGuide.Show);
                }
                else if (id == DieGuide.Show && i == 2) {
                    Setting.ins().setValue(ClientSet.role, DieGuide.Show2);
                }
                return this.resImg[i - 1];
            }
        }
        return "";
    };
    DieGuide.prototype.setClick = function (fbID) {
        var index = fbID - 3000;
        var timer = Setting.ins().getValue(ClientSet.FB);
        if (!timer)
            timer = 0;
        if ((timer >> index) & 1)
            return;
        timer = timer | 1 << index;
        Setting.ins().setValue(ClientSet.FB, timer);
    };
    DieGuide.prototype.setMaxFb = function (sweeps) {
        var timer = Setting.ins().getValue(ClientSet.FB);
        for (var i = 0; i < sweeps.length; i++) {
            if (sweeps[i] > 3000) {
                var index = sweeps[i] - 3000;
                if ((timer >> index) & 1)
                    continue;
                timer = timer | 1 << index;
                Setting.ins().setValue(ClientSet.FB, timer);
            }
        }
    };
    DieGuide.Show = 1;
    DieGuide.Show2 = 2;
    DieGuide.RECHARGE = 1;
    DieGuide.VIP = 2;
    DieGuide.FB = 3;
    return DieGuide;
}(BaseSystem));
__reflect(DieGuide.prototype, "DieGuide");
var GameSystem;
(function (GameSystem) {
    GameSystem.dieGuide = DieGuide.ins.bind(DieGuide);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=DieGuide.js.map