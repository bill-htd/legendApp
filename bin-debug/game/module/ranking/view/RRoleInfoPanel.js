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
var RRoleInfoPanel = (function (_super) {
    __extends(RRoleInfoPanel, _super);
    function RRoleInfoPanel() {
        var _this = _super.call(this) || this;
        _this.curRole = 0;
        _this.beforeIndex = -1;
        _this.name = "角色";
        return _this;
    }
    RRoleInfoPanel.prototype.childrenCreated = function () {
        this.init();
    };
    RRoleInfoPanel.prototype.init = function () {
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
        }
        this.suitEff1 = new MovieClip;
        this.suitEff1.x = this.suitImg.x;
        this.suitEff1.y = this.suitImg.y;
        this.suitEff = new MovieClip();
        this.suitEff5 = new MovieClip();
        this.suitEff6 = new MovieClip();
        this.suitEff7 = new MovieClip();
        this.suitEff8 = new MovieClip();
        this.suitEff9 = new MovieClip();
        this.suitEff10 = new MovieClip();
    };
    RRoleInfoPanel.prototype.clear = function () {
        this.beforeIndex = -1;
    };
    RRoleInfoPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._otherPlayerData = param[0];
        this.addTouchEvent(this.roleInfoItem0, this.onClick);
        this.addTouchEvent(this.roleInfoItem1, this.onClick);
        this.addTouchEvent(this.juesexiangxi, this.onClick);
        this.updateRing();
        this.updataEquip(false);
        this.updateSamsaraEquip();
        this.clearChangeEff();
        if (this.beforeIndex != -1) {
            this.roleChange(this.beforeIndex, this.curRole);
        }
        else {
            this.setRole(this.curRole, this.bodyImg, this.weaponImg);
            this.setWeaponEffect(this.curRole, "wsef", this.soulEff, this.suitEff5);
            this.setWeaponEffect(this.curRole, "bodyEffect", this.bodyEff, this.suitEff7, 2);
            this.setSuit(this.curRole, this.suitImg, this.suitEff1);
            this.setWing();
        }
        this.beforeIndex = this.curRole;
    };
    RRoleInfoPanel.prototype.close = function () {
        egret.Tween.removeTweens(this.groupRole);
        egret.Tween.removeTweens(this.groupRoleNext);
        DisplayUtils.removeFromParent(this.suitEff);
        DisplayUtils.removeFromParent(this.suitEff5);
        DisplayUtils.removeFromParent(this.suitEff6);
        DisplayUtils.removeFromParent(this.suitEff7);
        DisplayUtils.removeFromParent(this.suitEff8);
        DisplayUtils.removeFromParent(this.suitEff9);
        DisplayUtils.removeFromParent(this.suitEff10);
        this.roleInfoItem0.destory();
        this.roleInfoItem1.destory();
        TimerManager.ins().remove(this.hideZhanling, this);
        TimerManager.ins().remove(this.playZhanLingAttack, this);
        TimerManager.ins().remove(this.startShowZhanling, this);
    };
    RRoleInfoPanel.prototype.clearChangeEff = function () {
        egret.Tween.removeTweens(this.groupRole);
        egret.Tween.removeTweens(this.groupRoleNext);
        this.groupRole.x = 0;
        this.groupRoleNext.x = 580;
        this.groupRole.alpha = 1;
        this.groupRoleNext.alpha = 0;
        this.groupRoleNext.visible = false;
        this.setRole(this.curRole, this.bodyImg, this.weaponImg);
        this.setWeaponEffect(this.curRole, "wsef", this.soulEff, this.suitEff5);
        this.setWeaponEffect(this.curRole, "bodyEffect", this.bodyEff, this.suitEff7, 2);
        this.setSuit(this.curRole, this.suitImg, this.suitEff1);
        this.setWing(this.curRole, this.wingImg);
    };
    RRoleInfoPanel.prototype.roleChange = function (beforeIndex, nextIndex) {
        if (beforeIndex == nextIndex) {
            this.clearChangeEff();
            return;
        }
        this.groupRoleNext.visible = true;
        this.setWing(beforeIndex, this.wingImg);
        this.setWing(nextIndex, this.nextWingImg);
        this.setSuit(beforeIndex, this.suitImg, this.suitEff1);
        this.setRole(beforeIndex, this.bodyImg, this.weaponImg);
        this.setRole(nextIndex, this.nextBodyImg, this.nextWeaponImg);
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
    RRoleInfoPanel.prototype.updateRing = function () {
        var ringModel = this._otherPlayerData.roleData[this.curRole].exRingsData;
        if (ringModel[0] > 0) {
            this.roleInfoItem0.setImgSource(0, 1);
            this.roleInfoItem0.setLv(0);
            this.roleInfoItem0.setNameTxt("麻痹戒指");
            this.roleInfoItem0.setBgValue("quality4");
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
        }
        else {
            this.roleInfoItem1.setImgSource(1, 0);
            this.roleInfoItem1.setLv(0);
            this.roleInfoItem1.setNameTxt("护身戒指");
            this.roleInfoItem1.setBgValue("quality0");
        }
    };
    RRoleInfoPanel.prototype.updataEquip = function (delay) {
        if (delay === void 0) { delay = true; }
        var model = this._otherPlayerData.roleData[this.curRole];
        this.setEquip(model);
    };
    RRoleInfoPanel.prototype.updateSamsaraEquip = function () {
        var zlv = this._otherPlayerData.zhuan;
        var level = this._otherPlayerData.level;
        var roleLv = zlv * 1000 + level;
        var isOpen = roleLv >= GlobalConfig.ReincarnationBase.openLevel;
        for (var i = 9; i < 13; i++) {
            this["item" + i].visible = isOpen;
        }
    };
    RRoleInfoPanel.prototype.setEquip = function (role) {
        if (!role)
            return;
        var len = role.getEquipLen();
        this.weaponImg.source = "";
        for (var i = 0; i < len; i++) {
            var element = role.getEquipByIndex(i);
            this.equips[i].setModel(role);
            this.equips[i].setIndex(i);
            this.equips[i].data = element.item;
            if (element.item.configID == 0) {
                this.equips[i].setItemImg(i > EquipPos.MAX ? '' : "xb_1" + ForgeConst.EQUIP_POS_TO_SUB[i]);
                this.equips[i].isShowTips(false);
            }
            else {
                this.equips[i].isShowTips(true);
            }
            if (i >= EquipPos.HAT && i <= EquipPos.SHIELD) {
                if (element.soulLv > 0) {
                    this["item" + i].setSoul(true);
                }
                else {
                    this["item" + i].setSoul(false);
                }
            }
            else if (i >= EquipPos.WEAPON && i <= EquipPos.SHOE) {
                var itemIcon = this["item" + i].getItemIcon();
                itemIcon.extreme.visible = ExtremeEquipModel.ins().getZhiZunLvByRoleID(role, i) > 0;
            }
        }
        this.powerPanel.setPower(role.power);
        this.setRole(this.curRole, this.bodyImg, this.weaponImg);
        this.setWeaponEffect(this.curRole, "wsef", this.soulEff, this.suitEff5);
        this.setWeaponEffect(this.curRole, "bodyEffect", this.bodyEff, this.suitEff7, 2);
    };
    RRoleInfoPanel.prototype.setRole = function (index, imgBody, imgWeapon) {
        imgBody.source = null;
        imgWeapon.source = null;
        var role = this._otherPlayerData.roleData[index];
        var zb = role.zhuangbei;
        var isHaveBody;
        var bodyId = zb[0];
        var weaponId = zb[1];
        var weaponConf = role.getEquipByIndex(0);
        var weaponConfId = weaponConf.item.configID;
        var bodyConf = role.getEquipByIndex(2);
        var bodyConfId = bodyConf.item.configID;
        var id = role.getEquipByIndex(0).item.configID;
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
        this.setWeaponsSuit(role);
    };
    RRoleInfoPanel.prototype.setSuit = function (roleId, suitImg, suitEff) {
        DisplayUtils.removeFromParent(suitEff);
        var role = this._otherPlayerData.roleData[roleId];
        var cfg = role.heirloom.getSuitConfig(role);
        if (cfg) {
            if (!suitEff.parent)
                suitImg.parent.addChildAt(suitEff, suitImg.parent.getChildIndex(suitImg));
            var suitConfig = GlobalConfig.HeirloomEquipSetConfig[cfg.lv];
            suitEff.playFile(RES_DIR_EFF + suitConfig.neff, -1);
        }
    };
    RRoleInfoPanel.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    RRoleInfoPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.juesexiangxi:
                ViewManager.ins().open(RRoleAttrWin, this.curRole, this._otherPlayerData);
                break;
            case this.roleInfoItem0:
                ViewManager.ins().open(RSpecialRingWin, 0, this.curRole, this._otherPlayerData);
                break;
            case this.roleInfoItem1:
                ViewManager.ins().open(RSpecialRingWin, 1, this.curRole, this._otherPlayerData);
                break;
            default:
                break;
        }
    };
    RRoleInfoPanel.prototype.setWing = function (index, wingImg) {
        if (index === void 0) { index = this.curRole; }
        if (wingImg === void 0) { wingImg = this.wingImg; }
        wingImg.source = null;
        var wingdata = this._otherPlayerData.roleData[index].wingsData;
        var id = this._otherPlayerData.roleData[this.curRole].zhuangbei[2];
        if (id > 0)
            wingImg.source = GlobalConfig.ZhuangBanId[id].res + "_png";
        else if (wingdata.openStatus) {
            wingImg.source = GlobalConfig.WingLevelConfig[wingdata.lv].appearance + "_png";
        }
        else {
            wingImg.source = "";
        }
    };
    RRoleInfoPanel.prototype.setWeaponsSuit = function (role) {
        var wid = role.weapons.weaponsId;
        var hideWeapons = role.hideWeapons();
        if (!hideWeapons && wid) {
            this.suitEff.x = this["sef" + role.job].x;
            this.suitEff.y = this["sef" + role.job].y;
            this.suitEff.rotation = this["sef" + role.job].rotation;
            if (!this.suitEff.parent)
                this.soulEff.addChild(this.suitEff);
            var suitConfig = GlobalConfig.WeaponSoulConfig[wid];
            this.suitEff.playFile(RES_DIR_EFF + suitConfig.inside[role.job - 1], -1);
        }
        else if (this.suitEff.parent)
            this.suitEff.parent.removeChild(this.suitEff);
    };
    RRoleInfoPanel.prototype.setWeaponEffect = function (roleId, jobImage, soulEffGroup, suitEff, pos) {
        if (pos === void 0) { pos = 0; }
        var role = this._otherPlayerData.roleData[roleId];
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
    RRoleInfoPanel.prototype.showZhanling = function (otherPlayerData) {
        var zhanlingID = otherPlayerData.zhanlingID;
        var zhanlingLevel = otherPlayerData.zhanlingLevel;
        if (zhanlingLevel < 0)
            return;
        var config = GlobalConfig.ZhanLingLevel[zhanlingID][zhanlingLevel];
        this.fileName = config.appearance;
        if (!this.warMc) {
            this.warMc = new MovieClip;
            this.warMc.x = 190;
            this.warMc.y = 220;
            this.powerPanel.addChildAt(this.warMc, 1);
            this.warMc.playFile(RES_DIR_MONSTER + this.fileName + "_4s", -1);
            this.warMc.touchEnabled = false;
        }
        var anchorOffset = GlobalConfig.ZhanLingConfig.anchorOffset || [];
        this.warMc.anchorOffsetX = anchorOffset[0] || 0;
        this.warMc.anchorOffsetY = anchorOffset[1] || 0;
        TimerManager.ins().remove(this.startShowZhanling, this);
        TimerManager.ins().doTimer(200, 1, this.playZhanLingAttack, this);
    };
    RRoleInfoPanel.prototype.playZhanLingAttack = function () {
        var _this = this;
        if (this.warMc) {
            var s = RES_DIR_MONSTER + this.fileName + "_4" + EntityAction.ATTACK;
            this.warMc.playFile(s, 1, function () {
                var src = RES_DIR_MONSTER + _this.fileName + "_4" + EntityAction.STAND;
                _this.warMc.playFile(src, -1, null, false);
                TimerManager.ins().remove(_this.playZhanLingAttack, _this);
                TimerManager.ins().doTimer(2800, 1, _this.hideZhanling, _this);
            }, false);
        }
    };
    RRoleInfoPanel.prototype.hideZhanling = function () {
        var _this = this;
        if (this.warMc) {
            egret.Tween.get(this.warMc).to({ alpha: 0 }, GlobalConfig.ZhanLingConfig.disappearTime || 1500).call(function () {
                _this.powerPanel.removeChild(_this.warMc);
                _this.warMc.destroy();
                _this.warMc = null;
                TimerManager.ins().remove(_this.hideZhanling, _this);
                TimerManager.ins().doTimer(7000, 1, _this.startShowZhanling, _this);
            });
        }
    };
    RRoleInfoPanel.prototype.startShowZhanling = function () {
        this.showZhanling(this._otherPlayerData);
    };
    return RRoleInfoPanel;
}(BaseView));
__reflect(RRoleInfoPanel.prototype, "RRoleInfoPanel");
//# sourceMappingURL=RRoleInfoPanel.js.map