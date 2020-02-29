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
var RoleItemRenderer = (function (_super) {
    __extends(RoleItemRenderer, _super);
    function RoleItemRenderer() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "RoleShowSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.showRole, _this);
        _this.suitEff = new MovieClip;
        _this.suitEff.x = _this.suitImg.x;
        _this.suitEff.y = _this.suitImg.y;
        _this.suitEff2 = new MovieClip;
        _this.suitEff5 = new MovieClip();
        _this.suitEff7 = new MovieClip();
        _this.suitEff9 = new MovieClip();
        return _this;
    }
    RoleItemRenderer.prototype.dataChanged = function () {
        if (!this.data || !this.data.otherPlayerData || !(this.data.otherPlayerData instanceof OtherPlayerData)) {
            this["bodyImg"].source = "body00_png";
            this["weaponImg"].source = "";
            this["wingImg"].source = "";
            if (this.suitEff)
                DisplayUtils.removeFromParent(this.suitEff);
            if (this.suitEff2)
                DisplayUtils.removeFromParent(this.suitEff2);
            if (this.suitEff5)
                DisplayUtils.removeFromParent(this.suitEff5);
            if (this.suitEff7)
                DisplayUtils.removeFromParent(this.suitEff7);
            return;
        }
        var otherPlayerData = this.data.otherPlayerData;
        var role = otherPlayerData.roleData[this.index];
        if (role) {
            this.setWing(role.index, this.wingImg);
            this.setRole(role.index, this.bodyImg, this.weaponImg);
            this.setRoleEff(role.index);
        }
    };
    RoleItemRenderer.prototype.setRole = function (index, imgBody, imgWeapon) {
        imgBody.source = null;
        imgWeapon.source = null;
        var role = this.data.otherPlayerData.roleData[index];
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
    RoleItemRenderer.prototype.setWing = function (index, wingImg) {
        if (index === void 0) { index = 0; }
        if (wingImg === void 0) { wingImg = this.wingImg; }
        wingImg.source = null;
        var role = this.data.otherPlayerData.roleData[index];
        var wingdata = role.wingsData;
        var id = role.zhuangbei[2];
        if (id > 0)
            wingImg.source = GlobalConfig.ZhuangBanId[id].res + "_png";
        else if (wingdata.openStatus) {
            wingImg.source = GlobalConfig.WingLevelConfig[wingdata.lv].appearance + "_png";
        }
        else {
            wingImg.source = "";
        }
    };
    RoleItemRenderer.prototype.setRoleEff = function (roleIndex) {
        this.setSuit(roleIndex, this.suitImg, this.suitEff);
        this.setWeaponsSuit(roleIndex, "sef", this.soulEff, this.suitEff2);
        this.setWeaponEffect(roleIndex, "wsef", this.soulEff, this.suitEff5);
        this.setWeaponEffect(roleIndex, "bodyEffect", this.bodyEff, this.suitEff7, 2);
    };
    RoleItemRenderer.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    RoleItemRenderer.prototype.showRole = function (e) {
        if (!this.data || !this.data.otherPlayerData) {
            return;
        }
        ViewManager.ins().open(RRoleWin, this.data.otherPlayerData);
        var view = ViewManager.ins().open(RRoleWin, this.data.otherPlayerData);
        view.hideEx(2);
    };
    RoleItemRenderer.prototype.setSuit = function (roleId, suitImg, suitEff) {
        DisplayUtils.removeFromParent(suitEff);
        var role = this.data.otherPlayerData.roleData[roleId];
        var cfg = role.heirloom.getSuitConfig(role);
        if (cfg) {
            if (!suitEff.parent)
                suitImg.parent.addChildAt(suitEff, suitImg.parent.getChildIndex(suitImg));
            var suitConfig = GlobalConfig.HeirloomEquipSetConfig[cfg.lv];
            suitEff.playFile(RES_DIR_EFF + suitConfig.neff, -1);
        }
    };
    RoleItemRenderer.prototype.setWeaponsSuit = function (roleId, jobImage, soulEffGroup, suitEff) {
        var role = this.data.otherPlayerData.roleData[roleId];
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
    RoleItemRenderer.prototype.setWeaponEffect = function (roleId, jobImage, soulEffGroup, suitEff, pos) {
        if (pos === void 0) { pos = 0; }
        var role = this.data.otherPlayerData.roleData[roleId];
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
    return RoleItemRenderer;
}(BaseItemRender));
__reflect(RoleItemRenderer.prototype, "RoleItemRenderer");
//# sourceMappingURL=RoleItemRenderer.js.map