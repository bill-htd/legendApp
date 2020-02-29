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
var DailyCheckIn = (function (_super) {
    __extends(DailyCheckIn, _super);
    function DailyCheckIn() {
        var _this = _super.call(this) || this;
        _this._loginTimes = 0;
        _this.conLoginTimes = 0;
        _this.todayReward = false;
        _this.comTimesIndexList = [];
        _this.sysId = PackageID.DailyCheckIn;
        _this.regNetMsg(1, _this.postCheckInData);
        _this.regNetMsg(3, _this.handleCheckInData);
        return _this;
    }
    DailyCheckIn.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(DailyCheckIn.prototype, "loginTimes", {
        get: function () {
            return this._loginTimes;
        },
        enumerable: true,
        configurable: true
    });
    DailyCheckIn.prototype.postCheckInData = function (bytes) {
        this._loginTimes = bytes.readShort();
        this.todayReward = bytes.readBoolean();
        this.conLoginTimes = bytes.readShort();
        this.rewardIndex = bytes.readShort();
    };
    DailyCheckIn.prototype.handleCheckInData = function (bytes) {
        console.log('签到成功回调！ ： ');
    };
    DailyCheckIn.prototype.sendCheckIn = function (index) {
        var bytes = this.getBytes(1);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    DailyCheckIn.prototype.sendReCheckIn = function (index) {
        var bytes = this.getBytes(2);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    DailyCheckIn.prototype.postCheckIn = function (param) {
        return param;
    };
    DailyCheckIn.prototype.sendGetReward = function (index) {
        var bytes = this.getBytes(3);
        bytes.writeInt(index);
        this.sendToServer(bytes);
    };
    DailyCheckIn.prototype.postComplement = function (param) {
        return param;
    };
    DailyCheckIn.prototype.showRedPoint = function () {
        var result = this.canNormalCheckIn() || this.checkConReward();
        return result;
    };
    DailyCheckIn.prototype.canNormalCheckIn = function () {
        return !this.todayReward;
    };
    DailyCheckIn.prototype.checkConReward = function () {
        var days = this.getRewardList(this.rewardIndex) ? this.getRewardList(this.rewardIndex).days : 0;
        return this.conLoginTimes >= days;
    };
    DailyCheckIn.prototype.getCheckInState = function (day) {
        if (day > this.loginTimes) {
            return DailyCheckInState.notYet;
        }
        else if (day < this.loginTimes) {
            return DailyCheckInState.hasChecked;
        }
        else {
            if (this.todayReward) {
                return DailyCheckInState.hasChecked;
            }
            else {
                return DailyCheckInState.canCheck;
            }
        }
    };
    DailyCheckIn.prototype.getRewardDays = function () {
        return 0;
    };
    DailyCheckIn.prototype.getRewardList = function (index) {
        if (GlobalConfig.MonthSignDaysConfig[index + 1]) {
            return GlobalConfig.MonthSignDaysConfig[index + 1];
        }
        return null;
    };
    return DailyCheckIn;
}(BaseSystem));
__reflect(DailyCheckIn.prototype, "DailyCheckIn");
var GameSystem;
(function (GameSystem) {
    GameSystem.dailycheckin = DailyCheckIn.ins.bind(DailyCheckIn);
})(GameSystem || (GameSystem = {}));
var DailyCheckInState;
(function (DailyCheckInState) {
    DailyCheckInState[DailyCheckInState["notYet"] = 0] = "notYet";
    DailyCheckInState[DailyCheckInState["canCheck"] = 1] = "canCheck";
    DailyCheckInState[DailyCheckInState["hasChecked"] = 2] = "hasChecked";
})(DailyCheckInState || (DailyCheckInState = {}));
//# sourceMappingURL=DailyCheckIn.js.map