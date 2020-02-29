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
var GwWeaponView = (function (_super) {
    __extends(GwWeaponView, _super);
    function GwWeaponView() {
        var _this = _super.call(this) || this;
        _this._selectIndex = 0;
        return _this;
    }
    GwWeaponView.prototype.childrenCreated = function () {
        this.clickRect.touchEnabled = true;
        this.expschedule.mask = this.maskRect;
        this.detailBtn.touchEnabled = true;
        this.maskPro.touchEnabled = false;
        this.progressImg.mask = this.maskPro;
        this.progressHeadImg = new eui.Image();
        this.exp.addChild(this.progressHeadImg);
        this.progressHeadImg.y = 39;
        this.flameMC = new MovieClip();
        this.flameMC.x = 120;
        this.flameMC.y = 30;
        this.power.addChildAt(this.flameMC, 0);
        this.powerCon = BitmapNumber.ins().createNumPic(0, "8", 5);
        this.powerCon.scaleX = this.power.scaleY = 0.8;
        this.powerCon.x = 105;
        this.powerCon.y = 20;
        this.power.addChild(this.powerCon);
        this.rpImg0.visible = false;
        this.rpImg1.visible = false;
        this.rpImg2.visible = false;
        this.rpImgExp.visible = false;
        this.reset.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.reset.text);
    };
    GwWeaponView.prototype.open = function () {
        this.addTouchEvent(this.weapon0, this.touchHandler);
        this.addTouchEvent(this.weapon1, this.touchHandler);
        this.addTouchEvent(this.weapon2, this.touchHandler);
        this.addTouchEvent(this.clickRect, this.touchHandler);
        this.addTouchEvent(this.detailBtn, this.touchHandler);
        this.addTouchEvent(this.reset, this.touchHandler);
        this.observe(GodWeaponCC.ins().postUpdateInfo, this.updateView);
        this.observe(GodWeaponCC.ins().postUpdateExp, this.updateGwExp);
        this.observe(GodWeaponCC.ins().postGwTask, this.updateView);
        this.observe(GodWeaponRedPoint.ins().postGwTab1, this.showRedPoint);
        this.observe(GodWeaponRedPoint.ins().postGwTab2, this.showRedPoint);
        this.observe(GodWeaponRedPoint.ins().postGwTab3, this.showRedPoint);
        for (var i = 1; i <= 5; i++) {
            this["shengwu" + i].touchEnabled = true;
            this["shengwu" + i].touchChildren = false;
            this.addTouchEvent(this["shengwu" + i], this.touchHandler);
        }
        this.selectIndex = this.getSelectedIndex();
        this.flameMC.playFile(RES_DIR_EFF + "zhanduolibeijing", -1);
        this.godweaponskill.open();
    };
    GwWeaponView.prototype.getSelectedIndex = function (index) {
        if (index == undefined) {
            if (GodWeaponCC.ins().gwTask.taskIdx) {
                index = GodWeaponCC.ins().gwTask.weapon - 1;
            }
            else {
                index = 0;
            }
        }
        return index;
    };
    Object.defineProperty(GwWeaponView.prototype, "selectIndex", {
        get: function () {
            return this._selectIndex;
        },
        set: function (value) {
            this._selectIndex = value;
            var actived = GodWeaponCC.ins().weaponIsActive(value + 1);
            if (actived) {
                this.showWeapon();
            }
            else {
                this.showTask();
            }
            this.selectBtnImage();
            this.showRedPoint();
            this.reset.visible = actived;
        },
        enumerable: true,
        configurable: true
    });
    GwWeaponView.prototype.showTask = function () {
        this.currentState = "task";
        this.gwTask.open(this._selectIndex);
    };
    GwWeaponView.prototype.showWeapon = function () {
        this.currentState = "active";
        this.validateNow();
        var value = this._selectIndex;
        this._curWeapon = GodWeaponCC.ins().getWeaponData(value + 1);
        this.godweaponskill.selectIndex = value;
        var index = value + 1;
        this.weaponName.source = "godweapon_name" + index;
        this.needExp.text = "(" + this._curWeapon.curExp + "/" + this._curWeapon.config.exp + ")";
        this.lvCount.text = "Lv." + this._curWeapon.curLv;
        if (this._curWeapon.skillPoint == 0) {
            this.curPointLabel.textFlow = (new egret.HtmlTextParser).parser('<font color="#d1c28f">神兵等级每提升10级可获得1个技能点</font>');
        }
        else {
            this.curPointLabel.textFlow = (new egret.HtmlTextParser).parser('<font color="#d1c28f">当前可用的技能点：</font>' + this._curWeapon.skillPoint);
        }
        this.updateGwExp();
        this.expschedule.visible = true;
        var num = this._curWeapon.config.everyExp;
        var totalNum = num * 2;
        var curExp = GodWeaponCC.ins().curExp;
        var newScaleY;
        if (curExp < totalNum) {
            newScaleY = 1 * curExp / totalNum;
            if (newScaleY < 0) {
                newScaleY = 0;
            }
        }
        else {
            newScaleY = 1;
        }
        var t = egret.Tween.get(this.maskRect);
        t.to({ scaleY: newScaleY }, 200);
        this.updateGodItemView();
        this.progressHeadImg.source = "godweapon_expfront";
        newScaleY = 1 * this._curWeapon.curExp / this._curWeapon.config.exp;
        t = egret.Tween.get(this.maskPro, { onChange: this.funcChange, onChangeObj: this });
        t.to({ scaleX: newScaleY }, 200);
    };
    GwWeaponView.prototype.selectBtnImage = function () {
        this["selectIcon" + this._selectIndex].visible = true;
        switch (this._selectIndex) {
            case 0:
                this["selectIcon1"].visible = false;
                this["selectIcon2"].visible = false;
                break;
            case 1:
                this["selectIcon0"].visible = false;
                this["selectIcon2"].visible = false;
                break;
            case 2:
                this["selectIcon0"].visible = false;
                this["selectIcon1"].visible = false;
                break;
        }
    };
    GwWeaponView.prototype.showRedPoint = function () {
        var b = GodWeaponCC.ins().maxLvRedPoint();
        if (b) {
            this.rpImg0.visible = GodWeaponCC.ins().weaponIsActive(1) ? true : false;
            this.rpImg1.visible = GodWeaponCC.ins().weaponIsActive(2) ? true : false;
            this.rpImg2.visible = GodWeaponCC.ins().weaponIsActive(3) ? true : false;
            this.rpImgExp.visible = true;
        }
        else {
            this.rpImg0.visible = GodWeaponRedPoint.ins().gwSbRed1;
            this.rpImg1.visible = GodWeaponRedPoint.ins().gwSbRed2;
            this.rpImg2.visible = GodWeaponRedPoint.ins().gwSbRed3;
            this.rpImgExp.visible = false;
        }
    };
    GwWeaponView.prototype.funcChange = function () {
        if (341 * this.maskPro.scaleX < 18) {
            this.progressHeadImg.x = 130;
            this.progressHeadImg.scaleX = 1 * (341 * this.maskPro.scaleX) / 18;
        }
        else {
            this.progressHeadImg.x = 130 + 341 * this.maskPro.scaleX - 18;
            this.progressHeadImg.scaleX = 1;
        }
    };
    GwWeaponView.prototype.updateGodItemView = function () {
        for (var i = 0; i < 5; i++) {
            this["shengwu" + (i + 1)].updateView(GodWeaponCC.ins().getGodItemData(this._selectIndex + 1, i + 1));
        }
    };
    GwWeaponView.prototype.updatePower = function () {
        var ary = GodWeaponCC.ins().gwAddAttr(this.selectIndex);
        var data = [];
        for (var i = 0; i < ary.length; i++) {
            data.push(new AttributeData(ary[i].type, ary[i].value));
        }
        var power = UserBag.getAttrPower(data);
        if (GodWeaponCC.ins().weaponIsActive(this._selectIndex + 1)) {
            var addPoser = 0;
            var dataGw = void 0;
            var max = GodWeaponCC.ins().maxSkillIdAry[this.selectIndex];
            for (var i = 0; i < max; i++) {
                dataGw = GodWeaponCC.ins().getWeaponSkinIdData(this.selectIndex + 1, i);
                if (dataGw.isOpen) {
                    addPoser += dataGw.skillPower;
                }
            }
            power += addPoser;
        }
        BitmapNumber.ins().changeNum(this.powerCon, power, "8", 5);
    };
    GwWeaponView.prototype.updateView = function () {
        this.selectIndex = this.selectIndex;
    };
    GwWeaponView.prototype.updateGwExp = function () {
        this.updatePower();
        this.expcount.text = "" + GodWeaponCC.ins().curExp;
    };
    GwWeaponView.prototype.touchHandler = function (e) {
        if (e.target instanceof eui.Button) {
            switch (e.target) {
                case this.weapon0:
                    this.selectIndex = 0;
                    break;
                case this.weapon1:
                    this.selectIndex = 1;
                    break;
                case this.weapon2:
                    this.selectIndex = 2;
                    break;
            }
        }
        else if (e.target instanceof GwshengwuItem) {
            var index = void 0;
            switch (e.target) {
                case this.shengwu1:
                    index = 1;
                    break;
                case this.shengwu2:
                    index = 2;
                    break;
                case this.shengwu3:
                    index = 3;
                    break;
                case this.shengwu4:
                    index = 4;
                    break;
                case this.shengwu5:
                    index = 5;
                    break;
            }
            this.inlayItem(index);
        }
        else if (e.target == this.clickRect) {
            var dataWeapon = GodWeaponCC.ins().getWeaponData(this.selectIndex + 1);
            if (dataWeapon && dataWeapon.config.everyExp > GodWeaponCC.ins().curExp) {
                UserTips.ins().showTips("\u5F53\u524D\u7ECF\u9A8C\u4E0D\u8DB3");
                return;
            }
            GodWeaponCC.ins().gwshowTips = true;
            GodWeaponCC.ins().roleshowTips = SubRoles.ins().subRolesLen;
            GodWeaponCC.ins().upWeapon(this.selectIndex + 1);
        }
        else if (e.target == this.detailBtn) {
            ViewManager.ins().open(GwAddAttrView, this.selectIndex);
        }
        else if (e.target == this.reset)
            ViewManager.ins().open(GwResetWin, GodWeaponCC.ins().getWeaponData(this.selectIndex + 1));
    };
    GwWeaponView.prototype.inlayItem = function (index) {
        var data = GodWeaponCC.ins().getGodItemData(this._selectIndex + 1, index);
        if (data.isOpen) {
            ViewManager.ins().open(GwShengWuChooseView, data);
        }
        else {
            UserTips.ins().showTips("\u795E\u5175\u7B49\u7EA7\u8FBE\u5230" + data.openLv + "\u7EA7\u5F00\u542F");
        }
    };
    GwWeaponView.prototype.close = function () {
        this.godweaponskill.close();
        this.removeTouchEvent(this.weapon0, this.touchHandler);
        this.removeTouchEvent(this.weapon1, this.touchHandler);
        this.removeTouchEvent(this.weapon2, this.touchHandler);
        this.removeTouchEvent(this.clickRect, this.touchHandler);
        this.removeTouchEvent(this.detailBtn, this.touchHandler);
        for (var i = 1; i <= 5; i++) {
            this.removeTouchEvent(this["shengwu" + i], this.touchHandler);
        }
        this.removeObserve();
    };
    return GwWeaponView;
}(BaseView));
__reflect(GwWeaponView.prototype, "GwWeaponView");
var GwshengwuItem = (function (_super) {
    __extends(GwshengwuItem, _super);
    function GwshengwuItem() {
        return _super.call(this) || this;
    }
    GwshengwuItem.prototype.updateView = function (data) {
        this.data = data;
        if (data) {
            if (data.isOpen) {
                if (data.itemConfig) {
                    this.shengwuImg.source = data.itemConfig.icon + "_png";
                    this.shengwuImg.visible = true;
                    this.add.visible = false;
                    this.rpImgAdd.visible = false;
                    this.frame.source = "godweapon_quality" + (ItemConfig.getQuality(data.itemConfig) + 1);
                }
                else {
                    this.shengwuImg.visible = false;
                    this.add.visible = true;
                    this.frame.source = "godweapon_quality1";
                    if (GwShengWuChooseView.getGwItemType(data).length <= 0) {
                        this.rpImgAdd.visible = false;
                    }
                    else {
                        this.rpImgAdd.visible = true;
                    }
                }
            }
            else {
                this.shengwuImg.visible = false;
                this.add.visible = false;
                this.rpImgAdd.visible = false;
                this.frame.source = "godweapon_quality0";
            }
        }
        else {
            this.frame.source = "godweapon_quality0";
            this.add.visible = false;
            this.shengwuImg.visible = false;
            this.rpImgAdd.visible = false;
        }
    };
    return GwshengwuItem;
}(eui.Component));
__reflect(GwshengwuItem.prototype, "GwshengwuItem");
var GwGodWeaponSkillView = (function (_super) {
    __extends(GwGodWeaponSkillView, _super);
    function GwGodWeaponSkillView() {
        var _this = _super.call(this) || this;
        _this.max = 16;
        return _this;
    }
    GwGodWeaponSkillView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchEnabled = false;
    };
    GwGodWeaponSkillView.prototype.open = function () {
        this.addTouchEvent(this, this.touchHandler);
    };
    Object.defineProperty(GwGodWeaponSkillView.prototype, "selectIndex", {
        get: function () {
            return this._selectIndex;
        },
        set: function (weaponId) {
            this._selectIndex = weaponId;
            this.updateView(weaponId);
        },
        enumerable: true,
        configurable: true
    });
    GwGodWeaponSkillView.prototype.updateView = function (weaponId) {
        switch (weaponId + 1) {
            case 1:
                this.skill_wp1.visible = true;
                this.skill_wp2.visible = false;
                this.skill_wp3.visible = false;
                break;
            case 2:
                this.skill_wp1.visible = false;
                this.skill_wp2.visible = true;
                this.skill_wp3.visible = false;
                break;
            case 3:
                this.skill_wp1.visible = false;
                this.skill_wp2.visible = false;
                this.skill_wp3.visible = true;
                break;
        }
        this.updateWp(weaponId);
    };
    GwGodWeaponSkillView.prototype.updateWp = function (weaponId) {
        var itemV;
        var data;
        var unlocks = [];
        for (var i = 0; i < this.max; i++) {
            itemV = this.getWpSkill(weaponId + 1, i);
            data = GodWeaponCC.ins().getWeaponSkinIdData(weaponId + 1, i);
            itemV.updateView(data, weaponId);
            if (data && data.isOpen && data.config.lineId) {
                for (var j = 0; j < data.config.lineId.length; j++) {
                    this["wp" + (weaponId + 1) + "_lock" + data.config.lineId[j]].visible = false;
                    this["wp" + (weaponId + 1) + "_unlock" + data.config.lineId[j]].visible = true;
                    if (unlocks.indexOf(data.config.lineId[j]) == -1)
                        unlocks.push(data.config.lineId[j]);
                }
            }
            else if (unlocks.indexOf(i) == -1) {
                this["wp" + (weaponId + 1) + "_lock" + i].visible = true;
                this["wp" + (weaponId + 1) + "_unlock" + i].visible = false;
            }
        }
    };
    GwGodWeaponSkillView.prototype.touchHandler = function (e) {
        if (e.target instanceof GwWeaponSkillIcon) {
            var data = e.target.dataThis;
            ViewManager.ins().open(GwSkillTipView, e.target.dataThis);
        }
    };
    GwGodWeaponSkillView.prototype.getWpSkill = function (weaponId, skillId) {
        return this["wp" + weaponId + "_skill" + skillId];
    };
    GwGodWeaponSkillView.prototype.getWpLine = function (weaponId, lineId) {
        return this["wp" + weaponId + "_line" + lineId];
    };
    GwGodWeaponSkillView.prototype.close = function () {
        this.removeTouchEvent(this, this.touchHandler);
        for (var i = 0; i < 3; i++) {
            var itemV = void 0;
            for (var j = 0; j < this.max; j++) {
                itemV = this.getWpSkill(i + 1, j);
                itemV.close();
            }
        }
    };
    return GwGodWeaponSkillView;
}(BaseView));
__reflect(GwGodWeaponSkillView.prototype, "GwGodWeaponSkillView");
var GwWeaponSkillIcon = (function (_super) {
    __extends(GwWeaponSkillIcon, _super);
    function GwWeaponSkillIcon() {
        var _this = _super.call(this) || this;
        _this._isFirst = false;
        _this.imgLight = false;
        _this.skinName = "GwItemSkin";
        _this.touchChildren = false;
        _this.glowImg.visible = false;
        _this._effect = new MovieClip();
        _this.addChildAt(_this._effect, 3);
        _this.touchChildren = false;
        return _this;
    }
    GwWeaponSkillIcon.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
    };
    GwWeaponSkillIcon.prototype.updateView = function (data, weaponId) {
        this.dataThis = data;
        if (this._isFirst == false) {
            this.validateNow();
            this._isFirst = true;
        }
        if (data.isOpen || this.imgLight) {
            var weaponData = GodWeaponCC.ins().getWeaponData(weaponId + 1);
            if (data.skillLv < data.config.upLevel && weaponData && weaponData.skillPoint > 0) {
                if (!this._effect.name) {
                    this._effect.playFile(RES_DIR_EFF + "actIconCircle", -1);
                    this._effect.x = 45;
                    this._effect.y = 45;
                }
                switch (this.dataThis.skillId) {
                    case 16:
                    case 15:
                    case 14:
                    case 13:
                        this._effect.scaleX = this._effect.scaleY = 1.1;
                        break;
                    default:
                        this._effect.scaleX = this._effect.scaleY = 0.6;
                        break;
                }
            }
            else {
                this._effect.dispose();
            }
            this.Img.source = data.config.iconId + "_N";
        }
        else {
            this.glowImg.visible = false;
            this.Img.source = data.config.iconId + "_L";
            if (this._effect)
                this._effect.dispose();
        }
        if (data.addLv > 0 || data.skillLv > 0 || data.isOpen) {
            this.lvCount.visible = true;
            this.lvFrame.visible = true;
            if (data.addLv > 0) {
                this.lvCount.textColor = 0x35e26d;
            }
            if (this.dataThis.skillId == 16) {
                this.lvCount.text = data.lvLabel(true);
            }
            else {
                this.lvCount.text = data.lvLabel();
            }
        }
        else {
            this.lvCount.visible = false;
            this.lvFrame.visible = false;
        }
    };
    GwWeaponSkillIcon.prototype.close = function () {
        this.dataThis = null;
        this._effect.dispose();
    };
    return GwWeaponSkillIcon;
}(BaseView));
__reflect(GwWeaponSkillIcon.prototype, "GwWeaponSkillIcon");
//# sourceMappingURL=GwWeaponView.js.map