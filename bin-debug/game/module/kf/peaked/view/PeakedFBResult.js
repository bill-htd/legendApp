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
var PeakedFBResult = (function (_super) {
    __extends(PeakedFBResult, _super);
    function PeakedFBResult() {
        var _this = _super.call(this) || this;
        _this.AUTO_QUIT_TIME = 5;
        _this._curTime = 0;
        _this.skinName = "PeakedNessResultSkin";
        return _this;
    }
    PeakedFBResult.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.quitBtn, this.onQuit);
        var player = param[1];
        var str = "";
        if (param[0]) {
            this.bg.source = "win_png";
            this.result.source = "win_02";
            this.resultImg.source = "peakness_win";
            this.win.visible = true;
            this.lose.visible = false;
            this.winPlayer.text = player;
        }
        else {
            this.bg.source = "lost_png";
            this.result.source = "lost_02";
            this.resultImg.source = "peakness_lose";
            this.win.visible = false;
            this.lose.visible = true;
            this.losePlayer.text = player;
        }
        TimerManager.ins().doTimer(1000, this.AUTO_QUIT_TIME, this.onTick, this);
        this._curTime = this.AUTO_QUIT_TIME;
        this.onTick();
    };
    PeakedFBResult.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.onTick, this);
    };
    PeakedFBResult.prototype.onTick = function () {
        this.quitBtn.label = "\u9000\u51FA(" + --this._curTime + ")";
        if (this._curTime < 0) {
            this.onQuit();
        }
    };
    PeakedFBResult.prototype.onQuit = function () {
        UserFb.ins().sendExitFb();
        ViewManager.ins().close(PeakedFBResult);
        if (PeakedSys.ins().isKf()) {
            PeakedSys.ins().crossScene = 1;
        }
        else {
            TimerManager.ins().doTimer(300, 1, function () { ViewManager.ins().open(PeakedMainWin); }, this);
        }
    };
    return PeakedFBResult;
}(BaseEuiView));
__reflect(PeakedFBResult.prototype, "PeakedFBResult");
ViewManager.ins().reg(PeakedFBResult, LayerManager.UI_Popup);
//# sourceMappingURL=PeakedFBResult.js.map