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
var PaoDianNpcTalkWin = (function (_super) {
    __extends(PaoDianNpcTalkWin, _super);
    function PaoDianNpcTalkWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PointTipsSkin";
        return _this;
    }
    PaoDianNpcTalkWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onGoto);
        this.update();
    };
    PaoDianNpcTalkWin.prototype.close = function () {
        this.removeTouchEvent(this.goTo, this.onGoto);
    };
    PaoDianNpcTalkWin.prototype.update = function () {
        this.desc.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.PassionPointConfig.desc);
        this.rule.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.HelpInfoConfig[20].text);
        this.redPoint.visible = PaoDianCC.ins().isOpen;
    };
    PaoDianNpcTalkWin.prototype.onGoto = function (e) {
        if (e.target == this.goTo) {
            if (!PaoDianCC.ins().isOpen) {
                UserTips.ins().showTips(GlobalConfig.PassionPointConfig.openTips);
                return;
            }
            var openLevel = GlobalConfig.PassionPointConfig.openLv;
            if (Actor.level + UserZs.ins().lv * 1000 < openLevel) {
                UserTips.ins().showTips((openLevel < 1000 ? openLevel + "级" : (openLevel % 1000 == 0 ?
                    openLevel / 1000 + "转" : openLevel / 1000 + "转" + openLevel % 1000 + "级")) + "\u53EF\u53C2\u4E0E\u6FC0\u60C5\u6CE1\u70B9");
                return;
            }
            var cd = PaoDianCC.ins().getEnterCD();
            if (cd > 0) {
                UserTips.ins().showTips(cd + "秒后才可进入激情泡点");
                return;
            }
            PaoDianCC.ins().enterPaoDian();
        }
        else if (e.target == this.bgClose)
            ViewManager.ins().close(this);
    };
    return PaoDianNpcTalkWin;
}(BaseEuiView));
__reflect(PaoDianNpcTalkWin.prototype, "PaoDianNpcTalkWin");
ViewManager.ins().reg(PaoDianNpcTalkWin, LayerManager.UI_Main);
//# sourceMappingURL=PaoDianNpcTalkWin.js.map