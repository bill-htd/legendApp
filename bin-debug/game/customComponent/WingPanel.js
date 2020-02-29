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
var WingPanel = (function (_super) {
    __extends(WingPanel, _super);
    function WingPanel() {
        var _this = _super.call(this) || this;
        _this.curRole = 0;
        _this._lastLv = 0;
        _this._isAutoUp = false;
        _this.barbc = new ProgressBarEff();
        _this.currViewNum = 0;
        _this.lastTimeDown = 0;
        _this.rapetNum = 0;
        return _this;
    }
    WingPanel.prototype.childrenCreated = function () {
        this.init();
    };
    WingPanel.prototype.init = function () {
        this.boostPrice1.setType(MoneyConst.wing);
        this.barbc.setWidth(525);
        this.barbc.x = 10;
        this.barbc.y = -15;
        this.expGroup.addChild(this.barbc);
        this.mc = new MovieClip;
        this.mc.x = 214;
        this.mc.y = 245;
        this.wingImg.touchEnabled = false;
        this.reliveEff = new MovieClip();
        this.reliveEff.x = 280;
        this.reliveEff.y = 588;
        this.reliveEff.scaleX = 1.3;
        this.reliveEff.scaleY = 1.1;
        this.skillIconArr = [];
        for (var i = 0; i < 5; i++) {
            this.skillIconArr[i] = this["itemicon" + i];
        }
        this.danItemID = GlobalConfig.WingCommonConfig.levelItemid;
    };
    WingPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.openStatusBtn, this.onTap);
        this.addTouchEvent(this.boostBtn1, this.onTap);
        this.addTouchEvent(this.checkBoxs, this.isShowUpGradeBtn);
        this.addTouchEvent(this.rightBtn, this.onTap);
        this.addTouchEvent(this.leftBtn, this.onTap);
        this.addTouchEvent(this.bigUpLevelBtn, this.onTap);
        this.addTouchEvent(this.boostBtn0, this.onTap);
        this.addTouchEvent(this.shenyu, this.onTap);
        this.addTouchEvent(this.feishengBtn, this.onTap);
        this.addTouchEvent(this.zizhiBtn, this.onTap);
        for (var i = 0; i < 5; i++) {
            this.addTouchEvent(this.skillIconArr[i], this.skillItemClick);
        }
        this.observe(Wing.ins().postBoost, this.showBoost);
        this.observe(Wing.ins().postWingUpgrade, this.updateLevel);
        this.observe(Wing.ins().postActivate, this.setWingData);
        this.observe(Wing.ins().postWingEquip, this.setWingData);
        this.observe(Wing.ins().postWingTime, this.setTimeDown);
        this.observe(UserBag.ins().postItemChange, this.isShowUpGradeBtn);
        this.observe(UserBag.ins().postItemAdd, this.isShowUpGradeBtn);
        this.observe(UserBag.ins().postItemDel, this.isShowUpGradeBtn);
        this.observe(GodWingRedPoint.ins().postGodWingRedPoint, this.updateRedPoint);
        this.observe(Wing.ins().postUseDanSuccess, this.setWingData);
        this.barbc.reset();
        this.setWingData();
        this.updateLevel();
        this.updateRedPoint();
    };
    WingPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.openStatusBtn, this.onTap);
        this.removeTouchEvent(this.boostBtn1, this.onTap);
        this.removeTouchEvent(this.checkBoxs, this.isShowUpGradeBtn);
        this.removeTouchEvent(this.rightBtn, this.onTap);
        this.removeTouchEvent(this.leftBtn, this.onTap);
        this.removeTouchEvent(this.boostBtn0, this.onTap);
        this.removeTouchEvent(this.bigUpLevelBtn, this.onTap);
        this.removeTouchEvent(this.shenyu, this.onTap);
        this.removeTouchEvent(this.feishengBtn, this.onTap);
        this.removeTouchEvent(this.zizhiBtn, this.onTap);
        for (var i = 0; i < 5; i++) {
            this.removeTouchEvent(this.skillIconArr[i], this.skillItemClick);
        }
        TimerManager.ins().remove(this.autoUpStar, this);
        this.removeObserve();
        if (this._isAutoUp) {
            this.stopAutoUp();
        }
        TimerManager.ins().remove(this.refushTimeLabel, this);
    };
    WingPanel.prototype.updateLevel = function () {
        var wingSkills = SubRoles.ins().getSubRoleByIndex(this.curRole).wingSkillData;
        var curIndex = 0;
        for (var i = 0; i < 5; i++) {
            if (wingSkills[i] && wingSkills[i] > 0) {
                this.skillIconArr[i].data = wingSkills[i];
                this["openTxt" + i].text = "";
                curIndex = i + 1;
            }
            else {
                var level = Wing.ins().getLevelBySkill(i);
                this["openTxt" + i].text = level + 1 + "\u9636\u5F00\u542F";
                var cfg = GlobalConfig.WingLevelConfig[level];
                if (cfg && cfg.pasSkillId) {
                    this.skillIconArr[i].data = cfg.pasSkillId;
                    this.skillIconArr[i].blackImg.visible = true;
                }
            }
        }
        if (curIndex < 5) {
            var icon = void 0;
            var wingConfig = GlobalConfig.WingLevelConfig;
            var idx = 0;
            for (var k in wingConfig) {
                var cfg = wingConfig[k];
                if (cfg && cfg.pasSkillId) {
                    icon = cfg.pasSkillId;
                    if (idx == curIndex)
                        break;
                    idx++;
                }
            }
            if (icon) {
                this.skillIconArr[curIndex].data = icon;
                this.skillIconArr[curIndex].blackImg.visible = true;
            }
        }
        if (this._isAutoUp) {
            this.stopAutoUp();
        }
        this.setWingData();
    };
    WingPanel.prototype.updateDans = function () {
        this.redPoint1.visible = Wing.ins().canUseFlyUpByRoleID(this.curRole);
        this.redPoint2.visible = Wing.ins().canUseAptitudeByRoleID(this.curRole);
    };
    WingPanel.prototype.onTap = function (e) {
        var _this = this;
        switch (e.currentTarget) {
            case this.openStatusBtn:
                if (Actor.level >= GlobalConfig.WingCommonConfig.openLevel)
                    this.showOpenMovie();
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:等级不够，无法激活|");
                }
                break;
            case this.boostBtn1:
                if (this._isAutoUp) {
                    this.stopAutoUp();
                }
                this.autoUpStar();
                break;
            case this.rightBtn:
                this.currViewNum++;
                this.setSeeBtnStatu();
                this.setWingView(this.currViewNum);
                break;
            case this.leftBtn:
                this.currViewNum--;
                this.setSeeBtnStatu();
                this.setWingView(this.currViewNum);
                break;
            case this.boostBtn0:
                if (this.boostBtn0.label == "停 止") {
                    if (this._isAutoUp) {
                        this.stopAutoUp();
                    }
                }
                else {
                    this._isAutoUp = true;
                    this.boostBtn0.label = "停 止";
                    TimerManager.ins().doTimer(150, 0, this.autoUpStar, this);
                }
                break;
            case this.bigUpLevelBtn:
                var itemName = GlobalConfig.ItemConfig[this.danItemID].name;
                WarnWin.show("\u786E\u5B9A\u4F7F\u7528" + itemName + "\u63D0\u5347\u7FBD\u7FFC\u5417\uFF1F\n\u8BF4\u660E\uFF1A\n" + GlobalConfig.ItemConfig[this.danItemID].desc, function () {
                    Wing.ins().sendBigUpLevel(_this.curRole);
                }, this);
                break;
            case this.shenyu:
                ViewManager.ins().open(GodWingWin);
                break;
            case this.feishengBtn:
                ViewManager.ins().open(WingFeishengTipsWin, this.curRole);
                break;
            case this.zizhiBtn:
                ViewManager.ins().open(WingZizhiTipsWin, this.curRole);
                break;
        }
    };
    WingPanel.prototype.skillItemClick = function (e) {
        var index = this.skillIconArr.indexOf(e.currentTarget);
        if (index >= 0) {
            if (!this.skillIconArr[index].skillIcon.visible)
                return;
            ViewManager.ins().open(WingSkillTipPanel, Wing.ins().getWingSkillByIndex(index));
        }
    };
    WingPanel.prototype.stopAutoUp = function () {
        this._isAutoUp = false;
        this.boostBtn0.label = "一键升阶";
        TimerManager.ins().remove(this.autoUpStar, this);
    };
    WingPanel.prototype.autoUpStar = function () {
        var config = GlobalConfig.WingLevelConfig[this._wingsData.lv];
        var count = UserBag.ins().getBagGoodsCountById(0, config.itemId);
        if (count >= config.itemNum) {
            Wing.ins().sendBoost(this.curRole, 0);
        }
        else if (this.checkBoxs.selected) {
            if (Actor.yb >= config.itemNum * config.itemPrice) {
                Wing.ins().sendBoost(this.curRole, 1);
            }
            else {
                this.stopAutoUp();
            }
        }
        else {
            this.stopAutoUp();
            UserTips.ins().showTips("|C:0xf3311e&T:羽毛不足，可自动消耗元宝升级|");
        }
    };
    WingPanel.prototype.notOpenStatus = function () {
        this.expGroup.visible = false;
        this.skillGroup.visible = false;
        this.barbc.visible = false;
        this.boostBtn0.visible = false;
        this.boostBtn1.visible = false;
        this.boostPrice1.visible = false;
        this.powerPanel.visible = false;
        this.openStatusBtn.visible = true;
        this.rightBtn.visible = false;
        this.leftBtn.visible = false;
        this.jihuo.visible = false;
        this.weijihuo.visible = true;
        this.wing.visible = true;
        this.dor1.x = 2;
        this.dor2.x = 558;
        this.shan.visible = false;
        var flag = GlobalConfig.WingCommonConfig.openLevel > Actor.level;
        this.jihuolv.visible = flag;
        this.jihuolv.text = GlobalConfig.WingCommonConfig.openLevel + "\u7EA7\u5F00\u542F";
        this.bigUpLevelBtn.visible = this.redPoint.visible = false;
        if (!flag) {
            this.reliveEff.playFile(RES_DIR_EFF + "chargeff1", -1);
            this.weijihuo.addChild(this.reliveEff);
        }
    };
    WingPanel.prototype.openStatusOpen = function () {
        this.skillGroup.visible = true;
        this.openStatusBtn.visible = false;
        this.barbc.visible = true;
        this.boostBtn0.visible = true;
        this.boostBtn1.visible = true;
        this.powerPanel.visible = true;
        this.rightBtn.visible = true;
        this.leftBtn.visible = true;
        this.jihuo.visible = true;
        this.weijihuo.visible = false;
        this.bigUpLevelBtn.visible = true;
        if (this._wingsData.lv >= Wing.WingMaxLv) {
            this.arrows.visible = false;
            this.nextAttrLabel.text = "";
            this.attrLabel.horizontalCenter = 0;
            this.expGroup.visible = false;
            this.maxInfo.visible = true;
        }
        else {
            this.arrows.visible = true;
            this.attrLabel.horizontalCenter = -100;
            this.expGroup.visible = true;
            this.maxInfo.visible = false;
        }
        this.redPoint.visible = this.bigUpLevelBtn.visible && this._wingsData.lv == Wing.WingExpRedPoint;
        this.shenyu.visible = GameServer.serverOpenDay + 1 >= GlobalConfig.WingCommonConfig.openDay ? true : false;
    };
    WingPanel.prototype.showBoost = function (param) {
        var _this = this;
        var crit = param[0];
        var addExp = param[1];
        var label = new eui.Label;
        label.size = 20;
        var str = "";
        label.textColor = 0x35e62d;
        str = "羽翼经验 + ";
        label.x = 225;
        label.y = 326;
        label.text = str + addExp;
        this.addChild(label);
        var t = egret.Tween.get(label);
        t.to({ "y": label.y - 45 }, 500).call(function () {
            _this.removeChild(label);
        }, this);
        if (crit && (crit == 2 || crit == 5)) {
            var img_1 = new eui.Image("xn_wingup" + crit);
            img_1.horizontalCenter = 0;
            img_1.verticalCenter = 0;
            img_1.scaleX = img_1.scaleY = 0.5;
            var t_1 = egret.Tween.get(img_1);
            t_1.to({ "scaleX": 1.5, "scaleY": 1.5, "alpha": 0 }, 500).call(function () {
                DisplayUtils.removeFromParent(img_1);
            }, this);
            this.actEff.addChild(img_1);
        }
        this.expBarChange();
        this.updateAtt();
        this.isShowUpGradeBtn();
    };
    WingPanel.prototype.setWingView = function (lv) {
        this.updateDans();
        if (lv > Wing.WingMaxLv || lv < 0) {
            return;
        }
        var tempConfig = GlobalConfig.WingLevelConfig[lv];
        this.wingImg.source = tempConfig.appearance + "_png";
        this.nameTxt.text = tempConfig.name;
    };
    WingPanel.prototype.setWingData = function () {
        this._wingsData = SubRoles.ins().getSubRoleByIndex(this.curRole).wingsData;
        this.wingImg.source = this._wingsData.getImgSource();
        this.currViewNum = this._wingsData.lv;
        this.setSeeBtnStatu();
        var cfg = GlobalConfig.WingLevelConfig[this._wingsData.lv];
        this.nameTxt.text = cfg.name;
        this.updateDans();
        if (this._wingsData.openStatus) {
            this.openStatusOpen();
        }
        else {
            this.notOpenStatus();
            return;
        }
        this.expBarChange();
        this.updateAtt();
        this.isShowUpGradeBtn();
        this.setTimeDown();
        if (this._lastLv == 0)
            this._lastLv = this._wingsData.lv;
        if (this._lastLv != this._wingsData.lv) {
            this._lastLv = this._wingsData.lv;
        }
    };
    WingPanel.prototype.setSeeBtnStatu = function () {
        if (this.currViewNum >= Wing.WingMaxLv || this.currViewNum >= this._wingsData.lv + 1) {
            this.rightBtn.enabled = false;
            this.leftBtn.enabled = true;
        }
        else if (this.currViewNum <= 0) {
            this.leftBtn.enabled = false;
            this.rightBtn.enabled = true;
        }
        else {
            this.leftBtn.enabled = true;
            this.rightBtn.enabled = true;
        }
    };
    WingPanel.prototype.setTimeDown = function () {
        var config = GlobalConfig.WingLevelConfig[this._wingsData.lv];
        if (!config) {
            return;
        }
        TimerManager.ins().remove(this.refushTimeLabel, this);
        if (config.clearTime) {
            this.clearGroup.visible = true;
            if (this._wingsData.clearTime > 0) {
                this.lastTime.text = "剩余时间：";
                this.lastTimeDown = Math.floor((DateUtils.formatMiniDateTime(this._wingsData.clearTime) - GameServer.serverTime) / 1000);
                this.lastTimeDown = Math.max(0, this.lastTimeDown);
                this.timeLabel.text = DateUtils.getFormatBySecond(this.lastTimeDown, 1);
                TimerManager.ins().remove(this.refushTimeLabel, this);
                TimerManager.ins().doTimer(1000, this.lastTimeDown, this.refushTimeLabel, this);
            }
            else {
                this.lastTime.text = "";
                this.timeLabel.text = "";
                TimerManager.ins().remove(this.refushTimeLabel, this);
            }
        }
        else {
            this.clearGroup.visible = false;
        }
        this.noclean.visible = !this.clearGroup.visible;
    };
    WingPanel.prototype.refushTimeLabel = function () {
        if (this.lastTimeDown > 0) {
            --this.lastTimeDown;
            this.timeLabel.text = DateUtils.getFormatBySecond(this.lastTimeDown, 1);
        }
    };
    WingPanel.prototype.updateAtt = function () {
        var config = GlobalConfig.WingLevelConfig[this._wingsData.lv];
        var nextLvConfig = GlobalConfig.WingLevelConfig[this._wingsData.lv + 1];
        var power = 0;
        this._totalPower = UserBag.getAttrPower(config.attr);
        var addAttrs = this.getDanAttrs(this._wingsData.lv);
        this._totalPower += UserBag.getAttrPower(addAttrs);
        this.attrLabel.text = AttributeData.getAttStr(AttributeData.AttrAddition(addAttrs, config.attr), 1);
        if (this._wingsData && this._wingsData.exp && nextLvConfig) {
            var tempAttr = [];
            var attr = nextLvConfig.attr;
            var configPercent = GlobalConfig.WingCommonConfig.tempattr ? GlobalConfig.WingCommonConfig.tempattr : 1;
            for (var index = 0; index < attr.length; index++) {
                var attrs = new AttributeData;
                attrs.type = attr[index].type;
                attrs.value = Math.ceil((this._wingsData.exp / config.exp) * (configPercent * attr[index].value));
                tempAttr.push(attrs);
            }
            this.attrTempLabel.text = AttributeData.getAttStr(tempAttr, 1, 1, "（临时+", false, false, null, "）");
            power = UserBag.getAttrPower(tempAttr);
            this.attrGroup.horizontalCenter = -143;
        }
        else {
            this.attrTempLabel.text = "";
            this.attrGroup.horizontalCenter = -100;
        }
        this._totalPower = this._totalPower + power;
        this.powerPanel.setPower(this._totalPower);
        if (this._wingsData.lv < Wing.WingMaxLv) {
            this.nextAttrLabel.text = AttributeData.getAttStr(AttributeData.AttrAddition(addAttrs, nextLvConfig.attr), 1);
        }
    };
    WingPanel.prototype.getDanAttrs = function (lv) {
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var config = GlobalConfig.WingLevelConfig[lv];
        var len = config.attr.length;
        var pAttr = [];
        for (var i = 0; i < len; i++)
            pAttr.push(new AttributeData(config.attr[i].type, Math.floor(config.attr[i].value * GlobalConfig.WingCommonConfig.flyPill / 10000 * role.wingsData.flyUpDan)));
        var attrs = GlobalConfig.WingCommonConfig.attrPill;
        len = attrs.length;
        for (var i = 0; i < len; i++)
            pAttr.push(new AttributeData(attrs[i].type, attrs[i].value * role.wingsData.aptitudeDan));
        attrs = GlobalConfig.WingCommonConfig.flyPillAttr;
        len = attrs.length;
        for (var i = 0; i < len; i++)
            pAttr.push(new AttributeData(attrs[i].type, attrs[i].value * role.wingsData.flyUpDan));
        return pAttr;
    };
    WingPanel.prototype.expBarChange = function () {
        var starConfig = GlobalConfig.WingLevelConfig[this._wingsData.lv];
        var maxExp = starConfig.exp;
        if (this.barbc.getMaxValue() != maxExp) {
            this.barbc.setData(this._wingsData.exp, maxExp);
            this.barbc.setValue(this._wingsData.exp);
        }
        else {
            this.barbc.setValue(this._wingsData.exp);
        }
    };
    WingPanel.prototype.isShowUpGradeBtn = function () {
        this.updateDans();
        if (this._wingsData.lv >= Wing.WingMaxLv) {
            return;
        }
        var config = GlobalConfig.WingLevelConfig[this._wingsData.lv];
        if (this._wingsData.lv >= Wing.WingMaxLv) {
            this.boostBtn1.visible = false;
            this.boostPrice1.visible = false;
            this.bigUpLevelBtn.visible = false;
        }
        else {
            this.boostBtn1.visible = true;
            this.boostPrice1.visible = true;
            var count = UserBag.ins().getBagGoodsCountById(0, this.danItemID);
            this.bigUpLevelBtn.visible = count > 0;
            var itemData = UserBag.ins().getBagItemById(config.itemId);
            if (itemData) {
                if (itemData.count < config.itemNum && this.checkBoxs.selected) {
                    this.boostPrice1.setType(MoneyConst.yuanbao);
                    this.boostPrice1.setPrice(config.itemPrice * config.itemNum, Actor.yb);
                }
                else {
                    this.boostPrice1.setType(MoneyConst.wing);
                    this.boostPrice1.setPrice(config.itemNum, itemData.count);
                }
            }
            else {
                if (this.checkBoxs.selected) {
                    this.boostPrice1.setType(MoneyConst.yuanbao);
                    this.boostPrice1.setPrice(config.itemPrice * config.itemNum, Actor.yb);
                }
                else {
                    this.boostPrice1.setType(MoneyConst.wing);
                    this.boostPrice1.setPrice(config.itemNum, 0);
                }
            }
        }
        this.redPoint.visible = this.bigUpLevelBtn.visible && this._wingsData.lv == Wing.WingExpRedPoint;
    };
    WingPanel.prototype.showOpenMovie = function () {
        var _this = this;
        StageUtils.ins().setTouchChildren(false);
        DisplayUtils.removeFromParent(this.reliveEff);
        this.openStatusBtn.visible = false;
        if (!this.flyUpEffect) {
            this.flyUpEffect = new MovieClip();
            var p_1 = this.flyUpEffect.localToGlobal();
            p_1.x = 290;
            p_1.y = 400;
            this.flyUpEffect.globalToLocal(p_1.x, p_1.y, p_1);
            this.flyUpEffect.x = p_1.x;
            this.flyUpEffect.y = p_1.y;
        }
        this.wingeff.addChild(this.flyUpEffect);
        this.flyUpEffect.playFile(RES_DIR_EFF + "functionopeneff", -1);
        var masksp = new egret.Sprite();
        var square = new egret.Shape();
        square.graphics.beginFill(0xffffff);
        square.graphics.drawRect(0, 0, 640, 640);
        square.graphics.endFill();
        masksp.anchorOffsetX = 0;
        masksp.anchorOffsetY = 0;
        var p = masksp.localToGlobal();
        p.x = 0;
        p.y = 640;
        masksp.globalToLocal(p.x, p.y, p);
        masksp.x = p.x;
        masksp.y = p.y;
        masksp.addChild(square);
        this.wingeff.addChild(masksp);
        this.flyUpEffect.mask = masksp;
        var tween0 = egret.Tween.get(masksp);
        tween0.to({ "y": 0 }, 1500).call(function () {
            egret.Tween.removeTweens(_this.flyUpEffect);
            _this.flyUpEffect.visible = false;
            _this.wingeff.removeChild(masksp);
            _this.wingeff.removeChild(_this.flyUpEffect);
            _this.flowReckEffect();
        });
    };
    WingPanel.prototype.flowReckEffect = function () {
        var _this = this;
        if (!this.openEffect) {
            this.openEffect = new MovieClip();
            this.openEffect.x = 290;
            this.openEffect.y = 400;
        }
        this.addChild(this.openEffect);
        this.openEffect.playFile(RES_DIR_EFF + "wingstart", 1);
        TimerManager.ins().doTimer(500, 1, function () {
            _this.shan.visible = true;
            _this.openEffect.scaleX += 1;
            _this.openEffect.scaleY += 1;
            var tween0 = egret.Tween.get(_this.openEffect, {
                loop: false, onChange: function () {
                    var tween1 = egret.Tween.get(_this.dor1);
                    var tween2 = egret.Tween.get(_this.dor2);
                    var tween3 = egret.Tween.get(_this.shan);
                    tween1.to({ "x": -280 }, 500);
                    tween2.to({ "x": 558 + 280 }, 500).call(function () {
                        Wing.ins().sendActivate(_this.curRole);
                    }, _this);
                    _this.wing.visible = false;
                    tween3.to({ alpha: 0 }, 500);
                    DisplayUtils.removeFromParent(_this.openEffect);
                }
            });
        }, this);
    };
    WingPanel.prototype.updateRedPoint = function () {
        if (this._wingsData.openStatus) {
            this.redPoint0.visible = GodWingRedPoint.ins().getGodWingRedPoint();
        }
        else {
            this.redPoint0.visible = false;
        }
    };
    return WingPanel;
}(BaseView));
__reflect(WingPanel.prototype, "WingPanel");
//# sourceMappingURL=WingPanel.js.map