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
var OSATarget18Panel = (function (_super) {
    __extends(OSATarget18Panel, _super);
    function OSATarget18Panel() {
        var _this = _super.call(this) || this;
        _this.typePanelList = [];
        return _this;
    }
    OSATarget18Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(Activity.ins().postRewardResult, this.updateData);
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        var config = GlobalConfig.ActivityType18Config[this.activityID];
        if (!this.typePanelList[this.activityID]) {
            var showType = config[0].showType || 1;
            var panel = ObjectPool.pop("OSATarget18Panel" + showType, [this.activityID]);
            panel.top = 0;
            panel.bottom = 0;
            panel.left = 0;
            panel.right = 0;
            panel.activityID = this.activityID;
            this.typePanelList[this.activityID + ""] = panel;
        }
        this.cruPanel = this.typePanelList[this.activityID + ""];
        this.cruPanel.open();
        this.addChild(this.cruPanel);
    };
    OSATarget18Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget18Panel.prototype.updateData = function () {
        this.cruPanel && this.cruPanel.updateData();
    };
    return OSATarget18Panel;
}(ActivityPanel));
__reflect(OSATarget18Panel.prototype, "OSATarget18Panel");
//# sourceMappingURL=OSATarget18Panel.js.map