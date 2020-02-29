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
var RoleChooseItemWin = (function (_super) {
    __extends(RoleChooseItemWin, _super);
    function RoleChooseItemWin() {
        var _this = _super.call(this) || this;
        _this.initMc();
        _this.skinName = "weaponSoulUse";
        return _this;
    }
    RoleChooseItemWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.id = args[0];
        this.addTouchEvent(this, this.onClick);
        this.addTouchEvent(this.btntupo, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.observe(Weapons.ins().postWeaponsFlexibleCount, this.otherClose);
        this.init();
        this.setCurRole(this.id);
    };
    RoleChooseItemWin.prototype.init = function () {
        this.roles = [this.role1, this.role2, this.role3];
        for (var i = 0; i < 2; i++) {
            var mc = this.roleMovie[i];
            this.roles[i + 1].addChild(mc);
        }
        this.updateRole();
        this.updateSelect(this.id);
    };
    RoleChooseItemWin.prototype.getCurRole = function () {
        return this.id;
    };
    RoleChooseItemWin.prototype.setCurRole = function (value) {
        this.id = value;
        for (var i = 0; i < this.roles.length; i++) {
            var element = this.roles[i];
            element.selected = i == value;
        }
        this.dispatchEventWith(egret.Event.CHANGE, false, this.id);
    };
    RoleChooseItemWin.prototype.initMc = function () {
        this.roleMovie = [];
        for (var i = 0; i < 2; i++) {
            var mc = new MovieClip;
            mc.x = 44;
            mc.y = 44;
            mc.touchEnabled = false;
            this.roleMovie.push(mc);
        }
    };
    RoleChooseItemWin.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.btntupo:
                var role = SubRoles.ins().getSubRoleByIndex(this.id);
                if (!role) {
                    UserTips.ins().showTips("\u89D2\u8272\u6570\u636E\u5F02\u5E38");
                    return;
                }
                if (role.weapons.flexibleCount - 1 >= GlobalConfig.WeaponSoulBaseConfig.maxItemNum) {
                    UserTips.ins().showTips("\u6BCF\u89D2\u8272\u5175\u9B42\u4E4B\u7075\u6700\u5927\u4F7F\u7528\u4E0A\u9650\u4E3A" + GlobalConfig.WeaponSoulBaseConfig.maxItemNum);
                    return;
                }
                Weapons.ins().sendWeaponsFlexibleCount(this.id);
                break;
        }
    };
    RoleChooseItemWin.prototype.onClick = function (e) {
        var index = this.roles.indexOf(e.target);
        if (index > -1)
            this.changeRole(index);
    };
    RoleChooseItemWin.prototype.changeRole = function (value) {
        var model = SubRoles.ins().getSubRoleByIndex(value);
        if (model) {
            this.setCurRole(value);
            this.updateSelect(value);
        }
        else {
            ViewManager.ins().open(NewRoleWin);
            this.roles[value].selected = false;
            ViewManager.ins().close(this);
        }
    };
    RoleChooseItemWin.prototype.updateSelect = function (roleId) {
        for (var i = 1; i <= 3; i++) {
            if ((roleId + 1) == i) {
                this["selectrole" + i].visible = true;
            }
            else {
                this["selectrole" + i].visible = false;
            }
        }
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        this.btntupo.visible = role.weapons.flexibleCount - 1 < GlobalConfig.WeaponSoulBaseConfig.maxItemNum;
        var index = role.weapons.flexibleCount;
        index = index ? (index - 1) : 1;
        index = index >= GlobalConfig.WeaponSoulBaseConfig.maxItemNum ? GlobalConfig.WeaponSoulBaseConfig.maxItemNum : index;
        var config = GlobalConfig.WeaponSoulItemAttr[index];
        var nindex = role.weapons.flexibleCount ? index + 1 : index;
        var nextconfig = GlobalConfig.WeaponSoulItemAttr[nindex];
        var curCount = role.weapons.flexibleCount ? index : 0;
        curCount = curCount >= GlobalConfig.WeaponSoulBaseConfig.maxItemNum ? GlobalConfig.WeaponSoulBaseConfig.maxItemNum : curCount;
        this.curUse.text = curCount + "";
        this.nextUse.visible = true;
        for (var i = 0; i < 4; i++) {
            this["name" + i].text = AttributeData.getAttrStrByType(config.attr[i].type);
            this["tpattr" + i].text = role.weapons.flexibleCount ? config.attr[i].value : 0;
            if (nextconfig) {
                this.nextUse.text = nindex + "";
                this["ntpattr" + i].visible = this["dir" + i].visible = true;
                this["ntpattr" + i].text = nextconfig.attr[i].value;
            }
            else {
                this["ntpattr" + i].visible = this["dir" + i].visible = false;
                this.nextUse.visible = false;
            }
        }
        this["dir"].visible = this.nextUse.visible;
        this.material.data = GlobalConfig.WeaponSoulBaseConfig.itemid;
    };
    RoleChooseItemWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    RoleChooseItemWin.prototype.updateRole = function () {
        var role;
        var roleData;
        var len = this.roles.length;
        for (var i = 0; i < len; i++) {
            role = this.roles[i];
            roleData = SubRoles.ins().getSubRoleByIndex(i);
            if (roleData) {
                role['jobImg'].visible = true;
                switch (roleData.job) {
                    case 1:
                        role['jobImg'].source = "new_duanzao_tubiao_zhanshi";
                        break;
                    case 2:
                        role['jobImg'].source = "new_duanzao_tubiao_fashi";
                        break;
                    case 3:
                        role['jobImg'].source = "new_duanzao_tubiao_daoshi";
                        break;
                }
                role['stageImg'].visible = false;
                role['stageImg'].source = "";
                role.icon = "yuanhead" + roleData.job + roleData.sex;
                if (this.roleMovie[i - 1])
                    DisplayUtils.removeFromParent(this.roleMovie[i - 1]);
            }
            else {
                var config = GlobalConfig.NewRoleConfig[i];
                if (!config) {
                    var parName = egret.getQualifiedClassName(this.parent);
                    Assert(false, "\u89D2\u8272\u7D22\u5F15" + i + "\u4E0D\u5B58\u5728\uFF0C\u51FA\u9519\u7C7B\uFF1A" + parName);
                    continue;
                }
                role['jobImg'].visible = false;
                role['stageImg'].visible = true;
                if (config.zsLevel) {
                    if (UserZs.ins().lv < config.zsLevel) {
                        role['stageImg'].source = "toujiesuo" + config.zsLevel;
                    }
                    else {
                        role['stageImg'].source = "toujiesuo";
                    }
                }
                else {
                    if (Actor.level < config.level) {
                        role['stageImg'].source = "toujiesuo" + config.level;
                    }
                    else {
                        role['stageImg'].source = "toujiesuo";
                    }
                }
                if (config.vip && UserVip.ins().lv >= config.vip) {
                    role['stageImg'].source = "toujiesuo";
                }
                role.icon = "";
            }
            if (this.roleMovie[i - 1] && role['stageImg'].source == "toujiesuo" && role['stageImg'].visible) {
                this.roleMovie[i - 1].playFile(RES_DIR_EFF + 'juesejiesuo', -1);
                this.showRedPoint(i, true);
            }
        }
    };
    RoleChooseItemWin.prototype.showRedPoint = function (index, b) {
        if (this.roles == null)
            return;
        this.roles[index]['redPoint'].visible = b;
    };
    RoleChooseItemWin.prototype.otherClose = function () {
        ViewManager.ins().close(this);
    };
    return RoleChooseItemWin;
}(BaseEuiView));
__reflect(RoleChooseItemWin.prototype, "RoleChooseItemWin");
ViewManager.ins().reg(RoleChooseItemWin, LayerManager.UI_Popup);
//# sourceMappingURL=RoleChooseItemWin.js.map