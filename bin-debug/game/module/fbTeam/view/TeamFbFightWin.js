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
var TeamFbFightWin = (function (_super) {
    __extends(TeamFbFightWin, _super);
    function TeamFbFightWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "teamFbFightSkin";
        return _this;
    }
    TeamFbFightWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.teamFbMember.touchEnabled = false;
        this.teamFbMember.touchChildren = false;
        this.gonglveTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.gonglveTxt.text);
    };
    TeamFbFightWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.observe(UserFb.ins().postFbTime, this.setTime);
        TimerManager.ins().removeAll(this);
        TimerManager.ins().doTimer(1000, 0, this.update, this);
        this.setTime([UserFb.ins().curFbID, UserFb.ins().curFbLeftTime]);
        this.updateFbName();
        this.update();
    };
    TeamFbFightWin.prototype.close = function () {
    };
    TeamFbFightWin.prototype.updateFbName = function () {
        var cfg;
        for (var key in GlobalConfig.TeamFuBenConfig) {
            cfg = GlobalConfig.TeamFuBenConfig[key];
            if (cfg.fbid == GameMap.fubenID) {
                this.teamFbName.source = cfg.nameImg;
                this._roomID = cfg.id;
                break;
            }
        }
    };
    TeamFbFightWin.prototype.setTime = function (args) {
        TimerManager.ins().remove(this.updateLeftTime, this);
        if (GameMap.fbType == UserFb.FB_TEAM) {
            this._leftTime = args[1];
            this.updateLeftTime();
            TimerManager.ins().doTimer(1000, 0, this.updateLeftTime, this);
        }
    };
    TeamFbFightWin.prototype.updateLeftTime = function () {
        this.leftTimeTxt.text = DateUtils.getFormatBySecond(this._leftTime, DateUtils.TIME_FORMAT_5, 4);
        if (this._leftTime <= 0) {
            TimerManager.ins().remove(this.updateLeftTime, this);
            return;
        }
        this._leftTime--;
    };
    TeamFbFightWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.target1:
            case this.target2:
            case this.target3:
            case this.target4:
            case this.boss:
                if (e.target.data && e.target.data.infoModel) {
                    SysSetting.ins().setValue("mapClickTx", 0);
                    SysSetting.ins().setValue("mapClickTy", 0);
                    GameLogic.ins().postChangeAttrPoint(e.target.data.infoModel.handle);
                }
                break;
            case this.gonglveTxt:
                ViewManager.ins().open(TeamFbGuideWin, this._roomID);
                break;
        }
    };
    TeamFbFightWin.prototype.update = function () {
        var char;
        var roleList = EntityManager.ins().getAllEntity();
        var roleModel;
        var infoModel;
        var teamMembers = [];
        var teamRoles = [];
        var monsters = [];
        var boss;
        for (var i in roleList) {
            char = roleList[i];
            infoModel = char.infoModel;
            if (!infoModel)
                continue;
            if (infoModel.type == EntityType.Role) {
                roleModel = infoModel;
                if (roleModel.masterHandle != Actor.handle) {
                    var index = teamMembers.indexOf(roleModel.masterHandle);
                    if (index == -1) {
                        teamMembers.push(roleModel.masterHandle);
                        teamRoles[teamRoles.length] = [char];
                    }
                    else {
                        teamRoles[index].push(char);
                    }
                }
            }
            else if (infoModel.type == EntityType.Monster && infoModel.getAtt(AttributeType.atHp) > 0) {
                var monsterConfig = GlobalConfig.MonstersConfig[infoModel.configID];
                if (!monsterConfig)
                    continue;
                if (monsterConfig.type == 4 || monsterConfig.type == 3)
                    continue;
                var isBoss = monsterConfig.type == 1;
                if (!isBoss && !infoModel.masterHandle && monsters.length < 4)
                    monsters.push(char);
                if (isBoss)
                    boss = char;
            }
        }
        this.teamFbMember.visible = teamRoles.length > 0;
        var tLen = teamRoles.length;
        var item;
        for (var i = 0; i < 2; i++) {
            item = this["member" + (i + 1)];
            if (i + 1 <= tLen) {
                item.visible = true;
                item.data = teamRoles[i];
            }
            else
                item.visible = false;
        }
        var monster;
        var len = monsters.length;
        for (var i = 1; i < 5; i++) {
            monster = this["target" + i];
            if (i <= len) {
                this.teamFbTarget.addChild(monster);
                monster.data = monsters[i - 1];
            }
            else
                DisplayUtils.removeFromParent(monster);
        }
        if (boss) {
            this.boss.data = boss;
            this.teamFbTarget.addChildAt(this.boss, Math.ceil(this.teamFbTarget.numChildren / 2));
        }
        else
            DisplayUtils.removeFromParent(this.boss);
    };
    return TeamFbFightWin;
}(BaseEuiView));
__reflect(TeamFbFightWin.prototype, "TeamFbFightWin");
ViewManager.ins().reg(TeamFbFightWin, LayerManager.UI_Main);
//# sourceMappingURL=TeamFbFightWin.js.map