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
var TimeBuyTab = (function (_super) {
    __extends(TimeBuyTab, _super);
    function TimeBuyTab() {
        var _this = _super.call(this) || this;
        _this.skinName = "DETimeBuyTabSkin";
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    TimeBuyTab.prototype.setData = function (config, isOpen) {
        this.time.text = config.limitTime[0] + ":" + (config.limitTime[1] < 10 ? config.limitTime[1] + "0" : config.limitTime[1]);
        this._isOpen = isOpen;
        this.setSelected(false);
    };
    TimeBuyTab.prototype.setSelected = function (selected) {
        if (selected)
            this.currentState = this._isOpen ? "intimeselect" : "outtimeselect";
        else
            this.currentState = this._isOpen ? "intime" : "outtime";
    };
    TimeBuyTab.prototype.setRedPoint = function (show) {
        this.redPoint.visible = show;
    };
    return TimeBuyTab;
}(BaseComponent));
__reflect(TimeBuyTab.prototype, "TimeBuyTab");
//# sourceMappingURL=TimeBuyTab.js.map