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
var ActivityType17Data = (function (_super) {
    __extends(ActivityType17Data, _super);
    function ActivityType17Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.noticeArr = [];
        _this.actStar = [];
        _this.awardIndex = 0;
        var num = bytes.readShort();
        for (var i = 1; i <= num; i++) {
            _this.actStar[i] = bytes.readShort();
        }
        var len = bytes.readShort();
        _this.noticeArr = [];
        for (var i = 0; i < len; i++) {
            _this.noticeArr.push({ name: bytes.readString(), index: bytes.readByte() });
        }
        _this.noticeArr.reverse();
        _this.score = bytes.readInt();
        _this.curRecharge = bytes.readInt();
        _this.overDay = bytes.readInt();
        _this.recrod = bytes.readInt();
        return _this;
    }
    ActivityType17Data.prototype.update = function (bytes) {
        this.awardIndex = bytes.readShort();
        this.recrod = bytes.readInt();
    };
    ActivityType17Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType17Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType17Data.prototype.checkRedPoint = function () {
        return Activity.ins().getType17RedPoint(this.id);
    };
    return ActivityType17Data;
}(ActivityBaseData));
__reflect(ActivityType17Data.prototype, "ActivityType17Data");
//# sourceMappingURL=ActivityType17Data.js.map