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
var ActivityType12Data = (function (_super) {
    __extends(ActivityType12Data, _super);
    function ActivityType12Data(bytes, id) {
        var _this = _super.call(this, bytes) || this;
        _this.envelopeSum = ActivityType12Data.maxEnvelope;
        _this.SecondCount = 0;
        _this.init(bytes, id);
        return _this;
    }
    ActivityType12Data.prototype.init = function (bytes, id) {
        this.score = bytes.readInt();
        var len = bytes.readShort();
        this.logs = [];
        for (var i = 0; i < len; i++) {
            var index = bytes.readShort();
            var name_1 = bytes.readString();
            var serverId = bytes.readInt();
            this.logs.push({ name: name_1, serverId: serverId, index: index });
        }
        if (Activity.ins().activityTimers.indexOf(id) == -1)
            Activity.ins().activityTimers.push(id);
    };
    ActivityType12Data.prototype.update = function (bytes) {
        var eId = bytes.readUnsignedShort();
        var yb = bytes.readInt();
        var gold = bytes.readInt();
        var len = bytes.readShort();
        var arr = [];
        var role = SubRoles.ins().getSubRoleByIndex(0);
        arr.push({ job: role.job, sex: role.sex, name: Actor.myName, yb: yb, gold: gold });
        for (var i = 0; i < len; i++) {
            var job = bytes.readShort();
            var sex = bytes.readShort();
            var otherName = bytes.readString();
            var otherYB = bytes.readInt();
            if (Actor.myName != otherName)
                arr.push({ job: job, sex: sex, name: otherName, yb: otherYB, gold: 0 });
        }
        Activity.ins().postGetRedEnvelope(this.id, eId, yb, gold, arr);
    };
    Object.defineProperty(ActivityType12Data.prototype, "envelopeData", {
        get: function () {
            this._envelopeData = this._envelopeData ? this._envelopeData : [];
            return this._envelopeData;
        },
        set: function (value) {
            value.sort(this.sortTimer);
            this._envelopeData = value;
        },
        enumerable: true,
        configurable: true
    });
    ActivityType12Data.prototype.sortTimer = function (a, b) {
        if (a.timer < b.timer)
            return -1;
        else
            return 1;
    };
    ActivityType12Data.prototype.checkClear = function () {
        if (this.envelopeData.length >= this.envelopeSum) {
            this.SecondCount = 0;
            this.clearEnvelopeData();
            if (this.envelopeSum > ActivityType12Data.maxEnvelope) {
                this.envelopeSum = this.envelopeData.length + ActivityType12Data.maxEnvelope;
            }
        }
        else if (this.SecondCount > 10 && this.envelopeSum > ActivityType12Data.maxEnvelope) {
            this.SecondCount = 0;
            this.envelopeSum = ActivityType12Data.maxEnvelope;
        }
        else if (this.SecondCount > 60 && this.envelopeData.length < ActivityType12Data.maxEnvelope) {
            this.SecondCount = 0;
            this.clearEnvelopeData();
        }
        this.SecondCount++;
    };
    ActivityType12Data.prototype.clearEnvelopeData = function () {
        for (var i = 0; i < this.envelopeData.length;) {
            if (!this.envelopeData[i] || this.envelopeData[i].isOverTimer()) {
                this.envelopeData.splice(i, 1);
            }
            i++;
        }
    };
    ActivityType12Data.prototype.clearAll = function () {
        this.envelopeData = [];
        this.envelopeSum = ActivityType12Data.maxEnvelope;
    };
    ActivityType12Data.prototype.popEnvelope = function (eId) {
        for (var i = 0; i < this.envelopeData.length;) {
            if (!this.envelopeData[i] || this.envelopeData[i].id == eId) {
                this.envelopeData.splice(i, 1);
                break;
            }
            i++;
        }
    };
    ActivityType12Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType12Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0)
            return true;
        return false;
    };
    ActivityType12Data.prototype.checkRedPoint = function () {
        var config = GlobalConfig.ActivityType12Config[this.id];
        for (var k in config) {
            if (this.score >= config[k].score)
                return true;
        }
        return false;
    };
    ActivityType12Data.prototype.getRemainTime = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        var desc;
        if (beganTime >= 0) {
            desc = "活动未开启";
        }
        else if (endedTime <= 0) {
            desc = "活动已结束";
        }
        else {
            desc = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        return desc;
    };
    ActivityType12Data.maxEnvelope = 10;
    return ActivityType12Data;
}(ActivityBaseData));
__reflect(ActivityType12Data.prototype, "ActivityType12Data");
var RedEnvelope = (function () {
    function RedEnvelope() {
        this.id = 0;
        this.timer = 0;
    }
    RedEnvelope.prototype.isOverTimer = function () {
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.timer) - GameServer.serverTime) / 1000);
        return endedTime <= 0 ? true : false;
    };
    RedEnvelope.prototype.canStartTimer = function () {
        return GameServer.serverTime >= (DateUtils.formatMiniDateTime(this.startimer)) ? true : false;
    };
    RedEnvelope.prototype.getStartTimer = function () {
        return (DateUtils.formatMiniDateTime(this.startimer)) / 1000 - GameServer.serverTime / 1000;
    };
    return RedEnvelope;
}());
__reflect(RedEnvelope.prototype, "RedEnvelope");
var EnvelopeData = (function () {
    function EnvelopeData() {
        this.id = 0;
        this.eId = 0;
        this.job = 0;
        this.sex = 0;
        this.index = 0;
        this.serverId = 0;
        this.name = "";
        this.desc = "";
    }
    return EnvelopeData;
}());
__reflect(EnvelopeData.prototype, "EnvelopeData");
var EnvelopeType;
(function (EnvelopeType) {
    EnvelopeType[EnvelopeType["SEND"] = 1] = "SEND";
    EnvelopeType[EnvelopeType["GET"] = 2] = "GET";
})(EnvelopeType || (EnvelopeType = {}));
//# sourceMappingURL=ActivityType12Data.js.map