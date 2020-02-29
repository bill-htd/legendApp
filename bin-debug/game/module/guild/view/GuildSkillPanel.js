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
var GuildSkillPanel = (function (_super) {
    __extends(GuildSkillPanel, _super);
    function GuildSkillPanel() {
        var _this = _super.call(this) || this;
        _this.selectBmpX = [0, 34, 165, 293];
        _this.selectBmpY = [0, 239, 13, 239];
        _this.curRole = 0;
        _this.selectIconID = 2;
        return _this;
    }
    GuildSkillPanel.prototype.childrenCreated = function () {
        this.learnLab.textFlow = (new egret.HtmlTextParser).parser("\u65E0\u6CD5\u5347\u7EA7\u6280\u80FD\uFF0C\u8BF7\u5148\u63D0\u5347\u7EC3\u529F\u623F\u7B49\u7EA7  <a href=\"event:\"><font color='#0FEE27'><u>\u524D\u5F80\u63D0\u5347</u></font></a>");
    };
    GuildSkillPanel.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var rtn = (Guild.ins().guildID != 0);
        if (!rtn) {
            UserTips.ins().showTips("还未加入公会！");
        }
        return rtn;
    };
    GuildSkillPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.praBtn, this.onTap);
        this.addTouchEvent(this.skillBmp1, this.onTap);
        this.addTouchEvent(this.skillBmp2, this.onTap);
        this.addTouchEvent(this.skillBmp3, this.onTap);
        this.learnLab.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.observe(Guild.ins().postGuildSkillInfo, this.update);
        this.observe(Guild.ins().postMyGuildInfo, this.updateMyInfo);
        this.observe(GameLogic.ins().postSubRoleChange, this.updateRole);
        this.observe(Guild.ins().postGuildInfo, this.update);
        this.observe(GuildRedPoint.ins().postLianGongRedPoint, this.updateRedPoint);
        Guild.ins().sendGuildSkillInfo();
        Guild.ins().sendMyGuildInfo();
        this.praBtnMc.touchEnabled = false;
        this.update();
    };
    GuildSkillPanel.prototype.close = function () {
    };
    GuildSkillPanel.prototype.updateRedPoint = function () {
        if (!GuildRedPoint.ins().roleSkillTabs[this.curRole]) {
            GuildRedPoint.ins().roleSkillTabs[this.curRole] = {};
            GuildRedPoint.ins().roleSkillTabs[this.curRole][1] = false;
            GuildRedPoint.ins().roleSkillTabs[this.curRole][2] = false;
            GuildRedPoint.ins().roleSkillTabs[this.curRole][3] = false;
        }
        this.redPoint1.visible = GuildRedPoint.ins().roleSkillTabs[this.curRole][1];
        this.redPoint2.visible = GuildRedPoint.ins().roleSkillTabs[this.curRole][2];
        this.redPoint3.visible = GuildRedPoint.ins().roleSkillTabs[this.curRole][3];
        this.updateMc();
    };
    GuildSkillPanel.prototype.onLink = function () {
        ViewManager.ins().open(GuildWin, 1);
    };
    GuildSkillPanel.prototype.updateRole = function () {
        Guild.ins().sendGuildSkillInfo();
    };
    GuildSkillPanel.prototype.updateMyInfo = function () {
        this.praCon.text = "" + Guild.ins().myCon;
    };
    GuildSkillPanel.prototype.update = function (roleId) {
        if (roleId === void 0) { roleId = -1; }
        this.curRole = roleId > -1 ? roleId : this.curRole;
        this.updateMyInfo();
        this.updateRedPoint();
        this.selectSkill(this.selectIconID);
    };
    GuildSkillPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.skillBmp1:
                this.selectSkill(1);
                this.selectSkillBmp.source = 'guildskill_1';
                break;
            case this.skillBmp2:
                this.selectSkill(2);
                this.selectSkillBmp.source = 'guildskill_2';
                break;
            case this.skillBmp3:
                this.selectSkill(3);
                this.selectSkillBmp.source = 'guildskill_3';
                break;
            case this.praBtn:
                this.learnBtnOnClick();
                break;
        }
    };
    GuildSkillPanel.prototype.learnBtnOnClick = function () {
        var roleSkillInfo = Guild.ins().getSkllInfoByIndex(this.curRole);
        if (Assert(roleSkillInfo.guildSkillInfo[this.selectSkillID - 1], "\u884C\u4F1A\u6280\u80FD\u5B66\u4E60\u62A5\u9519 curRole:" + this.curRole + ",selectSkillID:" + this.selectSkillID)) {
            return;
        }
        var level = roleSkillInfo.guildSkillInfo[this.selectSkillID - 1].level;
        var buildLevel = Guild.ins().getBuildingLevels(GuildBuilding.GUILD_LIANGONGFANG - 1);
        var maxLevel = GlobalConfig.GuildCommonSkillConfig[this.selectSkillID].length;
        var csInfoNext = level >= maxLevel ? null : this.getCommonSkillDP(this.selectSkillID, level + 1);
        if (buildLevel == 0 || level >= GlobalConfig.GuildConfig.commonSkillLevels[buildLevel - 1]) {
            UserTips.ins().showTips("达到上限，请先提升练功房");
            return;
        }
        if (csInfoNext.contribute > Guild.ins().myCon) {
            UserTips.ins().showTips("贡献不足");
            return;
        }
        else if (Actor.gold < csInfoNext.money) {
            UserTips.ins().showTips("金币不足");
            return;
        }
        Guild.ins().sendLearnGuildSkill(this.curRole, this.selectSkillID);
    };
    GuildSkillPanel.prototype.selectSkill = function (selectId) {
        this.selectIconID = selectId;
        this.selectBmp.x = this.selectBmpX[selectId];
        this.selectBmp.y = this.selectBmpY[selectId];
        this.selectPraSkill(selectId);
    };
    GuildSkillPanel.prototype.getTotalPower = function () {
        var roleSkillInfo = Guild.ins().getSkllInfoByIndex(this.curRole);
        var power = 0;
        for (var i = 1; i < 4; i++) {
            var level = roleSkillInfo.guildSkillInfo[this.selectSkillID - 1].level;
            if (level > 0) {
                var csInfoNext = this.getCommonSkillDP(i, level);
                power += UserBag.getAttrPower(csInfoNext.attrs);
            }
        }
        return power;
    };
    GuildSkillPanel.prototype.selectPraSkill = function (selectId) {
        this.praGroup.visible = true;
        this.selectSkillID = selectId;
        this.selectSkillType = 1;
        var roleSkillInfo = Guild.ins().getSkllInfoByIndex(this.curRole);
        if (!roleSkillInfo)
            return;
        var level = roleSkillInfo.guildSkillInfo[this.selectSkillID - 1].level;
        var csInfo = this.getCommonSkillDP(this.selectSkillID, level);
        var maxLevel = this.getCommonSkillLength(this.selectSkillID);
        var buildLevel = Guild.ins().getBuildingLevels(GuildBuilding.GUILD_LIANGONGFANG - 1);
        this.praCurBase.textColor = level == 0 ? 0x72D70B : 0xDEDDD0;
        this.praCurBase.text = level == 0 ? "未学习" : AttributeData.getAttStr(csInfo.attrs, 0, 1, "：", true);
        this.praName.text = GlobalConfig.GuildConfig.commonSkillNames[this.selectSkillID - 1];
        this.learnLab.visible = (buildLevel < 1 || level >= GlobalConfig.GuildConfig.commonSkillLevels[buildLevel - 1]);
        this.praBtn.visible = !this.learnLab.visible;
        if (level < maxLevel) {
            var csInfoNext = this.getCommonSkillDP(this.selectSkillID, level + 1);
            this.praNextLab.text = AttributeData.getAttStr(csInfoNext.attrs, 0, 1, "：", true);
            var colorStr = Guild.ins().myCon >= csInfoNext.contribute ? "DEDDD0" : "f3311e";
            var temp = "<font color='#" + colorStr + "'>" + csInfoNext.contribute + "</font>";
            this.praCost.textFlow = (new egret.HtmlTextParser()).parser(temp);
            this.praCost0.text = csInfoNext.money + "";
            this.praCost0.textColor = Actor.gold >= csInfoNext.money ? 0xDEDDD0 : 0xf3311e;
            this.updateMc();
        }
        else {
            this.praNextLab.text = "已满级";
            this.praCost.text = "0";
            this.praCost0.text = "0";
            this.praCost0.textColor = 0xDEDDD0;
            DisplayUtils.removeFromParent(this.mc);
        }
        this.lvTxt.text = "\u7B49\u7EA7" + level;
    };
    GuildSkillPanel.prototype.updateMc = function () {
        if (!GuildRedPoint.ins().roleSkillTabs[this.curRole][this.selectSkillID] || this.learnLab.visible) {
            DisplayUtils.removeFromParent(this.mc);
            return;
        }
        if (!this.mc)
            this.mc = new MovieClip;
        if (!this.mc.parent) {
            this.mc.x = this.praBtnMc.width / 2;
            this.mc.y = this.praBtnMc.height / 2;
            this.praBtnMc.addChild(this.mc);
        }
        this.mc.playFile(RES_DIR_EFF + "chargeff1", -1);
    };
    GuildSkillPanel.prototype.getCommonSkillDP = function (skillID, level) {
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
    GuildSkillPanel.prototype.getCommonSkillLength = function (skillId) {
        var infos = GlobalConfig.GuildCommonSkillConfig[skillId];
        var len = 0;
        for (var key in infos) {
            len++;
        }
        return len;
    };
    return GuildSkillPanel;
}(BaseComponent));
__reflect(GuildSkillPanel.prototype, "GuildSkillPanel");
//# sourceMappingURL=GuildSkillPanel.js.map