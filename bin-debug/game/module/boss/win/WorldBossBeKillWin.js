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
var WorldBossBeKillWin = (function (_super) {
    __extends(WorldBossBeKillWin, _super);
    function WorldBossBeKillWin() {
        var _this = _super.call(this) || this;
        _this.remainM = 0;
        return _this;
    }
    WorldBossBeKillWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossGoldSkin";
        this.aliveNum = 0;
    };
    WorldBossBeKillWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.reliveBtn, this.onTap);
        this.addTouchEvent(this.exitBtn, this.onTap);
        this.setWin();
    };
    WorldBossBeKillWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.reliveBtn, this.onTap);
        this.removeTouchEvent(this.exitBtn, this.onTap);
        ViewManager.ins().close(WorldBossCdWin);
    };
    WorldBossBeKillWin.prototype.setWin = function () {
        if (UserBoss.ins().killerHandler > 0) {
            var killer = EntityManager.ins().getEntityByHandle(UserBoss.ins().killerHandler);
            var str = "";
            if (killer) {
                if (killer instanceof CharRole) {
                    str = killer.infoModel.name;
                }
                else if (killer.infoModel.masterHandle) {
                    var killers = EntityManager.ins().getMasterList(EntityManager.ins().getRootMasterHandle(killer.infoModel.masterHandle));
                    if (killers && killers.length) {
                        for (var _i = 0, killers_1 = killers; _i < killers_1.length; _i++) {
                            var char = killers_1[_i];
                            if (char instanceof CharRole) {
                                str = "" + char.infoModel.name;
                                break;
                            }
                        }
                    }
                    if (!str) {
                        str = "" + killer.infoModel.name;
                    }
                }
                else {
                    str = "Boss" + killer.infoModel.name;
                }
            }
            this.killTips.textFlow = new egret.HtmlTextParser().parser("\u4F60\u88AB" + StringUtils.addColor("" + str, '#23C42A') + "\u51FB\u8D25");
            this.aliveNum = this.getAliveItem();
            this.alive.visible = this.aliveNum ? true : false;
            if (this.alive.visible)
                this.alive.text = "\u590D\u6D3B\u9053\u5177 " + this.aliveNum + "/1";
        }
        this.reliveBtn.label = UserBoss.ins().checkWorldBossNeed() + "\u539F\u5730\u590D\u6D3B";
        if (GameMap.fbType == UserFb.FB_TEAM) {
            this.reliveBtn.visible = false;
            this.moneyIcon.visible = false;
        }
        else {
            this.reliveBtn.visible = true;
            this.moneyIcon.visible = true;
        }
        this.reliveTimesTxt.text = UserBoss.ins().reliveTime + "秒";
        TimerManager.ins().remove(this.refushLabel, this);
        this.remainM = UserBoss.ins().reliveTime;
        TimerManager.ins().doTimer(1000, this.remainM, this.refushLabel, this, this.overTime, this);
        DieGuide.ins().postdieGuide(0);
    };
    WorldBossBeKillWin.prototype.getAliveItem = function () {
        if (BattleCC.ins().isBattle() || PaoDianCC.ins().isPaoDian)
            return 0;
        var itemId = CityCC.ins().isCity ? GlobalConfig.CityBaseConfig.rebornItem : GlobalConfig.WorldBossBaseConfig.rebornItem;
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, itemId);
        if (!item)
            return 0;
        return item.count;
    };
    WorldBossBeKillWin.prototype.refushLabel = function () {
        this.remainM--;
        this.reliveTimesTxt.text = this.remainM + "秒";
    };
    WorldBossBeKillWin.prototype.overTime = function () {
        ViewManager.ins().close(this);
        ViewManager.ins().close(WorldBossCdWin);
    };
    WorldBossBeKillWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    WorldBossBeKillWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.reliveBtn:
                if (this.aliveNum) {
                    UserBoss.ins().sendClearCD();
                    return;
                }
                if (UserBoss.ins().checkWorldBossMoney())
                    UserBoss.ins().sendClearCD();
                else {
                    UserTips.ins().showTips("元宝不足，无法立即复活");
                }
                break;
            case this.exitBtn:
                UserFb.ins().sendExitFb();
                break;
        }
    };
    return WorldBossBeKillWin;
}(BaseEuiView));
__reflect(WorldBossBeKillWin.prototype, "WorldBossBeKillWin");
ViewManager.ins().reg(WorldBossBeKillWin, LayerManager.UI_Popup);
//# sourceMappingURL=WorldBossBeKillWin.js.map