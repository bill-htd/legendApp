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
var HeirloomSuit = (function (_super) {
    __extends(HeirloomSuit, _super);
    function HeirloomSuit() {
        var _this = _super.call(this) || this;
        _this.skinName = "heirloomSuit";
        return _this;
    }
    HeirloomSuit.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.model1 = new MovieClip;
        this.model1.x = this.eff1.x;
        this.model1.y = this.eff1.y;
        this.eff1.parent.addChild(this.model1);
        this.model2 = new MovieClip;
        this.model2.x = this.eff2.x;
        this.model2.y = this.eff2.y;
        this.eff2.parent.addChild(this.model2);
    };
    HeirloomSuit.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.onClick);
        var roleId = param[0];
        this.curRole = SubRoles.ins().getSubRoleByIndex(roleId);
        this.setData();
    };
    HeirloomSuit.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        DisplayUtils.removeFromParent(this.model1);
        DisplayUtils.removeFromParent(this.model2);
        this.model1 = null;
        this.model2 = null;
    };
    HeirloomSuit.prototype.onClick = function (evt) {
        ViewManager.ins().close(this);
    };
    HeirloomSuit.prototype.setData = function () {
        var hinfos = this.curRole.heirloom.getData();
        if (!hinfos)
            return null;
        var minlv = this.getMinEquipLv(hinfos);
        var strMap = this.getInfoMation(hinfos, minlv);
        this.setCurSuit(minlv, strMap.str1, strMap.lv1);
        this.setNextSuit(minlv, strMap.str2, strMap.lv2);
    };
    HeirloomSuit.prototype.setCurSuit = function (minlv, str, lvNum) {
        if (!minlv) {
            for (var i = 0; i < 8; i++) {
                this["desc" + i].visible = false;
                this["attr" + i].visible = false;
            }
            this.informationname0.visible = false;
            this.num0.visible = false;
            this.name0.text = "当前没有激活套装效果";
            return;
        }
        this.informationname0.textFlow = TextFlowMaker.generateTextFlow(str);
        var id = minlv ? minlv : 1;
        var config = GlobalConfig.HeirloomEquipSetConfig[id];
        for (var i = 0; i < config.attr.length; i++) {
            var cfg = config.attr[i];
            if (lvNum < 8) {
                this["attr" + i].textColor = ColorUtil.GRAY_COLOR2;
                this["desc" + i].textColor = ColorUtil.GRAY_COLOR2;
            }
            this["desc" + i].text = this.getAttrName(cfg.type);
            var value = cfg.value;
            if (cfg.type == AttributeType.atCritEnhance)
                value += 15000;
            var vtext = "+" + value;
            if (i >= 4) {
                value /= 100;
                vtext = "+" + value + "%";
            }
            this["attr" + i].text = vtext;
            this["attr" + i].x = this["desc" + i].x + this["desc" + i].width;
        }
        for (var i = config.attr.length; i < 8; i++) {
            this["cgroup" + i].visible = false;
        }
        this.name0.text = config.name;
        this.num0.text = "\uFF08" + lvNum + "/8\uFF09";
        this.model1.playFile(RES_DIR_EFF + config.neff, -1);
    };
    HeirloomSuit.prototype.setNextSuit = function (minlv, str, lvNum) {
        this.informationname1.textFlow = TextFlowMaker.generateTextFlow(str);
        var id = minlv ? (minlv + 1) : 1;
        var config = GlobalConfig.HeirloomEquipSetConfig[id];
        if (!config) {
            this.name1.text = "没有下级可预览";
            this.num1.visible = false;
            this.informationname1.visible = false;
            for (var i = 0; i < 8; i++) {
                this["ngroup" + i].visible = false;
            }
            return;
        }
        for (var i = 0; i < config.attr.length; i++) {
            var cfg = config.attr[i];
            this["ndesc" + i].text = this.getAttrName(cfg.type);
            var value = cfg.value;
            if (cfg.type == AttributeType.atCritEnhance)
                value += 15000;
            var vtext = "+" + value;
            if (i >= 4) {
                value /= 100;
                vtext = "+" + value + "%";
            }
            this["nattr" + i].text = vtext;
            this["nattr" + i].x = this["ndesc" + i].x + this["ndesc" + i].width;
        }
        for (var i = config.attr.length; i < 8; i++) {
            this["ngroup" + i].visible = false;
        }
        this.name1.text = config.name;
        this.num1.text = "\uFF08" + lvNum + "/8\uFF09";
        this.model2.playFile(RES_DIR_EFF + config.neff, -1);
    };
    HeirloomSuit.prototype.getInfoMation = function (hinfos, minlv) {
        var str1 = "";
        var str2 = "";
        var lv1 = 0;
        var lv2 = 0;
        var minlv2 = minlv ? (minlv + 1) : 1;
        for (var i = 0; i < hinfos.length; i++) {
            var info = hinfos[i];
            var title = HeirloomData.getEquipName(i);
            if (!info.lv) {
                str1 += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + title + "|   ";
                str2 += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + title + "|   ";
            }
            else {
                if (info.lv >= minlv) {
                    lv1++;
                    str1 += "|C:" + ColorUtil.WHITE_COLOR2 + "&T:" + title + "|   ";
                }
                else {
                    str1 += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + title + "|   ";
                }
                if (info.lv >= minlv2) {
                    lv2++;
                    str2 += "|C:" + ColorUtil.WHITE_COLOR2 + "&T:" + title + "|   ";
                }
                else {
                    str2 += "|C:" + ColorUtil.GRAY_COLOR2 + "&T:" + title + "|   ";
                }
            }
        }
        return { str1: str1, str2: str2, lv1: lv1, lv2: lv2 };
    };
    HeirloomSuit.prototype.getMinEquipLv = function (hinfos) {
        var minLv = 0;
        var everyLv = true;
        for (var i = 0; i < hinfos.length; i++) {
            var info = hinfos[i];
            if (i == 0)
                minLv = info.lv;
            if (!info.lv && everyLv)
                everyLv = false;
            if (info.lv <= minLv)
                minLv = info.lv;
        }
        if (!everyLv) {
            for (var i = 0; i < 8; i++) {
                this["desc" + i].textColor = ColorUtil.GRAY_COLOR2;
                this["attr" + i].textColor = ColorUtil.GRAY_COLOR2;
            }
        }
        return minLv;
    };
    HeirloomSuit.prototype.getAttrName = function (attType) {
        var str = "";
        switch (attType) {
            case AttributeType.atAttack:
                str = "攻击";
                break;
            case AttributeType.atMaxHp:
                str = "生命";
                break;
            case AttributeType.atDef:
                str = "物防";
                break;
            case AttributeType.atRes:
                str = "魔防";
                break;
            case AttributeType.atRoleDamageEnhance:
                str = "攻击玩家伤害加深";
                break;
            case AttributeType.atRoleDamageReduction:
                str = "受到玩家伤害减免";
                break;
            case AttributeType.atCritEnhance:
                str = "暴击伤害加强";
                break;
            case AttributeType.atPenetrate:
                str = "穿透（无视防御）";
                break;
        }
        return str;
    };
    return HeirloomSuit;
}(BaseEuiView));
__reflect(HeirloomSuit.prototype, "HeirloomSuit");
ViewManager.ins().reg(HeirloomSuit, LayerManager.UI_Popup);
//# sourceMappingURL=HeirloomSuit.js.map