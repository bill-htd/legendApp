var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActivityBaseData = (function () {
    function ActivityBaseData(bytes) {
    }
    ActivityBaseData.prototype.init = function (bytes, id) {
    };
    ActivityBaseData.prototype.update = function (bytes) {
    };
    ActivityBaseData.prototype.canReward = function () {
        return false;
    };
    ActivityBaseData.prototype.isOpenActivity = function () {
        return false;
    };
    Object.defineProperty(ActivityBaseData.prototype, "rewardState", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    ActivityBaseData.prototype.specialState = function () {
        return true;
    };
    ActivityBaseData.prototype.getHide = function () {
        return false;
    };
    return ActivityBaseData;
}());
__reflect(ActivityBaseData.prototype, "ActivityBaseData");
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["Normal"] = 0] = "Normal";
    ActivityType[ActivityType["Personal"] = 1] = "Personal";
    ActivityType[ActivityType["Nesting"] = 2] = "Nesting";
})(ActivityType || (ActivityType = {}));
//# sourceMappingURL=ActivityBaseData.js.map