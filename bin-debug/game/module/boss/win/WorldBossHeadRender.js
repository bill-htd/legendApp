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
var WorldBossHeadRender = (function (_super) {
    __extends(WorldBossHeadRender, _super);
    function WorldBossHeadRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isAddEff = false;
        return _this;
    }
    WorldBossHeadRender.prototype.dataChanged = function () {
        this.haveGuildName(false);
        this.isAddEff = false;
        if (this.data instanceof CharMonster) {
            this.currentState = "war";
            this.updateChar(this.data);
        }
        else if (!isNaN(this.data)) {
            this.currentState = "war";
            if (this.data) {
                var charSource = EntityManager.ins().getEntityByHandle(this.data) || EntityManager.ins().getEntityBymasterhHandle(this.data);
                if (charSource)
                    this.updateChar(charSource);
                else if (KFBossSys.ins().isKFBossBattle && KFBossSys.ins().flagHandle == this.data) {
                    var flagConfig = GlobalConfig.MonstersConfig[GlobalConfig.CrossBossBase.flagId];
                    if (flagConfig && this.checkMonHead(flagConfig)) {
                        var t = KFBossSys.ins().flagCD - egret.getTimer();
                        var tStr = DateUtils.getFormatBySecond(t / 1000);
                        if (t <= 0) {
                            tStr = "";
                            this.haveGuildName(false);
                        }
                        else
                            this.haveGuildName(true);
                        var str = flagConfig.name + "\n|C:" + ColorUtil.RED + "&T:" + tStr + "|";
                        this.roleName.textFlow = TextFlowMaker.generateTextFlow1(str);
                        this.roleHead.source = "monhead" + flagConfig.head + "_png";
                        this.addAttEffect();
                    }
                }
                else if (KfArenaSys.ins().isKFArena && KfArenaSys.ins().flagHandle == this.data) {
                    var flagConfig = GlobalConfig.MonstersConfig[GlobalConfig.CrossArenaBase.flagBossId];
                    if (flagConfig && this.checkMonHead(flagConfig)) {
                        var t = KfArenaSys.ins().flagCD - egret.getTimer();
                        var tStr = DateUtils.getFormatBySecond(t / 1000);
                        if (t <= 0) {
                            tStr = "";
                            this.haveGuildName(false);
                        }
                        else
                            this.haveGuildName(true);
                        var str = flagConfig.name + "\n|C:" + ColorUtil.RED + "&T:" + tStr + "|";
                        this.roleName.textFlow = TextFlowMaker.generateTextFlow1(str);
                        this.roleHead.source = "monhead" + flagConfig.head + "_png";
                        this.addAttEffect();
                    }
                }
            }
            else {
                var bossConfig = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
                if (bossConfig && this.checkMonHead(bossConfig)) {
                    this.roleName.textFlow = new egret.HtmlTextParser().parser(bossConfig.name);
                    this.roleHead.source = "monhead" + bossConfig.head + "_png";
                    this.addAttEffect();
                }
            }
        }
        else if (this.data instanceof SelectInfoData) {
            this.currentState = "panel";
            this.num.textFlow = new egret.HtmlTextParser().parser(this.data.num + "份");
            this.roleName.textFlow = new egret.HtmlTextParser().parser(this.data.data.name);
            this.roleHead.source = "yuanhead" + this.data.data.job + this.data.data.sex;
        }
        if (!this.isAddEff) {
            this.removeAttEffect();
        }
    };
    WorldBossHeadRender.prototype.checkMonHead = function (config) {
        if (Assert(config.head, "\u602A\u7269\u5934\u50CF\u4E0D\u5B58\u5728\uFF0Cid:" + config.id + ",name:" + config.name))
            return false;
        return true;
    };
    WorldBossHeadRender.prototype.updateChar = function (charSource) {
        if (charSource instanceof CharRole) {
            var info = charSource.infoModel;
            if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
                var tname = info.name;
                if (info.type == EntityType.LadderPlayer) {
                    var strlist = tname.split("\n");
                    if (strlist[1])
                        tname = strlist[1];
                    else
                        tname = strlist[0];
                    tname = StringUtils.replaceStr(tname, "0xffffff", this.roleName.textColor + "");
                }
                this.roleName.textFlow = TextFlowMaker.generateTextFlow1(tname);
            }
            else {
                var guildName = info.guildName ? "\n<font color='#6495ed'>" + info.guildName + "</font>" : "";
                var str = DevildomSys.ins().isDevildomBattle && guildName ? info.name + guildName : info.getNameWithServer2();
                if (str.indexOf("\n") > -1) {
                    this.haveGuildName(true);
                }
                this.roleName.textFlow = new egret.HtmlTextParser().parser(str);
            }
            if (Assert(info.job, "\u4EFB\u52A1\u804C\u4E1A\u4E0D\u5B58\u5728\uFF0Cid:" + info.configID + ",name:" + info.name))
                return;
            this.roleHead.source = "yuanhead" + info.job + info.sex;
            if (this.checkIsCurrAttack(info.handle)) {
                this.addAttEffect();
            }
        }
        else {
            var monster = charSource;
            if (monster.infoModel.type == EntityType.Monster || (KFBossSys.ins().isKFBossBattle && monster.infoModel.type == EntityType.CollectionMonst)) {
                var config = GlobalConfig.MonstersConfig[monster.infoModel.configID];
                if (Assert(config, "\u602A\u7269\u914D\u7F6E\u627E\u4E0D\u5230 id:" + monster.infoModel.configID))
                    return;
                if (!this.checkMonHead(config))
                    return;
                this.roleName.textFlow = new egret.HtmlTextParser().parser(config.name);
                this.roleHead.source = "monhead" + config.head + "_png";
                if (this.checkIsCurrAttack(monster.infoModel.handle))
                    this.addAttEffect();
            }
        }
    };
    WorldBossHeadRender.prototype.checkIsCurrAttack = function (handle) {
        var curMasterHandle = EntityManager.ins().getRootMasterHandle(GameLogic.ins().currAttackHandle);
        return curMasterHandle == EntityManager.ins().getRootMasterHandle(handle);
    };
    WorldBossHeadRender.prototype.addAttEffect = function () {
        _super.prototype.addAttEffect.call(this);
        this.isAddEff = true;
    };
    return WorldBossHeadRender;
}(GuildWarMemberHeadRender));
__reflect(WorldBossHeadRender.prototype, "WorldBossHeadRender");
//# sourceMappingURL=WorldBossHeadRender.js.map