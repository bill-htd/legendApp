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
var CharMonster = (function (_super) {
    __extends(CharMonster, _super);
    function CharMonster() {
        var _this = _super.call(this) || this;
        _this.AI_STATE = AI_State.Stand;
        _this.filterDic = {};
        _this.publicCD = 0;
        _this.nextPatrolTick = 0;
        _this.myKill = false;
        _this.isShowBody = true;
        _this.canMove = false;
        _this.moveRange = -1;
        _this.moveLimTime = -1;
        _this.moveMaxTime = -1;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        _this.buffList = {};
        _this.buffEff = {};
        _this.damageOverTimeList = {};
        _this.createTweenObj();
        _this.effs = {};
        _this.addShadow();
        _this._hpBar = new eui.ProgressBar();
        _this._hpBar.skinName = "bloodBarSkin";
        _this._hpBar.anchorOffsetY = 0;
        _this._hpBar.labelDisplay.size = 14;
        _this._hpBar.visible = false;
        _this._hpBar.labelDisplay.visible = false;
        _this._hpBar.labelFunction = function () { return ''; };
        _this.titleCantainer.addChild(_this._hpBar);
        _this._hpBar.anchorOffsetX = (_this._hpBar.width >> 1);
        _this._nameGroup = new eui.Group();
        _this._nameGroup.touchEnabled = false;
        _this._nameGroup.height = 30;
        _this._nameGroup.width = 260;
        _this._nameGroup.anchorOffsetY = Math.floor(_this._nameGroup.height + 2);
        _this._nameGroup.anchorOffsetX = Math.floor(_this._nameGroup.width >> 1);
        _this.titleCantainer.addChild(_this._nameGroup);
        _this._nameTxt = new eui.Label;
        _this._nameTxt.textAlign = 'center';
        _this._nameTxt.size = 14;
        _this._nameTxt.stroke = 1;
        _this._nameTxt.strokeColor = 0x000000;
        _this._nameTxt.textColor = 0xeddea9;
        _this._nameTxt.bottom = 0;
        _this._nameTxt.horizontalCenter = 0;
        _this._nameGroup.addChild(_this._nameTxt);
        _this._nameGroup.visible = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.monsterClick, _this);
        return _this;
    }
    CharMonster.prototype.monsterClick = function (e) {
        if (!this.infoModel || this.infoModel.type != EntityType.Monster)
            return;
        RoleAI.ins().selfRoleStartActack(this);
    };
    CharMonster.prototype.createTweenObj = function () {
        var self = this;
        this.dieTweenObj = {
            set alpha(al) {
                self.alpha = al;
            },
            get alpha() {
                return self.alpha;
            }
        };
        this.moveTweenObj = {
            set x(x) {
                self.x = x >> 0;
            },
            set y(y) {
                self.y = y >> 0;
            },
            get x() {
                return self.x;
            },
            get y() {
                return self.y;
            }
        };
    };
    Object.defineProperty(CharMonster.prototype, "infoModel", {
        get: function () {
            return this._infoModel;
        },
        set: function (model) {
            this._infoModel = model;
            if (GlobalConfig.FlameStamp.monsterId.indexOf(model.configID) != -1) {
                if (!this._lyMark)
                    this._lyMark = new LyMarkEffect(this._body, model);
            }
            else if (this._lyMark)
                this.clearLyMark();
        },
        enumerable: true,
        configurable: true
    });
    CharMonster.prototype.setCharName = function (str) {
        this._nameTxt.textFlow = TextFlowMaker.generateTextFlow(str);
    };
    CharMonster.prototype.setNameTxtColor = function (value) {
        this._nameTxt.textColor = value;
    };
    CharMonster.prototype.usedLyMarkSkill = function () {
        if (this._lyMark)
            this._lyMark.usedLyMarkSkill();
    };
    CharMonster.prototype.playAction = function (action, callBack) {
        if (this._state == action && !this.isAtkAction())
            return;
        if (this.hasFilter(EntityFilter.hard) && action != EntityAction.DIE) {
            return;
        }
        if (action == EntityAction.HIT || action == EntityAction.DIE) {
            if (this.infoModel.type == EntityType.Monster &&
                GlobalConfig.MonstersConfig[this.infoModel.configID] &&
                GlobalConfig.MonstersConfig[this.infoModel.configID].type == 4) {
                return;
            }
        }
        _super.prototype.playAction.call(this, action, callBack);
    };
    CharMonster.prototype.stopMove = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.canMove = false;
        egret.Tween.removeTweens(this.moveTweenObj);
    };
    Object.defineProperty(CharMonster.prototype, "dir", {
        get: function () {
            if (this.infoModel) {
                var d = this.infoModel.getDir();
                return d < 0 ? this._dir : d;
            }
            return this._dir;
        },
        set: function (value) {
            if (this._dir == value || this.hasFilter(EntityFilter.hard))
                return;
            if (this._state == EntityAction.DIE) {
                return;
            }
            this._dir = value;
            this.loadBody();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharMonster.prototype, "action", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            if (this._state == EntityAction.DIE)
                return;
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    CharMonster.prototype.getResDir = function (mcType) {
        var td = 2 * (this._dir - 4);
        if (td < 0)
            td = 0;
        var dir = this._dir - td;
        if (this.infoModel && this.infoModel.dirNum != 2) {
            return dir;
        }
        if (dir < 2) {
            return 1;
        }
        else {
            return 3;
        }
    };
    Object.defineProperty(CharMonster.prototype, "moveSpeed", {
        get: function () {
            if (!this.infoModel)
                return 0;
            return this.infoModel.getAtt(AttributeType.atMoveSpeed) / 1000 * GameMap.CELL_SIZE;
        },
        enumerable: true,
        configurable: true
    });
    CharMonster.prototype.hram = function (value) {
        this._hpBar.value = Math.min(this._hpBar.value - value, this.infoModel.getAtt(AttributeType.atMaxHp));
    };
    CharMonster.prototype.getHP = function () {
        return this._hpBar.value;
    };
    CharMonster.prototype.getRealHp = function () {
        return this.infoModel.getAtt(AttributeType.atHp);
    };
    CharMonster.prototype.reset = function () {
        this._state = EntityAction.STAND;
        this.AI_STATE = AI_State.Stand;
        this.dir = 4;
        this._hpBar.slideDuration = 500;
        this.myKill = false;
        this.removeAllFilters();
    };
    CharMonster.prototype.destruct = function () {
        this.destroy();
        ObjectPool.push(this);
    };
    CharMonster.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.deadDelay();
        this.alpha = 1;
        this.AI_STATE = AI_State.Stand;
        this._nameTxt.textColor = 0xeddea9;
        this.clearLyMark();
        this.removeAllEffect();
        this.removeAllFilters();
        TimerManager.ins().removeAll(this);
        this.stopMove();
        DisplayUtils.removeFromParent(this);
    };
    CharMonster.prototype.deadDelay = function () {
        this._hpBar.slideDuration = 0;
        this._hpBar.value = 0;
        this.removeHardStraight();
        for (var i in this.damageOverTimeList) {
            var element = this.damageOverTimeList[i];
            this.deleteDamageOverTimer(element);
        }
        this.removeAllBuff();
        this.atking = false;
        if (this.haloMc) {
            DisplayUtils.removeFromParent(this.haloMc);
        }
    };
    CharMonster.prototype.clearLyMark = function () {
        if (this._lyMark) {
            this._lyMark.destruct();
            this._lyMark = null;
        }
    };
    CharMonster.prototype.addHardStraight = function (time) {
        this.isHardStraight = true;
        TimerManager.ins().doTimer(time, 1, this.removeHardStraight, this);
    };
    CharMonster.prototype.removeHardStraight = function () {
        this.isHardStraight = false;
    };
    CharMonster.prototype.initBody = function (fileName) {
        this.addMc(CharMcOrder.BODY, fileName);
        ResourceMgr.ins().reloadImg(this.shadow);
    };
    Object.defineProperty(CharMonster.prototype, "isPlaying", {
        get: function () {
            return this._body.isPlaying;
        },
        enumerable: true,
        configurable: true
    });
    CharMonster.prototype.isAtkAction = function () {
        return this._state == EntityAction.ATTACK || this._state == EntityAction.CAST;
    };
    CharMonster.prototype.playBody = function (e) {
        _super.prototype.playBody.call(this, e);
    };
    CharMonster.prototype.loadBody = function () {
        if (!this.isShowBody)
            return;
        _super.prototype.loadBody.call(this);
    };
    CharMonster.prototype.loadOther = function (mcType) {
        if (!this.isShowBody)
            return;
        _super.prototype.loadOther.call(this, mcType);
    };
    CharMonster.prototype.loadNoDir = function (mcType) {
        if (!this.isShowBody)
            return;
        _super.prototype.loadNoDir.call(this, mcType);
    };
    CharMonster.prototype.showBodyContainer = function () {
        if (this.isShowBody)
            return;
        this.isShowBody = true;
        this.addChildAt(this._bodyContainer, 1);
        this.loadBody();
        for (var mcType in this._disOrder) {
            var t = +mcType;
            if (this._disOrder[mcType] instanceof MovieClip && this.hasDir.indexOf(t) < 0) {
                this.loadNoDir(t);
            }
        }
        this.updateTitle();
        if (this._lyMark) {
            this._lyMark.showBall();
        }
    };
    CharMonster.prototype.hideBodyContainer = function () {
        if (!this.isShowBody)
            return;
        this.isShowBody = false;
        this.removeChild(this._bodyContainer);
        this.updateTitle();
        if (this._lyMark) {
            this._lyMark.hideBall();
        }
    };
    CharMonster.prototype.getIsShowBody = function () {
        return this.isShowBody;
    };
    CharMonster.prototype.resetStand = function () {
        if (!this.isAtkAction())
            return;
        this.playAction(EntityAction.STAND);
    };
    CharMonster.prototype.hasEffById = function (id) {
        if (this.effs && this.effs[id]) {
            return true;
        }
        return false;
    };
    CharMonster.prototype.updateBlood = function (force) {
        if (force === void 0) { force = false; }
        if (!this.infoModel)
            return;
        this._hpBar.maximum = this.infoModel.getAtt(AttributeType.atMaxHp);
        if (force || !(EntityManager.ins().getTeamCount(Team.WillEntity) > 0 && GameMap.fubenID == 0)) {
            this._hpBar.value = this.infoModel.getAtt(AttributeType.atHp);
        }
    };
    CharMonster.prototype.updateTitle = function () {
        var model = this.infoModel;
        var config = GlobalConfig.MonstersConfig[model.configID];
        var title = config && config['titleId'];
        this.removeTitle();
        if (this.getIsShowBody() && title && title > 0) {
            var config_1 = GlobalConfig.MonsterTitleConf[title];
            if (config_1) {
                if (config_1.img) {
                    if (this._title == null) {
                        this._title = new eui.Image;
                        this._title.anchorOffsetX = 230 >> 1;
                        this.titleCantainer.addChild(this._title);
                    }
                    if (config_1.anchorOffsetY) {
                        this._title.anchorOffsetY = config_1.anchorOffsetY;
                    }
                    else {
                        this._title.anchorOffsetY = 100;
                    }
                    this._title.source = config_1.img;
                }
                else if (config_1.eff) {
                    if (this._titleMc == null) {
                        this._titleMc = ObjectPool.pop("MovieClip");
                        this._titleMc.anchorOffsetX = 0;
                        this.titleCantainer.addChild(this._titleMc);
                    }
                    var eff = RES_DIR_EFF + config_1.eff;
                    this.playFile(this._titleMc, eff);
                    if (config_1.anchorOffsetY) {
                        this._titleMc.anchorOffsetY = config_1.anchorOffsetY;
                    }
                    else {
                        this._titleMc.anchorOffsetY = 80;
                    }
                }
            }
        }
    };
    CharMonster.prototype.removeTitle = function () {
        if (this._title)
            this._title.source = '';
        if (this._titleMc) {
            this._titleMc.destroy();
            this._titleMc = null;
        }
    };
    CharMonster.prototype.onDead = function (callBack) {
        this.stopMove();
        this.showBlood(false);
        this.showName(false);
        this.removeTitle();
        this.playAction(EntityAction.DIE);
        if (callBack) {
            TimerManager.ins().doTimer(300, 1, callBack, this);
        }
    };
    Object.defineProperty(CharMonster.prototype, "isCanAddBlood", {
        get: function () {
            return this._hpBar.value / this._hpBar.maximum < 0.8;
        },
        enumerable: true,
        configurable: true
    });
    CharMonster.prototype.damageOverTime = function (e) {
        var timer = e instanceof egret.Timer ? e : e.currentTarget;
        if (timer.currentCount == timer.repeatCount) {
            this.deleteDamageOverTimer(timer);
        }
    };
    CharMonster.prototype.deleteDamageOverTimer = function (timer) {
        for (var i in this.damageOverTimeList) {
            if (this.damageOverTimeList[i] == timer) {
                delete this.damageOverTimeList[i];
                timer.stop();
                timer.removeEventListener(egret.TimerEvent.TIMER, this.damageOverTime, this);
            }
        }
    };
    CharMonster.prototype.addEffect = function (effID) {
        var config = GlobalConfig.EffectConfig[effID];
        if (!config)
            return;
        if (config.type == 0) {
            var image_1 = new eui.Image();
            image_1.source = config.fileName;
            this.addChild(image_1);
            var t = egret.Tween.get(image_1);
            image_1.x = image_1.x - 23;
            t.to({ y: -100 }, 2000).call(function () {
                DisplayUtils.removeFromParent(image_1);
            });
            return;
        }
        var mc = this.effs[effID] || ObjectPool.pop("MovieClip");
        var s = RES_DIR_SKILLEFF + config.fileName;
        this.playFile(mc, s);
        this.addChild(mc);
        this.effs[effID] = mc;
    };
    CharMonster.prototype.addHalo = function (str) {
        this.haloMc = this.haloMc ? this.haloMc : ObjectPool.pop("MovieClip");
        this.playFile(this.haloMc, RES_DIR_EFF + str);
        this.addChildAt(this.haloMc, 0);
    };
    CharMonster.prototype.removeEffect = function (effID) {
        var config = GlobalConfig.EffectConfig[effID];
        if (!config)
            return;
        if (config.type == 0)
            return;
        var mc = this.effs[effID];
        if (!mc)
            return;
        if (mc instanceof MovieClip)
            mc.destroy();
        delete this.effs[effID];
    };
    CharMonster.prototype.removeAllEffect = function () {
        for (var effId in this.effs) {
            var mc = this.effs[effId];
            if (mc && mc instanceof MovieClip) {
                mc.destroy();
            }
        }
        this.effs = {};
    };
    CharMonster.prototype.hasBuff = function (groupID) {
        return !!this.buffList[groupID];
    };
    CharMonster.prototype.addBuff = function (buff) {
        var config = buff.effConfig;
        var groupID = config.group;
        var oldBuff = this.buffList[groupID];
        if (oldBuff) {
            if (oldBuff.effConfig.overlayType == 2) {
                var multRate = oldBuff.multRate + 1;
                if (multRate > oldBuff.effConfig.overMaxCount)
                    multRate = oldBuff.effConfig.overMaxCount;
                buff.multRate = multRate;
            }
            this.removeBuff(oldBuff);
        }
        this.buffList[groupID] = buff;
        if (config.effName) {
            var mc = this.buffEff[groupID] || ObjectPool.pop("MovieClip");
            var s = RES_DIR_SKILLEFF + config.effName;
            this.playFile(mc, s);
            this.addChild(mc);
            this.buffEff[groupID] = mc;
        }
        if (config.effID) {
            this.addEffect(config.effID);
        }
        if (buff.effConfig.type == SkillEffType.AdditionalState) {
            if (buff.effConfig.args && buff.effConfig.args.i == 9) {
                var holdTime = buff.effConfig.duration;
                this.addHardStraight(holdTime);
            }
        }
        this.addGroup(groupID);
    };
    CharMonster.prototype.removeBuff = function (buff) {
        var config = buff.effConfig;
        var groupID = config.group;
        if (this.buffList[groupID] == buff) {
            buff.dispose();
            ObjectPool.push(this.buffList[groupID]);
            delete this.buffList[groupID];
            if (this.buffEff[groupID]) {
                DisplayUtils.removeFromParent(this.buffEff[groupID]);
                delete this.buffEff[groupID];
            }
            if (config.effID) {
                this.removeEffect(config.effID);
            }
            if (config.unionBuff) {
                var union = this.buffList[config.unionBuff];
                if (union)
                    this.removeBuff(union);
            }
        }
        this.removeGroup(groupID);
    };
    CharMonster.prototype.removeAllBuff = function () {
        for (var i in this.buffList)
            this.removeBuff(this.buffList[i]);
    };
    CharMonster.prototype.addPaoPao = function (paoID) {
        if (!this.paoPao) {
            this.paoPao = new PaoPaoView();
            this.addChildAt(this.paoPao, 100);
            this.paoPao.open();
        }
        this.paoPao.anchorOffsetY = 170;
        this.paoPao.anchorOffsetX = 100;
        var job = this.infoModel.job;
        this.paoPao.setSpeak(paoID, job);
    };
    Object.defineProperty(CharMonster.prototype, "team", {
        get: function () {
            return this._infoModel.team;
        },
        enumerable: true,
        configurable: true
    });
    CharMonster.prototype.startPatrol = function () {
        if (TimerManager.ins().getCurrTime() > this.nextPatrolTick) {
            var p = this.getPointCanMove();
            if (p) {
                GameMap.moveEntity(this, p.x, p.y);
                this.nextPatrolTick = TimerManager.ins().getCurrTime() + MathUtils.limit(this.moveLimTime, this.moveMaxTime);
            }
        }
    };
    CharMonster.prototype.setMoveAtt = function (para) {
        this.moveRange = para[0];
        this.moveLimTime = para[1][0];
        this.moveMaxTime = para[1][1];
    };
    CharMonster.prototype.getPointCanMove = function () {
        var count = 0;
        var X = 0;
        var Y = 0;
        var range = this.moveRange;
        var p;
        while (count < 100) {
            var X_1 = MathUtils.limit((this.x - range) >> 0, (this.x + range) >> 0);
            var Y_1 = MathUtils.limit((this.y - range) >> 0, (this.y + range) >> 0);
            if (GameMap.checkWalkableByPixel(X_1, Y_1)) {
                p = new egret.Point;
                p.x = X_1;
                p.y = Y_1;
                break;
            }
            count++;
        }
        return p;
    };
    CharMonster.prototype.playCount = function () {
        return this._state == EntityAction.RUN || this._state == EntityAction.STAND ? -1 : 1;
    };
    CharMonster.prototype.shakeIt = function () {
        var _this = this;
        if (this.action != EntityAction.STAND && this.action != EntityAction.HIT)
            return;
        DisplayUtils.shakeItEntity(this, 3, 200, 1);
        if (this.moveSpeed) {
            this.playAction(EntityAction.HIT, function () {
                _this.playAction(EntityAction.STAND);
            });
        }
    };
    CharMonster.prototype.showName = function (b) {
        this._nameGroup.visible = b;
    };
    CharMonster.prototype.showBlood = function (b) {
        if (b && this.infoModel && this.infoModel.name == "\u795E\u517D") {
            return;
        }
        this._hpBar.visible = b;
    };
    Object.defineProperty(CharMonster.prototype, "isMy", {
        get: function () {
            return this.infoModel.isMy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharMonster.prototype, "weight", {
        get: function () {
            if (this._infoModel && this.team == Team.My && this instanceof CharRole) {
                return this.y + 32;
            }
            return this.y;
        },
        enumerable: true,
        configurable: true
    });
    CharMonster.prototype.updateModel = function () {
        this.removeAll();
        this.parseModel();
    };
    CharMonster.prototype.parseModel = function () {
        var monster = this;
        var model = this.infoModel;
        if (model.team != Team.My) {
            monster.updateBlood(true);
            monster.setCharName(model.name);
        }
        monster.initBody(RES_DIR_MONSTER + model.avatarFileName);
        monster.setConfig(model.avatar + "");
        monster.updateTitle();
        if (model.avatarEffect && model.avatarEffect != "") {
            monster.addHalo(model.avatarEffect);
        }
        if (model.movePara) {
            monster.setMoveAtt(model.movePara);
        }
        monster.setBodyScale(model.avatarScale);
    };
    CharMonster.prototype.addGroup = function (groupId) {
        var filter = EntityFilterUtil.getEntityFilter(groupId);
        if (filter) {
            this.filterDic[filter] = this.filterDic[filter] || [];
            var index = this.filterDic[filter].indexOf(groupId);
            if (index == -1) {
                this.filterDic[filter].push(groupId);
                this.updateFilter();
            }
        }
    };
    CharMonster.prototype.removeGroup = function (groupId) {
        var filterId = EntityFilterUtil.getEntityFilter(groupId);
        if (filterId) {
            var filters = this.filterDic[filterId];
            if (!filters)
                return;
            var index = filters.indexOf(groupId);
            if (index >= 0) {
                filters.splice(index, 1);
                this.updateFilter();
            }
        }
    };
    CharMonster.prototype.updateFilter = function () {
        var filter = EntityFilter.no;
        if (this.hasFilter(EntityFilter.hard)) {
            filter = EntityFilter.hard;
        }
        else if (this.hasFilter(EntityFilter.poison)) {
            filter = EntityFilter.poison;
        }
        if (this.curFilter != filter) {
            this.setFilter(filter);
        }
    };
    CharMonster.prototype.hasFilter = function (filter) {
        return !!(this.filterDic[filter] && this.filterDic[filter].length);
    };
    CharMonster.prototype.setFilter = function (filter) {
        this.curFilter = filter;
        if (filter) {
            this.setMcFilter(filter);
            if (filter == EntityFilter.hard) {
                this.setMcFilterPlayOrStop(false);
            }
            else {
                this.setMcFilterPlayOrStop(true);
            }
        }
        else {
            this.setMcFilter(filter);
            this.setMcFilterPlayOrStop(true);
        }
    };
    CharMonster.prototype.setMcFilter = function (filter) {
        if (egret.Capabilities.renderMode != 'webgl')
            return;
        for (var mcType in this._disOrder) {
            if (+(mcType) != CharMcOrder.ZHANLING) {
                var mc = this._disOrder[mcType];
                mc.filters = filter ? EntityFilterUtil.buffFilter[filter].filters : null;
            }
        }
    };
    CharMonster.prototype.setMcFilterPlayOrStop = function (play) {
        for (var _i = 0, _a = this.hasDir; _i < _a.length; _i++) {
            var mcType = _a[_i];
            if (mcType == CharMcOrder.ZHANLING)
                continue;
            var mc = this.getMc(mcType);
            if (mc) {
                if (play)
                    mc.play();
                else
                    mc.stop();
            }
        }
    };
    CharMonster.prototype.removeAllFilters = function () {
        this.filterDic = {};
        this.curFilter = EntityFilter.no;
        for (var mcType in this._disOrder) {
            var mc = this._disOrder[mcType];
            mc.filters = null;
        }
    };
    return CharMonster;
}(CharEffect));
__reflect(CharMonster.prototype, "CharMonster", ["IChar"]);
//# sourceMappingURL=CharMonster.js.map