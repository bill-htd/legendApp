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
var GuildRedPoint = (function (_super) {
    __extends(GuildRedPoint, _super);
    function GuildRedPoint() {
        var _this = _super.call(this) || this;
        _this.hanghui = false;
        _this.sendReward = false;
        _this.redBag = false;
        _this.sczb = false;
        _this.hhdt = false;
        _this.gldt = false;
        _this.hhBoss = false;
        _this.dayReward = false;
        _this.guildFire = false;
        _this.roleTabs = {};
        _this.roleSkillTabs = {};
        _this.liangongRed = false;
        _this.roleTabs = {};
        _this.roleSkillTabs = {};
        _this.associated(_this.postDayReward, GuildWar.ins().postDayRewardInfo);
        _this.associated(_this.postSczb, _this.postDayReward, _this.postRedBag);
        _this.associated(_this.postSendReward, GuildWar.ins().postAssignsReward, GuildWar.ins().postSendRewardSuccess);
        _this.associated(_this.postRedBag, GuildWar.ins().postRedBagInfo);
        _this.associated(_this.postHhdt, Guild.ins().postApplyInfos, Guild.ins().postJoinGuild, Guild.ins().postMyGuildInfo, _this.postLianGongRedPoint, _this.postGldt);
        _this.associated(_this.postGldt, Guild.ins().postUpBuilding, Guild.ins().postManageList, Guild.ins().postGuildMoney, Guild.ins().postMyGuildInfo);
        _this.associated(_this.postHanghui, _this.postSendReward, _this.postSczb, _this.postHhdt, _this.postGuildFire, _this.postLianGongRedPoint, Actor.ins().postLevelChange, GuildFB.ins().postGuildFubenInfo, GuildRobber.ins().postGuildRobberInfo, GuildWar.ins().postGuildWarStarInfo, Guild.ins().postGuildInfo, _this.postHanghuiBoss);
        _this.associated(_this.postHanghuiBoss, GuildBoss.ins().postGuildBossDetailChange, GuildBoss.ins().postGuildBossInfoChange);
        _this.associated(_this.postGuildFire, UserBag.ins().postItemAdd, UserBag.ins().postItemDel, Guild.ins().postUpdateFire);
        _this.associated(_this.postLianGongRedPoint, Guild.ins().postLearnGuildSkill, Guild.ins().postUpBuilding, Guild.ins().postGuildSkillInfo, Guild.ins().postMyGuildInfo);
        return _this;
    }
    GuildRedPoint.prototype.postGuildFire = function () {
        var oldv = this.guildFire;
        var conf = GlobalConfig.GuildConfig;
        var item = UserBag.ins().getBagItemById(conf.bonfireItem);
        if (item && item.count >= (conf.bonfirecaution || 1)) {
            this.guildFire = true;
        }
        else {
            this.guildFire = false;
        }
        return this.guildFire != oldv;
    };
    GuildRedPoint.prototype.postHhdt = function () {
        var oldv = this.hhdt;
        this.hhdt = Guild.ins().hasApplys() || this.gldt;
        return this.hhdt != oldv;
    };
    GuildRedPoint.prototype.postGldt = function () {
        var oldv = this.gldt;
        this.gldt = Guild.ins().isUpGradeBuilding();
        return this.gldt != oldv;
    };
    GuildRedPoint.prototype.postDayReward = function () {
        var oldv = this.dayReward;
        this.dayReward = GuildWar.ins().getModel().canGetDay && !GuildWar.ins().getModel().getDayReward;
        return this.dayReward != oldv;
    };
    GuildRedPoint.prototype.postSczb = function () {
        var oldv = this.sczb;
        this.sczb = this.dayReward || this.redBag;
        return this.sczb != oldv;
    };
    GuildRedPoint.prototype.postRedBag = function () {
        var oldv = this.redBag;
        this.redBag = GuildWar.ins().getModel().isHaveRedBag();
        return this.redBag != oldv;
    };
    GuildRedPoint.prototype.postSendReward = function () {
        var oldv = this.sendReward;
        this.sendReward = GuildWar.ins().getModel().canSendReward;
        return this.sendReward != oldv;
    };
    GuildRedPoint.prototype.postHanghui = function () {
        var oldv = this.hanghui;
        var t = false;
        if (GuildFB.ins().hasbtn())
            t = true;
        if ((Guild.ins().guildID == undefined || Guild.ins().guildID == 0) && Actor.level > 69)
            t = true;
        this.hanghui = t ||
            this.sendReward ||
            this.redBag ||
            this.sczb ||
            this.hhBoss ||
            this.guildFire ||
            this.liangongRed ||
            GuildWar.ins().getModel().isWatStart ||
            this.hhdt;
        return this.hanghui != oldv;
    };
    GuildRedPoint.prototype.postHanghuiBoss = function () {
        var oldv = this.hhBoss;
        this.hhBoss = GuildBoss.ins().getBossRewardState() || GuildBoss.ins().getBossChallenge();
        return this.hhBoss != oldv;
    };
    GuildRedPoint.prototype.postLianGongRedPoint = function () {
        this.liangongRed = false;
        var tab = GuildRedPoint.Tab_LianGong;
        var len = SubRoles.ins().subRolesLen;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
            if (!role)
                continue;
            var roleSkillInfo = Guild.ins().getSkllInfoByIndex(role.index);
            if (!roleSkillInfo)
                continue;
            if (!this.roleTabs[tab])
                this.roleTabs[tab] = {};
            this.roleTabs[tab][roleIndex] = false;
            for (var selectSkillID = 1; selectSkillID <= 3; selectSkillID++) {
                if (!this.roleSkillTabs[roleIndex])
                    this.roleSkillTabs[roleIndex] = {};
                this.roleSkillTabs[roleIndex][selectSkillID] = false;
                var maxLevel = GlobalConfig.GuildCommonSkillConfig[selectSkillID].length;
                var level = roleSkillInfo.guildSkillInfo[selectSkillID - 1].level;
                if (level >= maxLevel)
                    continue;
                var csInfoNext = this.getCommonSkillDP(selectSkillID, level + 1);
                if (!csInfoNext)
                    continue;
                if (csInfoNext.contribute > Guild.ins().myCon) {
                    continue;
                }
                if (Actor.gold < csInfoNext.money) {
                    continue;
                }
                var buildLevel = Guild.ins().getBuildingLevels(GuildBuilding.GUILD_LIANGONGFANG - 1);
                var learnLab = (buildLevel < 1 || level >= GlobalConfig.GuildConfig.commonSkillLevels[buildLevel - 1]);
                if (learnLab) {
                    continue;
                }
                this.roleSkillTabs[roleIndex][selectSkillID] = true;
                this.liangongRed = true;
            }
            for (var r in this.roleSkillTabs[roleIndex]) {
                if (this.roleSkillTabs[roleIndex][r]) {
                    this.roleTabs[tab][roleIndex] = true;
                    break;
                }
            }
        }
    };
    GuildRedPoint.prototype.getCommonSkillDP = function (skillID, level) {
        var infos = GlobalConfig.GuildCommonSkillConfig[skillID];
        if (level == 0) {
            return infos[1];
        }
        for (var key in infos) {
            var element = infos[key];
            if (element.level == level)
                return element;
        }
        return null;
    };
    GuildRedPoint.Tab_LianGong = 0;
    return GuildRedPoint;
}(BaseSystem));
__reflect(GuildRedPoint.prototype, "GuildRedPoint");
var GameSystem;
(function (GameSystem) {
    var guildredpoint = GuildRedPoint.ins.bind(GuildRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GuildRedPoint.js.map