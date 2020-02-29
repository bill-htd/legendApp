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
var ForgeGemPanel = (function (_super) {
    __extends(ForgeGemPanel, _super);
    function ForgeGemPanel() {
        var _this = _super.call(this) || this;
        _this.curPanel = 3;
        _this.isMax = false;
        _this.isAutoUp = false;
        _this.itemNum = 0;
        _this.itemArr = [];
        _this.eqIndexItems = [];
        _this.isPlay = false;
        _this.name = "\u7CBE\u70BC";
        _this.curPanel = ForgeWin.Page_Select_Gem;
        return _this;
    }
    ForgeGemPanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    ForgeGemPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.getItemTxt.textFlow = (new egret.HtmlTextParser).parser("<u>" + this.getItemTxt.text + "</u>");
    };
    ForgeGemPanel.prototype.open = function (pos, lv) {
        this.addTouchEvent(this.upGradeBtn, this.onTouch);
        this.addTouchEvent(this.getItemTxt, this.onGetItem);
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            this.eqIndexItems.push(this["item" + i]);
            this["item" + i].select.visible = i == pos ? true : false;
            this.addTouchEvent(this["item" + i], this.onSelectItem);
        }
        this.observe(UserBag.ins().postItemAdd, this.setCount);
        this.observe(UserBag.ins().postItemChange, this.setCount);
        this.observe(UserGem.ins().postForgeUpdata, this.updateCallBack);
        this.isMax = false;
        this.changeData(pos, lv, true, true);
        this.stopAutoUp();
        this.cleanEff();
        this.playEff();
    };
    ForgeGemPanel.prototype.close = function () {
        this.removeTouchEvent(this.upGradeBtn, this.onTouch);
        this.removeTouchEvent(this.getItemTxt, this.onGetItem);
        this.removeObserve();
        this.stopAutoUp();
    };
    ForgeGemPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.upGradeBtn:
                if (this.costConfig && this.itemNum >= this.costConfig.soulNum) {
                    UserGem.ins().sendUpGrade(this.curRole, this.pos);
                    SoundUtil.ins().playEffect(SoundUtil.FORGE);
                }
                else {
                    UserWarn.ins().setBuyGoodsWarn(this.costConfig.stoneId, this.costConfig.soulNum - this.itemNum);
                }
                break;
        }
    };
    ForgeGemPanel.prototype.onItemTouch = function (e) {
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var pos = Number(e.currentTarget.name);
        this.changeData(pos, role.getEquipByIndex(pos).gem);
    };
    ForgeGemPanel.prototype.stopAutoUp = function () {
        this.isAutoUp = false;
        TimerManager.ins().remove(this.autoUpStar, this);
    };
    ForgeGemPanel.prototype.autoUpStar = function () {
        if (this.costConfig && this.itemNum >= this.costConfig.soulNum) {
            UserGem.ins().sendUpGrade(this.curRole, this.pos);
            SoundUtil.ins().playEffect(SoundUtil.FORGE);
        }
        else {
            this.isAutoUp = false;
            TimerManager.ins().remove(this.autoUpStar, this);
        }
    };
    ForgeGemPanel.prototype.setPower = function () {
        var model = SubRoles.ins().getSubRoleByIndex(this.curRole);
        this._totalPower = model.getForgeTotalPower(this.curPanel);
        this.powerPanel.setPower(this._totalPower);
    };
    ForgeGemPanel.prototype.changeData = function (pos, lv, bool, ini) {
        if (bool === void 0) { bool = true; }
        if (ini === void 0) { ini = false; }
        this.pos = pos;
        this.lv = lv;
        this.setPower();
        if (bool) {
            this.setCount();
        }
        this.updateItem(ini);
        this.setAttrData();
    };
    ForgeGemPanel.prototype.playEff = function () {
        var _this = this;
        if (this.isPlay) {
            return;
        }
        var effSour = "jljdt";
        this.isPlay = true;
        var speed = 1;
        var leff = new MovieClip();
        leff.playFile(RES_DIR_EFF + effSour, -1);
        this.leftEff.addChild(leff);
        leff.scaleX = 0;
        leff.scaleY = 0.6;
        var reff = new MovieClip();
        reff.playFile(RES_DIR_EFF + effSour, -1);
        this.rightEff.addChild(reff);
        reff.y -= 1;
        reff.scaleX = 0;
        reff.scaleY = 0.6;
        var beff = new MovieClip();
        beff.playFile(RES_DIR_EFF + effSour, -1);
        this.buttonEff.addChild(beff);
        beff.x += 12;
        beff.y += 2;
        beff.scaleX = 0;
        beff.scaleY = 0.6;
        beff.$setRotation(90);
        var leftEff2 = new MovieClip();
        leftEff2.playFile(RES_DIR_EFF + effSour, -1);
        this.leftEff2.addChild(leftEff2);
        leftEff2.scaleX = 0;
        leftEff2.scaleY = 0.4;
        var rightEff2 = new MovieClip();
        rightEff2.playFile(RES_DIR_EFF + effSour, -1);
        this.rightEff2.addChild(rightEff2);
        rightEff2.scaleX = 0;
        rightEff2.scaleY = 0.4;
        var obliqueleft = new MovieClip();
        obliqueleft.playFile(RES_DIR_EFF + effSour, -1);
        this.obliqueleft.addChild(obliqueleft);
        obliqueleft.scaleX = 0;
        obliqueleft.scaleY = 0.4;
        var obliqueright = new MovieClip();
        obliqueright.playFile(RES_DIR_EFF + effSour, -1);
        this.obliqueright.addChild(obliqueright);
        obliqueright.y += 2;
        obliqueright.scaleX = 0;
        obliqueright.scaleY = 0.4;
        var leftEff3 = new MovieClip();
        leftEff3.playFile(RES_DIR_EFF + effSour, -1);
        this.leftEff3.addChild(leftEff3);
        leftEff3.scaleX = 0;
        leftEff3.scaleY = 0.4;
        var rightEff3 = new MovieClip();
        rightEff3.playFile(RES_DIR_EFF + effSour, -1);
        this.rightEff3.addChild(rightEff3);
        rightEff3.scaleX = 0;
        rightEff3.scaleY = 0.4;
        var obliqueleft2 = new MovieClip();
        obliqueleft2.playFile(RES_DIR_EFF + effSour, -1);
        this.obliqueleft2.addChild(obliqueleft2);
        obliqueleft2.scaleX = 0;
        obliqueleft2.scaleY = 0.4;
        var obliqueright2 = new MovieClip();
        obliqueright2.playFile(RES_DIR_EFF + effSour, -1);
        this.obliqueright2.addChild(obliqueright2);
        obliqueright2.scaleX = 0;
        obliqueright2.scaleY = 0.4;
        var leftEff4 = new MovieClip();
        leftEff4.playFile(RES_DIR_EFF + effSour, -1);
        this.leftEff4.addChild(leftEff4);
        leftEff4.scaleX = 0;
        leftEff4.scaleY = 0.4;
        var rightEff4 = new MovieClip();
        rightEff4.playFile(RES_DIR_EFF + effSour, -1);
        rightEff4.x = 0;
        rightEff4.y = -1;
        this.rightEff4.addChild(rightEff4);
        rightEff4.scaleX = 0;
        rightEff4.scaleY = 0.4;
        var maxX = 0.19;
        var maxX2 = 0.09;
        var maxX3 = 0.023;
        var maxX4 = 0.15;
        var t1 = egret.Tween.get(leff);
        var t2 = egret.Tween.get(reff);
        t2.to({ scaleX: maxX }, 250 * speed);
        t1.to({ scaleX: maxX }, 250 * speed).call(function () {
            var t3 = egret.Tween.get(beff);
            t3.to({ scaleX: 0.162 }, 250 * speed).call(function () {
                var t4 = egret.Tween.get(leftEff2);
                var t5 = egret.Tween.get(rightEff2);
                t5.to({ scaleX: maxX2 }, 250 * speed);
                t4.to({ scaleX: maxX2 }, 250 * speed).call(function () {
                    var t6 = egret.Tween.get(obliqueleft);
                    var t7 = egret.Tween.get(obliqueright);
                    t7.to({ scaleX: maxX3 }, 50 * speed);
                    t6.to({ scaleX: maxX3 }, 50 * speed).call(function () {
                        var t8 = egret.Tween.get(leftEff3);
                        var t9 = egret.Tween.get(rightEff3);
                        t9.to({ scaleX: maxX4 }, 250 * speed);
                        t8.to({ scaleX: maxX4 }, 250 * speed).call(function () {
                            var t10 = egret.Tween.get(obliqueleft2);
                            var t11 = egret.Tween.get(obliqueright2);
                            t11.to({ scaleX: maxX3 }, 50 * speed);
                            t10.to({ scaleX: maxX3 }, 50 * speed).call(function () {
                                var t12 = egret.Tween.get(leftEff4);
                                var t13 = egret.Tween.get(rightEff4);
                                t13.to({ scaleX: maxX2 }, 250 * speed);
                                t12.to({ scaleX: maxX2 }, 250 * speed).call(function () {
                                    _this.isPlay = false;
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    ForgeGemPanel.prototype.cleanEff = function () {
        this.leftEff.removeChildren();
        this.rightEff.removeChildren();
        this.buttonEff.removeChildren();
        this.leftEff2.removeChildren();
        this.rightEff2.removeChildren();
        this.obliqueleft.removeChildren();
        this.obliqueright.removeChildren();
        this.leftEff3.removeChildren();
        this.rightEff3.removeChildren();
        this.obliqueleft2.removeChildren();
        this.obliqueright2.removeChildren();
        this.leftEff4.removeChildren();
        this.rightEff4.removeChildren();
    };
    ForgeGemPanel.prototype.updateCallBack = function () {
        var _this = this;
        var mc = new MovieClip;
        mc.x = this.new.x + this.new.width / 2;
        mc.y = this.new.y + this.new.height / 2;
        this.itemGroup2.addChild(mc);
        mc.playFile(RES_DIR_EFF + "forgeSuccess", 1, function () {
            var roleData = SubRoles.ins().getSubRoleByIndex(_this.curRole);
            var equipData = roleData.equipsData;
            _this.now.updateItem(equipData[_this.pos].item.itemConfig, _this.pos, equipData[_this.pos].gem, _this.itemNum, false);
            _this.new.updateItem(equipData[_this.pos].item.itemConfig, _this.pos, equipData[_this.pos].gem + 1, _this.itemNum, false);
        });
    };
    ForgeGemPanel.prototype.updateItem = function (ini) {
        var roleData = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var equipData = roleData.equipsData;
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            var level = equipData[i].gem;
            var iNum = this.itemNum;
            if (ini && i == this.pos) {
                var openConfig = GlobalConfig.StoneOpenConfig[i];
                if (Actor.level >= openConfig.openLv) {
                    this.lv = equipData[this.pos].gem;
                    this["item" + i].select.visible = true;
                    this.xjyl.visible = false;
                }
                this.now.updateItem(equipData[i].item.itemConfig, i, level, this.itemNum, false);
                this.new.updateItem(equipData[i].item.itemConfig, i, level + 1, this.itemNum, false);
            }
            if (!iNum) {
                var eqId = equipData[i].gem ? equipData[i].gem : 1;
                var cfg = GlobalConfig.StoneLevelCostConfig[eqId];
                if (cfg) {
                    iNum = UserBag.ins().getBagGoodsCountById(0, cfg.stoneId);
                }
            }
            this["item" + i].data = { item: equipData[i].item.itemConfig, pos: i, lv: equipData[i].gem, itemNum: iNum };
        }
    };
    ForgeGemPanel.prototype.onSelectItem = function (e) {
        var index = this.eqIndexItems.indexOf(e.currentTarget);
        if (index == -1)
            return;
        if (this.isPlay) {
            this.isPlay = false;
            this.cleanEff();
        }
        var showIndex = this.pos;
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            if (this["item" + i].select.visible)
                showIndex = i;
            this["item" + i].select.visible = false;
        }
        var isSelect = false;
        var roleData = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var equipData = roleData.equipsData;
        var openConfig = GlobalConfig.StoneOpenConfig[index];
        var tips = "";
        switch (e.currentTarget) {
            case this["item" + index]:
                if (Actor.level >= openConfig.openLv) {
                    this.cleanEff();
                    this.playEff();
                    this.pos = index;
                    this.lv = equipData[this.pos].gem;
                    isSelect = true;
                    this["item" + index].select.visible = true;
                    this.xjyl.visible = false;
                    this.now.updateItem(equipData[index].item.itemConfig, index, equipData[index].gem, this.itemNum, false);
                    this.new.updateItem(equipData[index].item.itemConfig, index, equipData[index].gem + 1, this.itemNum, false);
                }
                else {
                    tips = openConfig.openLv + "级开启";
                }
                break;
        }
        if (!isSelect) {
            this["item" + showIndex].select.visible = true;
            UserTips.ins().showTips(tips);
        }
        this.setAttrData();
        this.setCount();
    };
    ForgeGemPanel.prototype.setAttrData = function () {
        var cruCfg;
        cruCfg = UserForge.ins().getForgeConfigByPos(this.pos, this.lv, this.curPanel);
        var attrList = cruCfg.attr || [];
        var len = attrList.length;
        attrList.sort(AttributeData.sortAttribute);
        for (var i = 0; i < 4; i++) {
            this["attr" + i].text = len > i ? AttributeData.getAttStrByType(attrList[i], 0.5) : "";
        }
        var nextConfig;
        nextConfig = UserForge.ins().getForgeConfigByPos(this.pos, this.lv + 1, this.curPanel);
        var str = "";
        if (nextConfig) {
            this.isMax = false;
            var addList = nextConfig.attr || [];
            addList.sort(AttributeData.sortAttribute);
            for (var i = 0; i < 4; i++) {
                var str_1 = "";
                if (len > i) {
                    var attr = attrList[i];
                    str_1 = this.getAttrByType(addList, attr);
                }
                this["arrow" + i].visible = str_1.length > 0;
                this["addAttr" + i].text = str_1;
            }
        }
        else {
            this.isMax = true;
            for (var i = 0; i < 4; i++) {
                this["arrow" + i].visible = false;
                this["addAttr" + i].text = "";
            }
        }
        this.attr.text = str;
        this.upInfo.visible = !this.isMax;
        this.maxDesc.visible = this.isMax;
        if (this.maxDesc.visible) {
            this.now.hideAdd();
            this.new.hideAdd();
        }
    };
    ForgeGemPanel.prototype.onGetItem = function (e) {
        UserWarn.ins().setBuyGoodsWarn(this.costConfig.stoneId, 1);
    };
    ForgeGemPanel.prototype.setCount = function () {
        this.costConfig = UserForge.ins().getStoneLevelCostConfigByLv(this.lv + 1);
        var cost = 0;
        if (this.costConfig) {
            this.itemNum = Actor.soul;
            cost = this.costConfig.soulNum;
        }
        var colorStr = "";
        if (this.itemNum >= cost)
            colorStr = ColorUtil.GREEN_COLOR;
        else
            colorStr = ColorUtil.RED_COLOR;
        this.countLabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + this.itemNum + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + cost + "</font> ");
        this.buyStoneUpdateItem();
    };
    ForgeGemPanel.prototype.buyStoneUpdateItem = function () {
        this.updateItem();
    };
    ForgeGemPanel.prototype.getAttrByType = function (attrs, attr) {
        if (!attr)
            return "";
        var len = attrs.length;
        for (var i = 0; i < len; i++) {
            if (attrs[i].type == attr.type && attrs[i].value != attr.value) {
                return "" + attrs[i].value;
            }
        }
        return "";
    };
    return ForgeGemPanel;
}(BaseEuiView));
__reflect(ForgeGemPanel.prototype, "ForgeGemPanel");
//# sourceMappingURL=ForgeGemPanel.js.map