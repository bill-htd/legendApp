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
var ActivityType2Panel = (function (_super) {
    __extends(ActivityType2Panel, _super);
    function ActivityType2Panel() {
        var _this = _super.call(this) || this;
        _this.type2PanelList = [];
        return _this;
    }
    ActivityType2Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ActivityType2Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.cruPanel) {
            this.cruPanel.close();
            DisplayUtils.removeFromParent(this.cruPanel);
        }
        var config = GlobalConfig.ActivityConfig[this.activityID];
        switch (config.openType) {
            case 1:
                if (!this.type2PanelList[this.activityID + ""]) {
                    this.type2PanelList[this.activityID + ""] = new Activity2Panel2();
                    this.type2PanelList[this.activityID + ""].activityID = this.activityID;
                }
                break;
            case 2:
                if (!this.type2PanelList[this.activityID + ""]) {
                    this.type2PanelList[this.activityID + ""] = new Activity2Panel1();
                    this.type2PanelList[this.activityID + ""].activityID = this.activityID;
                }
                break;
            default:
                break;
        }
        this.cruPanel = this.type2PanelList[this.activityID + ""];
        this.cruPanel.open();
        this.addChild(this.cruPanel);
    };
    ActivityType2Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ActivityType2Panel.prototype.updateData = function () {
        this.cruPanel.updateData();
    };
    return ActivityType2Panel;
}(ActivityPanel));
__reflect(ActivityType2Panel.prototype, "ActivityType2Panel");
//# sourceMappingURL=ActivityType2Panel.js.map