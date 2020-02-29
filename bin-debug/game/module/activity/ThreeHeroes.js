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
var ThreeHeroes = (function (_super) {
    __extends(ThreeHeroes, _super);
    function ThreeHeroes() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.ThreeHeroes;
        _this.regNetMsg(1, _this.doGotAward);
        _this.regNetMsg(2, _this.doAwardInfo);
        return _this;
    }
    ThreeHeroes.ins = function () {
        return _super.ins.call(this);
    };
    ThreeHeroes.prototype.doGotAward = function (bytes) {
        if (bytes.readByte() > 0) {
            this.awardState = ThreeHeroes.Geted;
            this.postInfoChange();
        }
    };
    ThreeHeroes.prototype.doAwardInfo = function (bytes) {
        var state = bytes.readBoolean();
        this.loginDays = bytes.readShort();
        this.showIcon3DaysLater = bytes.readBoolean();
        ActivityDataFactory.createEx();
        var data = Activity.ins().activityData[ActivityBtnType.THREE_HEROES];
        if (data) {
            var beganTime = Math.floor((data.startTime - GameServer.serverTime) / 1000);
            var endedTime = Math.floor((data.endTime - GameServer.serverTime) / 1000);
            if (beganTime < 0 && endedTime > 0) {
                if (UserVip.ins().lv >= GlobalConfig.LoginActivateConfig.vipLevel)
                    this.awardState = ThreeHeroes.Active;
                else
                    this.awardState = ThreeHeroes.NotActive;
                MessageCenter.addListener(UserVip.ins().postUpdateVipData, this.updateStateByVip, this);
                MessageCenter.addListener(UserVip.ins().postUpdataExp, this.updateStateByVip, this);
            }
            else {
                if (this.showIcon3DaysLater) {
                    if (this.loginDays >= GlobalConfig.LoginActivateConfig.loginDays)
                        this.awardState = ThreeHeroes.CanGet;
                    else
                        this.awardState = ThreeHeroes.Active;
                }
                else
                    this.awardState = state ? ThreeHeroes.Geted : ThreeHeroes.NotActive;
                MessageCenter.ins().removeAll(this);
            }
        }
        Activity.ins().postActivityIsGetAwards();
        this.postInfoChange();
    };
    ThreeHeroes.prototype.updateStateByVip = function () {
        var data = Activity.ins().activityData[ActivityBtnType.THREE_HEROES];
        if (data) {
            var beganTime = Math.floor((data.startTime - GameServer.serverTime) / 1000);
            var endedTime = Math.floor((data.endTime - GameServer.serverTime) / 1000);
            if (beganTime < 0 && endedTime > 0) {
                if (UserVip.ins().lv >= GlobalConfig.LoginActivateConfig.vipLevel)
                    this.awardState = ThreeHeroes.Active;
                else
                    this.awardState = ThreeHeroes.NotActive;
            }
        }
        this.postInfoChange();
    };
    ThreeHeroes.prototype.sendReward = function () {
        var bytes = this.getBytes(1);
        this.sendToServer(bytes);
    };
    ThreeHeroes.prototype.postInfoChange = function () {
    };
    ThreeHeroes.NotActive = 0;
    ThreeHeroes.Active = 1;
    ThreeHeroes.CanGet = 2;
    ThreeHeroes.Geted = 3;
    return ThreeHeroes;
}(BaseSystem));
__reflect(ThreeHeroes.prototype, "ThreeHeroes");
var GameSystem;
(function (GameSystem) {
    GameSystem.threeHeros = ThreeHeroes.ins.bind(ThreeHeroes);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ThreeHeroes.js.map