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
        _this.isSuccess = true;
        _this.recordMax = 100;
        _this.maxRecord = 0;
        _this.envelopeSum = ActivityType24Data.maxEnvelope;
        _this.SecondCount = 0;
        _this.init(bytes, id);
        return _this;
    }
    ActivityType24Data.prototype.init = function (bytes, id) {
        this.rechargeNum = bytes.readInt();
        this.eWaiYuanBao = bytes.readInt();
        var len = bytes.readShort();
        this.shengYuKeLingHongBao = 5 - len;
        var _MyQenvelopeData = [];
        for (var i = 0; i < len; i++) {
            var MyQinfo = new MyQenvelopeData;
            MyQinfo.eId = bytes.readShort();
            MyQinfo.yuanbao = bytes.readInt();
            MyQinfo.Ewai_yuanbao = bytes.readInt();
            _MyQenvelopeData.push(MyQinfo);
        }
        this.update_MyQenvelopeData(_MyQenvelopeData);
        var _QenvelopeData = [];
        var num = bytes.readShort();
        for (var i = 0; i < num; i++) {
            var Qinfo = new QenvelopeData;
            Qinfo.recordId = bytes.readInt();
            Qinfo.name = bytes.readString();
            Qinfo.eId = bytes.readShort();
            Qinfo.job = bytes.readShort();
            Qinfo.sex = bytes.readShort();
            Qinfo.isEwai = bytes.readByte();
            Qinfo.yuanbao = bytes.readInt();
            _QenvelopeData.push(Qinfo);
            if (Qinfo.recordId > this.maxRecord) {
                this.maxRecord = Qinfo.recordId;
            }
        }
        this.update_QenvelopeData(_QenvelopeData);
        if (Activity.ins().activityTimers.indexOf(id) == -1)
            Activity.ins().activityTimers.push(id);
    };
    ActivityType24Data.prototype.update_MyQenvelopeData = function (data) {
        this.MyQenvelopeData = [];
        for (var i = 0; i < data.length; i++) {
            this.MyQenvelopeData.push(data[i]);
        }
    };
    ActivityType24Data.prototype.update_QenvelopeData = function (data) {
        this.QenvelopeData = [];
        for (var i = 0; i < data.length; i++) {
            this.QenvelopeData.push(data[i]);
        }
    };
    ActivityType24Data.prototype.getMax_hongbao = function () {
        var maxid = 0;
        for (var i = 0; i < this.MyQenvelopeData.length; i++) {
            if (this.MyQenvelopeData[i].eId > maxid) {
                maxid = this.MyQenvelopeData[i].eId;
            }
        }
        for (var i = 0; i < this.MyQenvelopeData.length; i++) {
            if (this.MyQenvelopeData[i].eId == maxid) {
                return this.MyQenvelopeData[i];
            }
        }
        return null;
    };
    ActivityType24Data.prototype.update = function (bytes) {
        if (Activity.ins().isSuccee) {
            this.isSuccess = true;
            var type = bytes.readShort();
            if (type == 1) {
                this.shengYuKeLingHongBao -= 1;
                var MyQinfo = new MyQenvelopeData;
                MyQinfo.eId = bytes.readShort();
                MyQinfo.yuanbao = bytes.readInt();
                MyQinfo.Ewai_yuanbao = bytes.readInt();
                this.MyQenvelopeData.push(MyQinfo);
                this.eWaiYuanBao = MyQinfo.Ewai_yuanbao;
            }
            else {
                var ewai = bytes.readInt();
                this.eWaiYuanBao = 0;
                var MaxHongbaoInfo = this.getMax_hongbao();
                MaxHongbaoInfo.Ewai_yuanbao = ewai;
            }
        }
        else {
            console.log('领取失败');
            this.isSuccess = false;
        }
        HBSystem.ins().removeHongbao();
    };
    Object.defineProperty(ActivityType24Data.prototype, "envelopeData", {
        get: function () {
            this._envelopeData = this._envelopeData ? this._envelopeData : [];
            return this._envelopeData;
        },
        set: function (value) {
            this._envelopeData = value;
        },
        enumerable: true,
        configurable: true
    });
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
    };
    ActivityType24Data.prototype.clearAll = function () {
    };
    ActivityType24Data.prototype.popEnvelope = function (eId) {
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
        this.recordId = 0;
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
var MyQenvelopeData = (function () {
    function MyQenvelopeData() {
    }
    return MyQenvelopeData;
}());
__reflect(MyQenvelopeData.prototype, "MyQenvelopeData");
//# sourceMappingURL=ActivityType24Data.js.map