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
var UserFb2 = (function (_super) {
    __extends(UserFb2, _super);
    function UserFb2() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.FbChallenge;
        _this.regNetMsg(1, _this.postUpDataInfo);
        _this.regNetMsg(2, _this.postRewardStatu);
        _this.regNetMsg(3, _this.doGetFbTime);
        _this.regNetMsg(4, _this.postGetReward);
        _this.regNetMsg(5, _this.postLotteryReward);
        return _this;
    }
    UserFb2.ins = function () {
        return _super.ins.call(this);
    };
    UserFb2.prototype.sendChallenge = function () {
        this.sendBaseProto(1);
    };
    UserFb2.prototype.sendrequestDayReward = function () {
        this.sendBaseProto(2);
    };
    UserFb2.prototype.postUpDataInfo = function (bytes) {
        SkyLevelModel.ins().setCruLevelInfo(bytes.readInt());
        SkyLevelModel.ins().dayReward = bytes.readShort();
        SkyLevelModel.ins().lotteryIndexs = bytes.readInt();
        SkyLevelModel.ins().lotteryUseTimes = bytes.readInt();
    };
    UserFb2.prototype.postRewardStatu = function (bytes) {
        var count = bytes.readShort();
        SkyLevelModel.ins().dayRewardList = [];
        for (var i = 0; i < count; i++) {
            var subType = bytes.readInt();
            var subId = bytes.readInt();
            var subCount = bytes.readInt();
            SkyLevelModel.ins().dayRewardList[i] = [subType, subId, subCount];
        }
        SkyLevelModel.ins().rewardTimes = Math.ceil((count - 12) / 12);
    };
    UserFb2.prototype.doGetFbTime = function (bytes) {
        SkyLevelModel.ins().setLimtTimeDown(bytes.readShort());
    };
    UserFb2.prototype.sendGetDayReward = function () {
        this.sendBaseProto(4);
    };
    UserFb2.prototype.sendBeginLottery = function () {
        this.sendBaseProto(5);
    };
    UserFb2.prototype.sendGetReward = function () {
        this.sendBaseProto(6);
    };
    UserFb2.prototype.postLotteryReward = function (bytes) {
        SkyLevelModel.ins().lotteryUseTimes = bytes.readInt();
        SkyLevelModel.ins().lotteryAwardIndex = bytes.readInt();
    };
    UserFb2.prototype.postGetReward = function (bytes) {
    };
    return UserFb2;
}(BaseSystem));
__reflect(UserFb2.prototype, "UserFb2");
var GameSystem;
(function (GameSystem) {
    GameSystem.userfb2 = UserFb2.ins.bind(UserFb2);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserFb2.js.map