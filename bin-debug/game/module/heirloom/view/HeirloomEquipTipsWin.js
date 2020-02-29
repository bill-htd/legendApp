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
var HeirloomEquipTipsWin = (function (_super) {
    __extends(HeirloomEquipTipsWin, _super);
    function HeirloomEquipTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "heirloomitemtips";
        return _this;
    }
    HeirloomEquipTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    HeirloomEquipTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curRole = param[0];
        this.index = param[1];
        if (this.curRole && this.curRole.heirloom)
            this.info = this.curRole.heirloom.getInfoBySolt(this.index);
        if (!this.info || !this.info.lv)
            this.info = GlobalConfig.HeirloomEquipConfig[this.index + 1][1];
        this.addTouchEndEvent(this.bgClose, this.onClick);
        this.init();
    };
    HeirloomEquipTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeObserve();
    };
    HeirloomEquipTipsWin.prototype.init = function () {
        this.equipItem.data = { pos: this.index, info: this.info };
        this.equipItem.setTipsVisible();
        this.equipName.text = this.info.name;
        this.slot.text = HeirloomData.getEquipName(this.index);
        var attrs = this.setBasicsDesc();
        this.setSpecialDesc();
        this.setSkillDesc();
        var power = Math.floor(UserBag.getAttrPower(attrs));
        this.power.text = "评分:" + power;
        if (this.curRole) {
            power = this.curRole.getHeirloomSlotPower(this.index);
        }
        this.powerPanel.setPower(power);
    };
    HeirloomEquipTipsWin.prototype.onClick = function () {
        ViewManager.ins().close(this);
    };
    HeirloomEquipTipsWin.prototype.setBasicsDesc = function () {
        var attrs = [];
        for (var i = 0; i < this.info.attr.length; i++) {
            if (i > 3) {
                break;
            }
            var ad = new AttributeData;
            var attr = this.info.attr[i];
            var str = AttributeData.getAttrStrByType(attr.type);
            str += "+" + attr.value;
            this["value" + i].text = str;
            ad.type = attr.type;
            ad.value = attr.value;
            attrs.push(ad);
        }
        return attrs;
    };
    HeirloomEquipTipsWin.prototype.setSpecialDesc = function () {
        for (var i = 4; i < this.info.attr.length; i++) {
            if (this["value" + i]) {
                var attr = this.info.attr[i];
                var str_1 = AttributeData.getAttrStrByType(attr.type);
                str_1 += "+" + attr.value;
                this["value" + i].text = str_1;
            }
        }
        var str = HeirloomData.getEquipName(this.index);
        str += "部件所有属性+" + this.info.attr_add + "%";
        this["value6"].text = str;
    };
    HeirloomEquipTipsWin.prototype.setSkillDesc = function () {
        var str = "";
        if (this.info.skillname)
            str = this.info.skillname + "\n" + this.info.skilldesc;
        else
            str = "无";
        this.skilldesc.textFlow = TextFlowMaker.generateTextFlow1(str);
    };
    return HeirloomEquipTipsWin;
}(BaseEuiView));
__reflect(HeirloomEquipTipsWin.prototype, "HeirloomEquipTipsWin");
ViewManager.ins().reg(HeirloomEquipTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=HeirloomEquipTipsWin.js.map