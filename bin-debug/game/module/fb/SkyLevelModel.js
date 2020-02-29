var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkyLevelModel = (function () {
    function SkyLevelModel() {
        this.cruLevel = 1;
        this.lastPass = false;
        this.stageLevel = 1;
        this.dayReward = 1;
        this.limitTime = 180;
        this.rewardTimes = 0;
    }
    SkyLevelModel.ins = function () {
        if (!this._instance) {
            this._instance = new SkyLevelModel();
        }
        return this._instance;
    };
    Object.defineProperty(SkyLevelModel.prototype, "lotteryRemainTimes", {
        get: function () {
            var remain = 0;
            var cfg;
            if (this.cruLevel != 0) {
                cfg = GlobalConfig.FbChallengeConfig[this.cruLevel - 1];
                if ((this.cruLevel - 1) < GlobalConfig.FbChallengeBaseConfig.LotteryOpenLevel)
                    return 0;
            }
            else {
                var len = Object.keys(GlobalConfig.FbChallengeConfig).length;
                cfg = GlobalConfig.FbChallengeConfig[len];
            }
            if (!cfg)
                return 0;
            remain = cfg.lotteryCount - this.lotteryUseTimes;
            return remain;
        },
        enumerable: true,
        configurable: true
    });
    SkyLevelModel.prototype.isGetLotteryAward = function (index) {
        return (this.lotteryIndexs >> index & 1) == 1;
    };
    SkyLevelModel.prototype.getNextOpenLevel = function () {
        var cfgList = GlobalConfig.FbChallengeConfig;
        for (var id in cfgList) {
            if (cfgList[id].id >= this.cruLevel && cfgList[id].showIcon) {
                return cfgList[id];
            }
        }
        return null;
    };
    SkyLevelModel.prototype.getIsopenNext = function () {
        var cfgList = GlobalConfig.FbChallengeConfig;
        var cfg = cfgList[this.cruLevel];
        if (Actor.level >= cfg.levelLimit && Actor.zhuanShengLv >= cfg.zsLevelLimit)
            return true;
        return false;
    };
    SkyLevelModel.prototype.getSkyLevelList = function () {
        var dataList = [];
        var info = GlobalConfig.FbChallengeConfig;
        var cruInfo = info[this.cruLevel];
        var stageList = this.getStageList();
        var len = CommonUtils.getObjectLength(stageList);
        for (var str in stageList) {
            var cfg = stageList[str];
            if (this.checkIsPushInlist(cruInfo.layer, cfg.layer, len)) {
                dataList.push(cfg);
                if (dataList.length >= 6) {
                    break;
                }
            }
        }
        dataList.reverse();
        return dataList;
    };
    SkyLevelModel.prototype.setLimtTimeDown = function (num) {
        this.limitTime = num;
        TimerManager.ins().remove(this.timeDown, this);
        TimerManager.ins().doTimer(1000, num, this.timeDown, this);
    };
    SkyLevelModel.prototype.timeDown = function () {
        this.limitTime--;
        if (this.limitTime < 0) {
            this.limitTime = 0;
            TimerManager.ins().remove(this.timeDown, this);
        }
    };
    SkyLevelModel.prototype.checkIsPushInlist = function (id, layeId, len) {
        if (id <= 4) {
            return true;
        }
        else if (id > 4) {
            var downNum = len - id >= 3 ? 3 : len - id;
            var upNum = 6 - downNum;
            var minLv = id - upNum;
            var maxLv = id + downNum;
            return layeId <= maxLv && layeId > minLv;
        }
    };
    SkyLevelModel.prototype.getStageList = function () {
        var info = GlobalConfig.FbChallengeConfig;
        var cruInfo = info[this.cruLevel];
        this.stageLevel = cruInfo.group;
        var list = [];
        if (!cruInfo) {
            return list;
        }
        for (var str in info) {
            var data = info[str];
            if (data.group == cruInfo.group) {
                list.push(data);
            }
        }
        return list;
    };
    SkyLevelModel.prototype.setCruLevelInfo = function (level) {
        if (level > 0) {
            this.cruLevel = level;
            this.lastPass = false;
        }
        else {
            this.cruLevel = CommonUtils.getObjectLength(GlobalConfig.FbChallengeConfig);
            this.lastPass = true;
        }
    };
    return SkyLevelModel;
}());
__reflect(SkyLevelModel.prototype, "SkyLevelModel");
//# sourceMappingURL=SkyLevelModel.js.map