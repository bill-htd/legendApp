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
var ActivityForeshowWin = (function (_super) {
    __extends(ActivityForeshowWin, _super);
    function ActivityForeshowWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "NewFuncNoticeSkin";
        return _this;
    }
    ActivityForeshowWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addCustomEvent();
        this.updateView();
    };
    ActivityForeshowWin.prototype.addCustomEvent = function () {
        this.addTouchEvent(this.closeBtn, this.closeWin);
        TimerManager.ins().doTimerDelay(1000, 1000, 0, this.refreshTime, this);
    };
    ActivityForeshowWin.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    ActivityForeshowWin.prototype.updateView = function () {
        var cfg = ActivityForeshowModel.ins().getForeshow();
        if (cfg) {
            this.activityImg.source = cfg.pic;
        }
        this.refreshTime();
    };
    ActivityForeshowWin.prototype.refreshTime = function () {
        var timeDesc = DateUtils.getFormatBySecond(ActivityForeshowModel.ins().getRemainTime());
        this.daojishi0.text = timeDesc;
    };
    return ActivityForeshowWin;
}(BaseEuiView));
__reflect(ActivityForeshowWin.prototype, "ActivityForeshowWin");
ViewManager.ins().reg(ActivityForeshowWin, LayerManager.UI_Main);
//# sourceMappingURL=ActivityForeshowWin.js.map