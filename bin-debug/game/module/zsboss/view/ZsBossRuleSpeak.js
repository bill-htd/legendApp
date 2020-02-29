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
var ZsBossRuleSpeak = (function (_super) {
    __extends(ZsBossRuleSpeak, _super);
    function ZsBossRuleSpeak() {
        return _super.call(this) || this;
    }
    ZsBossRuleSpeak.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "HelpTipsSkin";
        this.isTopLevel = true;
    };
    ZsBossRuleSpeak.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        var index = param[0];
        var cfg = GlobalConfig.HelpInfoConfig[index];
        if (Assert(cfg, "HelpInfoConfig do not have index:" + index))
            return;
        this.textInfo.textFlow = TextFlowMaker.generateTextFlow(GlobalConfig.HelpInfoConfig[index].text);
        this.textInfo.height = this.textInfo.textHeight;
        this.background.height = this.textInfo.textHeight + 60;
        this.anigroup.y = (StageUtils.ins().getHeight() - this.background.height) / 2;
    };
    ZsBossRuleSpeak.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    ZsBossRuleSpeak.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    return ZsBossRuleSpeak;
}(BaseEuiView));
__reflect(ZsBossRuleSpeak.prototype, "ZsBossRuleSpeak");
ViewManager.ins().reg(ZsBossRuleSpeak, LayerManager.UI_Popup);
//# sourceMappingURL=ZsBossRuleSpeak.js.map