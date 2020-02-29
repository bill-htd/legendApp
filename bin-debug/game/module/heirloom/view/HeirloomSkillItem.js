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
var HeirloomSkillItem = (function (_super) {
    __extends(HeirloomSkillItem, _super);
    function HeirloomSkillItem() {
        return _super.call(this) || this;
    }
    HeirloomSkillItem.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "heirloomTipsSkin";
    };
    HeirloomSkillItem.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var icon = param[0];
        var name = param[1];
        var desc = param[2];
        this.addTouchEndEvent(this, this.onClick);
        this.setData(icon, name, desc);
    };
    HeirloomSkillItem.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    HeirloomSkillItem.prototype.onClick = function (evt) {
        ViewManager.ins().close(this);
    };
    HeirloomSkillItem.prototype.setData = function (icon, name, desc) {
        this.itemIcon.setSkillData(icon);
        this.nameLabel.textFlow = TextFlowMaker.generateTextFlow1(name);
        this.description.textFlow = TextFlowMaker.generateTextFlow1(desc);
    };
    return HeirloomSkillItem;
}(BaseEuiView));
__reflect(HeirloomSkillItem.prototype, "HeirloomSkillItem");
ViewManager.ins().reg(HeirloomSkillItem, LayerManager.UI_Popup);
//# sourceMappingURL=HeirloomSkillItem.js.map