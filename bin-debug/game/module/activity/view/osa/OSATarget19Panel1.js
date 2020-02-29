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
var OSATarget19Panel1 = (function (_super) {
    __extends(OSATarget19Panel1, _super);
    function OSATarget19Panel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "ISCostWinSkin";
        return _this;
    }
    OSATarget19Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.panelArr[this.curSelectIndex].close();
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget19Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateRedPoint);
        var config = GlobalConfig.ActivityType19Config[this.activityID][1];
        this.costTarget.activityType = ActivityType.Normal;
        this.costTarget.activityID = config.activityID;
        this.panelArr = [this.ranking, this.costTarget, this.reward];
        this.setSelectedIndex(0);
        this.updateRedPoint();
    };
    OSATarget19Panel1.prototype.onTabTouch = function (e) {
        this.panelArr[this.curSelectIndex].close();
        var selectedIndex = e.currentTarget.selectedIndex;
        this.setSelectedIndex(selectedIndex);
    };
    OSATarget19Panel1.prototype.setSelectedIndex = function (selectedIndex) {
        this.curSelectIndex = selectedIndex;
        this.panelArr[selectedIndex].open(this.activityID);
        this.viewStack.selectedIndex = selectedIndex;
    };
    OSATarget19Panel1.prototype.updateRedPoint = function () {
        var data = Activity.ins().getActivityDataById(this.activityID);
        this.redPoint1.visible = data.canReward();
    };
    OSATarget19Panel1.prototype.updateData = function () {
    };
    return OSATarget19Panel1;
}(BaseView));
__reflect(OSATarget19Panel1.prototype, "OSATarget19Panel1");
//# sourceMappingURL=OSATarget19Panel1.js.map