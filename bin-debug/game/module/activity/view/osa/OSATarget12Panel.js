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
var OSATarget12Panel = (function (_super) {
    __extends(OSATarget12Panel, _super);
    function OSATarget12Panel() {
        var _this = _super.call(this) || this;
        _this.type2PanelList = [];
        return _this;
    }
    OSATarget12Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATarget12Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        var config = GlobalConfig.ActivityType12Config[this.activityID];
        if (!this.type2PanelList[this.activityID + ""]) {
            var panel = ObjectPool.pop("OSATarget12Panel" + config[1].showType);
            panel.top = 0;
            panel.bottom = 0;
            panel.left = 0;
            panel.right = 0;
            panel.activityID = this.activityID;
            panel.activityType = this.activityType;
            this.type2PanelList[this.activityID + ""] = panel;
        }
        this.cruPanel = this.type2PanelList[this.activityID + ""];
        this.cruPanel.open();
        this.addChild(this.cruPanel);
    };
    OSATarget12Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel)
            this.cruPanel.close();
    };
    OSATarget12Panel.prototype.updateData = function () {
        this.cruPanel.updateData();
    };
    return OSATarget12Panel;
}(ActivityPanel));
__reflect(OSATarget12Panel.prototype, "OSATarget12Panel");
//# sourceMappingURL=OSATarget12Panel.js.map