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
var ActivityType24Data = (function (_super) {
    __extends(ActivityType24Data, _super);
    function ActivityType24Data(bytes, id) {
        var _this = _super.call(this, bytes) || this;
        _this.envelopeSum = ActivityType24Data.maxEnvelope;
        _this.SecondCount = 0;
        _this.init(bytes, id);
        return _this;
    }
    ActivityType24Data.prototype.init = function (bytes, id) {
        var rechargeNum = bytes.readInt();
        var num = bytes.readShort();
        for (var i = 0; i < num; i++) {
            var Qinfo = new QenvelopeData;
            Qinfo.name = bytes.readString();
            Qinfo.eId = bytes.readShort();
            Qinfo.job = bytes.readShort();
            Qinfo.sex = bytes.readShort();
            Qinfo.isEwai = bytes.readByte();
            Qinfo.yuanbao = bytes.readInt();
            this.QenvelopeData.push(Qinfo);
        }
        if (Activity.ins().activityTimers.indexOf(id) == -1)
            Activity.ins().activityTimers.push(id);
    };
    ActivityType24Data.prototype.update = function (bytes) {
        if (Activity.ins().isSuccee) {
            console.log('领取成功');
            var type = bytes.readShort();
            if (type == 1) {
                var ewai = bytes.readInt();
                var Qinfo = new QenvelopeData;
                Qinfo.name = '我自己';
                Qinfo.eId = bytes.readShort();
                Qinfo.job = 0;
                Qinfo.sex = 0;
                Qinfo.isEwai = 1;
                Qinfo.yuanbao = bytes.readInt();
                this.QenvelopeData.push(Qinfo);
            }
            else {
                var ewai = bytes.readInt();
            }
        }
        else {
            console.log('领取shibai');
        }
    };
    Object.defineProperty(ActivityType24Data.prototype, "envelopeData", {
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
    ActivityType24Data.prototype.sortTimer = function (a, b) {
        if (a.timer < b.timer)
            return -1;
        else
            return 1;
    };
    ActivityType24Data.prototype.checkClear = function () {
        if (this.envelopeData.length >= this.envelopeSum) {
            this.SecondCount = 0;
            this.clearEnvelopeData();
            if (this.envelopeSum > ActivityType24Data.maxEnvelope) {
                this.envelopeSum = this.envelopeData.length + ActivityType24Data.maxEnvelope;
            }
        }
        else if (this.SecondCount > 10 && this.envelopeSum > ActivityType24Data.maxEnvelope) {
            this.SecondCount = 0;
            this.envelopeSum = ActivityType24Data.maxEnvelope;
        }
        else if (this.SecondCount > 60 && this.envelopeData.length < ActivityType24Data.maxEnvelope) {
            this.SecondCount = 0;
            this.clearEnvelopeData();
        }
        this.SecondCount++;
    };
    ActivityType24Data.prototype.clearEnvelopeData = function () {
        for (var i = 0; i < this.envelopeData.length;) {
            if (!this.envelopeData[i] || this.envelopeData[i].isOverTimer()) {
                this.envelopeData.splice(i, 1);
            }
            i++;
        }
    };
    ActivityType24Data.prototype.clearAll = function () {
        this.envelopeData = [];
        this.envelopeSum = ActivityType24Data.maxEnvelope;
    };
    ActivityType24Data.prototype.popEnvelope = function (eId) {
        for (var i = 0; i < this.envelopeData.length;) {
            if (!this.envelopeData[i] || this.envelopeData[i].id == eId) {
                this.envelopeData.splice(i, 1);
                break;
            }
            i++;
        }
    };
    ActivityType24Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType24Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0)
            return true;
        return false;
    };
    ActivityType24Data.prototype.checkRedPoint = function () {
        return false;
    };
    ActivityType24Data.prototype.getRemainTime = function () {
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
    ActivityType24Data.maxEnvelope = 10;
    return ActivityType24Data;
}(ActivityBaseData));
__reflect(ActivityType24Data.prototype, "ActivityType24Data");
var QenvelopeData = (function () {
    function QenvelopeData() {
        this.eId = 0;
        this.job = 0;
        this.sex = 0;
        this.yuanbao = 0;
        this.name = "";
        this.isEwai = 0;
    }
    return QenvelopeData;
}());
__reflect(QenvelopeData.prototype, "QenvelopeData");
//# sourceMappingURL=ActivityType24Data.js.map