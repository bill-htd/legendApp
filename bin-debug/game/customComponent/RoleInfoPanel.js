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
var RoleInfoPanel = (function (_super) {
    __extends(RoleInfoPanel, _super);
    function RoleInfoPanel() {
        var _this = _super.call(this) || this;
        _this.beforeIndex = -1;
        _this.name = "角色";
        return _this;
    }
    RoleInfoPanel.prototype.childrenCreated = function () {
        this.init();
    };
    RoleInfoPanel.prototype.init = function () {
        this.touchEnabled = false;
        this.touchChildren = true;
        this.groupRole.touchEnabled = false;
        this.groupRoleNext.touchEnabled = false;
        this.groupRole.touchChildren = false;
        this.groupRoleNext.touchChildren = false;
        this.equips = [];
        for (var i = 0; i < EquipPos.MAX; i++) {
            this.equips[i] = this['item' + i];
            this.equips[i].touchEnabled = true;
            this.equips[i].isShowJob(false);
            this.equips[i].isShowTips(false);
            this["redPoint" + i].touchEnabled = false;
        }
        this.eff = new MovieClip;
        this.eff.x = this.oneKeyChange.width / 2;
        this.eff.y = this.oneKeyChange.height / 2;
        this.eff.scaleX = 0.85;
        this.eff.scaleY = 0.85;
        this.eff.touchEnabled = false;
        this.suitEff = new MovieClip;
        this.suitEff.x = this.suitImg.x;
        this.suitEff.y = this.suitImg.y;
        this.suitEff3 = new MovieClip;
        this.suitEff3.x = this.suitImg1.x;
        this.suitEff3.y = this.suitImg1.y;
        this.suitEff2 = new MovieClip;
        this.suitEff4 = new MovieClip;
        this.suitEff5 = new MovieClip();
        this.suitEff6 = new MovieClip();
        this.suitEff7 = new MovieClip();
        this.suitEff8 = new MovieClip();
        this.suitEff9 = new MovieClip();
        this.suitEff10 = new MovieClip();
    };
    RoleInfoPanel.prototype.clear = function () {
        this.beforeIndex = -1;
    };
    RoleInfoPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.shuzhuang, this.onClick);
        this.addTouchEvent(this.bless0, this.onClick);
        this.addTouchEvent(this.bless1, this.onClick);
        this.addTouchEvent(this.oneKeyChange, this.onClick);
        this.addTouchEvent(this.roleInfoItem0, this.onClick);
        this.addTouchEvent(this.roleInfoItem1, this.onClick);
        this.addTouchEvent(this.shenlu, this.onClick);
        this.addTouchEvent(this.orange, this.onClick);
        this.addTouchEvent(this.heirloom, this.onClick);
        this.addTouchEvent(this.rune, this.onClick);
        this.addTouchEvent(this.juesexiangxi, this.onClick);
        this.observe(UserEquip.ins().postEquipChange, this.updataEquip);
        this.observe(UserEquip.ins().postAddSpirit, this.updataEquip);
        this.observe(UserEquip.ins().postAddSoul, this.updataEquip);
        this.observe(SpecialRing.ins().postRingUpdate, this.updateRing);
        this.observe(UserForge.ins().postForgeTips, this.delayRedPoint);
        this.observe(GameLogic.ins().postRuneExchange, this.delayRedPoint);
        this.observe(GameLogic.ins().postRuneShatter, this.delayRedPoint);
        this.observe(Rune.ins().postInlayResult, this.delayRedPoint);
        this.observe(UserBag.ins().postHuntStore, this.delayRedPoint);
        this.observe(Dress.ins().postChangeWing, this.setWing);
        this.observe(LongHun.ins().postDateUpdate, this.updateLoongSoul);
        this.observe(LongHun.ins().postStageActive, this.updateLoongSoul);
        this.observe(ShenshouRedpoint.ins().postRedPoint, this.updateLoongSoul);
        this.observe(Dress.ins().postDressInfo, this.setFashionRetPoint);
        this.observe(SpecialRing.ins().postActiveRing, this.delayRedPoint);
        this.observe(UserFb.ins().postFbRingInfo, this.delayRedPoint);
        this.observe(Heirloom.ins().postHeirloomInfo, this.setRoleEff);
        this.observe(Weapons.ins().postWeaponsUse, this.setRoleEff);
        this.observe(UserBag.ins().postItemAdd, this.delayRedPoint);
        this.observe(UserBag.ins().postItemDel, this.delayRedPoint);
        this.observe(UserBag.ins().postItemChange, this.delayRedPoint);
        this.observe(UserBag.ins().postItemCountChange, this.delayRedPoint);
        this.observe(UserFb.ins().postFbRingInfo, this.delayRedPoint);
        this.observe(Actor.ins().postLevelChange, this.delayRedPoint);
        this.observe(JadeNew.ins().postJadeData, this.delayRedPoint);
        this.observe(LyMark.ins().postMarkData, this.delayRedPoint);
        this.updateRing();
        this.updateLoongSoul();
        this.setRetPoint();
        this.updataEquip(false);
        this.setFashionRetPoint();
        this.clearChangeEff();
        if (this.beforeIndex != -1) {
            this.roleChange(this.beforeIndex, this.curRole);
        }
        else {
            this.setRole(this.curRole, this.bodyImg, this.weaponImg);
            this.setSuit(this.curRole, this.suitImg, this.suitEff);
            this.setWeaponsSuit(this.curRole, "sef", this.soulEff, this.suitEff2);
            this.setWeaponEffect(this.curRole, "wsef", this.soulEff, this.suitEff5);
            this.setWeaponEffect(this.curRole, "bodyEffect", this.bodyEff, this.suitEff7, 2);
            this.setWing();
        }
        this.beforeIndex = this.curRole;
        this.setSuitEquips();
    };
    RoleInfoPanel.prototype.close = function () {
        DisplayUtils.removeFromParent(this.eff);
        DisplayUtils.removeFromParent(this.suitEff);
        DisplayUtils.removeFromParent(this.suitEff2);
        DisplayUtils.removeFromParent(this.suitEff3);
        DisplayUtils.removeFromParent(this.suitEff4);
        DisplayUtils.removeFromParent(this.suitEff5);
        DisplayUtils.removeFromParent(this.suitEff6);
        DisplayUtils.removeFromParent(this.suitEff7);
        DisplayUtils.removeFromParent(this.suitEff8);
        DisplayUtils.removeFromParent(this.suitEff9);
        DisplayUtils.removeFromParent(this.suitEff10);
        this.roleInfoItem0.destory();
        this.roleInfoItem1.destory();
    };
    RoleInfoPanel.prototype.clearChangeEff = function () {
        egret.Tween.removeTweens(this.groupRole);
        egret.Tween.removeTweens(this.groupRoleNext);
        this.groupRole.x = 0;
        this.groupRoleNext.x = 580;
        this.groupRole.alpha = 1;
        this.groupRoleNext.alpha = 0;
        this.groupRoleNext.visible = false;
        this.setRole(this.curRole, this.bodyImg, this.weaponImg);
        this.setWing(this.curRole, this.wingImg);
        this.setSuit(this.curRole, this.suitImg, this.suitEff);
        this.setWeaponsSuit(this.curRole, "sef", this.soulEff, this.suitEff2);
        this.setWeaponEffect(this.curRole, "wsef", this.soulEff, this.suitEff5);
        this.setWeaponEffect(this.curRole, "bodyEffect", this.bodyEff, this.suitEff7, 2);
    };
    RoleInfoPanel.prototype.roleChange = function (beforeIndex, nextIndex) {
        if (beforeIndex == nextIndex) {
            this.clearChangeEff();
            return;
        }
        this.groupRoleNext.visible = true;
        this.setWing(beforeIndex, this.wingImg);
        this.setWing(nextIndex, this.nextWingImg);
        this.setRole(beforeIndex, this.bodyImg, this.weaponImg);
        this.setRole(nextIndex, this.nextBodyImg, this.nextWeaponImg);
        this.setSuit(beforeIndex, this.suitImg, this.suitEff);
        this.setSuit(nextIndex, this.suitImg1, this.suitEff3);
        this.setWeaponsSuit(beforeIndex, "sef", this.soulEff, this.suitEff2);
        this.setWeaponsSuit(nextIndex, "nsef", this.nsoulEff, this.suitEff4);
        this.setWeaponEffect(beforeIndex, "wsef", this.soulEff, this.suitEff5);
        this.setWeaponEffect(nextIndex, "nwsef", this.nsoulEff, this.suitEff6);
        this.setWeaponEffect(beforeIndex, "bodyEffect", this.bodyEff, this.suitEff7, 2);
        this.setWeaponEffect(nextIndex, "nbodyEffect", this.nbodyEff, this.suitEff8, 2);
        var t = egret.Tween.get(this.groupRole);
        var t2 = egret.Tween.get(this.groupRoleNext);
        if (beforeIndex < nextIndex) {
            this.groupRoleNext.x = 580;
            t.to({ x: -580, alpha: 0 }, 600);
            t2.to({ x: 0, alpha: 1 }, 600).call(this.clearChangeEff, this);
        }
        else {
            this.groupRoleNext.x = -580;
            t.to({ x: 580, alpha: 0 }, 600);
            t2.to({ x: 0, alpha: 1 }, 600).call(this.clearChangeEff, this);
        }
    };
    RoleInfoPanel.prototype.updateLoongSoul = function () {
        this.redPointShenlu.visible = LongHun.ins().canShowRedPointInAll() || JadeNew.ins().checkRed() || ShenshouRedpoint.ins().redpoint;
    };
    RoleInfoPanel.prototype.updateRing = function () {
        var ringModel = SubRoles.ins().getSubRoleByIndex(this.curRole).exRingsData;
        if (ringModel[0] > 0) {
            this.roleInfoItem0.setImgSource(0, 1);
            this.roleInfoItem0.setLv(0);
            this.roleInfoItem0.setNameTxt("麻痹戒指");
            this.roleInfoItem0.setBgValue("quality4");
            this.roleInfoItem0.setRedPointVisibel(false);
        }
        else {
            this.roleInfoItem0.setImgSource(0, 0);
            this.roleInfoItem0.setLv(0);
            this.roleInfoItem0.setNameTxt("麻痹戒指");
            this.roleInfoItem0.setBgValue("quality0");
        }
        if (ringModel[1] > 0) {
            this.roleInfoItem1.setImgSource(1, 1);
            this.roleInfoItem1.setLv(0);
            this.roleInfoItem1.setNameTxt("护身戒指");
            this.roleInfoItem1.setBgValue("quality4");
            this.roleInfoItem1.setRedPointVisibel(false);
        }
        else {
            this.roleInfoItem1.setImgSource(1, 0);
            this.roleInfoItem1.setLv(0);
            this.roleInfoItem1.setNameTxt("护身戒指");
            this.roleInfoItem1.setBgValue("quality0");
        }
    };
    RoleInfoPanel.prototype.updataEquip = function (delay) {
        if (delay === void 0) { delay = true; }
        var model = SubRoles.ins().getSubRoleByIndex(this.curRole);
        this.setEquip(model);
        if (delay) {
            TimerManager.ins().doTimer(300, 1, this.onDelayReflash, this);
        }
        else {
            this.onDelayReflash();
        }
        this.setSuitEquips();
    };
    RoleInfoPanel.prototype.onDelayReflash = function () {
        UserRole.ins().setCanChange();
    };
    RoleInfoPanel.prototype.setEquip = function (role) {
        if (!role)
            return;
        var len = role.getEquipLen();
        this.weaponImg.source = "";
        for (var i = 0; i < len; i++) {
            var element = role.getEquipByIndex(i);
            this.equips[i].setModel(role);
            this.equips[i].setCurRole(this.curRole);
            this.equips[i].setIndex(i);
            this.equips[i].data = element.item;
            if (element.item.configID == 0) {
                this.equips[i].setItemImg(i > EquipPos.MAX ? '' : "xb_1" + ForgeConst.EQUIP_POS_TO_SUB[i]);
                this.equips[i].isShowTips(false);
                this.addTouchEvent(this.equips[i], this.onClick);
            }
            else {
                this.equips[i].isShowTips(true);
                this.removeTouchEvent(this.equips[i], this.onClick);
            }
        }
        this.powerPanel.setPower(role.power);
        this.setRole(this.curRole, this.bodyImg, this.weaponImg);
        this.setSuit(this.curRole, this.suitImg, this.suitEff);
        this.setWeaponsSuit(this.curRole, "sef", this.soulEff, this.suitEff2);
        this.setWeaponEffect(this.curRole, "wsef", this.soulEff, this.suitEff5);
        this.setWeaponEffect(this.curRole, "bodyEffect", this.bodyEff, this.suitEff7, 2);
    };
    RoleInfoPanel.prototype.setRole = function (index, imgBody, imgWeapon) {
        imgBody.source = null;
        imgWeapon.source = null;
        var role = SubRoles.ins().getSubRoleByIndex(index);
        var id = role.getEquipByIndex(0).item.configID;
        var zb = role.zhuangbei;
        var isHaveBody;
        var bodyId = zb[0];
        var weaponId = zb[1];
        var weaponConf = role.getEquipByIndex(0);
        var weaponConfId = weaponConf.item.configID;
        var bodyConf = role.getEquipByIndex(2);
        var bodyConfId = bodyConf.item.configID;
        if (weaponConfId > 0) {
            var fileName = GlobalConfig.EquipConfig[weaponConfId].appearance;
            if (fileName && fileName.indexOf("[job]") > -1)
                fileName = fileName.replace("[job]", role.job + "");
            imgWeapon.source = !GlobalConfig.EquipWithEffConfig[id + "_" + role.sex] ? fileName + "_" + role.sex + "_c_png" : null;
        }
        if (bodyConfId > 0) {
            var fileName = GlobalConfig.EquipConfig[bodyConfId].appearance;
            if (fileName && fileName.indexOf("[job]") > -1)
                fileName = fileName.replace("[job]", role.job + "");
            imgBody.source = fileName + "_" + role.sex + "_c_png";
            isHaveBody = true;
        }
        if (!isHaveBody)
            imgBody.source = "body000_" + role.sex + "_c_png";
        if (weaponId > 0)
            imgWeapon.source = this.getZhuangbanById(weaponId).res + "_" + role.sex + "_c_png";
        if (bodyId > 0)
            imgBody.source = this.getZhuangbanById(bodyId).res + "_" + role.sex + "_c_png";
    };
    RoleInfoPanel.prototype.setRoleEff = function () {
        this.setSuit(this.curRole, this.suitImg, this.suitEff);
        this.setWeaponsSuit(this.curRole, "sef", this.soulEff, this.suitEff2);
        this.setWeaponEffect(this.curRole, "wsef", this.soulEff, this.suitEff5);
        this.setWeaponEffect(this.curRole, "bodyEffect", this.bodyEff, this.suitEff7, 2);
    };
    RoleInfoPanel.prototype.setSuit = function (roleId, suitImg, suitEff) {
        DisplayUtils.removeFromParent(suitEff);
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var cfg = role.heirloom.getSuitConfig(role);
        if (cfg) {
            if (!suitEff.parent)
                suitImg.parent.addChildAt(suitEff, suitImg.parent.getChildIndex(suitImg));
            var suitConfig = GlobalConfig.HeirloomEquipSetConfig[cfg.lv];
            suitEff.playFile(RES_DIR_EFF + suitConfig.neff, -1);
        }
    };
    RoleInfoPanel.prototype.setWeaponsSuit = function (roleId, jobImage, soulEffGroup, suitEff) {
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        suitEff.x = this[jobImage + role.job].x;
        suitEff.y = this[jobImage + role.job].y;
        suitEff.rotation = this[jobImage + role.job].rotation;
        DisplayUtils.removeFromParent(suitEff);
        var wid = role.weapons.weaponsId;
        var hideWeapons = role.hideWeapons();
        if (!hideWeapons && wid) {
            if (!suitEff.parent)
                soulEffGroup.addChild(suitEff);
            var suitConfig = GlobalConfig.WeaponSoulConfig[wid];
            suitEff.playFile(RES_DIR_EFF + suitConfig.inside[role.job - 1], -1);
        }
    };
    RoleInfoPanel.prototype.setWeaponEffect = function (roleId, jobImage, soulEffGroup, suitEff, pos) {
        if (pos === void 0) { pos = 0; }
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var id = role.getEquipByIndex(pos).item.configID;
        var cfg = GlobalConfig.EquipWithEffConfig[id + "_" + role.sex];
        DisplayUtils.removeFromParent(suitEff);
        var zb = role.zhuangbei;
        var eff = suitEff;
        if (eff == this.suitEff5) {
            if (role.sex == 0)
                DisplayUtils.removeFromParent(this.suitEff9);
            else
                eff = this.suitEff9;
        }
        else if (eff == this.suitEff6) {
            if (role.sex == 0)
                DisplayUtils.removeFromParent(this.suitEff10);
            else
                eff = this.suitEff10;
        }
        if (cfg && ((pos == 0 && zb[1] <= 0) || (pos == 2 && zb[0] <= 0))) {
            eff.x = this[jobImage + role.sex].x + cfg.offX;
            eff.y = this[jobImage + role.sex].y + cfg.offY;
            eff.rotation = this[jobImage + role.sex].rotation;
            eff.scaleX = eff.scaleY = cfg.scaling;
            eff.playFile(RES_DIR_EFF + cfg.inShowEff, -1);
            soulEffGroup.addChild(eff);
        }
        else
            DisplayUtils.removeFromParent(eff);
    };
    RoleInfoPanel.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    RoleInfoPanel.prototype.setFashionRetPoint = function () {
        if (this.fashionPoint) {
            this.fashionPoint.visible = Dress.ins().redPoint();
        }
    };
    RoleInfoPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.juesexiangxi:
                ViewManager.ins().open(RoleAttrWin, this.curRole);
                break;
            case this.oneKeyChange:
                UserRole.ins().checkHaveCan(true, this.curRole);
                this.setCanChange();
                SoundUtil.ins().playEffect(SoundUtil.EQUIP);
                SoundUtil.ins().playEffect(SoundUtil.EQUIP);
                break;
            case this.roleInfoItem0:
                ViewManager.ins().open(SpecialRingWin, 0, this.curRole);
                break;
            case this.roleInfoItem1:
                ViewManager.ins().open(SpecialRingWin, 1, this.curRole);
                break;
            case this.shuzhuang:
                ViewManager.ins().open(DressWin, this.curRole);
                break;
            case this.shenlu:
                ViewManager.ins().open(TreasureWin, 0, this.curRole);
                break;
            case this.orange:
                ViewManager.ins().open(AdvanEquipWin, 0, 0);
                this.setRetPoint();
                break;
            case this.heirloom:
                ViewManager.ins().open(HeirloomWin, this.curRole);
                break;
            case this.rune:
                ViewManager.ins().open(RuneWin, this.curRole);
                break;
            case this.bless0:
                if (SpecialRing.ins().isFireRingFuse()) {
                    ViewManager.ins().open(FireRingWin);
                }
                else if (SpecialRing.ins().checkRingOpen()) {
                    ViewManager.ins().open(RingInfoView);
                }
                else {
                    UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u795E\u9F99\u4E4B\u6212 \u540E\u5F00\u542F");
                }
                break;
            case this.bless1:
                break;
            default:
                var index = this.equips.indexOf(e.currentTarget);
                if (index >= 0) {
                    if (index > 8) {
                    }
                    else {
                        ViewManager.ins().open(RoleChooseEquipWin, this.curRole, index);
                    }
                }
                break;
        }
    };
    RoleInfoPanel.prototype.setWing = function (index, wingImg) {
        if (index === void 0) { index = this.curRole; }
        if (wingImg === void 0) { wingImg = this.wingImg; }
        wingImg.source = null;
        var wingdata = SubRoles.ins().getSubRoleByIndex(index).wingsData;
        var id = SubRoles.ins().getSubRoleByIndex(index).zhuangbei[2];
        if (id > 0)
            wingImg.source = GlobalConfig.ZhuangBanId[id].res + "_png";
        else if (wingdata.openStatus) {
            wingImg.source = GlobalConfig.WingLevelConfig[wingdata.lv].appearance + "_png";
        }
        else {
            wingImg.source = "";
        }
    };
    RoleInfoPanel.prototype.delayRedPoint = function () {
        if (!TimerManager.ins().isExists(this.setRetPoint, this))
            TimerManager.ins().doTimer(60, 1, this.setRetPoint, this);
    };
    RoleInfoPanel.prototype.setRetPoint = function () {
        for (var i = 0; i < 2; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
            var flag = UserRole.ins().roleHintCheck(role, i);
            this["roleInfoItem" + i].setRedPointVisibel(flag);
        }
        var bool = false;
        var len = SubRoles.ins().subRolesLen;
        for (var a = 0; a < len; a++) {
            var model = SubRoles.ins().getSubRoleByIndex(a);
            for (var i = 0; i < 8; i++) {
                bool = UserEquip.ins().setOrangeEquipItemState(i, model);
                if (!bool && i < 2)
                    bool = UserEquip.ins().setLegendEquipItemState(i > 0 ? 2 : 0, model);
                if (bool) {
                    var b = UserBag.ins().checkEqRedPoint(i, model);
                    bool = b != null ? b : bool;
                }
                if (bool)
                    break;
            }
            if (bool)
                break;
        }
        if (!bool)
            bool = UserEquip.ins().checkRedPointEx(5, this.curRole);
        if (!bool)
            bool = UserBag.ins().getLegendHasResolve();
        if (!bool) {
            var itemData = UserBag.ins().getLegendOutEquips();
            bool = itemData.length > 0;
        }
        if (!bool) {
            bool = Boolean(UserBag.ins().getHuntGoods(0).length);
        }
        if (!bool) {
            bool = ExtremeEquipModel.ins().getRedPoint();
        }
        this.orangeRedPoint.visible = bool;
        this.heirloomRedPoint.visible = Heirloom.ins().checkRedPoint();
        this.updateLoongSoul();
        this.ringRedPoint.visible = OpenSystem.ins().checkSysOpen(SystemType.RING) && (SpecialRing.ins().checkHaveUpRing() || SpecialRing.ins().isCanStudySkill() || SpecialRing.ins().isCanUpgradeSkill() || SpecialRing.ins().fireRingRedPoint() || LyMark.ins().checkRed());
        this.zwRedPoint.visible = RuneRedPointMgr.ins().checkAllSituation(false);
        this.setCanChange();
    };
    RoleInfoPanel.prototype.setSamsaraRedPoint = function () {
        if (SamsaraModel.ins().isOpen()) {
            for (var i = EquipPos.HAT; i < EquipPos.MAX; i++) {
                var img = this["redPoint" + i];
                var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
                var data = role.getEquipByIndex(i);
                if (data.soulLv > 0) {
                    this["item" + i].setSoul(true);
                }
                else {
                    this["item" + i].setSoul(false);
                }
                if (!img.visible)
                    img.visible = SamsaraModel.ins().checkEquipPosCanAddSpirit(role, i) || SamsaraModel.ins().checkUpgradeSoul(role, i);
            }
        }
        for (var i = 9; i < 13; i++) {
            this["item" + i].visible = SamsaraModel.ins().isOpen();
        }
    };
    RoleInfoPanel.prototype.setCanChange = function (data) {
        var d = data ? (data[this.curRole] ? data[this.curRole] : []) : UserRole.ins().canChangeEquips[this.curRole];
        var h = false;
        var n = this.equips.length;
        DisplayUtils.removeFromParent(this.eff);
        for (var i = 0; i < n; i++) {
            this["redPoint" + i].visible = d[i] ? d[i] : false;
            if (!h)
                h = d[i] ? d[i] : false;
        }
        this.updateOneKey(h);
        this.setSamsaraRedPoint();
    };
    RoleInfoPanel.prototype.updateOneKey = function (v) {
        if (!OpenSystem.ins().checkSysOpen(SystemType.ONEKEY)) {
            this.oneKeyChange.visible = false;
            return;
        }
        this.oneKeyChange.visible = v;
        if (this.oneKeyChange.visible) {
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
            if (!this.eff.parent)
                this.effGroup.addChild(this.eff);
        }
        else {
            DisplayUtils.removeFromParent(this.eff);
        }
    };
    RoleInfoPanel.prototype.getEquipItem = function (pos) {
        return this.equips[pos];
    };
    RoleInfoPanel.prototype.setSuitEquips = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            var eq = this.equips[i];
            var info = role.heirloom.getInfoBySolt(i);
            if (eq && info.lv > 0) {
                eq.setItemHeirloomBgImg(true, info.image);
            }
            else {
                eq.setItemHeirloomBgImg(false);
            }
        }
    };
    __decorate([
        callLater
    ], RoleInfoPanel.prototype, "updataEquip", null);
    return RoleInfoPanel;
}(BaseView));
__reflect(RoleInfoPanel.prototype, "RoleInfoPanel");
//# sourceMappingURL=RoleInfoPanel.js.map