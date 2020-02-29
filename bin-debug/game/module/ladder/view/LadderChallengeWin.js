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
var LadderChallengeWin = (function (_super) {
    __extends(LadderChallengeWin, _super);
    function LadderChallengeWin() {
        var _this = _super.call(this) || this;
        _this.roleInfoList = [
            [[2, 1], [1, 0]],
            [[1, 0], [3, 1]],
            [[3, 1], [2, 0]],
            [[2, 0], [3, 1]]
        ];
        _this.sendCount = 0;
        _this.skinName = "ChallengeSkin";
        return _this;
    }
    LadderChallengeWin.prototype.initUI = function () {
        this.tweenObj = { index: 0 };
        this.otherHead.scrollRect = new egret.Rectangle(-1, -1, 84, 84);
        this.scrollHead.scrollRect = new egret.Rectangle(-1, -56, 84, 84);
        this.otherMask = this.otherHead.scrollRect;
        this.scrollMask = this.scrollHead.scrollRect;
        this.posY = this.otherMask.y;
        this.posYImg = this.scrollHead.y;
        this.posYScroll = this.scrollMask.y;
    };
    LadderChallengeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Rank.ins().postRankingData, this.updataHeadInfo);
        Ladder.ins().sendGetSomeOne();
        this.setMyHead();
        this.startScrollHead();
        this.ingImg.visible = true;
        this.enterTime.visible = false;
        PlayFun.ins().closeAuto();
    };
    LadderChallengeWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.stopScrollHead();
        this.removeObserve();
        this.ingImg.visible = true;
        this.enterTime.visible = false;
    };
    LadderChallengeWin.prototype.setMyHead = function () {
        var model = SubRoles.ins().getSubRoleByIndex(0);
        this.myhead.source = "head_" + model.job + model.sex;
        var config = Ladder.ins().getLevelConfig();
        this.myname.text = Actor.myName;
        this.mylv.text = "" + config.showLevel + (config.showDan || "") + "\u6BB5";
    };
    LadderChallengeWin.prototype.startScrollHead = function () {
        this.rollTime = 0;
        this.otherMask.y = this.posY;
        this.scrollMask.y = this.posYScroll;
        this.scrollHead.y = this.posYImg;
        this.refushROllInfo(0);
        egret.Tween.get(this.tweenObj, { loop: true }).to({ index: this.rollTime + 1 }, 20).call(this.startScroll, this);
    };
    LadderChallengeWin.prototype.stopScrollHead = function () {
        egret.Tween.removeTweens(this.tweenObj);
    };
    LadderChallengeWin.prototype.startScroll = function () {
        this.otherMask.y += 2;
        this.scrollMask.y += 2;
        this.scrollHead.y -= 1;
        this.otherHead.scrollRect = this.otherMask;
        this.scrollHead.scrollRect = this.scrollMask;
        this.rollTime++;
        if (this.rollTime % 27 == 0) {
            this.otherMask.y = this.posY;
            this.scrollMask.y = this.posYScroll;
            this.scrollHead.y = this.posYImg;
            this.refushROllInfo(this.rollTime / 27);
            if (this.rollTime / 27 == 4) {
                this.scrollHead.source = "";
                this.rollOver();
            }
        }
    };
    LadderChallengeWin.prototype.updataHeadInfo = function (rankModel) {
        if (rankModel.type != RankDataType.TYPE_POWER ||
            rankModel.type != RankDataType.TYPE_BAOSHI ||
            rankModel.type != RankDataType.TYPE_LONGHUN ||
            rankModel.type != RankDataType.TYPE_WING ||
            rankModel.type != RankDataType.TYPE_BOOK ||
            rankModel.type != RankDataType.TYPE_ZS ||
            rankModel.type != RankDataType.TYPE_SCORE)
            return;
        if (rankModel.type == RankDataType.TYPE_POWER)
            this.refushROllInfo(0);
    };
    LadderChallengeWin.prototype.rollOver = function () {
        this.stopScrollHead();
        this.ingImg.visible = false;
        this.enterTime.visible = true;
        this.rollTime = 3;
        this.enterTime.text = "\u8FDB\u5165\u5012\u8BA1\u65F6" + this.rollTime + "\u79D2";
        if (Ladder.ins().getActorInfo(1) == 0 && Ladder.ins().getActorInfo(0) == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:\u672A\u5339\u914D\u5230\u5BF9\u624B|");
            ViewManager.ins().close(this);
        }
        else {
            TimerManager.ins().doTimer(1000, 0, this.refushLabel, this);
        }
    };
    LadderChallengeWin.prototype.refushLabel = function () {
        this.rollTime--;
        this.enterTime.text = "\u8FDB\u5165\u5012\u8BA1\u65F6" + this.rollTime + "\u79D2";
        if (this.rollTime < 1) {
            this.sendStarPlay();
            TimerManager.ins().remove(this.refushLabel, this);
        }
    };
    LadderChallengeWin.prototype.refushROllInfo = function (num) {
        if (num > 3) {
            this.showPointPlayerInfo();
            return;
        }
        var mathLevel = Ladder.ins().level;
        var mathId = Math.floor(Math.random() * Ladder.ins().getLevelDuanWeiLength(mathLevel));
        var config = Ladder.ins().getLevelConfig(mathLevel, mathId);
        this.otherlv.text = "" + config.showLevel + (config.showDan || "") + "\u6BB5";
        var list = this.roleInfoList[num];
        this.otherHead.source = "head_" + list[0][0] + list[0][1];
        this.scrollHead.source = "head_" + list[1][0] + list[1][1];
        var data = this.getRankListOne();
        if (data == null) {
            return;
        }
    };
    LadderChallengeWin.prototype.showPointPlayerInfo = function () {
        var info = Ladder.ins().getActorInfo();
        if (info.length == 0 || info[1] == 0 && info[0] == 0) {
            return;
        }
        this.otherHead.source = "head_" + info[3] + info[4];
        this.scrollHead.source = "";
        var config = Ladder.ins().getLevelConfig(info[5], info[6]);
        this.otherlv.text = "" + config.showLevel + (config.showDan || "") + "\u6BB5";
        this.othername.textFlow = TextFlowMaker.generateTextFlow1(info[2]);
    };
    LadderChallengeWin.prototype.sendStarPlay = function () {
        Ladder.ins().sendStarPlay(Ladder.ins().getActorInfo(1), Ladder.ins().getActorInfo(0));
        ViewManager.ins().close(LadderWin);
        ViewManager.ins().close(this);
    };
    LadderChallengeWin.prototype.getRankListOne = function () {
        var rankModel = Rank.ins().getRankModel(RankDataType.TYPE_POWER);
        if (rankModel && rankModel.getDataList().length <= 0) {
            if (this.sendCount < 2) {
                Rank.ins().sendGetRankingData(RankDataType.TYPE_POWER);
                this.sendCount++;
                return null;
            }
            return null;
        }
        this.sendCount = 0;
        var arr = rankModel.getDataList();
        var randData = arr[Math.floor(Math.random() * arr.length)];
        if (randData && randData.id == Actor.actorID) {
            if (arr.length == 1) {
                return randData;
            }
            return this.getRankListOne();
        }
        return randData;
    };
    return LadderChallengeWin;
}(BaseEuiView));
__reflect(LadderChallengeWin.prototype, "LadderChallengeWin");
ViewManager.ins().reg(LadderChallengeWin, LayerManager.UI_Popup);
//# sourceMappingURL=LadderChallengeWin.js.map