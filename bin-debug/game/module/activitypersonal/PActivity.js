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
var PActivity = (function (_super) {
    __extends(PActivity, _super);
    function PActivity() {
        var _this = _super.call(this) || this;
        _this.activityData = {};
        _this.palyEffList = [];
        _this.rankInfoList = [];
        _this.indexCurrDabiao = 0;
        _this.nextDayState = 0;
        _this.hfLoginDay = 1;
        _this.geLoginDay = 1;
        _this.isSuccee = false;
        _this.sysId = PackageID.PActivity;
        _this.regNetMsg(1, _this.doActivityData);
        _this.regNetMsg(2, _this.postRewardResult);
        _this.regNetMsg(7, _this.postChangePage);
        return _this;
    }
    PActivity.ins = function () {
        return _super.ins.call(this);
    };
    PActivity.prototype.initZero = function () {
        if (this.activityData) {
            for (var id in this.activityData) {
                var activityId = +id;
                if (activityId < 10000) {
                    var config = GlobalConfig.ActivityConfig[id];
                    if (config) {
                        this.sendChangePage(activityId);
                    }
                }
            }
        }
    };
    PActivity.prototype.getActivityDataById = function (id) {
        return this.activityData[id];
    };
    PActivity.prototype.getPalyEffListById = function (id) {
        return this.palyEffList[id];
    };
    PActivity.prototype.setPalyEffListById = function (id, value) {
        this.palyEffList[id] = value;
    };
    PActivity.prototype.getrankInfoListByIndex = function (index) {
        return this.rankInfoList[index];
    };
    PActivity.prototype.doActivityData = function (bytes) {
        this.activityData = {};
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var activityData = PActivityDataFactory.create(bytes);
            if (activityData) {
                var id = activityData.id;
                this.activityData[id] = activityData;
            }
        }
        this.postActivityIsGetAwards();
    };
    PActivity.prototype.postSpecials = function () {
    };
    PActivity.prototype.postActivityIsGetAwards = function () {
    };
    PActivity.prototype.postRewardResult = function (bytes) {
        this.isSuccee = bytes.readBoolean();
        var activityID = bytes.readInt();
        this.getActivityDataById(activityID).update(bytes);
        this.postActivityPanel(activityID);
        this.postActivityIsGetAwards();
        return activityID;
    };
    PActivity.prototype.postActivityPanel = function (activityId) {
        return activityId;
    };
    PActivity.prototype.sendReward = function (actID, rewardID, param1) {
        var bytes = this.getBytes(2);
        var cfg = GlobalConfig.PActivityConfig[actID];
        if (cfg && cfg.activityType == PActivityDataFactory.PACTIVITY_TYPE_9) {
            if (rewardID) {
                bytes.writeInt(actID);
                bytes.writeShort(rewardID);
            }
            else {
                bytes.writeInt(actID);
                bytes.writeShort(rewardID);
                bytes.writeByte(param1);
            }
        }
        else {
            bytes.writeInt(actID);
            bytes.writeShort(rewardID);
        }
        this.sendToServer(bytes);
    };
    PActivity.prototype.sendLianxuReward = function (actId) {
        var bytes = this.getBytes(13);
        bytes.writeInt(actId);
        this.sendToServer(bytes);
    };
    PActivity.prototype.doRewardStatu = function (bytes) {
        var activityId = bytes.readInt();
        var data = this.getActivityDataById(activityId);
        if (data) {
            data.updateData(bytes);
        }
        this.postActivityIsGetAwards();
    };
    PActivity.prototype.postChangePage = function (bytes) {
        var activityData = PActivityDataFactory.create(bytes);
        if (activityData) {
            this.activityData[activityData.id] = activityData;
        }
        this.postActivityIsGetAwards();
        return activityData ? activityData.id : 0;
    };
    PActivity.prototype.sendChangePage = function (actId) {
        var bytes = this.getBytes(7);
        bytes.writeInt(actId);
        this.sendToServer(bytes);
    };
    PActivity.prototype.doDaBiaoInfo = function (bytes) {
        this.dabiaoDecode(bytes);
        this.postGetDaBiaoInfo();
    };
    PActivity.prototype.postGetDaBiaoInfo = function () {
    };
    PActivity.prototype.doNextDayLoginData = function (bytes) {
        this.nextDayState = bytes.readShort();
        debug.log(this.nextDayState);
    };
    PActivity.prototype.doNextDayLoginReward = function (bytes) {
        var state = bytes.readShort();
        if (state) {
            this.nextDayState = 2;
            UserTips.ins().showTips(StringUtils.addColor("领取奖励成功", 0xf3311e));
        }
    };
    PActivity.prototype.sendNextDayReward = function () {
        var bytes = this.getBytes(20);
        this.sendToServer(bytes);
    };
    PActivity.prototype.sendDabiaoInfo = function (dabiao) {
        var bytes = this.getBytes(3);
        bytes.writeInt(dabiao);
        this.sendToServer(bytes);
    };
    PActivity.prototype.sendGetDabiaoReward = function (dabiao) {
        var bytes = this.getBytes(4);
        bytes.writeInt(dabiao);
        this.sendToServer(bytes);
    };
    PActivity.prototype.postIsGetAwards = function (bytes) {
        this.isGetAward = bytes.readBoolean();
    };
    PActivity.prototype.sendGetSevenDayAwards = function (day) {
        var bytes = this.getBytes(12);
        bytes.writeShort(day);
        this.sendToServer(bytes);
    };
    PActivity.prototype.doSevenDayData = function (bytes) {
        this.dayNum = bytes.readShort();
        this.isAwards = bytes.readInt();
        this.postSevendayIsAwards();
    };
    PActivity.prototype.doChangeSevenDayData = function (bytes) {
        var flag = bytes.readBoolean();
        if (flag) {
            var changeDay = bytes.readShort();
            this.isAwards = bytes.readInt();
            this.postSevendayAwardCallback();
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
        }
        this.postSevendayIsAwards();
    };
    PActivity.prototype.postSevendayAwardCallback = function () {
    };
    PActivity.prototype.postSevendayIsAwards = function () {
    };
    PActivity.prototype.postNextDayInfo = function () {
    };
    PActivity.prototype.getSevenDayStast = function () {
        var day = DateUtils.DAYS_PER_WEEK;
        if (this.dayNum > 14)
            day = 14;
        else
            day = this.dayNum;
        for (var i = 1; i <= day; i++) {
            var config = GlobalConfig.LoginRewardsConfig[i];
            if (config) {
                if (this.dayNum >= config.day) {
                    if ((this.isAwards >> config.day & 1) == 0)
                        return true;
                }
            }
        }
        return false;
    };
    PActivity.prototype.getSevenDayLogIsVisible = function () {
        return ((this.isAwards >> 14 & 1) == 0);
    };
    PActivity.prototype.getbtnInfo = function (str) {
        var config = GlobalConfig.PActivityBtnConfig;
        if (config[str]) {
            return config[str];
        }
        return null;
    };
    PActivity.prototype.isShowRedPointByBtnInfo = function (abc) {
        var result = false;
        result = this.checkAcCanGet(abc.id + "");
        return result;
    };
    PActivity.prototype.checkAcCanGet = function (index) {
        var data = this.activityData;
        for (var k in data) {
            if (k == index && data[k].isOpenActivity() && data[k].canReward() && data[k].specialState()) {
                return true;
            }
        }
        return false;
    };
    PActivity.prototype.checkOtherCharge2CanGet = function () {
        var rechargeData = Recharge.ins().getRechargeData(1);
        var config = GlobalConfig.ChongZhi2Config[((rechargeData.day / 7) >= 1) ? 2 : 1][rechargeData.day % 7];
        for (var k in config) {
            if (((rechargeData.isAwards >> config[k].index) & 1) == 0 && rechargeData.num >= config[k].pay) {
                return true;
            }
        }
        return false;
    };
    PActivity.prototype.dabiaoDecode = function (bytes) {
        this.isDaBiao = bytes.readBoolean();
        this.indexCurrDabiao = Math.max(bytes.readInt() - 1, 0);
        var rankType = bytes.readShort();
        if (rankType == RankDataType.TYPE_LEVEL) {
            bytes.readInt();
            bytes.readInt();
        }
        else if (rankType == RankDataType.TYPE_BAOSHI) {
            this.myDabiaoInfo = bytes.readInt();
        }
        else if (rankType == RankDataType.TYPE_ZHANLING) {
            var zj = bytes.readInt();
            var zx = bytes.readInt();
            this.myDabiaoInfo = [zj, zx];
        }
        else if (rankType == RankDataType.TYPE_LONGHUN) {
            this.myDabiaoInfo = bytes.readInt();
        }
        else if (rankType == RankDataType.TYPE_XIAOFEI) {
            this.myDabiaoInfo = bytes.readInt();
        }
        else if (rankType == RankDataType.TYPE_HF_XIAOFEI) {
            this.myDabiaoInfo = bytes.readInt();
            this.myPaiming = bytes.readInt();
        }
        else {
            this.myDabiaoInfo = bytes.readDouble();
        }
        var len = bytes.readShort();
        var data;
        this.rankInfoList = [];
        for (var i = 0; i < len; i++) {
            if (!this.rankInfoList[i]) {
                this.rankInfoList.push(new PDabiaoData());
            }
            data = this.rankInfoList[i];
            data.prase(bytes, rankType);
        }
    };
    PActivity.prototype.getisCangetDabiao3 = function (id) {
        var activityData = PActivity.ins().getActivityDataById(id);
        if (activityData.canOnlyReward) {
            activityData.canOnlyReward();
            return activityData.btn1 || activityData.btn2;
        }
        else {
            return this.checkAcCanGet(id + "");
        }
    };
    PActivity.prototype.getisCanBuyXianGou = function (actId) {
        var rtn = false;
        var configList = GlobalConfig.PActivity2Config[actId];
        if (configList) {
            for (var i = 0; i < configList.length; i++) {
                rtn = this.getisCanBuyXianGouItem(actId, i);
                if (rtn)
                    break;
            }
        }
        return rtn;
    };
    PActivity.prototype.getisCanBuyXianGouItem = function (actId, itemId) {
        var rtn = false;
        var activityData = PActivity.ins().activityData[actId];
        var configList = GlobalConfig.PActivity2Config[actId];
        if (activityData && configList) {
            var config = configList[itemId];
            var buyData = activityData.buyData[itemId] || 0;
            if (config && buyData) {
                var myMoney = (config.currencyType == 1 ? Actor.gold : Actor.yb);
                var a = (config.currencyType == 1);
                var b = (myMoney >= config.price);
                var c = (config.count - buyData > 0);
                rtn = a && b && c;
            }
        }
        return rtn;
    };
    PActivity.prototype.IsHefuXunBaoTimer = function () {
        if (!GameServer._serverHeZeroTime)
            return false;
        var startTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime);
        var endTime = startTime + GlobalConfig.TreasureHuntConfig.hefuDay * 24 * 60 * 60 * 1000;
        var curTime = GameServer.serverTime;
        if (curTime >= startTime && curTime <= endTime) {
            return true;
        }
        return false;
    };
    PActivity.prototype.IsBossScoreTitle = function (id, title) {
        return false;
    };
    PActivity.prototype.getIsBuy = function (config) {
        if (config) {
            var activityData = Activity.ins().getActivityDataById(config.Id);
            if (config.count && activityData.personalRewardsSum[config.index] >= config.count) {
                return false;
            }
            if (config.scount && activityData.worldRewardsSum[config.index] >= config.scount) {
                return false;
            }
            return true;
        }
    };
    PActivity.prototype.getType7RedPoint = function (activityID) {
        var itemData;
        var config = GlobalConfig.ActivityType7Config[activityID];
        var actdata = Activity.ins().getActivityDataById(activityID);
        for (var i in config) {
            if (Activity.ins().getIsBuy(config[i])) {
                if (config[i].itemId) {
                    itemData = UserBag.ins().getBagItemById(config[i].itemId);
                    if (itemData && itemData.count >= config[i].itemCount)
                        return true;
                }
                else if (actdata.bossScore >= config[i].score)
                    return true;
            }
        }
        return false;
    };
    PActivity.prototype.getCurrentRingAwardIndex = function (record) {
        var index = 1;
        if (record > 0) {
            while ((record >> index & 1) != 0) {
                index++;
            }
        }
        return index;
    };
    PActivity.prototype.getRingAward = function (index) {
        for (var i in GlobalConfig.ActivityType8Config) {
            var cfg = GlobalConfig.ActivityType8Config[i][1];
            if (cfg.showType == ActivityType8Data.TYPE_RING) {
                for (var j in GlobalConfig.ActivityType8Config[i]) {
                    if (j == index.toString()) {
                        return GlobalConfig.ActivityType8Config[i][j];
                    }
                }
            }
        }
        return null;
    };
    PActivity.prototype.getLastRingAward = function () {
        var lastCfg;
        for (var i in GlobalConfig.ActivityType8Config) {
            var cfg = GlobalConfig.ActivityType8Config[i][1];
            if (cfg.showType == ActivityType8Data.TYPE_RING) {
                for (var j in GlobalConfig.ActivityType8Config[i]) {
                    lastCfg = GlobalConfig.ActivityType8Config[i][j];
                }
            }
        }
        return lastCfg;
    };
    PActivity.prototype.addEvent = function () {
        MessageCenter.addListener(GameLogic.ins().postEnterMap, this.openRingActivity, this);
    };
    PActivity.prototype.removeEvent = function () {
        MessageCenter.ins().removeListener(GameLogic.ins().postEnterMap['funcallname'], this.openRingActivity, this);
    };
    PActivity.prototype.openRingActivity = function () {
        if (GameMap.fbType == 0) {
            MessageCenter.ins().removeListener(GameLogic.ins().postEnterMap['funcallname'], this.openRingActivity, this);
            ViewManager.ins().open(ActivityWin, 201);
            Activity.ins().sendChangePage(201);
        }
    };
    PActivity.prototype.getType8RedPoint = function (activityID) {
        var isRedPoint = false;
        var data = Activity.ins().activityData[activityID];
        if (data && data.record == 0) {
            isRedPoint = true;
        }
        return isRedPoint;
    };
    PActivity.prototype.getType9RedPoint = function (activityID) {
        var isRedPoint = false;
        var data = PActivity.ins().activityData[activityID];
        if (this.getRollSum(activityID)) {
            isRedPoint = true;
        }
        else {
            var config = GlobalConfig.PActivityType9Config[activityID];
            for (var i in config[0].reward) {
                if (this.isGetRollReward(activityID, +i)) {
                    isRedPoint = true;
                    break;
                }
            }
        }
        return isRedPoint;
    };
    PActivity.prototype.getType10RedPoint = function (activityID) {
        var data = Activity.ins().activityData[activityID];
        var config = GlobalConfig.ActivityType10Config[activityID][data.getLevel()];
        if (!config)
            return false;
        if (data.yb >= config.recharge && Actor.yb >= config.yuanBao)
            return true;
        return false;
    };
    PActivity.prototype.getType17RedPoint = function (activityID) {
        var data = Activity.ins().activityData[activityID];
        var config = GlobalConfig.ActivityType17_2Config[activityID];
        if (!config)
            return false;
        if (data.score >= config.score)
            return true;
        return false;
    };
    PActivity.prototype.isGetRollReward = function (activityID, id) {
        var data = PActivity.ins().activityData[activityID];
        var config = GlobalConfig.PActivityType9Config[activityID];
        if (config && config[0]) {
            if (config[0].reward[id].times && data.count >= config[0].reward[id].times && !(data.record >> (id + 1) & 1)) {
                return true;
            }
        }
        return false;
    };
    PActivity.prototype.getRollSum = function (activityID) {
        var config = GlobalConfig.PActivityType9Config[activityID];
        if (config && config[0]) {
            var itemData = UserBag.ins().getBagItemById(config[0].item);
            if (itemData) {
                return true;
            }
        }
        return false;
    };
    PActivity.prototype.getIsRollTen = function (activityID) {
        var config = GlobalConfig.PActivityType9Config[activityID][0];
        if (config) {
            var sum = 0;
            if (config.item) {
                var item = UserBag.ins().getBagItemById(config.item);
                if (item) {
                    sum += item.count;
                }
                if (sum >= 10)
                    return true;
            }
            sum = 10 - sum;
            if (config.yb) {
                if (Actor.yb >= config.yb * sum)
                    return true;
            }
        }
        return false;
    };
    PActivity.NotReached = 0;
    PActivity.CanGet = 1;
    PActivity.Geted = 2;
    PActivity.NOKILL = 0;
    PActivity.KILL = 1;
    return PActivity;
}(BaseSystem));
__reflect(PActivity.prototype, "PActivity");
var PDabiaoData = (function () {
    function PDabiaoData() {
    }
    PDabiaoData.prototype.prase = function (bytes, rankType) {
        if (rankType == RankDataType.TYPE_XIAOFEI || rankType == RankDataType.TYPE_HF_XIAOFEI) {
            this.rankIndex = bytes.readShort();
            this.id = bytes.readInt();
            this.name = bytes.readString();
            this.numType = bytes.readInt();
            return;
        }
        this.rankIndex = bytes.readShort();
        this.id = bytes.readInt();
        this.name = bytes.readString();
        this.level = bytes.readShort();
        this.zsLevel = bytes.readShort();
        this.monthCard = bytes.readShort();
        this.vipLv = bytes.readShort();
        if (RankDataType.TYPE_LEVEL != rankType) {
            if (rankType == RankDataType.TYPE_BAOSHI || rankType == RankDataType.TYPE_LONGHUN) {
                this.numType = bytes.readInt();
            }
            else if (rankType == RankDataType.TYPE_ZHANLING) {
                var zj = bytes.readInt();
                var zx = bytes.readInt();
                this.numType = [zj, zx];
            }
            else {
                this.numType = bytes.readDouble();
            }
        }
    };
    return PDabiaoData;
}());
__reflect(PDabiaoData.prototype, "PDabiaoData");
var GameSystem;
(function (GameSystem) {
    GameSystem.pactivity = PActivity.ins.bind(PActivity);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=PActivity.js.map