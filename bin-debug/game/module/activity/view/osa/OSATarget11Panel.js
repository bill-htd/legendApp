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
var OSATarget11Panel = (function (_super) {
    __extends(OSATarget11Panel, _super);
    function OSATarget11Panel() {
        var _this = _super.call(this) || this;
        _this.type2PanelList = [];
        return _this;
    }
    OSATarget11Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        var config = GlobalConfig.ActivityType11_1Config[this.activityID];
        if (!this.type2PanelList[this.activityID]) {
            var panel = ObjectPool.pop("OSATarget11Panel" + config[1].showType, [this.activityID]);
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
    OSATarget11Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget11Panel.prototype.updateData = function () {
        this.cruPanel.updateData();
    };
    return OSATarget11Panel;
}(ActivityPanel));
__reflect(OSATarget11Panel.prototype, "OSATarget11Panel");
//# sourceMappingURL=OSATarget11Panel.js.map