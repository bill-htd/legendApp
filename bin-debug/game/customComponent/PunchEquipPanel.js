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
var PunchEquipPanel = (function (_super) {
    __extends(PunchEquipPanel, _super);
    function PunchEquipPanel() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        _this.skinName = "PunchEquip";
        _this.isTopLevel = true;
        return _this;
    }
    PunchEquipPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    PunchEquipPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(UserSkill.ins().postHejiEquipChange, this.refushPanelInfo);
        this.refushPanelInfo();
        this.reufshRolePoint();
    };
    PunchEquipPanel.prototype.refushPanelInfo = function () {
        var attData = [];
        for (var i = 1; i < 9; i++) {
            this["item" + i].data = i - 1;
            var item = UserSkill.ins().equipListData[i - 1];
            if (attData.length == 0) {
                attData = item.att;
            }
            else {
                attData = AttributeData.AttrAddition(attData, item.att);
            }
        }
        this.powerPanel.setPower(998);
        this.attrsText.text = AttributeData.getAttStr(attData);
    };
    PunchEquipPanel.prototype.refushOne = function (index) {
        this["item" + (index + 1)].data = index;
        if (ViewManager.ins().isShow(PunchEquipChooseWin))
            ViewManager.ins().close(PunchEquipChooseWin);
        this.powerPanel.setPower(998);
    };
    PunchEquipPanel.prototype.reufshRolePoint = function () {
    };
    PunchEquipPanel.prototype.countAllAttNum = function () {
        var num = 0;
        return num;
    };
    PunchEquipPanel.prototype.onTap = function (event) {
        this.selectIndex = 0;
        switch (event.target) {
            default:
                break;
        }
    };
    return PunchEquipPanel;
}(BaseEuiView));
__reflect(PunchEquipPanel.prototype, "PunchEquipPanel");
ViewManager.ins().reg(PunchEquipPanel, LayerManager.UI_Main);
//# sourceMappingURL=PunchEquipPanel.js.map