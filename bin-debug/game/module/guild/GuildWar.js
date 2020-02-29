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
var GuildWar = (function (_super) {
    __extends(GuildWar, _super);
    function GuildWar() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.GuildWar;
        _this.regNetMsg(1, _this.postRedBagInfo);
        _this.regNetMsg(2, _this.doSendRedBack);
        _this.regNetMsg(3, _this.doRobRedBack);
        _this.regNetMsg(4, _this.postJoinPlayBack);
        _this.regNetMsg(5, _this.doPlayNextCard);
        _this.regNetMsg(6, _this.doGetPointInfo);
        _this.regNetMsg(7, _this.doGetGongXunChange);
        _this.regNetMsg(8, _this.doGuildRankinfo);
        _this.regNetMsg(9, _this.postGuildPersonalRank);
        _this.regNetMsg(10, _this.doGuildWarKillInfo);
        _this.regNetMsg(11, _this.doGuildWarCityOwn);
        _this.regNetMsg(12, _this.postDayRewardInfo);
        _this.regNetMsg(14, _this.doMyActivityRankInfo);
        _this.regNetMsg(15, _this.postFlagInfoChange);
        _this.regNetMsg(17, _this.doGuildWarResult);
        _this.regNetMsg(18, _this.doHuDunInfoChange);
        _this.regNetMsg(19, _this.postAssignsReward);
        _this.regNetMsg(20, _this.postSendRewardSuccess);
        _this.regNetMsg(21, _this.postWinGuildInfo);
        _this.regNetMsg(22, _this.postGuildWarStarInfo);
        _this.regNetMsg(23, _this.doGuildWarDoorHuDun);
        _this.regNetMsg(24, _this.doLotteryInfo);
        _this.regNetMsg(25, _this.doGetMyPoint);
        _this.regNetMsg(26, _this.doRankInfoChange);
        _this.regNetMsg(27, _this.doChangeAttrHandle);
        _this.regNetMsg(28, _this.doChangeShowList);
        _this.regNetMsg(29, _this.doPointRewardInfo);
        _this.regNetMsg(31, _this.doDoorEndtime);
        _this.regNetMsg(32, _this.doTalkMaxPoint);
        _this.regNetMsg(33, _this.postKillHuman);
        _this.regNetMsg(34, _this.postHeFuBelong);
        return _this;
    }
    GuildWar.ins = function () {
        return _super.ins.call(this);
    };
    GuildWar.prototype.getModel = function () {
        if (!this._guildWarModel)
            this._guildWarModel = new GuildWarModel();
        return this._guildWarModel;
    };
    GuildWar.prototype.requestSendRedBag = function (num, bagNum) {
        var bytes = this.getBytes(2);
        bytes.writeInt(num);
        bytes.writeInt(bagNum);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestRobRedBag = function () {
        var bytes = this.getBytes(3);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestJoinAc = function () {
        var bytes = this.getBytes(4);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestPlayNextMap = function (index) {
        var bytes = this.getBytes(5);
        bytes.writeByte(index);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestGuildRank = function () {
        var bytes = this.getBytes(8);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestOwnGuildRank = function () {
        var bytes = this.getBytes(9);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.postGuildPersonalRank = function (bytes) {
        var list = [];
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var info = new RankGuildInfo();
            info.parse(bytes);
            list[i] = info;
        }
        return list;
    };
    GuildWar.prototype.requestDayReward = function (day) {
        var bytes = this.getBytes(13);
        bytes.writeInt(day);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestOwnMyGuildRank = function () {
        var bytes = this.getBytes(14);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestStartGetFlag = function () {
        var bytes = this.getBytes(16);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.requestWinGuildInfo = function () {
        var bytes = this.getBytes(21);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.postRedBagInfo = function (bytes) {
        this.getModel().getRedbagInfo(bytes);
    };
    GuildWar.prototype.doSendRedBack = function (bytes) {
        if (bytes.readBoolean()) {
            ViewManager.ins().close(RedBagWin);
            UserTips.ins().showTips("|C:0x35e62d&T:发送红包成功|");
        }
    };
    GuildWar.prototype.doRobRedBack = function (bytes) {
        if (bytes.readBoolean()) {
            ViewManager.ins().close(RedBagWin);
            ViewManager.ins().open(RedBagDetailsWin, 1);
        }
    };
    GuildWar.prototype.postJoinPlayBack = function (bytes) {
        var flag = bytes.readBoolean();
        this.getModel().doorDie = bytes.readBoolean();
        this.getModel().rewardFlag = bytes.readByte();
        if (flag) {
            ViewManager.ins().close(GuildWarMainWin);
            ViewManager.ins().close(GuildMap);
        }
    };
    GuildWar.prototype.doPlayNextCard = function (bytes) {
    };
    GuildWar.prototype.doGetPointInfo = function (bytes) {
        this.getModel().ownPoint = bytes.readInt();
        this.getModel().guildPoint = bytes.readInt();
        var addNum = bytes.readInt();
        if (addNum > 0) {
            UserTips.ins().showTips("\u83B7\u5F97 " + addNum + " \u79EF\u5206");
        }
        this.postPointUpdate();
    };
    GuildWar.prototype.postPointUpdate = function () {
    };
    GuildWar.prototype.doGetGongXunChange = function (bytes) {
        this.getModel().gongXun = bytes.readInt();
        this.postPointUpdate();
    };
    GuildWar.prototype.doGuildRankinfo = function (bytes) {
        this.getModel().decodeGuildRankInfo(bytes);
    };
    GuildWar.prototype.doGuildWarKillInfo = function (bytes) {
        var time = bytes.readInt();
        this.getModel().killName = bytes.readString();
        this.getModel().killGuild = bytes.readString();
        ViewManager.ins().open(GuileWarReliveWin, 2, time);
    };
    GuildWar.prototype.doGuildWarCityOwn = function (bytes) {
        this.getModel().cityOwn = bytes.readString();
        this.postCityownChange();
    };
    GuildWar.prototype.postCityownChange = function () {
    };
    GuildWar.prototype.doMyActivityRankInfo = function (bytes) {
        this.getModel().decodeMyGuildRankInfo(bytes);
    };
    GuildWar.prototype.postDayRewardInfo = function (bytes) {
        this.getModel().canGetDay = bytes.readBoolean();
        this.getModel().getDayReward = bytes.readBoolean();
        this.getModel().rewardDay = bytes.readInt();
    };
    GuildWar.prototype.postFlagInfoChange = function (bytes) {
        this.getModel().flagAcId = 0;
        this.getModel().flagStatu = bytes.readShort();
        if (this.getModel().flagStatu == 0) {
            this.getModel().endTime = bytes.readInt();
        }
        else if (this.getModel().flagStatu == 2) {
            this.getModel().flagName = bytes.readString();
            this.getModel().flagAcId = bytes.readInt();
            this.getModel().endTime = bytes.readInt();
            this.getModel().flagGuild = bytes.readString();
            if (this.getModel().flagAcId == Actor.actorID) {
                UserTips.ins().showTips("开始采集");
            }
        }
    };
    GuildWar.prototype.doGuildWarResult = function (bytes) {
        this.getModel().decodeGulidWarResult(bytes);
    };
    GuildWar.prototype.doHuDunInfoChange = function (bytes) {
        this.postHudunInfo(bytes.readInt(), bytes.readInt());
    };
    GuildWar.prototype.postHudunInfo = function (num1, num2) {
        return [num1, num2];
    };
    GuildWar.prototype.postAssignsReward = function (bytes) {
        this.getModel().guildWarRank = bytes.readInt();
        this.getModel().canSendReward = bytes.readBoolean();
        this.getModel().rewardFlag = bytes.readByte();
    };
    GuildWar.prototype.sendFenReward = function (num, list) {
        var numList = this.getModel().sendNumList;
        var bytes = this.getBytes(20);
        bytes.writeInt(num);
        for (var i = 1; i <= num; i++) {
            bytes.writeInt(i);
            var index = i - 1;
            var len = list[index].length;
            bytes.writeInt(len);
            for (var k = 0; k < len; k++) {
                var data = list[index][k];
                bytes.writeInt(data.roleID);
                bytes.writeInt(numList[index][k]);
            }
        }
        this.sendToServer(bytes);
    };
    GuildWar.prototype.postSendRewardSuccess = function (bytes) {
        if (bytes.readBoolean()) {
            ViewManager.ins().close(SelectMemberRewardWin);
            this.getModel().canSendReward = false;
            UserTips.ins().showTips("奖励已分配完");
        }
    };
    GuildWar.prototype.postWinGuildInfo = function (bytes) {
        if (!this.getModel().winGuildInfo) {
            this.getModel().winGuildInfo = new WinGuildInfo();
        }
        this.getModel().winGuildInfo.parse(bytes);
    };
    GuildWar.prototype.postGuildWarStarInfo = function (bytes) {
        this.getModel().isWatStart = bytes.readBoolean();
        this.getModel().startTime = bytes.readInt();
        this.getModel().acEndTime = bytes.readInt();
    };
    GuildWar.prototype.doGuildWarDoorHuDun = function (bytes) {
        UserBoss.ins().curShield = bytes.readInt();
        UserBoss.ins().postShieldPer();
    };
    GuildWar.prototype.doLotteryInfo = function (bytes) {
        UserBoss.ins().worldPrize = bytes.readInt();
        ViewManager.ins().open(WorldBossJiangLiWin, 1);
    };
    GuildWar.prototype.sendPlayLotteryInfo = function () {
        var bytes = this.getBytes(25);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.doRankInfoChange = function (bytes) {
        this.getModel().rankListChange(bytes);
    };
    GuildWar.prototype.doChangeAttrHandle = function (bytes) {
        if (GameMap.fbType != 14) {
            return;
        }
        var handle = bytes.readDouble();
        if (!(this.getModel().attHandle == handle)) {
            this.getModel().attHandle = handle;
            EntityShowMgr.ins().showHideSomeOne(handle);
            debug.log("add-----------:" + handle);
        }
        this.postWeixieChange(1);
    };
    GuildWar.prototype.postWeixieChange = function (b) {
        return b;
    };
    GuildWar.prototype.postGuildRedPointChange = function (b) {
        return b;
    };
    GuildWar.prototype.doChangeShowList = function (bytes) {
        if (GameMap.fbType != 14) {
            return;
        }
        var handle = bytes.readDouble();
        this.getModel().changeWeiXieList(handle, false);
        this.getModel().changecanPlayList(handle, false);
        this.getModel().setMyGuildNum(handle, false);
        if (this.getModel().attHandle && this.getModel().attHandle == handle) {
            this.getModel().attHandle = 0;
            debug.log("cancel------------:" + handle);
        }
    };
    GuildWar.prototype.doPointRewardInfo = function (bytes) {
        this.getModel().decodePointRewardInfo(bytes);
    };
    GuildWar.prototype.sendPointReward = function () {
        var bytes = this.getBytes(30);
        this.sendToServer(bytes);
    };
    GuildWar.prototype.doDoorEndtime = function (bytes) {
        this.getModel().doEndDoorTime(bytes.readByte());
    };
    GuildWar.prototype.doGetMyPoint = function (bytes) {
        var ran = bytes.readShort();
        UserBoss.ins().postLotteryRan(ran);
    };
    GuildWar.prototype.postLotteryPoint = function (n) {
        return n;
    };
    GuildWar.prototype.doTalkMaxPoint = function (bytes) {
        var point = bytes.readInt();
        var name = bytes.readString();
        UserBoss.ins().postLotteryResult(name, point);
    };
    GuildWar.prototype.postKillHuman = function (bytes) {
        var kill = bytes.readInt();
        return kill;
    };
    GuildWar.prototype.postHeFuBelong = function (bytes) {
        var len = bytes.readShort();
        this.GuildNameBelongs = [];
        for (var i = 0; i < len; i++) {
            var belong = bytes.readString();
            this.GuildNameBelongs.push(belong);
        }
    };
    GuildWar.prototype.sendHeFuBelong = function () {
        this.sendBaseProto(34);
    };
    GuildWar.prototype.postLotteryMaxPost = function (str, n) {
        return [str, n];
    };
    GuildWar.prototype.postMyRankChange = function () {
    };
    GuildWar.prototype.postPointRewardChange = function () {
    };
    GuildWar.prototype.postCanplayChange = function () {
    };
    GuildWar.prototype.postRankListChange = function () {
    };
    GuildWar.prototype.postGuildNumChange = function () {
    };
    GuildWar.prototype.postSendListChange = function () {
    };
    GuildWar.prototype.postRankInfo = function () {
    };
    return GuildWar;
}(BaseSystem));
__reflect(GuildWar.prototype, "GuildWar");
var GameSystem;
(function (GameSystem) {
    GameSystem.guildwar = GuildWar.ins.bind(GuildWar);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GuildWar.js.map