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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CharRole = (function (_super) {
    __extends(CharRole, _super);
    function CharRole() {
        var _this = _super.call(this) || this;
        _this.ringMc = [];
        _this.zhanLingAttack = false;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this.AI_STATE = AI_State.Stand;
        _this.neigongBar = new eui.ProgressBar();
        _this.neigongBar.skinName = "bloodyelskin";
        _this.neigongBar.anchorOffsetY = -5;
        _this.neigongBar.labelDisplay.visible = false;
        _this.neigongBar.labelFunction = function () { return ''; };
        _this.titleCantainer.addChild(_this.neigongBar);
        _this.neigongBar.anchorOffsetX = Math.floor(_this.neigongBar.width >> 1);
        _this._nameTxt.textColor = 0xffffff;
        _this._nameGroup.visible = true;
        _this._lilianTitle = new eui.Image();
        _this._lilianTitle.scaleX = 0.5;
        _this._lilianTitle.scaleY = 0.5;
        _this._lilianTitle.bottom = -1;
        _this._nameGroup.addChild(_this._lilianTitle);
        return _this;
    }
    CharRole.prototype.createTweenObj = function () {
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
                self.moveCamera();
            },
            set y(y) {
                self.y = y >> 0;
                self.moveCamera();
            },
            get x() {
                return self.x;
            },
            get y() {
                return self.y;
            }
        };
    };
    CharRole.prototype.setWeaponFileName = function (name) {
        this.addMc(CharMcOrder.WEAPON, RES_DIR_WEAPON + name);
    };
    CharRole.prototype.setWingFileName = function (name) {
        this.addMc(CharMcOrder.WING, RES_DIR_WING + name);
    };
    CharRole.prototype.setHeirloomFileName = function (name) {
        this.addMc(CharMcOrder.HEIR, RES_DIR_EFF + name);
    };
    CharRole.prototype.setSoulFileName = function (name) {
        this.addMc(CharMcOrder.SOUL, RES_DIR_WEAPON + name);
    };
    CharRole.prototype.loadOther = function (mcType) {
        if (this.action == EntityAction.DIE) {
            if (mcType != CharMcOrder.BODY && mcType != CharMcOrder.WEAPON) {
                var mc = this.getMc(mcType);
                if (mc)
                    mc.visible = false;
                return;
            }
        }
        else {
            var mc = this.getMc(mcType);
            if (mc)
                mc.visible = true;
        }
        if (mcType == CharMcOrder.ZHANLING && (this.zhanLingAttack || this._state == EntityAction.ATTACK))
            return;
        _super.prototype.loadOther.call(this, mcType);
    };
    CharRole.prototype.playBody = function (e) {
        _super.prototype.playBody.call(this, e);
        if (this.ringMc && this.ringMc.length > 0) {
            this.updateRingMC();
        }
    };
    CharRole.prototype.getResDir = function (mcType) {
        if (mcType == CharMcOrder.ZHANLING)
            return 3;
        var td = 2 * (this._dir - 4);
        if (td < 0)
            td = 0;
        if (GameServer.serverOpenDay < 7) {
            return this._dir - td;
        }
        else {
            var dir = this._dir - td;
            if (dir < 2) {
                return 1;
            }
            else {
                return 3;
            }
        }
    };
    CharRole.prototype.updateBlood = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        _super.prototype.updateBlood.call(this, force);
        if (this._hpBar.value <= 0) {
            this.onDead(function () {
                _this.deadDelay();
            });
        }
    };
    CharRole.prototype.updateModel = function () {
        _super.prototype.updateModel.call(this);
    };
    CharRole.prototype.parseModel = function () {
        this._hpBar.thumb.source = this.isMy ? "boolGreen_png" : "boolRed_png";
        var model = this.infoModel;
        this.setCharName(model.guildAndName);
        this.setLilian(model.lilianUrl);
        this.updateBlood(true);
        this.updateNeiGong();
        var id = model.getEquipByIndex(0).item.configID;
        var hideWeapons = model.hideWeapons();
        if (model.zhuangbei[1] > 0) {
            var fileName = GlobalConfig.ZhuangBanId[model.zhuangbei[1]].res;
            this.setWeaponFileName(fileName + "_" + model.sex);
        }
        else if (id > 0) {
            if (GlobalConfig.EquipConfig[id]) {
                var fileName = GlobalConfig.EquipConfig[id].appearance;
                this.setWeaponFileName(fileName + "_" + model.sex);
            }
        }
        if (model.zhuangbei[2] > 0) {
            var fileName = GlobalConfig.ZhuangBanId[model.zhuangbei[2]].res;
            this.setWingFileName(fileName);
        }
        else if (model.wingsData.openStatus) {
            if (GlobalConfig.WingLevelConfig[model.wingsData.lv])
                this.setWingFileName(GlobalConfig.WingLevelConfig[model.wingsData.lv].appearance);
        }
        if (model.heirloom) {
            var suitConfig = model.heirloom.getSuitConfig(model);
            if (suitConfig && suitConfig.weff) {
                this.setHeirloomFileName(suitConfig.weff);
            }
        }
        if (!hideWeapons && model.weapons && model.weapons.weaponsId > 0) {
            var fileName = GlobalConfig.WeaponSoulConfig[model.weapons.weaponsId].outside[model.job - 1];
            this.setSoulFileName(fileName);
        }
        id = model.equipsData[2].item.configID;
        if (model.zhuangbei[0] > 0) {
            var fileName = GlobalConfig.ZhuangBanId[model.zhuangbei[0]].res;
            this.initBody(RES_DIR_BODY + fileName + "_" + model.sex);
        }
        else if (id > 0) {
            if (GlobalConfig.EquipConfig[id]) {
                var fileName = GlobalConfig.EquipConfig[id].appearance;
                this.initBody(RES_DIR_BODY + fileName + "_" + model.sex);
            }
        }
        else
            this.initBody(RES_DIR_BODY + ("body000_" + model.sex));
        this.updateTitle();
        this.updateNameColor();
    };
    CharRole.prototype.updateNameColor = function () {
        var model = this.infoModel;
        if (model == undefined) {
            Log.trace("角色更新数据异常，moidel为空");
            return;
        }
        if (model.camp > 0 && BattleCC.ins().isBattle())
            this.setNameTxtColor(model.camp != BattleCC.ins().camp ? 0xFF0000 : 0x00FF00);
        else if (this.team == Team.WillEntity)
            this.setNameTxtColor(0xFFFF00);
        else
            this.setNameTxtColor(0xFFFFFF);
    };
    CharRole.prototype.setHeirloomSuitEff = function () {
        var model = this.infoModel;
        if (model == undefined) {
            return;
        }
        if (model.heirloom) {
            var suitConfig = model.heirloom.getSuitConfig(model);
            if (suitConfig && suitConfig.weff) {
                this.setHeirloomFileName(suitConfig.weff);
            }
        }
    };
    CharRole.prototype.addBuff = function (buff) {
        _super.prototype.addBuff.call(this, buff);
        var config = buff.effConfig;
        if (GameMap.fubenID == 0) {
            switch (config.type) {
                case SkillEffType.Summon:
                    var m = void 0;
                    if (this.team == Team.My) {
                        var tempData = Artifact.ins().getReviseBySkill(35001);
                        var gwSkills = GodWeaponCC.ins().getReviseBySkill(35001);
                        var gwSkill = void 0;
                        if (gwSkills)
                            gwSkill = gwSkills[0];
                        var monsterId = config.args.a;
                        if (tempData && tempData.args && tempData.args[0]) {
                            monsterId += tempData.args[0].vals[2];
                        }
                        if (gwSkill && gwSkill.args && gwSkill.args[0]) {
                            monsterId += gwSkill.args[0].vals[2];
                        }
                        m = UserFb.createModel(GlobalConfig.MonstersConfig[monsterId]);
                        m.x = this.x;
                        m.y = this.y;
                        m.masterHandle = this.infoModel.handle;
                        m.setAtt(AttributeType.atMoveSpeed, this.infoModel.getAtt(AttributeType.atMoveSpeed));
                        var attValue = 0;
                        var baseValue = m.getAtt(AttributeType.atAttack);
                        if (tempData && tempData.args && tempData.args[0]) {
                            var times = tempData.args[0].vals[3] ? tempData.args[0].vals[3] : 1;
                            attValue += this.infoModel.getAtt(AttributeType.atAttack) * times;
                        }
                        if (gwSkill && gwSkill.args && gwSkill.args[0]) {
                            var times = gwSkill.args[0].vals[3] ? gwSkill.args[0].vals[3] : 1;
                            attValue += this.infoModel.getAtt(AttributeType.atAttack) * times;
                        }
                        m.setAtt(AttributeType.atAttack, (attValue >> 0) + baseValue);
                    }
                    else {
                        m = UserFb.createModel(GlobalConfig.MonstersConfig[config.args.a]);
                        m.x = this.x;
                        m.y = this.y;
                        m.masterHandle = this.infoModel.handle;
                        m.setAtt(AttributeType.atMoveSpeed, this.infoModel.getAtt(AttributeType.atMoveSpeed));
                    }
                    m.isMy = m.checkHandleIsMy(m.masterHandle);
                    GameLogic.ins().createEntityByModel(m, this.team);
                    break;
            }
        }
    };
    CharRole.prototype.updateNeiGong = function () {
        if (!this.infoModel)
            return;
        var maxValue = this.infoModel.getAtt(AttributeType.maxNeiGong);
        this.neigongBar.visible = this.checkNeigongVisible();
        this.neigongBar.maximum = maxValue;
        this.neigongBar.value = this.infoModel.getAtt(AttributeType.cruNeiGong);
        if (this.neigongBar.visible) {
            this.showName(this.neigongBar.visible);
            this.showBlood(this.neigongBar.visible);
        }
    };
    CharRole.prototype.checkNeigongVisible = function () {
        var maxValue = this.infoModel.getAtt(AttributeType.maxNeiGong);
        return maxValue != 0 && this._state != EntityAction.DIE;
    };
    CharRole.prototype.updateTitle = function () {
        var model = this.infoModel;
        var title = model.title;
        this.removeTitle();
        if (this.getIsShowBody() && title > 0) {
            var config = GlobalConfig.TitleConf[title];
            if (config) {
                if (config.img) {
                    if (this._title == null) {
                        this._title = new eui.Image;
                        this._title.anchorOffsetX = 230 >> 1;
                        this._title.anchorOffsetY = 100;
                        this.titleCantainer.addChild(this._title);
                    }
                    this._title.source = config.img;
                }
                else if (config.eff) {
                    if (this._titleMc == null) {
                        this._titleMc = ObjectPool.pop("MovieClip");
                        this._titleMc.anchorOffsetX = 0;
                        this._titleMc.anchorOffsetY = 80;
                        this.titleCantainer.addChild(this._titleMc);
                    }
                    var eff = RES_DIR_EFF + config.eff;
                    this.playFile(this._titleMc, eff);
                }
            }
        }
    };
    CharRole.prototype.updateRingMC = function () {
        for (var i in this.ringMc) {
            if (this.ringMc[i]) {
                if (this.ringMc[i].parent == null) {
                    this.addChild(this.ringMc[i]);
                }
                this.ringMc[i].setEffectXY(this.dir);
            }
        }
    };
    CharRole.prototype.setCharName = function (str) {
        _super.prototype.setCharName.call(this, str);
        this._lilianTitle.x = (this._nameGroup.width >> 1) + (this._nameTxt.width >> 1) - 6;
        this._nameGroup.visible = true;
    };
    CharRole.prototype.setLilian = function (url) {
        this._lilianTitle.source = url;
    };
    Object.defineProperty(CharRole.prototype, "infoModel", {
        get: function () {
            return this._infoModel;
        },
        set: function (model) {
            if (model) {
                this._infoModel = model;
            }
            else {
                Log.trace("设置infoModel异常,对象为空");
            }
        },
        enumerable: true,
        configurable: true
    });
    CharRole.prototype.autoAddBlood = function () {
        if (this.action == EntityAction.DIE) {
            egret.clearTimeout(this.timeID);
            return;
        }
        if (this.getRealHp() < this.infoModel.getAtt(AttributeType.atMaxHp)) {
            var value = -this.infoModel.getAtt(AttributeType.atRegeneration);
            this.hram(value);
            var curHp = this.infoModel.getAtt(AttributeType.atHp) - value;
            var maxHp = this.infoModel.getAtt(AttributeType.atMaxHp);
            this.infoModel.setAtt(AttributeType.atHp, curHp > maxHp ? maxHp : curHp);
            GameLogic.ins().postEntityHpChange(this, null, DamageTypes.HIT, value);
        }
        TimerManager.ins().doTimer(1000, 1, this.autoAddBlood, this);
    };
    CharRole.prototype.showNeigong = function (b) {
        this.neigongBar.visible = b && this.checkNeigongVisible();
    };
    CharRole.prototype.showZhanling = function (id, lv) {
        var config = GlobalConfig.ZhanLingLevel[0][lv];
        if (!config.talentLevel)
            return;
        config = GlobalConfig.ZhanLingLevel[id][lv];
        if (Assert(config, "\u6218\u7075\u5929\u8D4B\u7B49\u7EA7\u914D\u7F6E\u4E3A\u7A7A\uFF1Aid(" + id + "),lv(" + lv + ")"))
            return;
        var fileName = config.appearance;
        this.addMc(CharMcOrder.ZHANLING, RES_DIR_MONSTER + fileName);
        var mc = this.getMc(CharMcOrder.ZHANLING);
        var anchorOffset = GlobalConfig.ZhanLingConfig.anchorOffset || [];
        mc.anchorOffsetX = anchorOffset[0] || 0;
        mc.anchorOffsetY = anchorOffset[1] || 0;
        TimerManager.ins().remove(this.playZhanLingAttack, this);
        TimerManager.ins().doTimer(200, 1, this.playZhanLingAttack, this);
        TimerManager.ins().remove(this.hideZhanling, this);
        TimerManager.ins().doTimer(3000, 1, this.hideZhanling, this);
    };
    CharRole.prototype.playZhanLingAttack = function () {
        var _this = this;
        var mcType = CharMcOrder.ZHANLING;
        var mc = this.getMc(mcType);
        if (mc) {
            mc.scaleX = this._dir > 4 ? -1 : 1;
            var s = this.getFileName(mcType) + "_" + this.getResDir(mcType) + EntityAction.ATTACK;
            this.zhanLingAttack = true;
            mc.playFile(s, 1, function () {
                _this.zhanLingAttack = false;
                var src = _this.getFileName(mcType) + "_" + _this.getResDir(mcType) + EntityAction.STAND;
                mc.playFile(src, -1, null, false);
            }, false);
        }
    };
    CharRole.prototype.hideZhanling = function () {
        var _this = this;
        var mc = this.getMc(CharMcOrder.ZHANLING);
        if (mc) {
            egret.Tween.get(mc).to({ alpha: 0 }, GlobalConfig.ZhanLingConfig.disappearTime || 1500).call(function () {
                _this.removeMc(CharMcOrder.ZHANLING);
            });
        }
    };
    CharRole.prototype.reset = function () {
        _super.prototype.reset.call(this);
        this.zhanLingAttack = false;
        this.AI_STATE = AI_State.Stand;
    };
    CharRole.prototype.destruct = function () {
        _super.prototype.destruct.call(this);
        this.AI_STATE = AI_State.Stand;
        this._hpBar.visible = this._nameGroup.visible = true;
        this._nameTxt.textColor = 0xffffff;
        for (var i in this.ringMc) {
            if (this.ringMc[i]) {
                this.ringMc[i].reset();
                this.ringMc[i] = null;
                delete this.ringMc[i];
            }
        }
    };
    CharRole.prototype.deadDelay = function () {
        this._hpBar.slideDuration = 0;
        this._hpBar.value = 0;
        this.neigongBar.slideDuration = 0;
        this.neigongBar.value = this.neigongBar.maximum;
        this.stopMove();
        this.removeHardStraight();
        this.removeAllBuff();
        this.hideZhanling();
        this.neigongBar.visible = false;
        if (this._title)
            this._title.source = '';
        this._hpBar.visible = this._nameGroup.visible = false;
        this.atking = false;
        TimerManager.ins().removeAll(this);
    };
    Object.defineProperty(CharRole.prototype, "nameVisible", {
        get: function () {
            return this._nameGroup.visible;
        },
        enumerable: true,
        configurable: true
    });
    CharRole.prototype.showNameAndHp = function () {
        this._hpBar.visible = this._nameGroup.visible = true;
    };
    CharRole.prototype.showBodyContainer = function () {
        if (this.isShowBody)
            return;
        _super.prototype.showBodyContainer.call(this);
        this.neigongBar.alpha = 1;
    };
    CharRole.prototype.hideBodyContainer = function () {
        if (!this.isShowBody)
            return;
        _super.prototype.hideBodyContainer.call(this);
        this.neigongBar.alpha = 0;
    };
    CharRole.prototype.moveCamera = function () {
        if (this == EntityManager.ins().getNoDieRole()) {
            GameLogic.ins().postMoveCamera();
            var sefety = "sefety";
            var xy = { x: GameMap.point2Grip(this.x), y: GameMap.point2Grip(this.y) };
            if (!this[sefety] && GameMap.checkSafety(xy)) {
                UserTips.ins().showCenterTips("|C:0x00ff00&T:\u8FDB\u5165\u5B89\u5168\u533A|");
                this[sefety] = true;
            }
            else if (this[sefety] && !GameMap.checkSafety(xy)) {
                UserTips.ins().showCenterTips("|C:0xff0000&T:\u79BB\u5F00\u5B89\u5168\u533A|");
                this[sefety] = false;
            }
        }
    };
    CharRole.prototype.isSafety = function () {
        var xy = { x: GameMap.point2Grip(this.x), y: GameMap.point2Grip(this.y) };
        return GameMap.checkSafety(xy);
    };
    CharRole.prototype.onDead = function (callBack) {
        this.stopMove();
        this.playAction(EntityAction.DIE, callBack);
    };
    CharRole.prototype.stopMove = function () {
        _super.prototype.stopMove.call(this);
        if (this == EntityManager.ins().getNoDieRole()) {
            SoundUtil.ins().stopRun();
            GameLogic.ins().postAdjustMapPos();
        }
    };
    __decorate([
        callLater
    ], CharRole.prototype, "moveCamera", null);
    return CharRole;
}(CharMonster));
__reflect(CharRole.prototype, "CharRole");
//# sourceMappingURL=CharRole.js.map