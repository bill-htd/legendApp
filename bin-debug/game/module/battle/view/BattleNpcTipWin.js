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
var BattleNpcTipWin = (function (_super) {
    __extends(BattleNpcTipWin, _super);
    function BattleNpcTipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "BattleTipsSkin";
        return _this;
    }
    BattleNpcTipWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onGoto);
        this.update();
    };
    BattleNpcTipWin.prototype.close = function () {
        this.removeTouchEvent(this.goTo, this.onGoto);
    };
    BattleNpcTipWin.prototype.update = function () {
        this.desc.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.CampBattleConfig.desc);
        this.rule.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.HelpInfoConfig[17].text);
        this.redPoint.visible = BattleCC.ins().isOpen;
    };
    BattleNpcTipWin.prototype.onGoto = function (e) {
        if (e.target == this.goTo) {
            if (Actor.level < GlobalConfig.CampBattleConfig.openLevel) {
                UserTips.ins().showTips(GlobalConfig.CampBattleConfig.openLevel + "\u7EA7\u53EF\u53C2\u4E0E\u8840\u6218\u6BD4\u5947\u57CE");
                return;
            }
            if (!BattleCC.ins().isOpen) {
                UserTips.ins().showTips(GlobalConfig.CampBattleConfig.openTips);
                return;
            }
            var cd = BattleCC.ins().getEnterCD();
            if (cd > 0) {
                UserTips.ins().showTips(cd + "秒后才可进入阵营副本");
                return;
            }
            BattleCC.ins().joinBattle();
        }
        else if (e.target == this.bgClose)
            ViewManager.ins().close(this);
    };
    return BattleNpcTipWin;
}(BaseEuiView));
__reflect(BattleNpcTipWin.prototype, "BattleNpcTipWin");
ViewManager.ins().reg(BattleNpcTipWin, LayerManager.UI_Main);
//# sourceMappingURL=BattleNpcTipWin.js.map