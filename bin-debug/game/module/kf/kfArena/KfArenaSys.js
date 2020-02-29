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
var KfArenaSys = (function (_super) {
    __extends(KfArenaSys, _super);
    function KfArenaSys() {
        var _this = _super.call(this) || this;
        _this.isKFArena = false;
        _this.times = 0;
        _this.duanLevel = 0;
        _this.score = 0;
        _this.leaderID = 0;
        _this.inviteDataList = [];
        _this.worldTimeCd = 0;
        _this.flagHandle = 10011010110;
        _this.flagCD = 0;
        _this.duanName = ["青铜", '白银', '黄金', '白金', '钻石', '王者'];
        _this.dflCount = 0;
        _this._openLeftTime = 0;
        _this._openTimer = 0;
        _this.isStartIng = 0;
        _this.sysId = PackageID.KfArena;
        _this.regNetMsg(1, _this.postPlayerInfo);
        _this.regNetMsg(2, _this.postTeamInfo);
        _this.regNetMsg(5, _this.postReceiveInvitation);
        _this.regNetMsg(7, _this.postBack);
        _this.regNetMsg(9, _this.postRefFlag);
        _this.regNetMsg(10, _this.doCollectFlag);
        _this.regNetMsg(11, _this.postRelive);
        _this.regNetMsg(13, _this.postFbInfo);
        _this.regNetMsg(14, _this.doResult);
        _this.regNetMsg(16, _this.postMacthState);
        _this.regNetMsg(17, _this.postChangeScore);
        _this.regNetMsg(19, _this.postDataInfo);
        _this.regNetMsg(20, _this.postKfArenaGuilds);
        _this.regNetMsg(21, _this.postNotice);
        _this.regNetMsg(23, _this.postJoinRewards);
        _this.regNetMsg(26, _this.postOpenKfArena);
        _this.regNetMsg(25, _this.postRank);
        _this.observe(GameLogic.ins().postEnterMap, _this.changeScene);
        return _this;
    }
    KfArenaSys.prototype.sendCreateTeam = function () {
        this.sendBaseProto(1);
    };
    KfArenaSys.prototype.postPlayerInfo = function (bytes) {
        this.times = bytes.readInt();
        this.duanLevel = bytes.readInt();
        this.score = bytes.readInt();
        if (!this.curMouth)
            this.curMouth = new kfArenaMark();
        this.curMouth.parse(bytes);
        if (!this.history)
            this.history = new kfArenaMark();
        this.history.parse(bytes);
    };
    KfArenaSys.prototype.sendPersonalMatch = function () {
        this.sendBaseProto(2);
    };
    KfArenaSys.prototype.postTeamInfo = function (bytes) {
        this.leaderID = bytes.readInt();
        this.macthState = bytes.readInt();
        var len = bytes.readInt();
        this.tfMembers = [];
        for (var i = 0; i < len; i++) {
            var vo = new KfArenaRoleVo();
            this.tfMembers[i] = vo;
            vo.parse(bytes);
        }
        this.isTFCaptain = Actor.actorID == this.leaderID;
    };
    KfArenaSys.prototype.sendLeaveTeam = function () {
        this.sendBaseProto(3);
    };
    KfArenaSys.prototype.sendStartMacth = function () {
        this.sendBaseProto(4);
    };
    KfArenaSys.prototype.sendCancelMacth = function () {
        this.sendBaseProto(16);
    };
    KfArenaSys.prototype.sendGuilds = function (type) {
        var bytes = this.getBytes(20);
        bytes.writeInt(type);
        this.sendToServer(bytes);
    };
    KfArenaSys.prototype.sendInvite = function (id) {
        var bytes = this.getBytes(5);
        bytes.writeInt(id);
        this.sendToServer(bytes);
        this.postKfArenaDelID(id);
    };
    KfArenaSys.prototype.postKfArenaDelID = function (id) {
        return id;
    };
    KfArenaSys.prototype.postReceiveInvitation = function (bytes) {
        var data = new KFInviteData();
        data.parse(bytes);
        if (!this.checkInviteByID(data.roleId))
            this.inviteDataList.push(data);
        if (this.inviteDataList.length > 0)
            ViewManager.ins().open(kfReceiveInviteWin, 0);
    };
    KfArenaSys.prototype.checkInviteByID = function (id) {
        for (var i = 0; i < this.inviteDataList.length; i++) {
            if (this.inviteDataList[i].roleId == id)
                return true;
        }
        return false;
    };
    KfArenaSys.prototype.sendWorldInvite = function () {
        this.sendBaseProto(6);
    };
    KfArenaSys.prototype.sendRespondInvite = function (leaderId, state) {
        var bytes = this.getBytes(7);
        bytes.writeInt(leaderId);
        bytes.writeInt(state);
        this.sendToServer(bytes);
    };
    KfArenaSys.prototype.postBack = function (bytes) {
        var type = bytes.readInt();
        switch (type) {
            case 1:
                ViewManager.ins().open(KfArenaWin, 1);
                break;
        }
    };
    KfArenaSys.prototype.postMacthState = function (bytes) {
        this.macthState = bytes.readInt();
    };
    KfArenaSys.prototype.postKfArenaGuilds = function (bytes) {
        var type = bytes.readInt();
        var len = bytes.readInt();
        if (type == KFInviteType.Guild) {
            this.guildDataList = [];
            for (var i = 0; i < len; i++) {
                var info = new GuildMemberInfo();
                info.parse(bytes);
                this.guildDataList.push(info);
            }
        }
        else if (type == KFInviteType.Friend) {
            this.friendsDataList = [];
            for (var i = 0; i < len; i++) {
                var info = new GuildMemberInfo();
                info.parse(bytes);
                this.friendsDataList.push(info);
            }
        }
        return type;
    };
    KfArenaSys.prototype.getDataList = function (type) {
        var list = [];
        var temList;
        if (type == KFInviteType.Friend)
            temList = this.friendsDataList;
        else
            temList = this.guildDataList;
        if (!temList)
            return list;
        for (var i = 0; i < temList.length; i++) {
            if (temList[i].roleID == Actor.actorID)
                continue;
            var info = new GuildMemberInfo();
            info.copyData(temList[i]);
            list.push(info);
        }
        return list;
    };
    KfArenaSys.prototype.sendJoinTeam = function (id) {
        var bytes = this.getBytes(18);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    KfArenaSys.prototype.sendOutTeam = function (id) {
        var bytes = this.getBytes(8);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    KfArenaSys.prototype.postRefFlag = function (bytes) {
        var handle = bytes.readDouble();
        this.flagCD = bytes.readInt() * 1000 + egret.getTimer();
        this.flagHandle = 10011010110;
    };
    KfArenaSys.prototype.doCollectFlag = function (bytes) {
        var handle = bytes.readDouble();
        var lefttimer = bytes.readInt();
        if (handle && handle == Actor.handle && lefttimer) {
            ViewManager.ins().open(CollectWin, handle, lefttimer);
            GameLogic.ins().currAttackHandle = 0;
        }
        else
            ViewManager.ins().close(CollectWin);
    };
    KfArenaSys.prototype.sendCollectFlag = function () {
        this.sendBaseProto(10);
    };
    KfArenaSys.prototype.postRelive = function (bytes) {
        var cd = bytes.readInt();
        var handle = bytes.readDouble();
        ViewManager.ins().open(KfArenaReliveWin, cd, handle);
    };
    KfArenaSys.prototype.postFbInfo = function (bytes) {
        var time = bytes.readInt();
        this.myCampId = bytes.readByte();
        this.scoreA = bytes.readInt();
        this.scoreB = bytes.readInt();
        ViewManager.ins().open(KfArenaFightWin, (DateUtils.formatMiniDateTime(time) - GameServer.serverTime) / DateUtils.MS_PER_SECOND >> 0);
    };
    KfArenaSys.prototype.doResult = function (bytes) {
        var scoreA = bytes.readInt();
        var scoreB = bytes.readInt();
        var len = bytes.readShort();
        var dtLit = [];
        for (var i = 0; i < len; i++) {
            var data = new KfArenaData(bytes);
            data.rank = i + 1;
            dtLit.push(data);
        }
        var extAwards = [];
        len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var award = new RewardData();
            award.type = bytes.readInt();
            award.id = bytes.readInt();
            award.count = bytes.readInt();
            extAwards.push(award);
        }
        ViewManager.ins().open(KfArenaResultWin, scoreA, scoreB, dtLit, extAwards);
    };
    KfArenaSys.prototype.enterBattle = function () {
        this.sendBaseProto(15);
    };
    KfArenaSys.prototype.postChangeScore = function (bytes) {
        this.scoreA = bytes.readInt();
        this.scoreB = bytes.readInt();
    };
    KfArenaSys.prototype.postDataInfo = function (bytes) {
        var len = bytes.readShort();
        var rankDatas = [];
        for (var i = 0; i < len; i++) {
            var data = new KfArenaData();
            data.readRankData(bytes);
            rankDatas.push(data);
        }
        if (!ViewManager.ins().isShow(KfArenaInfoWin)) {
            ViewManager.ins().open(KfArenaInfoWin, rankDatas);
        }
        return rankDatas;
    };
    KfArenaSys.prototype.sendDataInfo = function () {
        this.sendBaseProto(19);
    };
    KfArenaSys.prototype.postNotice = function (bytes) {
        return new KfArenaNoticeData(bytes);
    };
    KfArenaSys.prototype.postRank = function (bytes) {
        this.rankDataList = [];
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            this.rankDataList.push(new KfArenaRankData(bytes));
        }
        this.ownRank = bytes.readInt();
    };
    KfArenaSys.prototype.sendRank = function () {
        this.sendBaseProto(25);
    };
    KfArenaSys.prototype.getIsJoinTeam = function () {
        return this.leaderID != 0;
    };
    KfArenaSys.prototype.changeScene = function () {
        if (GameMap.fbType == UserFb.FB_TYPE_KF_ARENA) {
            this.isKFArena = true;
        }
        else if (GameMap.lastFbTyp == UserFb.FB_TYPE_KF_ARENA) {
            this.isKFArena = false;
            this.flagHandle = 0;
        }
    };
    KfArenaSys.prototype.getDuanAwards = function () {
        var data = GlobalConfig.CrossArenaBase.everyDayAward;
        for (var i in data) {
            if (data[i].metal == this.duanLevel) {
                return data[i].award;
            }
        }
        return null;
    };
    KfArenaSys.prototype.getDuanName = function () {
        return this.duanName[this.duanLevel - 1];
    };
    KfArenaSys.prototype.isOpen = function () {
        var open = GlobalConfig.CrossArenaBase.openDay <= GameServer.serverOpenDay + 1 && UserZs.ins().lv >= GlobalConfig.CrossArenaBase.zhuanshengLevel;
        if (open) {
            if (this.isStartIng == 1 || this.isStartIng == 0 && this._openLeftTime > 0)
                return true;
        }
        return false;
    };
    KfArenaSys.prototype.sendDailyRewards = function () {
        this.sendBaseProto(23);
    };
    KfArenaSys.prototype.sendJoinRewards = function (index) {
        var bytes = this.getBytes(24);
        bytes.writeInt(index);
        this.sendToServer(bytes);
    };
    KfArenaSys.prototype.postJoinRewards = function (bytes) {
        this.yesterdayDuan = bytes.readInt();
        this.dailyState = bytes.readInt();
        this.dflCount = bytes.readInt();
        this.dflState = bytes.readInt();
    };
    KfArenaSys.prototype.postOpenKfArena = function (bytes) {
        this.isStartIng = bytes.readInt();
        this._openLeftTime = bytes.readInt();
        this._openTimer = egret.getTimer();
    };
    KfArenaSys.prototype.getOpenLeftTime = function () {
        return this._openLeftTime - (egret.getTimer() - this._openTimer) / 1000;
    };
    KfArenaSys.prototype.getDuanRedPoint = function () {
        return this.dailyState == 0 ? 1 : 0;
    };
    KfArenaSys.prototype.getJoinRedPoint = function () {
        var peakAwards = GlobalConfig.CrossArenaBase.peakAwards;
        var index = 1;
        var num = 0;
        for (var i in peakAwards) {
            if (((this.dflState >> index) & 1) != 1) {
                if (KfArenaSys.ins().dflCount >= peakAwards[i].count) {
                    num++;
                }
            }
            index++;
        }
        return num;
    };
    return KfArenaSys;
}(BaseSystem));
__reflect(KfArenaSys.prototype, "KfArenaSys");
var GameSystem;
(function (GameSystem) {
    GameSystem.kfArenaSys = KfArenaSys.ins.bind(KfArenaSys);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=KfArenaSys.js.map