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
var KFBossReliveWin = (function (_super) {
    __extends(KFBossReliveWin, _super);
    function KFBossReliveWin() {
        var _this = _super.call(this) || this;
        _this.remainM = 0;
        return _this;
    }
    KFBossReliveWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossGoldSkin";
        this.aliveNum = 0;
    };
    KFBossReliveWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.reliveBtn, this.onRelive);
        this.addTouchEvent(this.exitBtn, this.onTap);
        this.setWin(param[0], param[1]);
    };
    KFBossReliveWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        ViewManager.ins().close(WorldBossCdWin);
    };
    KFBossReliveWin.prototype.setWin = function (cd, killerHandler) {
        if (killerHandler > 0) {
            var killer = EntityManager.ins().getEntityByHandle(killerHandler);
            var str = "";
            if (killer) {
                var masterKiller = EntityManager.ins().getEntityByHandle(killer.infoModel.masterHandle);
                if (killer instanceof CharRole) {
                    str = killer.infoModel.name;
                }
                else if (killer.infoModel.masterHandle && masterKiller) {
                    str = "" + masterKiller.infoModel.name;
                }
                else {
                    str = "Boss" + killer.infoModel.name;
                }
            }
            this.killTips.textFlow = TextFlowMaker.generateTextFlow1("\u4F60\u88AB|C:" + 0x23C42A + "&T:" + str + "|\u51FB\u8D25");
            this.alive.visible = false;
            if (this.alive.visible)
                this.alive.text = "\u590D\u6D3B\u9053\u5177 " + this.aliveNum + "/1";
        }
        this.reliveBtn.label = GlobalConfig.CrossBossBase.rebornCost + "\u539F\u5730\u590D\u6D3B";
        this.reliveTimesTxt.text = cd + "秒";
        TimerManager.ins().remove(this.refushLabel, this);
        this.remainM = cd;
        TimerManager.ins().doTimer(1000, this.remainM, this.refushLabel, this, this.overTime, this);
    };
    KFBossReliveWin.prototype.refushLabel = function () {
        this.remainM--;
        this.reliveTimesTxt.text = this.remainM + "秒";
    };
    KFBossReliveWin.prototype.overTime = function () {
        ViewManager.ins().close(this);
        ViewManager.ins().close(WorldBossCdWin);
    };
    KFBossReliveWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    KFBossReliveWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.exitBtn:
                UserFb.ins().sendExitFb();
                break;
        }
    };
    KFBossReliveWin.prototype.onRelive = function (e) {
        if (this.aliveNum) {
            KFBossSys.ins().sendClearReliveCD();
            return;
        }
        if (GlobalFun.checkMoney(GlobalConfig.CrossBossBase.rebornCost, MoneyConst.yuanbao, "\u5143\u5B9D\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u7ACB\u5373\u590D\u6D3B"))
            KFBossSys.ins().sendClearReliveCD();
    };
    return KFBossReliveWin;
}(BaseEuiView));
__reflect(KFBossReliveWin.prototype, "KFBossReliveWin");
ViewManager.ins().reg(KFBossReliveWin, LayerManager.UI_Popup);
//# sourceMappingURL=KFBossReliveWin.js.map