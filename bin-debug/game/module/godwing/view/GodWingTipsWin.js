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
var GodWingTipsWin = (function (_super) {
    __extends(GodWingTipsWin, _super);
    function GodWingTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShenYuTipsSkin";
        return _this;
    }
    GodWingTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    GodWingTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.bgClose, this.otherClose);
        this.gwConfig = param[0];
        this.updateTips();
    };
    GodWingTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this.bgClose);
    };
    GodWingTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(GodWingTipsWin);
    };
    GodWingTipsWin.prototype.updateTips = function () {
        var cfg = GlobalConfig.ItemConfig[this.gwConfig.itemId];
        this.nameLabel.text = cfg.name;
        this.type.text = Wing.ins().getNameFromSlot(this.gwConfig.slot);
        this.lv.text = "羽翼" + this.gwConfig.level + "阶可穿戴";
        var color = 0xff0000;
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role && role.wingsData.lv + 1 >= this.gwConfig.level) {
                color = 0x00ff00;
                break;
            }
        }
        this.lv.textColor = color;
        this.nameLabel.textColor = ItemConfig.getQualityColor(cfg);
        var arr = this.gwConfig.attr;
        var exarr = this.gwConfig.exattr;
        var attrStr = "";
        var exattrStr = "";
        var exPower = this.gwConfig.exPower;
        for (var i = 0; i < arr.length; i++) {
            attrStr += AttributeData.getAttrStrByType(arr[i].type) + ": ";
            attrStr += arr[i].value + "\n";
        }
        for (var i = 0; i < exarr.length; i++) {
            attrStr += AttributeData.getExtAttrStrByType(exarr[i].type) + ": ";
            var value = exarr[i].value;
            if (exarr[i].type == ExAttributeType.eatMiss || exarr[i].type == ExAttributeType.eatHit) {
                value = value / 100;
                attrStr += value;
                attrStr += "%";
            }
            attrStr += "\n";
        }
        var index = attrStr.lastIndexOf("\n");
        attrStr = attrStr.substring(0, index);
        this.attr0.text = attrStr;
        var totalAttr = arr;
        var scorePower = Math.floor(UserBag.getAttrPower(totalAttr)) + exPower;
        this.score.text = "\u8BC4\u5206\uFF1A" + scorePower;
        this.powerPanel.setPower(scorePower);
        this.itemIcon.data = this.gwConfig;
        this.itemIcon.setNameVisible(false);
        this.itemIcon.setCountVisible(false);
        this.quali.source = "quali" + ItemConfig.getQuality(cfg);
    };
    return GodWingTipsWin;
}(BaseEuiView));
__reflect(GodWingTipsWin.prototype, "GodWingTipsWin");
ViewManager.ins().reg(GodWingTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=GodWingTipsWin.js.map