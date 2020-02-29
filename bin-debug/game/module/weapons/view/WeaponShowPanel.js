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
var WeaponShowPanel = (function (_super) {
    __extends(WeaponShowPanel, _super);
    function WeaponShowPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = 'weaponSoulSkinState';
        return _this;
    }
    WeaponShowPanel.prototype.childrenCreated = function () {
    };
    WeaponShowPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Weapons.ins().postWeaponsUpLevel, this.callback);
        this.roleId = 0;
        this.weaponId = 0;
    };
    WeaponShowPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.releaseEvent();
        this.removeObserve();
    };
    WeaponShowPanel.prototype.releaseEvent = function () {
        if (!this.currentState)
            return;
        DisplayUtils.removeFromParent(this.mc);
        this.mc = null;
        DisplayUtils.removeFromParent(this.masksp);
        this.masksp = null;
        for (var i = 0; i < Number(this.currentState); i++) {
            this.removeTouchEvent(this["item" + i], this.onClick);
        }
    };
    WeaponShowPanel.prototype.init = function (idx, rId) {
        var id = idx ? idx : this.weaponId;
        var roleId = !isNaN(rId) ? rId : this.roleId;
        this.weaponId = id;
        this.roleId = roleId;
        var wsconfig = GlobalConfig.WeaponSoulConfig[id];
        if (!wsconfig)
            return;
        var state = wsconfig.actcond.length;
        this.releaseEvent();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        this.currentState = state + "";
        var wsinfo = role.weapons.getWeapsInfoBySoulId(wsconfig.id);
        var isActNum = 0;
        for (var i = 0; i < wsconfig.actcond.length; i++) {
            this.addTouchEvent(this["item" + i], this.onClick);
            if (wsinfo.id) {
                isActNum++;
                if (this["lianjiexian" + i])
                    this.setLight(this["lianjiexian" + i]);
                if (this["item" + i])
                    this["item" + i].data = role.weapons.getSlotByInfo(wsconfig.actcond[i]);
            }
            else {
                var winfo = role.weapons.getSlotByInfo(wsconfig.actcond[i]);
                if (winfo) {
                    isActNum++;
                    if (this["lianjiexian" + i])
                        this.setLight(this["lianjiexian" + i]);
                    if (this["item" + i])
                        this["item" + i].data = role.weapons.getSlotByInfo(wsconfig.actcond[i]);
                }
                else {
                    if (this["lianjiexian" + i])
                        this.setGray(this["lianjiexian" + i]);
                    if (this["item" + i])
                        this["item" + i].data = GlobalConfig.WeaponSoulPosConfig[wsconfig.actcond[i]][0];
                }
            }
        }
        this.setEff(isActNum, wsconfig.actcond.length, wsconfig, role);
    };
    WeaponShowPanel.prototype.setEff = function (curEf, maxEf, wsconfig, role) {
        if (!wsconfig)
            return;
        var eff = wsconfig.inside[role.job - 1];
        if (!this.mc)
            this.mc = new MovieClip;
        if (!this.mc.parent)
            this.effgroup.addChild(this.mc);
        this.mc.playFile(RES_DIR_EFF + eff, -1);
        this.mc.x = this.effpos.x;
        this.mc.y = this.effpos.y;
        this.mc.rotation = this.effpos.rotation;
    };
    WeaponShowPanel.prototype.setWeaponsModel = function () {
        this.weaponImg.source = "";
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        var weaponConf = role.getEquipByIndex(0);
        var weaponConfId = weaponConf.item.configID;
        if (weaponConfId > 0) {
            var fileName = GlobalConfig.EquipConfig[weaponConfId].appearance;
            if (fileName && fileName.indexOf("[job]") > -1)
                fileName = fileName.replace("[job]", role.job + "");
            this.weaponImg.source = fileName + "_" + role.sex + "_c_png";
        }
    };
    WeaponShowPanel.prototype.onClick = function (e) {
        for (var i = 0; i < Number(this.currentState); i++) {
            if (e.currentTarget == this["item" + i]) {
                var slot = this["item" + i].slot;
                var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
                var winfo = role.weapons.getSlotByInfo(slot);
                if (!winfo || !winfo.level) {
                    ViewManager.ins().open(WeaponSoulBreakWin, WeaponSoulBreakWin.JIHUO, role.index, slot);
                }
                else if (winfo.assault) {
                    ViewManager.ins().open(WeaponSoulBreakWin, WeaponSoulBreakWin.TUPO, role.index, slot);
                }
                else {
                    ViewManager.ins().open(WeaponSoulBreakWin, WeaponSoulBreakWin.SHENGJI, role.index, slot);
                }
                break;
            }
        }
    };
    WeaponShowPanel.prototype.getJobSkinName = function (job) {
        switch (job) {
            case 1:
                return "zhan";
            case 2:
                return "fa";
            case 3:
                return "dao";
        }
        return "";
    };
    WeaponShowPanel.prototype.callback = function () {
        this.init();
    };
    WeaponShowPanel.prototype.setGray = function (pic) {
        var colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        pic.filters = [new egret.ColorMatrixFilter(colorMatrix)];
    };
    WeaponShowPanel.prototype.setLight = function (pic) {
        pic.filters = [];
    };
    WeaponShowPanel.prototype.cleanFilters = function (State, i) {
        this["zhan" + State + i].filters = [];
        this["fa" + State + i].filters = [];
        this["dao" + State + i].filters = [];
    };
    WeaponShowPanel.prototype.destructor = function () {
    };
    return WeaponShowPanel;
}(BaseView));
__reflect(WeaponShowPanel.prototype, "WeaponShowPanel");
//# sourceMappingURL=WeaponShowPanel.js.map