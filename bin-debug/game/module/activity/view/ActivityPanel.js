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
var ActivityPanel = (function (_super) {
    __extends(ActivityPanel, _super);
    function ActivityPanel() {
        var _this = _super.call(this) || this;
        _this._activityBtnType = -1;
        _this.activityType = ActivityType.Normal;
        return _this;
    }
    Object.defineProperty(ActivityPanel.prototype, "activityBtnType", {
        get: function () {
            return this._activityBtnType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityPanel.prototype, "activityID", {
        get: function () {
            return this._activityID;
        },
        set: function (value) {
            this._activityID = value;
            var config;
            var abc;
            if (this.activityType == ActivityType.Normal) {
                config = GlobalConfig.ActivityConfig[value];
                abc = GlobalConfig.ActivityBtnConfig[value];
            }
            else if (this.activityType == ActivityType.Personal) {
                config = GlobalConfig.PActivityConfig[value];
                abc = GlobalConfig.PActivityBtnConfig[value];
            }
            if (config && config.tabName)
                this.name = config.tabName;
            this._activityBtnType = abc.type;
        },
        enumerable: true,
        configurable: true
    });
    ActivityPanel.create = function (activityID, actType) {
        var config;
        if (actType == ActivityType.Normal) {
            config = GlobalConfig.ActivityConfig[activityID];
        }
        else {
            config = GlobalConfig.PActivityConfig[activityID];
        }
        if (activityID > 10000) {
            var pan = ObjectPool.pop("OSATarget0Panel");
            pan.activityType = actType;
            pan.activityID = activityID;
            return pan;
        }
        var panel;
        if (config.activityType == 1) {
            panel = ObjectPool.pop("OSATarget" + config.activityType + "Panel", activityID);
            panel.activityType = actType;
            panel.activityID = activityID;
        }
        else {
            panel = ObjectPool.pop("OSATarget" + config.activityType + "Panel");
            panel.activityType = actType;
            panel.activityID = activityID;
        }
        return panel;
    };
    ActivityPanel.prototype.updateData = function () {
    };
    ActivityPanel.getActivityTypeFromId = function (activityID) {
        var config;
        if (GlobalConfig.ActivityBtnConfig[activityID]) {
            config = GlobalConfig.ActivityBtnConfig[activityID];
        }
        else if (GlobalConfig.PActivityBtnConfig[activityID]) {
            config = GlobalConfig.PActivityBtnConfig[activityID];
        }
        if (config) {
            return config.activityType;
        }
        return ActivityType.Normal;
    };
    return ActivityPanel;
}(BaseView));
__reflect(ActivityPanel.prototype, "ActivityPanel");
//# sourceMappingURL=ActivityPanel.js.map