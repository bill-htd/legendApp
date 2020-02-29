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
var JieSuo = "解 锁";
var WeaponPanel = (function (_super) {
    __extends(WeaponPanel, _super);
    function WeaponPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = 'weaponSoulSkin2';
        _this.isTopLevel = true;
        return _this;
    }
    WeaponPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.skillicon, this.onEvent);
        this.addTouchEvent(this.upGradeBtn0, this.onEvent);
        this.addTouchEvent(this.turnTxt, this.onEvent);
        this.addTouchEvent(this.closeBtn, this.onEvent);
        this.observe(Weapons.ins().postWeaponsAct, this.callback);
        this.observe(Weapons.ins().postWeaponsUse, this.callback);
        this.observe(Weapons.ins().postWeaponsUpLevel, this.callback);
        this.weaponShowPanel.open();
        this.roleId = param[0];
        this.weaponId = param[1];
        this.init(this.weaponId);
    };
    WeaponPanel.prototype.init = function (id) {
        this.updateUI(id);
    };
    WeaponPanel.prototype.updateUI = function (id) {
        var wsconfig = GlobalConfig.WeaponSoulConfig[id];
        if (!wsconfig) {
            for (var k in GlobalConfig.WeaponSoulConfig) {
                wsconfig = GlobalConfig.WeaponSoulConfig[k];
                break;
            }
        }
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        this.ringname.text = wsconfig.name;
        var wsinfo = role.weapons.getSoulInfoData()[id];
        var wss = role.weapons.getSuitConfig(id);
        var descex = "|C:0x00ff00&T:(已激活)";
        var color = "|C:0xffd93f&T:";
        if (!wsinfo || !wsinfo.id) {
            color = "";
            for (var k in GlobalConfig.WeaponSoulSuit[id]) {
                wss = GlobalConfig.WeaponSoulSuit[id][k];
                break;
            }
        }
        if (role.weapons.getFlexibleData().indexOf(id) == -1)
            descex = "";
        this.levellabel.text = wss.level + "阶";
        this.skillicon.data = { icon: wss.skillicon };
        this.skillname.text = wss.skillname;
        this.powerPanel.setPower(role.getWeaponTotalPower(id));
        var filterAttr = [4, 2, 6, 5];
        var attrValue = [0, 0, 0, 0];
        for (var i = 0; i < wsconfig.actcond.length; i++) {
            var slot = wsconfig.actcond[i];
            var wsinfo_1 = role.weapons.getSlotByInfo(slot);
            if (wsinfo_1) {
                for (var j = 0; j < wsinfo_1.attr.length; j++) {
                    var attr = wsinfo_1.attr[j];
                    if (filterAttr.indexOf(attr.type) != -1) {
                        for (var z = 0; z < filterAttr.length; z++) {
                            if (filterAttr[z] == attr.type)
                                attrValue[z] += attr.value;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < 4; i++) {
            if (this["attr" + i]) {
                var attname = AttributeData.getAttrStrByType(filterAttr[i]);
                this["attr" + i].text = attname + "+" + attrValue[i];
            }
        }
        this.skill.textFlow = TextFlowMaker.generateTextFlow1("" + color + wss.skilldesc + descex);
        var ws = role.weapons.getWeapsInfoBySoulId(id);
        if (this.turnTxt.parent)
            this.turnTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u5175\u9B42\u4E4B\u7075");
        this.descGroup.visible = true;
        if (role.weapons.flexibleCount) {
            this.desc.text = "\u4F7F\u7528\u540E\u53EA\u4F1A\u6539\u53D8\u5916\u89C2,\u53D8\u66F4\u6280\u80FD\u6548\u679C\u8BF7\u524D\u5F80";
            if (!this.turnTxt.parent) {
                this.desc.parent.addChild(this.turnTxt);
            }
        }
        else {
            this.desc.text = "\u4F7F\u7528\u540E\u5C06\u6FC0\u6D3B\u5175\u9B42\u7684\u6280\u80FD\u6548\u679C\u4EE5\u53CA\u5916\u89C2\u663E\u793A";
            DisplayUtils.removeFromParent(this.turnTxt);
        }
        if (!ws || !ws.id) {
            this.upGradeBtn0.label = JieSuo;
            this.huanhuaImage.visible = false;
            this.redPoint.visible = role.weapons.IsActivityWeapon(id);
            this.descGroup.visible = false;
        }
        else if (role.weapons.weaponsId == ws.id) {
            this.upGradeBtn0.label = "取 消";
            this.huanhuaImage.visible = true;
            this.redPoint.visible = false;
        }
        else if (!role.weapons.weaponsId) {
            this.upGradeBtn0.label = "使 用";
            this.huanhuaImage.visible = false;
            this.redPoint.visible = true;
        }
        else {
            this.upGradeBtn0.label = "替 换";
            this.huanhuaImage.visible = false;
            this.redPoint.visible = false;
        }
        this.weaponShowPanel.init(id, this.roleId);
    };
    WeaponPanel.prototype.onEvent = function (e) {
        switch (e.currentTarget) {
            case this.skillicon:
                ViewManager.ins().open(WeaponSoulSkillTips, this.roleId, this.weaponId);
                break;
            case this.upGradeBtn0:
                var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
                if (this.upGradeBtn0.label == JieSuo) {
                    var minSuitConfig = role.weapons.getSuitConfig(this.weaponId);
                    if (!minSuitConfig) {
                        UserTips.ins().showTips("还有部位未激活");
                        return;
                    }
                    Weapons.ins().sendWeaponsAct(this.roleId, this.weaponId);
                }
                else if (this.upGradeBtn0.label == "使 用") {
                    Weapons.ins().sendWeaponsUse(this.roleId, this.weaponId);
                }
                else if (this.upGradeBtn0.label == "取 消") {
                    Weapons.ins().sendWeaponsUse(this.roleId, 0);
                }
                else if (this.upGradeBtn0.label == "替 换") {
                    Weapons.ins().sendWeaponsUse(this.roleId, this.weaponId);
                }
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.turnTxt:
                var win = ViewManager.ins().getView(ForgeWin);
                if (win) {
                    win.weaponsoul.open(this.roleId, false);
                }
                ViewManager.ins().close(this);
                break;
        }
    };
    WeaponPanel.prototype.callback = function () {
        this.updateUI(this.weaponId);
    };
    WeaponPanel.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    return WeaponPanel;
}(BaseEuiView));
__reflect(WeaponPanel.prototype, "WeaponPanel");
ViewManager.ins().reg(WeaponPanel, LayerManager.UI_Popup);
//# sourceMappingURL=WeaponPanel.js.map