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
var GwBossView = (function (_super) {
    __extends(GwBossView, _super);
    function GwBossView() {
        var _this = _super.call(this) || this;
        _this.numToStr = ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94"];
        return _this;
    }
    GwBossView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.remindTpis.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.remindTpis.text + "</u></a>");
        this.remindTpis.touchEnabled = true;
    };
    GwBossView.prototype.open = function () {
        this.addTouchEvent(this.gw0, this.onTap);
        this.addTouchEvent(this.gw1, this.onTap);
        this.addTouchEvent(this.gw2, this.onTap);
        this.addTouchEvent(this.tower, this.onTap);
        this.remindTpis.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.observe(UserZs.ins().postZsLv, this.initData);
        this.observe(UserBoss.ins().postWorldBoss, this.onUpdateBoss);
        TimerManager.ins().doTimer(3000, 0, this.onUpdateTime, this);
        TimerManager.ins().doTimer(1000, 0, this.onUpdateDieTime, this);
        this.initData();
    };
    GwBossView.prototype.onUpdateTime = function () {
        UserBoss.ins().sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_GODWEAPON);
        UserBoss.ins().sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP);
    };
    GwBossView.prototype.onUpdateDieTime = function () {
        this.initData();
    };
    GwBossView.prototype.initData = function () {
        var gwList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_GODWEAPON].concat();
        gwList.sort(this.compareFn);
        var topList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP].concat();
        topList.sort(this.compareFn);
        var gwType = 0;
        for (var i = 0; i < gwList.length; i++) {
            var data = gwList[i];
            var config = GlobalConfig.WorldBossConfig[data.id];
            var infoTxt = "(" + config.zsLevel[0] + "\u8F6C-" + config.zsLevel[1] + "\u8F6C)";
            this["redPoint" + i].visible = false;
            gwType = config.type;
            if (data.canInto) {
                this.setGwState(i, 2);
                if (data.isDie) {
                    var time = data.relieveTime - egret.getTimer();
                    time = time < 0 ? 0 : time;
                    infoTxt += "\n" + DateUtils.getFormatBySecond(Math.floor(time / 1000), 1);
                }
                else {
                    this["redPoint" + i].visible = this.checkCanInto1(config.type) && UserBoss.ins().getBossRemindByIndex(data.id);
                }
            }
            else {
                this.setGwState(i, 0);
            }
            this["info" + i].text = infoTxt;
        }
        for (var i = 0; i < topList.length; i++) {
            var data = topList[i];
            var config = GlobalConfig.WorldBossConfig[data.id];
            var infoTxt = this.numToStr[i] + "\u5C42(" + config.zsLevel[0] + "\u8F6C-" + config.zsLevel[1] + "\u8F6C)";
            this["towerRedPoint" + i].visible = false;
            if (data.canInto) {
                this.setTopState(i, 2);
                if (data.isDie) {
                    var time = data.relieveTime - egret.getTimer();
                    time = time < 0 ? 0 : time;
                    infoTxt += "\n" + DateUtils.getFormatBySecond(Math.floor(time / 1000), 1);
                }
                else {
                    this["towerRedPoint" + i].visible = this.checkCanInto(config.type) && UserBoss.ins().getBossRemindByIndex(data.id);
                }
            }
            else {
                this.setTopState(i, 0);
            }
            this["towerInfo" + i].text = infoTxt;
        }
        this.leftTime.text = "\u4ECA\u65E5\u5269\u4F59\u5723\u57DF\u5F52\u5C5E\u6B21\u6570\uFF1A" + UserBoss.ins().worldBossBelongTime[gwType];
    };
    GwBossView.prototype.checkCanInto = function (type) {
        var needYb = GlobalConfig.WorldBossBaseConfig.challengeItemYb[type - 1];
        if (Actor.yb >= needYb)
            return true;
        var itemId = GlobalConfig.WorldBossBaseConfig.challengeItem[type - 1];
        var item = UserBag.ins().getBagGoodsByTypeAndId(0, itemId);
        if (item && item.count)
            return true;
        return false;
    };
    GwBossView.prototype.checkCanInto1 = function (type) {
        return UserBoss.ins().worldBossBelongTime[type] > 0;
    };
    GwBossView.prototype.setGwState = function (index, state) {
        var states = ['locked', 'normal', 'selected'];
        this["img" + index].source = "gw_field_" + states[state] + "_" + index;
        this["titleBg" + index].source = "gw_title_bg_" + (state == 0 ? 1 : 0);
        this["title" + index].source = "gw_title_" + (state == 0 ? "locked_" : "") + (index + 1);
        this["info" + index].textColor = state == 0 ? 0xA9A9A9 : 0x00FF00;
    };
    GwBossView.prototype.setTopState = function (index, state) {
        this["tower" + index].visible = state != 0;
        this["towerInfo" + index].textColor = state == 0 ? 0xA9A9A9 : 0x00FF00;
    };
    GwBossView.prototype.onUpdateBoss = function (_type) {
        if (_type == UserBoss.BOSS_SUBTYPE_GODWEAPON || _type == UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP) {
            this.initData();
        }
    };
    GwBossView.prototype.compareFn = function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        else {
            return 1;
        }
    };
    GwBossView.prototype.onLink = function () {
        ViewManager.ins().open(PubBossRemindWin, UserBoss.BOSS_SUBTYPE_GODWEAPON);
    };
    GwBossView.prototype.close = function () {
        this.removeTouchEvent(this.gw0, this.onTap);
        this.removeTouchEvent(this.gw1, this.onTap);
        this.removeTouchEvent(this.gw2, this.onTap);
        this.removeTouchEvent(this.tower, this.onTap);
        this.remindTpis.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    GwBossView.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.tower) {
            var gwList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP].concat();
            for (var _i = 0, gwList_1 = gwList; _i < gwList_1.length; _i++) {
                var data = gwList_1[_i];
                if (data.canInto) {
                    ViewManager.ins().open(GwBossChallengeView, data);
                }
            }
            return;
        }
        var index = this.getClickGwIndex(tar);
        if (index > -1) {
            var gwList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_GODWEAPON].concat();
            gwList.sort(this.compareFn);
            if (gwList[index].canInto) {
                var bossData = gwList[index];
                var config = GlobalConfig.WorldBossConfig[bossData.id];
                if (bossData.isDie) {
                    UserTips.ins().showTips("BOSS\u672A\u590D\u6D3B");
                }
                else if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                    ViewManager.ins().open(BagFullTipsWin, UserBag.BAG_ENOUGH);
                }
                else {
                    var endTime = Math.ceil((UserBoss.ins().worldBossCd[config.type] - egret.getTimer()) / 1000);
                    if (endTime > 0) {
                        UserTips.ins().showTips("|C:0xf3311e&T:\u51B7\u5374\u4E2D\uFF0C" + endTime + "\u79D2\u540E\u53EF\u8FDB\u884C\u6311\u6218|");
                        return false;
                    }
                    UserBoss.ins().sendChallengWorldBoss(bossData.id, config.type);
                }
            }
        }
        else {
            index = this.getClickTowerIndex(tar);
            if (index > -1) {
                var gwList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP].concat();
                gwList.sort(this.compareFn);
                if (gwList[index].canInto) {
                    ViewManager.ins().open(GwBossChallengeView, gwList[index]);
                }
            }
        }
    };
    GwBossView.prototype.getClickTowerIndex = function (tar) {
        for (var i = 0; i < 5; i++) {
            if (tar == this["tower" + i])
                return i;
        }
        return -1;
    };
    GwBossView.prototype.getClickGwIndex = function (tar) {
        for (var i = 0; i < 3; i++) {
            if (tar == this["gw" + i])
                return i;
        }
        return -1;
    };
    return GwBossView;
}(BaseView));
__reflect(GwBossView.prototype, "GwBossView");
//# sourceMappingURL=GwBossView.js.map