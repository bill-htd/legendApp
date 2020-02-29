var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FbChallengeConfig = (function () {
    function FbChallengeConfig() {
        this.id = 0;
        this.group = 0;
        this.layer = 0;
        this.zsLevelLimit = 0;
        this.levelLimit = 0;
        this.fbId = 0;
        this.describe = "";
        this.showIcon = 0;
        this.equipPos = 0;
        this.clearReward = [];
        this.dayReward = [];
        this.lotteryCount = 0;
    }
    return FbChallengeConfig;
}());
__reflect(FbChallengeConfig.prototype, "FbChallengeConfig");
//# sourceMappingURL=FbChallengeConfig.js.map