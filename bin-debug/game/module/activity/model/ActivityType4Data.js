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
var ActivityType4Data = (function (_super) {
    __extends(ActivityType4Data, _super);
    function ActivityType4Data(bytes) {
        return _super.call(this, bytes) || this;
    }
    ActivityType4Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
    };
    ActivityType4Data.prototype.updateData = function (bytes) {
    };
    ActivityType4Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType4Data.prototype.getCostRank = function (rankdata, curIndex) {
        if (!rankdata)
            return 0;
        var rank = 0;
        var value = rankdata.numType;
        var config = GlobalConfig.ActivityType4Config[this.id];
        while (config[curIndex.idx]) {
            if (value >= config[curIndex.idx].value) {
                rank = config[curIndex.idx].ranking;
                curIndex.idx++;
                if (rankdata.rankIndex == Activity.ins().myPaiming)
                    this.myPaiming = rank;
                break;
            }
            curIndex.idx++;
        }
        return rank;
    };
    return ActivityType4Data;
}(ActivityBaseData));
__reflect(ActivityType4Data.prototype, "ActivityType4Data");
//# sourceMappingURL=ActivityType4Data.js.map