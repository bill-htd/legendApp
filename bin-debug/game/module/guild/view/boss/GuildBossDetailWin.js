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
var GuildBossDetailWin = (function (_super) {
    __extends(GuildBossDetailWin, _super);
    function GuildBossDetailWin() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "GuildBossTipSkin";
        _this.isTopLevel = true;
        return _this;
    }
    GuildBossDetailWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    GuildBossDetailWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    GuildBossDetailWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.index = param[0];
        this.addTouchEvent(this.chanllage, this.onTap);
        this.addTouchEvent(this.chanllageOme, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.rankBtn, this.onTap);
        this.observe(GuildBoss.ins().postGuildBossDetailChange, this.setView);
        this.observe(GuildBoss.ins().postGuildBossInfoChange, this.upInfo);
        this.observe(GuildBoss.ins().postChallengeSuccess, this.challengeSuccess);
        this.observe(GuildBoss.ins().postGuildBossRankInfoChange, this.setRank);
        this.upInfo();
        GuildBoss.ins().sendGetBossRankInfo(this.index + 1);
    };
    GuildBossDetailWin.prototype.upInfo = function () {
        GuildBoss.ins().sendGetBossInfo();
    };
    GuildBossDetailWin.prototype.setView = function () {
        this.chanllagecount.text = "\u6311\u6218\u6B21\u6570" + GuildBoss.ins().leftTimes + "/" + GlobalConfig.GuildBossConfig.dayTimes;
        var id = GuildBoss.ins().passId;
        this.chanllagecount.visible = GuildBoss.ins().isOpen() && (id == this.index);
        this.chanllage.visible = GuildBoss.ins().isOpen() && (this.index <= id);
        this.cantchanllage.visible = GuildBoss.ins().isOpen() && !this.chanllage.visible;
        var config = GlobalConfig.GuildBossInfoConfig[this.index + 1];
        var bossConfig = GlobalConfig.MonstersConfig[config.boss["monId"]];
        this.bossname.text = bossConfig.name;
        this.bossImage.source = config.ShowImg;
        var state = GuildBoss.ins().passRecord[this.index + 1];
        for (var i = 0; i < config.passAwards.length; i++) {
            this["itemicon" + i].isShowName(false);
            this["itemicon" + i].data = config.passAwards[i];
        }
        var rewardConfig = GlobalConfig.GuildBossHpAwardsConfig[this.index + 1];
        for (var i = 3; i < 7; i++) {
            this["itemicon" + i].isShowName(false);
            this["itemicon" + i].data = rewardConfig[i - 2].awards[0];
        }
        if (this.index < id) {
            this.bosshp.value = 0;
            this.bosshp.maximum = 0;
            this.rewardBar.value = 100;
            this.rewardBar.maximum = 100;
        }
        else if (this.index == id) {
            var selfValue = 0;
            selfValue = Math.ceil(((bossConfig.hp - GuildBoss.ins().bossHP) / bossConfig.hp) * 10000) / 100 >> 0;
            this.bosshp.maximum = 100;
            this.bosshp.value = selfValue;
            this.rewardBar.value = 100 - selfValue;
            this.rewardBar.maximum = 100;
        }
        else {
            this.bosshp.value = 100;
            this.bosshp.maximum = 100;
            this.rewardBar.value = 0;
            this.rewardBar.maximum = 100;
        }
        this.chanllage.enabled = true;
        this.chanllage.x = 166;
        this.chanllageOme.visible = false;
        if (state == 0 || this.bosshp.value) {
            if (Guild.ins().guildLv >= GlobalConfig.GuildBossConfig.radisLv && this.chanllage.visible) {
                this.chanllageOme.visible = true;
                this.chanllage.x = 54;
            }
        }
        else if (state == 1) {
            this.chanllage.label = "领 取";
        }
        else {
            this.chanllage.label = "已领取";
            this.chanllage.enabled = false;
        }
        this.state.visible = !GuildBoss.ins().isOpen();
        if (this.state.visible) {
            this.cantchanllage.visible = this.chanllageOme.visible = this.chanllage.visible = false;
        }
    };
    GuildBossDetailWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.chanllageOme:
            case this.chanllage:
                if (GuildBoss.ins().passRecord[this.index + 1] == 0 || this.bosshp.value) {
                    if (GuildBoss.ins().challengeTime > GameServer.serverTime) {
                        UserTips.ins().showTips("|C:0x35e62d&T:正在挑战中，请稍后|");
                        return;
                    }
                    if (GuildBoss.ins().leftTimes <= 0) {
                        UserTips.ins().showTips("没有挑战次数");
                        return;
                    }
                    GuildBoss.ins().sendChallengeBoss(e.currentTarget == this.chanllageOme ? 1 : 0);
                }
                else if (this.chanllage.label == "领 取") {
                    GuildBoss.ins().sendGetBossReward(this.index + 1);
                }
                break;
            case this.rankBtn:
                ViewManager.ins().open(GuildBossRankWin, this.index);
                break;
            case this.bgClose:
                ViewManager.ins().close(GuildBossDetailWin);
                break;
        }
    };
    GuildBossDetailWin.prototype.challengeSuccess = function () {
        ViewManager.ins().close(GuildBossWin);
        ViewManager.ins().close(GuildMap);
        ViewManager.ins().close(GuildBossDetailWin);
    };
    GuildBossDetailWin.prototype.setRank = function () {
        var rankArr = GuildBoss.ins().guildRankDic[this.index + 1];
        var config = GlobalConfig.GuildBossInfoConfig[this.index + 1];
        var bossConfig = GlobalConfig.MonstersConfig[config.boss["monId"]];
        for (var i = 0; i < 3; i++) {
            if (rankArr && rankArr[i]) {
                this["rankGroup" + i].visible = true;
                this["guildname" + i].text = rankArr[i].name;
                var selfValue = 0;
                var perCount = Math.ceil((rankArr[i].damage / bossConfig.hp) * 10000) / 100;
                selfValue = perCount > 100 ? 100 : perCount;
                this["hpbar" + i].value = selfValue;
                this["hpbar" + i].maximum = 100;
                this["bosshpbg" + i].visible = this["hpbar" + i].visible = true;
            }
            else {
                this["bosshpbg" + i].visible = this["hpbar" + i].visible = false;
            }
        }
    };
    return GuildBossDetailWin;
}(BaseEuiView));
__reflect(GuildBossDetailWin.prototype, "GuildBossDetailWin");
ViewManager.ins().reg(GuildBossDetailWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildBossDetailWin.js.map