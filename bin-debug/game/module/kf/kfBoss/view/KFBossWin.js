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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KFBossWin = (function (_super) {
    __extends(KFBossWin, _super);
    function KFBossWin() {
        var _this = _super.call(this) || this;
        _this.MAX = 8;
        _this.isTopLevel = true;
        _this.skinName = "KFBossSkin";
        _this.MAX = CommonUtils.getObjectLength(GlobalConfig.CrossBossConfig);
        for (var i = 1; i <= _this.MAX; i++) {
            _this["island" + i].island.source = "kf_boss_area" + i;
            _this["island" + i].touchChildren = false;
            _this["island" + i].filters = FilterUtil.ARRAY_GRAY_FILTER;
            var dp = GlobalConfig.CrossBossConfig[i];
            var zsLvlimit = [dp.levelLimit[0] / 1000 >> 0, dp.levelLimit[1] / 1000 >> 0];
            _this["island" + i].info.text = zsLvlimit[0] + "\u8F6C-" + zsLvlimit[1] + "\u8F6C";
            _this["island" + i].info.textColor = zsLvlimit[0] <= UserZs.ins().lv && UserZs.ins().lv <= zsLvlimit[1] ? ColorUtil.GREEN : ColorUtil.RED;
            _this["island" + i].serverInfo.visible = false;
        }
        return _this;
    }
    KFBossWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.observe(KFBossSys.ins().postBossInfo, this.refData);
        this.observe(KFBossSys.ins().postBossRevive, this.refData);
        this.observe(KFBossRedpoint.ins().postRedPoint, this.refRedpoint);
        this.upCurState();
        KFBossSys.ins().sendBossInfo();
    };
    KFBossWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
    };
    KFBossWin.prototype.upCurState = function () {
        if (KFBossSys.ins().fbInfo[6])
            this.currentState = "6";
        else if (KFBossSys.ins().fbInfo[7])
            this.currentState = "7";
        else
            this.currentState = "5";
        this.refData();
        this.refRedpoint();
    };
    KFBossWin.prototype.refData = function () {
        this.flagTimes.text = KFBossSys.ins().flagTimes + "";
        this.bossTimes.text = KFBossSys.ins().bossTimes + "";
        for (var _i = 0, _a = KFBossSys.ins().fbInfo; _i < _a.length; _i++) {
            var info = _a[_i];
            if (!info)
                continue;
            var index = info.dpId;
            if (this["island" + index]) {
                var dp = GlobalConfig.CrossBossConfig[info.dpId];
                this["island" + index].serverInfo.visible = true;
                this["island" + index].headGroup.visible = false;
                this["island" + index].head.source = "";
                this["island" + index].name = info.dpId;
                this["island" + index].filters = [];
                if (info.serverId) {
                    this["island" + index].serverInfo.visible = true;
                    this["island" + index].serverName.text = "" + (info.serverId == LocationProperty.srvid ? "\u672C\u670D" : "S." + info.serverId + "\u670D");
                    if (info.serverId == LocationProperty.srvid) {
                        this["island" + index].headGroup.visible = true;
                        var roleData = SubRoles.ins().getSubRoleByIndex(0);
                        this["island" + index].head.source = "yuanhead" + roleData.job + roleData.sex;
                    }
                    else
                        this["island" + index].serverName.x = 13;
                }
                else
                    this["island" + index].serverInfo.visible = false;
            }
        }
        TimerManager.ins().remove(this.onTimer, this);
        TimerManager.ins().doTimer(1000, 0, this.onTimer, this);
        this.onTimer();
    };
    KFBossWin.prototype.onTimer = function () {
        for (var _i = 0, _a = KFBossSys.ins().fbInfo; _i < _a.length; _i++) {
            var info = _a[_i];
            if (!info)
                continue;
            if (info.bossRefTimer == 0)
                continue;
            var dp = GlobalConfig.CrossBossConfig[info.dpId];
            var t = (info.bossRefTimer - egret.getTimer()) / 1000 >> 0;
            var time = "";
            if (t > 0)
                time = "\n" + DateUtils.getFormatBySecond(t);
            this["island" + info.dpId].info.text = (dp.levelLimit[0] / 1000 >> 0) + "\u8F6C-" + (dp.levelLimit[1] / 1000 >> 0) + "\u8F6C" + time;
        }
    };
    KFBossWin.prototype.refRedpoint = function () {
        for (var _i = 0, _a = KFBossSys.ins().fbInfo; _i < _a.length; _i++) {
            var info = _a[_i];
            if (!info)
                continue;
            if (this["island" + info.dpId]) {
                this["island" + info.dpId].redPoint.visible = KFBossRedpoint.ins().redpoints[info.dpId];
            }
        }
    };
    KFBossWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.seeRule:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[34].text);
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            default:
                if (e.target instanceof eui.Component) {
                    var fbId = parseInt(e.target.name);
                    if (!fbId) {
                        UserTips.ins().showTips("|C:0xf3311e&T:\u6682\u672A\u5F00\u542F!");
                        return;
                    }
                    ViewManager.ins().open(KFBossShowWin, fbId);
                }
        }
    };
    KFBossWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var boo = KFBossSys.ins().isOpen();
        if (!boo)
            UserTips.ins().showTips("|C:0xf3311e&T:\u6761\u4EF6\u4E0D\u591F\uFF0C\u4E0D\u53EF\u8FDB\u5165");
        return boo;
    };
    __decorate([
        callLater
    ], KFBossWin.prototype, "refData", null);
    __decorate([
        callLater
    ], KFBossWin.prototype, "refRedpoint", null);
    return KFBossWin;
}(BaseEuiView));
__reflect(KFBossWin.prototype, "KFBossWin");
ViewManager.ins().reg(KFBossWin, LayerManager.UI_Main);
//# sourceMappingURL=KFBossWin.js.map