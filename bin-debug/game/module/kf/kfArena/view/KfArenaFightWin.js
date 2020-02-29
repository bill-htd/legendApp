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
var KfArenaFightWin = (function (_super) {
    __extends(KfArenaFightWin, _super);
    function KfArenaFightWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KfArenaFightSkin";
        return _this;
    }
    KfArenaFightWin.prototype.childrenCreated = function () {
        this.bigTimeGroup.visible = true;
    };
    KfArenaFightWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.modeSys = KfArenaSys.ins();
        this.addTouchEvent(this.seeRule, this.onTouch);
        this.addTouchEvent(this.infoBtn, this.onTouch);
        this.observe(this.modeSys.postChangeScore, this.upScore);
        this.startTime = param[0];
        this.startCountDown(this.startTime);
        this.upScore();
    };
    KfArenaFightWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    KfArenaFightWin.prototype.upScore = function () {
        this.blueScore.text = this.modeSys.scoreA + "";
        this.redScore.text = this.modeSys.scoreB + "";
    };
    KfArenaFightWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.seeRule:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[34].text);
                break;
            case this.infoBtn:
                KfArenaSys.ins().sendDataInfo();
                break;
        }
    };
    KfArenaFightWin.prototype.startCountDown = function (t) {
        this.timeGo();
        if (t > 0) {
            this.bigTimeGroup.visible = true;
            TimerManager.ins().doTimer(1000, t + 1, this.timeGo, this);
        }
    };
    KfArenaFightWin.prototype.timeGo = function () {
        if (this.startTime > 0) {
            this.countDown.text = this.startTime + "";
            this.startTime--;
        }
        else {
            this.bigTimeGroup.visible = false;
        }
    };
    return KfArenaFightWin;
}(BaseEuiView));
__reflect(KfArenaFightWin.prototype, "KfArenaFightWin");
ViewManager.ins().reg(KfArenaFightWin, LayerManager.UI_Popup);
//# sourceMappingURL=KfArenaFightWin.js.map