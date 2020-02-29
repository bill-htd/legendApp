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
var CharEncounter = (function (_super) {
    __extends(CharEncounter, _super);
    function CharEncounter() {
        var _this = _super.call(this) || this;
        _this.lastRunTime = 0;
        _this.atkTime = -1500;
        _this.atkCount = 0;
        _this.posCount = 0;
        _this.touchEnabled = false;
        _this._role = new CharRole;
        _this._role.touchEnabled = true;
        _this._monster = new CharMonster;
        _this._monster.x = _this.x + 30;
        _this._monster.y = _this.y + 30;
        _this._role.x = _this.x;
        _this._role.y = _this.y;
        return _this;
    }
    CharEncounter.prototype.autoAtk = function () {
        var _this = this;
        this.atkTime = egret.getTimer();
        this._role.stopMove();
        this.atkCount++;
        this._monster.dir = DirUtil.get8DirBy2Point(this._monster, this._role);
        this._role.AI_STATE = AI_State.Atk;
        var currTime = egret.getTimer();
        var inSleep = currTime - this.lastRunTime > 2000;
        this.lastRunTime = currTime;
        if (inSleep)
            return;
        var roleModel = this._role.infoModel;
        if (roleModel == undefined) {
            Log.trace("遭遇敌人自动攻击异常，本角色model为空");
            return;
        }
        this.skillData = SkillData.getSkillByJob(roleModel.job);
        if (Math.random() * 10 > 9 && this.atkCount > 2) {
            this.killMonster();
        }
        else {
            GameLogic.ins().playSkillEff(this.skillData, this._role, [this._monster]);
            this._monster.playAction(EntityAction.ATTACK);
            TimerManager.ins().doTimer(500, 1, function () {
                _this._monster.playAction(EntityAction.STAND);
            }, this);
        }
    };
    CharEncounter.prototype.showPk = function () {
        this._role.dir = 3;
        this._monster.y = this.y + 30;
        this._monster.x = this.x + 30;
        this.x = this._role.x;
        this.y = this._role.y;
        this._role.stopMove();
        TimerManager.ins().removeAll(this);
        TimerManager.ins().doTimer(1500, 0, this.waitAtk, this);
    };
    CharEncounter.prototype.waitAtk = function () {
        var _this = this;
        var roleModel = this._role.infoModel;
        if (roleModel == undefined) {
            Log.trace("遭遇敌人自动攻击异常，本角色model为空");
            return;
        }
        GameLogic.ins().playSkillEff(this.skillData, this._role, [this._monster]);
        this._monster.playAction(EntityAction.ATTACK);
        TimerManager.ins().doTimer(500, 1, function () {
            _this._monster.playAction(EntityAction.STAND);
        }, this);
    };
    CharEncounter.prototype.runToNewMonster = function () {
        if (this._role && this._role.infoModel) {
            this._monster.visible = true;
            this._role.infoModel.setAtt(AttributeType.atMoveSpeed, 3000);
            GameMap.moveEntity(this._role, this._monster.x, this._monster.y);
            this._role.AI_STATE = AI_State.Run;
        }
    };
    CharEncounter.prototype.killMonster = function () {
        if (!this._monster)
            return;
        this._role.AI_STATE = AI_State.Stand;
        this.posCount++;
        this._monster.visible = false;
        var len = UserFb.ins().encounterPos.length;
        var ran = Math.floor(Math.random() * len);
        var index = UserFb.ins().encounterPos.splice(ran, 1);
        this.atkCount = 0;
        UserFb.ins().encounterPos.push(this.posIndex);
        this.posIndex = index[0];
        var point = UserFb.ins().zyPos[index[0]];
        this._monster.x = point.x * GameMap.CELL_SIZE;
        this._monster.y = point.y * GameMap.CELL_SIZE;
        this._monster.playAction(EntityAction.STAND);
        this.atkTime = -1500;
    };
    CharEncounter.prototype.reach = function () {
        var dis = MathUtils.getDistance(this._monster.x, this._monster.y, this._role.x, this._role.y);
        return dis < 100;
    };
    CharEncounter.prototype.AI = function () {
        switch (this._role.AI_STATE) {
            case AI_State.Atk:
                if (egret.getTimer() - this.atkTime > 1500)
                    this.autoAtk();
                break;
            case AI_State.Stand:
                this.runToNewMonster();
                break;
            case AI_State.Run:
                if (this.reach())
                    this.autoAtk();
                else
                    this.runToNewMonster();
                break;
        }
    };
    CharEncounter.prototype.onTap = function (e) {
        if (EncounterModel.redName >= GlobalConfig.SkirmishBaseConfig.maxPkval) {
            UserTips.ins().showTips("PK\u503C\u5DF2\u6EE1\u65E0\u6CD5\u8FDB\u884CPK");
            return;
        }
    };
    CharEncounter.prototype.reset = function () {
        GameLogic.ins().addEntity(this._monster);
        GameLogic.ins().addEntity(this._role);
        this.atkCount = 0;
        this._role.AI_STATE = AI_State.Stand;
        this._role.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTap, this);
        TimerManager.ins().doTimer(100, 0, this.AI, this);
    };
    CharEncounter.prototype.destruct = function () {
        this._role.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTap, this);
        this._role.playAction(EntityAction.STAND);
        this._monster.playAction(EntityAction.STAND);
        TimerManager.ins().removeAll(this);
        DisplayUtils.removeFromParent(this);
        DisplayUtils.removeFromParent(this._role);
        DisplayUtils.removeFromParent(this._monster);
        UserFb.ins().encounterPos.push(this.posIndex);
        ObjectPool.push(this);
    };
    CharEncounter.prototype.setData = function (model) {
        this.infoModel = model;
        if (UserFb.ins().guanqiaID > -1) {
        }
        this._role.infoModel = model.subRole[0];
        this._role.playAction(EntityAction.STAND);
        this._role.updateBlood(true);
        this._role.showBlood(true);
        this._role.updateNeiGong();
        this._role.updateModel();
        this._role.setCharName(this.infoModel.name);
    };
    CharEncounter.prototype.setPosition = function (x, y) {
        this.x = this._role.x = x;
        this.y = this._role.y = y;
        this._monster.x = this.x + 30;
        this._monster.y = this.y + 30;
    };
    return CharEncounter;
}(egret.DisplayObjectContainer));
__reflect(CharEncounter.prototype, "CharEncounter", ["IChar"]);
//# sourceMappingURL=CharEncounter.js.map