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
var WeaponSoulSkillTips = (function (_super) {
    __extends(WeaponSoulSkillTips, _super);
    function WeaponSoulSkillTips() {
        var _this = _super.call(this) || this;
        _this.skinName = 'weaponSoulSkilltips';
        return _this;
    }
    WeaponSoulSkillTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClick);
        this.roleId = param[0];
        this.weaponId = param[1];
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        this.head(role);
        this.curSkill(role);
        this.nextSkill(role);
    };
    WeaponSoulSkillTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
    };
    WeaponSoulSkillTips.prototype.head = function (role) {
        var config = role.weapons.getSuitConfig(this.weaponId);
        if (!config)
            config = GlobalConfig.WeaponSoulSuit[this.weaponId][0];
        this.skillicon.data = { icon: config.skillicon };
        this.skillname.text = config.skillname;
    };
    WeaponSoulSkillTips.prototype.curSkill = function (role) {
        var config = role.weapons.getSuitConfig(this.weaponId);
        if (!config)
            config = GlobalConfig.WeaponSoulSuit[this.weaponId][0];
        var wsconfig = GlobalConfig.WeaponSoulConfig[this.weaponId];
        var slotStrs = "";
        var curNum = 0;
        for (var i = 0; i < wsconfig.actcond.length; i++) {
            var slot = wsconfig.actcond[i];
            var level = role.weapons.getInfoLevel(slot);
            var wname = GlobalConfig.WeaponSoulPosConfig[slot][0].name;
            if (level && level >= config.level) {
                slotStrs += "|C:" + ColorUtil.WHITE_COLOR2 + "&T:" + wname + "| ";
                curNum++;
            }
            else {
                slotStrs += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + wname + "| ";
            }
        }
        this.num0.text = "\uFF08" + curNum + "/" + wsconfig.actcond.length + "\uFF09";
        this.informationname0.textFlow = TextFlowMaker.generateTextFlow1(slotStrs);
        this.desc0.text = this.ShowSkillDesc(config);
    };
    WeaponSoulSkillTips.prototype.nextSkill = function (role) {
        var config = role.weapons.getNextSuitConfig(this.weaponId);
        if (!config) {
            this.name1.text = "已满级";
            this.num1.visible = false;
            this.nextdesc1.visible = false;
            this.informationname1.visible = false;
            this.ndesc0.visible = false;
            return;
        }
        var wsconfig = GlobalConfig.WeaponSoulConfig[this.weaponId];
        var slotStrs = "";
        var curNum = 0;
        for (var i = 0; i < wsconfig.actcond.length; i++) {
            var slot = wsconfig.actcond[i];
            var level = role.weapons.getInfoLevel(slot);
            var wname = GlobalConfig.WeaponSoulPosConfig[slot][0].name;
            if (level >= config.level) {
                slotStrs += "|C:" + ColorUtil.WHITE_COLOR2 + "&T:" + wname + "| ";
                curNum++;
            }
            else {
                slotStrs += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + wname + "| ";
            }
        }
        this.num1.text = "\uFF08" + curNum + "/" + wsconfig.actcond.length + "\uFF09";
        this.informationname1.textFlow = TextFlowMaker.generateTextFlow1(slotStrs);
        this.ndesc0.text = this.ShowSkillDesc(config);
        var str = this.nextdesc1.text;
        var tmp = str.split("X");
        var s1 = tmp[0];
        var s2 = tmp[1];
        var newstr = s1 + ("" + config.level) + s2;
        this.nextdesc1.text = newstr;
    };
    WeaponSoulSkillTips.prototype.ShowSkillDesc = function (config) {
        return config.skilldesc;
    };
    WeaponSoulSkillTips.prototype.onClick = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return WeaponSoulSkillTips;
}(BaseEuiView));
__reflect(WeaponSoulSkillTips.prototype, "WeaponSoulSkillTips");
ViewManager.ins().reg(WeaponSoulSkillTips, LayerManager.UI_Popup);
//# sourceMappingURL=WeaponSoulSkillTips.js.map