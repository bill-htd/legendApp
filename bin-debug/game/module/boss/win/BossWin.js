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
var BossWin = (function (_super) {
    __extends(BossWin, _super);
    function BossWin() {
        var _this = _super.call(this) || this;
        _this.lastIndex = 0;
        _this.skinName = "BossSkin";
        _this.isTopLevel = true;
        return _this;
    }
    BossWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.redPoint2.visible = false;
        if (UserBoss.ins().checkShenyuOpen()) {
            this.redPoints = [];
            for (var i = 0; i < 5; i++) {
                this.redPoints.push(this["redPoint" + i]);
            }
            if (!this.shenyuBoss.parent) {
                this.viewStack.addChildAt(this.shenyuBoss, 3);
            }
        }
        else {
            this.redPoints = [];
            for (var i = 0; i < 5; i++) {
                (i != 3) && this.redPoints.push(this["redPoint" + i]);
            }
            if (this.shenyuBoss.parent) {
                this.viewStack.removeChild(this.shenyuBoss);
            }
        }
        this.validateNow();
        var redPointGap = 112;
        var len = this.viewStack.numChildren;
        var startHor = -180;
        if (len == 4)
            startHor = -125;
        for (var i = 0; i < len; i++) {
            if (i == 0)
                this.redPoints[i].horizontalCenter = startHor;
            else
                this.redPoints[i].horizontalCenter = this.redPoints[i - 1].horizontalCenter + redPointGap;
        }
    };
    BossWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        UserBoss.ins().init();
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this, this.onTap);
        this.addTouchEvent(this.seeRule, this.onTap);
        this.addChangeEvent(this.tab, this.setSelectedIndex);
        this.addChangingEvent(this.tab, this.checkIsOpen);
        this.observe(UserBoss.ins().postWorldBoss, this.updateRedPoint);
        this.observe(UserFb.ins().postUpDataInfo, this.updatePanel);
        this.observe(UserFb.ins().postUpDataInfo, this.updateRedPoint);
        if (param[0] == undefined) {
            var tempArr = UserBoss.ins().getListData()[0];
            if (tempArr.length == 0) {
                param[0] = 1;
            }
        }
        this.lastSelect = param.length ? param[0] : 0;
        if (this.lastSelect > this.viewStack.numChildren - 1) {
            this.lastSelect = this.viewStack.numChildren - 1;
        }
        this.viewStack.selectedIndex = this.lastSelect;
        this.tab.selectedIndex = this.lastSelect;
        this.viewStack.getElementAt(this.lastSelect)['open'](param[1]);
        this.updateRedPoint();
        ViewManager.ins().close(GuildMap);
        ViewManager.ins().close(GuildActivityWin);
        ViewManager.ins().close(TreasureHuntWin);
        this.checkHelpBtn();
    };
    BossWin.prototype.updatePanel = function () {
        this.viewStack.getElementAt(this.lastSelect)['close']();
        this.lastSelect = this.viewStack.selectedIndex;
        this.viewStack.getElementAt(this.lastSelect)['open']();
        this.checkHelpBtn();
    };
    BossWin.prototype.setSelectedIndex = function (e) {
        this.viewStack.getElementAt(this.lastSelect)['close']();
        this.lastSelect = this.viewStack.selectedIndex;
        this.viewStack.getElementAt(this.lastSelect)['open']();
        this.checkHelpBtn();
    };
    BossWin.prototype.checkHelpBtn = function () {
        if (UserBoss.ins().checkShenyuOpen()) {
            if (this.lastSelect == 3) {
                this.seeRule.visible = false;
            }
            else {
                this.seeRule.visible = true;
            }
        }
        else {
            this.seeRule.visible = true;
        }
    };
    BossWin.prototype.updateRedPoint = function () {
        this.redPoint0.visible = UserFb.isCanChallenge();
        this.redPoint1.visible = UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_QMBOSS);
        this.redPoint2.visible = UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_WORLDBOSS) || UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_DARKBOSS);
        this.redPoint3.visible = UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_SHENYU);
        this.redPoint4.visible = UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_HOMEBOSS);
    };
    BossWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.viewStack.getElementAt(this.lastSelect)['close']();
    };
    BossWin.prototype.onLink = function (e) {
        var _this = this;
        var cost = GlobalConfig.WorldBossBaseConfig.clearCdCost[UserBoss.ins().currBossSubType - 1];
        WarnWin.show("\u786E\u5B9A\u6D88\u8017<font color='#ffff00'>" + cost + "\u5143\u5B9D\u7ACB\u5373\u6E05\u9664\u6311\u6218CD", function () {
            ViewManager.ins().close(_this);
            UserBoss.ins().sendClearCD();
        }, this);
    };
    BossWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.seeRule:
                if (this.viewStack.selectedIndex == 4) {
                    ViewManager.ins().open(ZsBossRuleSpeak, 12);
                }
                else if (this.viewStack.selectedIndex == 3 && !UserBoss.ins().checkShenyuOpen()) {
                }
                else {
                    ViewManager.ins().open(ZsBossRuleSpeak, this.viewStack.selectedIndex + 1);
                }
                break;
            default:
                if (e.target instanceof eui.Button) {
                    var config = e.target.parent['config'];
                    switch (e.target.name) {
                        case "publicChallenge":
                            return;
                        case "homeChallenge":
                            if (UserFb.ins().checkInFB())
                                return;
                            if (config.zsLevel <= UserZs.ins().lv && config.level <= Actor.level) {
                                if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                                    ViewManager.ins().open(BagFullTipsWin, UserBag.BAG_ENOUGH);
                                }
                                else {
                                    var endTime = Math.ceil((UserBoss.ins().worldBossCd[UserBoss.BOSS_SUBTYPE_HOMEBOSS] - egret.getTimer()) / 1000);
                                    if (endTime > 0) {
                                        UserTips.ins().showTips("|C:0xf3311e&T:\u51B7\u5374\u4E2D\uFF0C" + endTime + "\u79D2\u540E\u53EF\u8FDB\u884C\u6311\u6218|");
                                        return;
                                    }
                                    UserBoss.ins().sendChallengWorldBoss(e.target.parent.data.id, UserBoss.BOSS_SUBTYPE_HOMEBOSS);
                                    ViewManager.ins().close(this);
                                }
                            }
                            else {
                                UserTips.ins().showTips("|C:0xf3311e&T:等级不足，无法挑战|");
                            }
                            break;
                        case "ZsBoss":
                            break;
                    }
                    ViewManager.ins().close(LimitTaskView);
                }
        }
    };
    BossWin.prototype.checkIsOpen = function (e) {
        var tab = e.target;
        var zsLv = 1;
        ViewManager.ins().close(LimitTaskView);
        if (tab.selectedIndex == 2 && UserZs.ins().lv < zsLv) {
            UserTips.ins().showTips(zsLv + "\u8F6C\u5F00\u542F");
            e.$cancelable = true;
            e.preventDefault();
            return;
        }
    };
    BossWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_WORLDBOSS] && !UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_QMBOSS]) {
            UserTips.ins().showTips("\u7F51\u7EDC\u4E0D\u4F73\uFF0C\u8BF7\u7A0D\u540E");
            return false;
        }
        if (param && param.length) {
            if (param[0] == 2) {
                var zsLv = 1;
                if (UserZs.ins().lv < zsLv) {
                    UserTips.ins().showTips(zsLv + "\u8F6C\u5F00\u542F");
                    return false;
                }
                return true;
            }
            else if (param[0] == 4) {
                if (!UserBoss.ins().checkShenyuOpen()) {
                    UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.WorldBossBaseConfig.shenyuOpenDay + "\u5929\u5F00\u542F");
                    return false;
                }
            }
        }
        if (OpenSystem.ins().checkSysOpen(SystemType.BOSS)) {
            if (!FbWin.isClose)
                ViewManager.ins().close(LiLianWin);
            FbWin.isClose = false;
            return true;
        }
        else {
            UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.BOSS));
            return false;
        }
    };
    return BossWin;
}(BaseEuiView));
__reflect(BossWin.prototype, "BossWin");
ViewManager.ins().reg(BossWin, LayerManager.UI_Main);
//# sourceMappingURL=BossWin.js.map