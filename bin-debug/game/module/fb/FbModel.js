var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FbModel = (function () {
    function FbModel() {
    }
    FbModel.prototype.parser = function (bytes) {
        this.fbID = bytes.readInt();
        this.useCount = bytes.readShort();
        this.vipBuyCount = bytes.readShort();
        this.vipHoldCount = bytes.readShort();
        this.isPass = bytes.readBoolean();
    };
    FbModel.prototype.getCount = function () {
        if (Assert(!isNaN(this.fbID), "fbid is undefined")) {
            return 0;
        }
        var config = GlobalConfig.DailyFubenConfig[this.fbID];
        if (Assert(config, "DailyFubenConfig is null")) {
            return 0;
        }
        if (config.zsLevel > 0) {
            if (UserZs.ins().lv < config.zsLevel)
                return 0;
        }
        else {
            if (Actor.level < config.levelLimit)
                return 0;
        }
        return config.freeCount + this.vipBuyCount + this.vipHoldCount - this.useCount;
    };
    FbModel.prototype.getPlayCount = function () {
        if (Assert(!isNaN(this.fbID), "fbid is undefined")) {
            return 0;
        }
        var config = GlobalConfig.DailyFubenConfig[this.fbID];
        if (Assert(config, "DailyFubenConfig is null")) {
            return 0;
        }
        return config.freeCount + this.vipBuyCount + this.vipHoldCount - this.useCount;
    };
    FbModel.prototype.getNextVip = function () {
        if (Assert(!isNaN(this.fbID), "fbid is undefined")) {
            return -1;
        }
        var config = GlobalConfig.DailyFubenConfig[this.fbID];
        if (Assert(config, "DailyFubenConfig is null")) {
            return -1;
        }
        for (var i in config.vipBuyCount) {
            if (this.useCount - config.freeCount - config.vipBuyCount[i] < 0)
                return parseInt(i);
        }
        return -1;
    };
    FbModel.prototype.getResetCount = function () {
        var vip = UserVip.ins().lv;
        var config = GlobalConfig.DailyFubenConfig[this.fbID];
        return config.vipBuyCount[vip] - (this.useCount - config.freeCount);
    };
    return FbModel;
}());
__reflect(FbModel.prototype, "FbModel");
//# sourceMappingURL=FbModel.js.map