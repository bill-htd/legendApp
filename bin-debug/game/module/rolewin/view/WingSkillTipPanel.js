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
var WingSkillTipPanel = (function (_super) {
    __extends(WingSkillTipPanel, _super);
    function WingSkillTipPanel() {
        return _super.call(this) || this;
    }
    WingSkillTipPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WingSkillTipsPanel";
    };
    WingSkillTipPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var id = param[0];
        this.addTouchEndEvent(this, this.otherClose);
        this.setData(id);
    };
    WingSkillTipPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    WingSkillTipPanel.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    WingSkillTipPanel.prototype.setData = function (id) {
        var config = new SkillData(id);
        if (config.name)
            this.nameLabel.text = config.name;
        if (config.desc)
            this.description.textFlow = TextFlowMaker.generateTextFlow(config.desc);
        this.BG.height = 170 + this.description.height;
    };
    return WingSkillTipPanel;
}(BaseEuiView));
__reflect(WingSkillTipPanel.prototype, "WingSkillTipPanel");
ViewManager.ins().reg(WingSkillTipPanel, LayerManager.UI_Popup);
//# sourceMappingURL=WingSkillTipPanel.js.map