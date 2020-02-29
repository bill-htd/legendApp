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
var NeiGongWin = (function (_super) {
    __extends(NeiGongWin, _super);
    function NeiGongWin() {
        var _this = _super.call(this) || this;
        _this.curRole = 0;
        _this.canUp = false;
        _this.isLights = [];
        _this.effs = {};
        _this.starPoint = [];
        _this.isNext = false;
        _this.isAutoUp = false;
        _this.signLevel = 0;
        _this.mcPos = [[52, 127, 0], [47, 105, 18], [55, 80, 36], [75, 62, 54], [110, 50, 72],
            [75, 65, 108], [100, 80, 126], [110, 110, 144], [100, 140, 162], [85, 170, 180]];
        _this.toHeight = 0;
        _this.mcWidth = 160;
        _this.mcHeight = 160;
        _this._currHeight = 0;
        return _this;
    }
    NeiGongWin.prototype.childrenCreated = function () {
        this.init();
    };
    NeiGongWin.prototype.init = function () {
        this.upLevelMc = new MovieClip();
        this._shap = new egret.Shape();
        this.lineGroup.addChild(this._shap);
        this.lineBg.mask = this._shap;
        this._shap.x = this._shap.y = this.lineGroup.width >> 1;
        this._shap.rotation = -196;
        this.circleMc = new MovieClip;
        this.circleMc.x = 80;
        this.circleMc.y = 75;
        this.mcGroup.addChild(this.circleMc);
        this.moveInMc = new MovieClip;
        this.moveInMc.x = 70;
        this.moveInMc.y = 65;
        this.ball.addChild(this.moveInMc);
        this.stageMc = new MovieClip;
        this.stageMc.x = 52;
        this.stageMc.y = 32;
        this.stageGroup.addChild(this.stageMc);
        this._ballShap = new egret.Shape();
        this.mcGroup.addChild(this._ballShap);
        var temp = NeiGongModel.ins().neiGongList[this.curRole];
        var level = temp ? temp.level : 0;
        for (var i = 0; i < 10; i++) {
            var point = new egret.Point(this["eff_" + i].x, this["eff_" + i].y);
            this.starPoint[i] = point;
            this.isLights[i] = i < level;
        }
        this.eff = new MovieClip;
        this.eff.x = this.UplevelBtn0.x + this.UplevelBtn0.width / 2;
        this.eff.y = this.UplevelBtn0.y + this.UplevelBtn0.height / 2;
        this.eff.scaleX = 1.15;
        this.eff.scaleY = 1;
        this.eff.touchEnabled = false;
    };
    NeiGongWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curRole = param[0];
        this.lastLevel = -1;
        this.circleMc.playFile(RES_DIR_EFF + "neigongzhongjianeff", -1);
        if (!this.moveInMc.parent)
            this.ball.addChild(this.moveInMc);
        this.circleMc.mask = this._ballShap;
        this.addTouchEvent(this.upBtn, this.onClick);
        this.addTouchEvent(this.mixBtn, this.onClick);
        this.addTouchEvent(this.oneKeyUp, this.onClick);
        this.addTouchEvent(this.UplevelBtn0, this.onClick);
        this.observe(NeiGong.ins().postNeiGongDataChange, this.refushPanelInfo);
        this.observe(Actor.ins().postLevelChange, this.setBtnStatuBarinfo);
        this.observe(NeiGong.ins().postNeiGongAct, this.showActPanel);
        this.refushPanelInfo(true);
        this.showActPanel();
    };
    NeiGongWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.removeTouchEvent(this.upBtn, this.onClick);
        this.removeTouchEvent(this.mixBtn, this.onClick);
        this.removeTouchEvent(this.oneKeyUp, this.onClick);
        this.seteffectPost();
        for (var i in this.effs) {
            DisplayUtils.removeFromParent(this.effs[i]);
            if (this.effs[i])
                egret.Tween.removeTweens(this.effs[i]);
        }
        DisplayUtils.removeFromParent(this.eff);
        this.stopAutoUp();
    };
    NeiGongWin.openCheck = function () {
        var openLevel = GlobalConfig.NeiGongBaseConfig.openLevel;
        if (Actor.level < openLevel) {
            UserTips.ins().showTips(openLevel + "\u7EA7\u5F00\u542F\u5185\u529F");
            return false;
        }
        return true;
    };
    NeiGongWin.prototype.showActPanel = function () {
        if (NeiGong.ins().isActList[this.curRole].isShow) {
            NeiGong.ins().isActList[this.curRole].isShow = false;
            Activationtongyong.show(0, "内功", "jneigong_png");
            var role = EntityManager.ins().getMainRole(this.curRole);
            if (role)
                role.updateNeiGong();
        }
        this.showAct.visible = NeiGong.ins().ngList[this.curRole] > 0;
        if (!this.showAct.visible) {
            this.Activation.visible = true;
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
            if (!this.eff.parent)
                this.UplevelBtn0.parent.addChild(this.eff);
        }
        else {
            this.Activation.visible = false;
            DisplayUtils.removeFromParent(this.eff);
        }
        var openGuanqia = GlobalConfig.NeiGongBaseConfig.openGuanqia;
        if (UserFb.ins().guanqiaID <= openGuanqia) {
            this.redPointAct0.visible = false;
        }
        this.activeTipsTxt0.text = "\u95EF\u5173\u8FBE\u5230 \u7B2C" + (openGuanqia + 1) + " \u5373\u53EF\u6FC0\u6D3B\u5185\u529F";
    };
    NeiGongWin.prototype.onChange = function () {
        this.stopAutoUp();
        this.refushPanelInfo();
    };
    NeiGongWin.prototype.refushPanelInfo = function (init) {
        this.data = NeiGongModel.ins().neiGongList[this.curRole];
        if (!this.data) {
            return;
        }
        this.cruLevelCfg = GlobalConfig.NeiGongStageConfig[this.data.stage][this.data.level];
        if (!this.cruLevelCfg) {
            return;
        }
        if (this.lastLevel != this.data.level) {
            this.effectShow(init);
        }
        this.lastLevel = this.data.level;
        this.setAttrCost();
        this.setPowerShow();
        this.setBtnStatuBarinfo();
        this.seteffectPost();
    };
    NeiGongWin.prototype.setPowerShow = function () {
        this._totalPower = UserBag.getAttrPower(this.cruLevelCfg.attribute);
        this.powerPanel.setPower(this._totalPower);
    };
    NeiGongWin.prototype.setAttrCost = function () {
        this.levelId.text = this.data.stage;
        var cost = 0;
        var discount = GlobalConfig.MonthCardConfig.neiGongGoldPrecent / 100;
        var addValue = Recharge.ins().getIsForeve() ? 1 - discount : 1;
        if (!this.data.canMix) {
            cost = Math.floor(this.cruLevelCfg.costMoney * addValue);
        }
        var colorStr = "";
        if (Actor.gold >= cost)
            colorStr = "|C:0x35e62d&T:";
        else
            colorStr = "|C:0xf3311e&T:";
        this.canUp = Actor.gold >= cost;
        this.costlable.textFlow = TextFlowMaker.generateTextFlow(colorStr + cost);
        var attrList = this.cruLevelCfg.attribute;
        attrList.sort(AttributeData.sortAttribute);
        var len = attrList.length;
        for (var i = 0; i < 3; i++) {
            this["attr" + i].text = len > i ? AttributeData.getAttStrByType(attrList[i], 1) : "";
        }
        var nextStage = 0;
        var nextLevel = 0;
        if (this.data.level == GlobalConfig.NeiGongBaseConfig.levelPerStage) {
            nextStage = this.data.stage + 1;
            nextLevel = 0;
        }
        else {
            nextStage = this.data.stage;
            nextLevel = this.data.level + 1;
        }
        var cfgList = GlobalConfig.NeiGongStageConfig[nextStage];
        var nextConfig = cfgList ? cfgList[nextLevel] : null;
        if (nextConfig) {
            var str = "";
            var addList = nextConfig.attribute;
            addList.sort(AttributeData.sortAttribute);
            for (var i = 0; i < 3; i++) {
                if (len > i) {
                    var attr = attrList[i];
                    str = this.getAttrByType(addList, attr);
                }
                this["addAttr" + i].text = str;
                this["arrow" + i].visible = str != "";
            }
            this.isNext = true;
        }
        else {
            for (var i = 0; i < 3; i++) {
                this["addAttr" + i].text = "";
                this["arrow" + i].visible = false;
            }
            this.isNext = false;
        }
    };
    NeiGongWin.prototype.effectShow = function (init) {
        var len = this.data.level;
        for (var i = 0; i < 10; i++) {
            this["point_" + i].source = i >= len ? "neigongzhuzi2" : "neigongzhuzi1";
        }
        if (len > 0)
            DisplayUtils.drawCir(this._shap, (this.lineGroup.width >> 1) + 2, (len - 1) * (180 + 32) / 9);
        else
            this._shap.graphics.clear();
        for (var i in this.effs) {
            DisplayUtils.removeFromParent(this.effs[i]);
            this.effs[i] = null;
        }
        if (init) {
            var temp = NeiGongModel.ins().neiGongList[this.curRole];
            var level = temp ? temp.level : 0;
            for (var i = 0; i < 10; i++) {
                this.isLights[i] = i < level;
            }
        }
        for (var i = 0; i < len; i++) {
            var mc = this.effs[i] || new MovieClip();
            mc.x = 1;
            mc.y = 30;
            mc.scaleX = 1;
            mc.scaleY = 1;
            this.effs[i] = mc;
            this["eff_" + i].addChild(mc);
            if (!this.isLights[i]) {
                this.isLights[i] = true;
                this.moveEffectOut(i);
            }
            else {
                mc.playFile(RES_DIR_EFF + "feishengfire", -1);
            }
        }
    };
    NeiGongWin.prototype.setBtnStatuBarinfo = function () {
        var flag = this.data.canMix;
        this.upBtn.visible = !flag && this.isNext;
        this.mixBtn.visible = flag;
        this.redPoint1.visible = false;
        this.redPoint0.visible = false;
        this.costInfo.visible = !flag && this.isNext;
        this.maxDesc.visible = !this.isNext;
        if (flag) {
            this.expLabel.text = "";
            this.upDataExpMcBall(this.cruLevelCfg.totalExp, this.cruLevelCfg.totalExp);
        }
        else {
            if (this.cruLevelCfg) {
                this.upDataExpMcBall(this.data.exp, this.cruLevelCfg.totalExp);
                this.expLabel.text = this.data.exp + "/" + this.cruLevelCfg.totalExp;
            }
        }
    };
    NeiGongWin.prototype.onClick = function (e) {
        var _this = this;
        if (!this.isNext) {
            UserTips.ins().showTips("\u5185\u529F\u5DF2\u6EE1\u7EA7");
            return;
        }
        switch (e.target) {
            case this.upBtn:
                if (this.canUp) {
                    NeiGong.ins().sendNeiGongUpLevel(this.curRole);
                    SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
                }
                else {
                    if (!Shop.openBuyGoldWin(false)) {
                        UserTips.ins().showTips("\u91D1\u5E01\u4E0D\u8DB3");
                    }
                }
                break;
            case this.mixBtn:
                this.moveEffectIn();
                TimerManager.ins().doTimer(400, 1, function () {
                    NeiGong.ins().sendNeiGongUpStage(_this.curRole);
                    SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
                }, this);
                break;
            case this.oneKeyUp:
                if (this.isAutoUp) {
                    this.stopAutoUp();
                }
                else {
                    if (!this.canUp) {
                        UserTips.ins().showTips("\u91D1\u5E01\u4E0D\u8DB3");
                        return;
                    }
                    this.isAutoUp = true;
                    this.oneKeyUp.label = "\u505C \u6B62";
                    TimerManager.ins().doTimer(300, 0, this.autoUpStar, this);
                }
                break;
            case this.UplevelBtn0:
                NeiGong.ins().sendNeiGongAct(this.curRole);
                break;
        }
    };
    NeiGongWin.prototype.stopAutoUp = function () {
        this.isAutoUp = false;
        if (this.oneKeyUp)
            this.oneKeyUp.label = "\u4E00\u952E\u4FEE\u70BC";
        TimerManager.ins().remove(this.autoUpStar, this);
    };
    NeiGongWin.prototype.autoUpStar = function () {
        if (this.canUp && this.data.canMix == false && this.isNext) {
            NeiGong.ins().sendNeiGongUpLevel(this.curRole);
            SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
        }
        else {
            this.stopAutoUp();
        }
    };
    NeiGongWin.prototype.moveEffectOut = function (id) {
        var _this = this;
        var tt = egret.Tween.get(this["eff_9"]);
        tt.call(function () {
            _this.moveInMc.playFile(RES_DIR_EFF + "neigongbaozhaeff", 1, null, false);
        }, this).wait(100).call(function () {
            DisplayUtils.removeFromParent(_this.upLevelMc);
            _this.ball.addChild(_this.upLevelMc);
            _this.upLevelMc.x = _this.mcPos[id][0];
            _this.upLevelMc.y = _this.mcPos[id][1];
            _this.upLevelMc.rotation = _this.mcPos[id][2];
            _this.upLevelMc.playFile(RES_DIR_EFF + "piaodongqipaohuang", 1, function () {
                if (_this.effs[id])
                    _this.effs[id].playFile(RES_DIR_EFF + "feishengfire", -1);
                var len = _this.data.level;
                for (var i = 0; i < 10; i++) {
                    _this["point_" + i].source = i >= len ? "neigongzhuzi2" : "neigongzhuzi1";
                }
                if (len > 0)
                    DisplayUtils.drawCir(_this._shap, (_this.lineGroup.width >> 1) + 2, (len - 1) * (180 + 32) / 9);
                else
                    _this._shap.graphics.clear();
            }, true);
        }, this);
    };
    NeiGongWin.prototype.moveEffectIn = function () {
        var _this = this;
        for (var i in this.effs) {
            var t = egret.Tween.get(this["eff_" + i]);
            t.to({ "x": 280, "y": 320, "scaleX": 1, "scaleY": 1 }, 390).to({ "alpha": 0 }, 10);
        }
        for (var i = 0; i < 10; i++) {
            this.isLights[i] = false;
        }
        var tt = egret.Tween.get(this["eff_9"]);
        tt.wait(400).call(function () {
            _this.moveInMc.playFile(RES_DIR_EFF + "neigongbaozhaeff", 1, null, false);
        }, this).call(function () {
            if (!_this.stageMc.parent)
                _this.stageGroup.addChild(_this.stageMc);
            _this.stageMc.playFile(RES_DIR_EFF + "neigongshengjieff", 1, function () {
                DisplayUtils.removeFromParent(_this.stageMc);
            });
        }, this);
        for (var i = 0; i < 10; i++) {
            this["point_" + i].source = "neigongzhuzi2";
        }
    };
    NeiGongWin.prototype.getAttrByType = function (attrs, attr) {
        var len = attrs.length;
        for (var i = 0; i < len; i++) {
            if (attrs[i].type == attr.type && attrs[i].value != attr.value) {
                return " " + AttributeData.getAttStrByType(attrs[i], 1, "", false, false);
            }
        }
        return "";
    };
    NeiGongWin.prototype.seteffectPost = function () {
        var len = this.data ? this.data.level : 0;
        for (var i = 0; i < 10; i++) {
            var point = this.starPoint[i];
            if (point) {
                this["eff_" + i].x = i < len ? point.x : 280;
                this["eff_" + i].y = i < len ? point.y : 320;
                this["eff_" + i].scaleX = 1;
                this["eff_" + i].scaleY = 1;
                this["eff_" + i].alpha = 1;
            }
        }
    };
    NeiGongWin.prototype.upDataExpMcBall = function (value, total) {
        DisplayUtils.drawrect(this._ballShap, this.mcWidth, this.mcHeight);
        this.toHeight = this.mcHeight * (value / total);
        this.currHeight = this.toHeight >= this.mcHeight ? this.mcHeight : this.toHeight;
    };
    Object.defineProperty(NeiGongWin.prototype, "currHeight", {
        get: function () {
            return this._currHeight;
        },
        set: function (value) {
            this._currHeight = value;
            var y = this.mcHeight - Math.floor(this._currHeight);
            var t = egret.Tween.get(this._ballShap);
            t.to({ y: y }, 200).call(function () {
            }, this);
        },
        enumerable: true,
        configurable: true
    });
    NeiGongWin.prototype.destoryView = function () {
    };
    return NeiGongWin;
}(BaseView));
__reflect(NeiGongWin.prototype, "NeiGongWin");
//# sourceMappingURL=NeiGongWin.js.map