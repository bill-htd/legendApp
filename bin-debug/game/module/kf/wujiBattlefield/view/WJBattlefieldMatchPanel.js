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
var WJBattlefieldMatchPanel = (function (_super) {
    __extends(WJBattlefieldMatchPanel, _super);
    function WJBattlefieldMatchPanel() {
        var _this = _super.call(this) || this;
        _this.matchTick = 0;
        _this.matchingStrs = [".", '..', '...'];
        _this.skinName = "WJBattleMatchSkin";
        return _this;
    }
    WJBattlefieldMatchPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.cancelBtn, this.onTouch);
        this.addTouchEvent(this.minBtn, this.onTouch);
        this.startMatch();
    };
    WJBattlefieldMatchPanel.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
    };
    WJBattlefieldMatchPanel.prototype.miniUI = function () {
        ViewManager.ins().close(this);
        WJBattlefieldSys.ins().matchingTime = this.matchTick - egret.getTimer() / 1000;
    };
    WJBattlefieldMatchPanel.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.cancelBtn:
                WJBattlefieldSys.ins().sendCancelMatch();
                break;
            case this.minBtn:
                this.miniUI();
                break;
        }
    };
    WJBattlefieldMatchPanel.prototype.startMatch = function () {
        var _this = this;
        this.matchTick = WJBattlefieldSys.ins().getMatchingTime();
        this.overTimersLabel.text = DateUtils.getFormatBySecond(this.matchTick >> 1);
        TimerManager.ins().doTimer(500, 0, function () {
            _this.matchTick++;
            _this.matchLabel.text = "\u5339\u914D\u4E2D" + _this.matchingStrs[_this.matchTick % 3];
            _this.overTimersLabel.text = DateUtils.getFormatBySecond(_this.matchTick >> 1);
        }, this);
    };
    return WJBattlefieldMatchPanel;
}(BaseEuiView));
__reflect(WJBattlefieldMatchPanel.prototype, "WJBattlefieldMatchPanel");
ViewManager.ins().reg(WJBattlefieldMatchPanel, LayerManager.UI_Popup);
//# sourceMappingURL=WJBattlefieldMatchPanel.js.map