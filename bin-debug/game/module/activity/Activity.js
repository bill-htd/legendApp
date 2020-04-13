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
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        var _this = _super.call(this) || this;
        _this.activityData = {};
        _this.doubleElevenData = {};
        _this.doubleElevenIDs = [130, 150, 151, 152, 153, 156];
        _this.doubleElevenSpecialIDs = [150, 151, 152, 153];
        _this.doubleTwelveData = {};
        _this.doubleTwelveIDAry = [221, 222, 223, 224];
        _this.doubleTwelveRechargeData = {};
        _this.doubleTwelveRechargeIDAry = [225, 226, 227];
        _this.hfLoginID = 157;
        _this.geLoginID = 210;
        _this.palyEffList = [];
        _this.rankInfoList = [];
        _this.indexCurrDabiao = 0;
        _this.nextDayState = 0;
        _this.hfLoginDay = 1;
        _this.geLoginDay = 1;
        _this.isSuccee = false;
        _this.sysId = PackageID.Activity;
        _this.regNetMsg(1, _this.doActivityData);
        _this.regNetMsg(2, _this.postRewardResult);
        _this.regNetMsg(3, _this.doDaBiaoInfo);
        _this.regNetMsg(4, _this.postIsGetAwards);
        _this.regNetMsg(5, _this.doRewardStatu);
        _this.regNetMsg(7, _this.postChangePage);
        _this.regNetMsg(11, _this.doSevenDayData);
        _this.regNetMsg(12, _this.doChangeSevenDayData);
        _this.regNetMsg(21, _this.doNextDayLoginData);
        _this.regNetMsg(20, _this.doNextDayLoginReward);
        _this.regNetMsg(22, _this.postKuaFuRank);
        _this.regNetMsg(24, _this.test_24);
        _this.regNetMsg(23, _this.handlehongbaoInfo);
        _this.regNetMsg(6, _this.postEnvelopeData);
        _this.regNetMsg(8, _this.postRedEnvelopeData);
        return _this;
    }
    Activity.ins = function () {
        return _super.ins.call(this);
    };
    Activity.prototype.initLogin = function () {
    };
    Activity.prototype.initZero = function () {
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
    Activity.prototype.getActivityDataById = function (id) {
        return this.activityData[id];
    };
    Activity.prototype.getDoubleElevenDataByID = function (id) {
        return this.doubleElevenData[id];
    };
    Activity.prototype.getPalyEffListById = function (id) {
        return this.palyEffList[id];
    };
    Activity.prototype.setPalyEffListById = function (id, value) {
        this.palyEffList[id] = value;
    };
    Activity.prototype.getrankInfoListByIndex = function (index) {
        return this.rankInfoList[index];
    };
    Activity.prototype.doActivityData = function (bytes) {
        this.activityData = {};
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var activityData = ActivityDataFactory.create(bytes);
            if (activityData) {
                var id = activityData.id;
                if (this.doubleElevenIDs.indexOf(id) != -1) {
                    this.doubleElevenData[id] = activityData;
                }
                else if (this.doubleTwelveIDAry.indexOf(id) != -1) {
                    this.doubleTwelveData[id] = activityData;
                }
                else if (this.doubleTwelveRechargeIDAry.indexOf(id) != -1) {
                    this.doubleTwelveRechargeData[id] = activityData;
                }
                else {
                    this.activityData[id] = activityData;
                }
            }
        }
        this.postActivityIsGetAwards();
        ActivityDataFactory.createEx();
        this.checkSpecials();
        this.checkActivityTimer();
    };
    Activity.prototype.test_24 = function (bytes) {
        console.log('test_24');
        console.log(bytes);
    };
    Activity.prototype.test_2 = function (bytes) {
        console.log('test_2');
        console.log(bytes);
    };
    Activity.prototype.checkSpecials = function () {
        if (TimerManager.ins().isExists(this.checkSpecials, this))
            TimerManager.ins().remove(this.checkSpecials, this);
        this.postSpecials();
        var data;
        for (var key in this.doubleElevenData) {
            if (this.doubleElevenSpecialIDs.indexOf(Number(key)) != -1) {
                data = this.doubleElevenData[key];
                if (!data.isSpecialOpen() && data.getSpecialOpenLeftTime()) {
                    TimerManager.ins().doTimer(data.getSpecialOpenLeftTime() * 1000, 1, this.checkSpecials, this);
                    return;
                }
            }
        }
    };
    Activity.prototype.postSpecials = function () {
    };
    Activity.prototype.postActivityIsGetAwards = function () {
    };
    Activity.prototype.postRewardResult = function (bytes) {
        console.log('25-2');
        console.log(bytes);
        this.isSuccee = bytes.readBoolean();
        var activityID = bytes.readInt();
        if (this.doubleElevenIDs.indexOf(activityID) != -1) {
            this.getDoubleElevenDataByID(activityID).update(bytes);
        }
        else if (this.doubleTwelveRechargeIDAry.indexOf(activityID) != -1) {
            this.doubleTwelveRechargeData[activityID].update(bytes);
        }
        else if (this.doubleTwelveIDAry.indexOf(activityID) != -1) {
            this.doubleTwelveData[activityID].update(bytes);
        }
        else {
            this.getActivityDataById(activityID).update(bytes);
        }
        this.postActivityPanel(activityID);
        this.postActivityIsGetAwards();
        return activityID;
    };
    Activity.prototype.postActivityPanel = function (activityId) {
        return activityId;
    };
    Activity.prototype.postHuntResult = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return params;
    };
    Activity.prototype.sendReward = function (actID, rewardID, param1, param2) {
        var bytes = this.getBytes(2);
        var cfg = GlobalConfig.ActivityConfig[actID];
        if (cfg && cfg.activityType == ActivityDataFactory.ACTIVITY_TYPE_9) {
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
        else if (cfg && cfg.activityType == ActivityDataFactory.ACTIVITY_TYPE_11) {
            bytes.writeInt(actID);
            bytes.writeShort(rewardID);
            bytes.writeShort(param1);
        }
        else if (cfg && cfg.activityType == ActivityDataFactory.ACTIVITY_TYPE_22) {
            bytes.writeInt(actID);
            bytes.writeShort(rewardID);
            bytes.writeShort(param1);
            bytes.writeInt(param2);
        }
        else if (cfg && cfg.activityType == ActivityDataFactory.ACTIVITY_TYPE_12) {
            if (param1 == EnvelopeType.SEND) {
                bytes.writeInt(actID);
                bytes.writeShort(rewardID);
                bytes.writeShort(param1);
                if (param2)
                    bytes.writeString(param2);
            }
            else if (param1 == EnvelopeType.GET) {
                bytes.writeInt(actID);
                bytes.writeUnsignedShort(rewardID);
                bytes.writeShort(param1);
            }
        }
        else if (cfg && cfg.activityType == ActivityDataFactory.ACTIVITY_TYPE_2) {
            bytes.writeInt(actID);
            bytes.writeShort(rewardID);
            var p1 = param1 ? param1 : 0;
            bytes.writeShort(p1);
        }
        else if (actID == 2001) {
            bytes.writeInt(actID);
            bytes.writeShort(rewardID);
            bytes.writeShort(param1);
        }
        else {
            bytes.writeInt(actID);
            bytes.writeShort(rewardID);
        }
        this.sendToServer(bytes);
    };
    Activity.prototype.sendLianxuReward = function (actId) {
        var bytes = this.getBytes(13);
        bytes.writeInt(actId);
        this.sendToServer(bytes);
    };
    Activity.prototype.sendqianghongbao = function (actId) {
        var bytes = this.getBytes(13);
        bytes.writeInt(actId);
        this.sendToServer(bytes);
    };
    Activity.prototype.doRewardStatu = function (bytes) {
        var activityId = bytes.readInt();
        var data = this.getActivityDataById(activityId);
        if (data) {
            if (data.id == this.hfLoginID) {
                data.updateData(bytes);
                this.hfLoginDay = data.logTime;
            }
            else if (data.id == this.geLoginID) {
                data.updateData(bytes);
                this.geLoginDay = data.logTime;
            }
            else {
                data.updateData(bytes);
            }
        }
        else {
            data = new ActivityType5Data(null);
            this.activityData[activityId] = data;
            data.updateData(bytes);
        }
        this.postActivityIsGetAwards();
    };
    Activity.prototype.postChangePage = function (bytes) {
        var activityData = ActivityDataFactory.create(bytes);
        if (activityData) {
            if (this.doubleElevenIDs.indexOf(activityData.id) != -1) {
                this.doubleElevenData[activityData.id] = activityData;
            }
            else if (this.doubleTwelveRechargeIDAry.indexOf(activityData.id) != -1) {
                this.doubleTwelveRechargeData[activityData.id] = activityData;
            }
            else if (this.doubleTwelveIDAry.indexOf(activityData.id) != -1) {
                this.doubleTwelveData[activityData.id] = activityData;
            }
            else {
                this.activityData[activityData.id] = activityData;
            }
        }
        this.postActivityIsGetAwards();
        return activityData ? activityData.id : 0;
    };
    Activity.prototype.sendChangePage = function (actId) {
        var bytes = this.getBytes(7);
        bytes.writeInt(actId);
        this.sendToServer(bytes);
    };
    Activity.prototype.doDaBiaoInfo = function (bytes) {
        this.dabiaoDecode(bytes);
        this.postGetDaBiaoInfo();
    };
    Activity.prototype.postGetDaBiaoInfo = function () {
    };
    Activity.prototype.doNextDayLoginData = function (bytes) {
        this.nextDayState = bytes.readShort();
        debug.log(this.nextDayState);
    };
    Activity.prototype.doNextDayLoginReward = function (bytes) {
        var state = bytes.readShort();
        if (state) {
            this.nextDayState = 2;
            UserTips.ins().showTips(StringUtils.addColor("领取奖励成功", 0xf3311e));
        }
    };
    Activity.prototype.sendNextDayReward = function () {
        var bytes = this.getBytes(20);
        this.sendToServer(bytes);
    };
    Activity.prototype.sendDabiaoInfo = function (dabiao) {
        var bytes = this.getBytes(3);
        bytes.writeInt(dabiao);
        this.sendToServer(bytes);
    };
    Activity.prototype.sendGetDabiaoReward = function (dabiao) {
        var bytes = this.getBytes(4);
        bytes.writeInt(dabiao);
        this.sendToServer(bytes);
    };
    Activity.prototype.postIsGetAwards = function (bytes) {
        this.isGetAward = bytes.readBoolean();
    };
    Activity.prototype.sendGetSevenDayAwards = function (day) {
        var bytes = this.getBytes(12);
        bytes.writeShort(day);
        this.sendToServer(bytes);
    };
    Activity.prototype.doSevenDayData = function (bytes) {
        this.dayNum = bytes.readShort();
        this.isAwards = bytes.readInt();
        this.postSevendayIsAwards();
    };
    Activity.prototype.doChangeSevenDayData = function (bytes) {
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
    Activity.prototype.postSevendayAwardCallback = function () {
    };
    Activity.prototype.postSevendayIsAwards = function () {
    };
    Activity.prototype.postNextDayInfo = function () {
    };
    Activity.prototype.getSevenDayStast = function () {
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
    Activity.prototype.checkNoticeRed = function () {
        var cfg = GlobalConfig.WelfareConfig[4];
        var activity = Activity.ins().getActivityDataById(cfg.activityId ? cfg.activityId : 0);
        return activity && activity.canReward();
        ;
    };
    Activity.prototype.getSevenDayLogIsVisible = function () {
        return ((this.isAwards >> 14 & 1) == 0);
    };
    Activity.prototype.getbtnInfo = function (str) {
        var config = GlobalConfig.ActivityBtnConfig;
        if (config[str]) {
            return config[str];
        }
        return null;
    };
    Activity.prototype.isShowRedPointByBtnInfo = function (abc) {
        var result = false;
        result = this.checkAcCanGet(abc.id + "");
        return result;
    };
    Activity.prototype.checkAcCanGet = function (index) {
        if (this.doubleElevenIDs.indexOf(Number(index)) != -1) {
            if (this.doubleElevenSpecialIDs.indexOf(Number(index)) != -1) {
                var specialData;
                var len = this.doubleElevenSpecialIDs.length;
                for (var i = 0; i < len; i++) {
                    specialData = this.doubleElevenData[this.doubleElevenSpecialIDs[i]];
                    if (specialData.isSpecialOpen() && specialData.canReward())
                        return true;
                }
            }
            else {
                var doubleData = this.doubleElevenData[Number(index)];
                if (doubleData.isOpenActivity() && doubleData.canReward())
                    return true;
            }
            return false;
        }
        if (this.doubleTwelveIDAry.indexOf(Number(index)) != -1) {
            for (var i_1 in this.doubleTwelveData) {
                if (i_1 == index && this.doubleTwelveData[i_1].isOpenActivity() && this.doubleTwelveData[i_1].type == 9) {
                    for (var j = 0; j < 3; j++) {
                        if (Activity.ins().isGetRollReward(this.doubleTwelveData[i_1].id, j))
                            return true;
                    }
                }
                return false;
            }
        }
        var data = this.activityData;
        for (var k in data) {
            if (k == index && data[k].isOpenActivity() && data[k].canReward() && data[k].specialState()) {
                return true;
            }
        }
        return false;
    };
    Activity.prototype.checkOtherCharge2CanGet = function () {
        var rechargeData = Recharge.ins().getRechargeData(1);
        var config = GlobalConfig.ChongZhi2Config[((rechargeData.day / 7) >= 1) ? 2 : 1][rechargeData.day % 7];
        for (var k in config) {
            if (((rechargeData.isAwards >> config[k].index) & 1) == 0 && rechargeData.num >= config[k].pay) {
                return true;
            }
        }
        return false;
    };
    Activity.prototype.dabiaoDecode = function (bytes) {
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
                this.rankInfoList.push(new DabiaoData());
            }
            data = this.rankInfoList[i];
            data.prase(bytes, rankType);
        }
    };
    Activity.prototype.getisCangetDabiao3 = function (id) {
        var activityData = Activity.ins().getActivityDataById(id);
        if (activityData.canOnlyReward) {
            activityData.canOnlyReward();
            return activityData.btn1 || activityData.btn2;
        }
        else {
            return this.checkAcCanGet(id + "");
        }
    };
    Activity.prototype.getisCanBuyXianGou = function (actId) {
        var rtn = false;
        var configList = GlobalConfig.ActivityType2Config[actId];
        if (configList) {
            for (var i = 0; i < configList.length; i++) {
                rtn = this.getisCanBuyXianGouItem(actId, i);
                if (rtn)
                    break;
            }
        }
        return rtn;
    };
    Activity.prototype.getisCanBuyXianGouItem = function (actId, itemId) {
        var rtn = false;
        var activityData = Activity.ins().activityData[actId];
        var configList = GlobalConfig.ActivityType2Config[actId];
        if (activityData && configList) {
            var config = configList[itemId];
            var buyData = activityData.buyData[itemId] || 0;
            if (config && buyData) {
                var myMoney = (config.currencyType == 1 ? Actor.gold : Actor.yb);
                var a = (config.currencyType == 1);
                var b = (parseInt(myMoney + "") >= config.price);
                var c = (config.count - buyData > 0);
                rtn = a && b && c;
            }
        }
        return rtn;
    };
    Activity.prototype.isDoubleElevenCanGet = function () {
        var data = this.doubleElevenData;
        for (var k in data) {
            if (data[k].isSpecialOpen() && data[k].canReward()) {
                return true;
            }
        }
        return false;
    };
    Activity.prototype.IsHefuXunBaoTimer = function () {
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
    Activity.prototype.IsBossScoreTitle = function (id, title) {
        var actconfig = GlobalConfig.ActivityType7Config[id];
        var actdata = Activity.ins().getActivityDataById(id);
        for (var k in actconfig) {
            var cfg = actconfig[k];
            if (cfg.title == title) {
                if (this.getIsBuy(cfg) && actdata.bossScore >= cfg.score) {
                    return true;
                }
            }
        }
        return false;
    };
    Activity.prototype.getIsBuy = function (config) {
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
    Activity.prototype.getType7RedPoint = function (activityID) {
        var itemData;
        var config = GlobalConfig.ActivityType7Config[activityID];
        var actdata = Activity.ins().getActivityDataById(activityID);
        if (config[1].showType == ActivityType7Data.TYPE_LABA) {
            for (var i in config) {
                var state = actdata.getExchange(config[i].index);
                if (state == Activity.CanGet)
                    return true;
            }
        }
        else {
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
        }
        return false;
    };
    Activity.prototype.getCurrentRingAwardIndex = function (record) {
        var index = 1;
        if (record > 0) {
            while ((record >> index & 1) != 0) {
                index++;
            }
        }
        return index;
    };
    Activity.prototype.getRingAward = function (index) {
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
    Activity.prototype.getLastRingAward = function () {
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
    Activity.prototype.addEvent = function () {
        MessageCenter.addListener(GameLogic.ins().postEnterMap, this.openRingActivity, this);
    };
    Activity.prototype.removeEvent = function () {
        MessageCenter.ins().removeListener(GameLogic.ins().postEnterMap['funcallname'], this.openRingActivity, this);
    };
    Activity.prototype.openRingActivity = function () {
        if (GameMap.fbType == 0) {
            MessageCenter.ins().removeListener(GameLogic.ins().postEnterMap['funcallname'], this.openRingActivity, this);
            ViewManager.ins().open(ActivityWin, 201);
            Activity.ins().sendChangePage(201);
        }
    };
    Activity.prototype.getType8RedPoint = function (activityID) {
        var isRedPoint = false;
        var data = Activity.ins().activityData[activityID];
        if (data && data.record == 0) {
            isRedPoint = true;
        }
        return isRedPoint;
    };
    Activity.prototype.getType9RedPoint = function (activityID) {
        var isRedPoint = false;
        var data = Activity.ins().activityData[activityID];
        if (this.getRollSum(activityID)) {
            isRedPoint = true;
        }
        else {
            var config = GlobalConfig.ActivityType9Config[activityID];
            if (Assert(config, "ActivityType9Config is null!! activityId:" + activityID)) {
                return false;
            }
            for (var i in config[0].reward) {
                if (this.isGetRollReward(activityID, +i)) {
                    isRedPoint = true;
                    break;
                }
            }
        }
        return isRedPoint;
    };
    Activity.prototype.getType10RedPoint = function (activityID) {
        var data = Activity.ins().activityData[activityID];
        var config = GlobalConfig.ActivityType10Config[activityID][data.getLevel()];
        if (!config)
            return false;
        if (data.yb >= config.recharge && Actor.yb >= config.yuanBao)
            return true;
        return false;
    };
    Activity.prototype.getType17RedPoint = function (activityID) {
        var data = Activity.ins().activityData[activityID];
        var config = GlobalConfig.ActivityType17_2Config[activityID];
        if (!config)
            return false;
        if (data.score >= config.score)
            return true;
        return false;
    };
    Activity.prototype.isGetRollReward = function (activityID, id) {
        var data = Activity.ins().activityData[activityID];
        if (!data) {
            data = Activity.ins().doubleTwelveData[activityID];
        }
        var config = GlobalConfig.ActivityType9Config[activityID];
        if (config && config[0]) {
            if (config[0].reward[id].times && data.count >= config[0].reward[id].times && !(data.record >> (id + 1) & 1)) {
                return true;
            }
        }
        return false;
    };
    Activity.prototype.getRollSum = function (activityID) {
        var config = GlobalConfig.ActivityType9Config[activityID];
        if (config && config[0]) {
            var itemData = UserBag.ins().getBagItemById(config[0].item);
            if (itemData) {
                return true;
            }
        }
        return false;
    };
    Activity.prototype.getIsRollTen = function (activityID) {
        var config = GlobalConfig.ActivityType9Config[activityID][0];
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
    Activity.prototype.postKuaFuRank = function (bytes) {
        var id = bytes.readInt();
        var len = bytes.readInt();
        var actData = Activity.ins().getActivityDataById(id);
        if (actData)
            actData.CleanRandData();
        for (var i = 0; i < len; i++) {
            var rankData = new KuaFuRankData();
            rankData.actorId = bytes.readInt();
            rankData.rmb = bytes.readInt();
            rankData.rank = bytes.readInt();
            rankData.serverId = bytes.readInt();
            rankData.roleName = bytes.readString();
            rankData.job = bytes.readInt();
            rankData.sex = bytes.readInt();
            if (actData)
                actData.SetRankData(rankData);
        }
        var mycost = bytes.readInt();
        if (actData)
            actData.mycost = mycost;
    };
    Activity.prototype.sendKuaFuRank = function (actId) {
        var bytes = this.getBytes(22);
        bytes.writeInt(actId);
        this.sendToServer(bytes);
    };
    Activity.prototype.checkLabaBossData = function () {
        for (var k in Activity.ins().activityData) {
            if (Activity.ins().activityData[k].pageStyle != ActivityPageStyle.LABA) {
                continue;
            }
            if (Activity.ins().activityData[k].type == ActivityDataFactory.ACTIVITY_TYPE_20 &&
                Activity.ins().getActivityDataById(+k).isOpenActivity()) {
                var id = Activity.ins().activityData[k].id;
                var activityData = Activity.ins().getActivityDataById(id);
                return activityData;
            }
        }
        return null;
    };
    Activity.prototype.getConfig22_3 = function (id) {
        var items = GlobalConfig.ActivityType22_3Config[id];
        var config;
        var obj;
        for (var key in items) {
            obj = items[key];
            for (var key2 in obj) {
                if (obj[key2].low <= UserZs.ins().lv && UserZs.ins().lv <= obj[key2].high)
                    return obj[key2];
            }
        }
        return null;
    };
    Activity.prototype.sendEnvelopeData = function (id, eid) {
        var bytes = this.getBytes(6);
        bytes.writeInt(id);
        bytes.writeUnsignedShort(eid);
        this.sendToServer(bytes);
    };
    Activity.prototype.postEnvelopeData = function (bytes) {
        var id = bytes.readInt();
        var isSuccess = bytes.readByte();
        if (isSuccess) {
            var eId = bytes.readUnsignedShort();
            var endtime = bytes.readUnsignedShort();
            var noName = bytes.readInt();
            var rechargeNum = bytes.readInt();
            var Num = bytes.readShort();
            var obj = [];
            for (var i = 0; i < Num; i++) {
                obj[i] = {};
                obj[i].name = bytes.readString();
                obj[i].hongbaoid = bytes.readShort();
                obj[i].job = bytes.readShort();
                obj[i].sex = bytes.readShort();
                obj[i].isSuccess = bytes.readByte();
                obj[i].serverId = bytes.readInt();
            }
            console.log(obj);
            HBSystem.ins().testhongbao(id, eId);
            return;
        }
        this.postEnvelopeDataCall(null);
    };
    Activity.prototype.postEnvelopeDataCall = function (eld) {
        return eld;
    };
    Activity.prototype.handlehongbaoInfo = function (bytes) {
        var id = bytes.readInt();
        if (this.activityData[id] && this.activityData[id] instanceof ActivityType24Data) {
            var actData = this.activityData[id];
            var reld = new RedEnvelope();
            reld.id = bytes.readUnsignedShort();
            reld.startimer = bytes.readInt();
            actData.envelopeData.push(reld);
            console.log('获取到的红包数mu');
            console.log(actData);
            HBSystem.ins().updateHongBao();
        }
    };
    Activity.prototype.postRedEnvelopeData = function (bytes) {
        var id = bytes.readInt();
        if (this.activityData[id] && this.activityData[id] instanceof ActivityType12Data) {
            var actData = this.activityData[id];
            var control = bytes.readShort();
            var len = bytes.readShort();
            if (control == 1) {
                if (len) {
                    var reld = new RedEnvelope();
                    reld.id = bytes.readUnsignedShort();
                    reld.timer = bytes.readInt();
                    actData.envelopeData.push(reld);
                }
            }
            else {
                var arr = [];
                for (var i = 0; i < len; i++) {
                    var reld = new RedEnvelope();
                    reld.id = bytes.readUnsignedShort();
                    reld.timer = bytes.readInt();
                    arr.push(reld);
                }
                actData.envelopeData = arr;
            }
        }
    };
    Activity.prototype.checkActivityTimer = function () {
        for (var k in this.activityData) {
            if (this.activityData[k] instanceof ActivityType12Data || this.activityData[k] instanceof ActivityType24Data) {
                if (!TimerManager.ins().isExists(this.ActivityTimerSecond1, this))
                    TimerManager.ins().doTimer(1000, 0, this.ActivityTimerSecond1, this);
                break;
            }
        }
    };
    Activity.prototype.postGetRedEnvelope = function (id, eid, yb, gold, arr) {
        return [id, eid, yb, gold, arr];
    };
    Activity.prototype.ActivityTimerSecond1 = function () {
        for (var i = 0; i < this._actTimeSecond1.length;) {
            var id = this._actTimeSecond1[i];
            if (this.activityData[id]) {
                if (!this.activityData[id].isOpenActivity()) {
                    if (this.activityData[id] instanceof ActivityType12Data) {
                        var actData = this.activityData[id];
                        actData.clearAll();
                    }
                    this._actTimeSecond1.splice(i, 1);
                    continue;
                }
                if (this.activityData[id] instanceof ActivityType12Data) {
                    var actData = this.activityData[id];
                    actData.checkClear();
                }
                if (!this.activityData[id].isOpenActivity()) {
                    if (this.activityData[id] instanceof ActivityType24Data) {
                        var actData = this.activityData[id];
                        actData.clearAll();
                    }
                    this._actTimeSecond1.splice(i, 1);
                    continue;
                }
                if (this.activityData[id] instanceof ActivityType24Data) {
                    var actData = this.activityData[id];
                    actData.checkClear();
                }
            }
            i++;
        }
    };
    Object.defineProperty(Activity.prototype, "activityTimers", {
        get: function () {
            this._actTimeSecond1 = this._actTimeSecond1 ? this._actTimeSecond1 : [];
            return this._actTimeSecond1;
        },
        enumerable: true,
        configurable: true
    });
    Activity.NotReached = 0;
    Activity.CanGet = 1;
    Activity.Geted = 2;
    Activity.NOKILL = 0;
    Activity.KILL = 1;
    return Activity;
}(BaseSystem));
__reflect(Activity.prototype, "Activity");
var DabiaoData = (function () {
    function DabiaoData() {
    }
    DabiaoData.prototype.prase = function (bytes, rankType) {
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
    return DabiaoData;
}());
__reflect(DabiaoData.prototype, "DabiaoData");
var GameSystem;
(function (GameSystem) {
    GameSystem.activity = Activity.ins.bind(Activity);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Activity.js.map