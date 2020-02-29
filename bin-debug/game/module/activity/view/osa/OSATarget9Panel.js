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
var OSATarget9Panel = (function (_super) {
    __extends(OSATarget9Panel, _super);
    function OSATarget9Panel() {
        var _this = _super.call(this) || this;
        _this.type2PanelList = [];
        return _this;
    }
    OSATarget9Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var config;
        if (this.activityType == ActivityType.Normal) {
            config = GlobalConfig.ActivityType9Config[this.activityID];
        }
        else if (this.activityType == ActivityType.Personal) {
            config = GlobalConfig.PActivityType9Config[this.activityID];
        }
        if (this.cruPanel) {
            if (config[1].showType == 1 || config[1].showType == 3 || config[1].showType == 4) {
            }
            else {
                this.cruPanel.close();
                DisplayUtils.removeFromParent(this.cruPanel);
            }
        }
        if (!this.type2PanelList[this.activityID]) {
            var panel = ObjectPool.pop("OSATarget9Panel" + config[1].showType);
            panel.top = 0;
            panel.bottom = 0;
            panel.left = 0;
            panel.right = 0;
            panel.activityID = this.activityID;
            this.type2PanelList[this.activityID + ""] = panel;
        }
        this.cruPanel = this.type2PanelList[this.activityID + ""];
        this.cruPanel.open();
        this.addChild(this.cruPanel);
    };
    OSATarget9Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget9Panel.prototype.updateData = function () {
        this.cruPanel.updateData();
    };
    return OSATarget9Panel;
}(ActivityPanel));
__reflect(OSATarget9Panel.prototype, "OSATarget9Panel");
//# sourceMappingURL=OSATarget9Panel.js.map