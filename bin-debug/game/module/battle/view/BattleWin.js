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
var BattleWin = (function (_super) {
    __extends(BattleWin, _super);
    function BattleWin() {
        var _this = _super.call(this) || this;
        _this._leftTime = 0;
        _this._changeTime = -1;
        _this._littleChangeTime = -1;
        _this.skinName = "BattleLittleRankSkin";
        return _this;
    }
    BattleWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.jump.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:\u67E5\u770B\u6392\u884C");
        this.bigTimeGroup.visible = false;
        this.assignPer.visible = false;
    };
    BattleWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.observe(BattleCC.ins().postRankInfo, this.updateRank);
        this.observe(BattleCC.ins().postScoreChange, this.updateMyScore);
        this.observe(BattleCC.ins().postGiftInfo, this.updateGift);
        this.observe(BattleCC.ins().postEnterSuccess, this.update);
        this.observe(BattleCC.ins().postChangeTime, this.update);
        this.observe(BattleCC.ins().postLittleChange, this.update);
        this.observe(BattleCC.ins().postKilled, this.onKill);
        this.updateRank();
        this.updateGift();
        this.updateMyScore();
        this.update();
    };
    BattleWin.prototype.update = function () {
        TimerManager.ins().remove(this.repeat, this);
        this._leftTime = BattleCC.ins().getLeftTime();
        var startTimer;
        if (this._leftTime > 0)
            startTimer = true;
        else
            this.wholeLeftTime.text = "";
        this._changeTime = BattleCC.ins().getChangeTime();
        if (this._changeTime > 0)
            startTimer = true;
        else
            this.assignPer.visible = false;
        this._littleChangeTime = BattleCC.ins().getChangeLittleTime();
        if (this._littleChangeTime > 0)
            startTimer = true;
        else
            this.bigTimeGroup.visible = false;
        if (startTimer) {
            TimerManager.ins().doTimer(1000, 0, this.repeat, this);
            this.repeat();
        }
        this.skillGroup0.visible = false;
    };
    BattleWin.prototype.onKill = function (value) {
        egret.Tween.removeTweens(this.lzlabel0);
        egret.Tween.removeTweens(this.skillGroup0);
        if (!value) {
            this.skillGroup0.visible = false;
            return;
        }
        this.skillGroup0.visible = true;
        this.skillGroup0.alpha = 1;
        this.lzlabel0.scaleX = this.lzlabel0.scaleY = 1;
        this.lzlabel0.text = value + "";
        var self = this;
        egret.Tween.get(this.lzlabel0).to({ scaleX: 2, scaleY: 2 }, 200).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            egret.Tween.get(self.skillGroup0).wait(1000).to({ alpha: 0 }, 1000).call(function () {
                egret.Tween.removeTweens(self.lzlabel0);
                egret.Tween.removeTweens(self.skillGroup0);
                self.skillGroup0.visible = false;
            });
        });
    };
    BattleWin.prototype.repeat = function () {
        if (this._leftTime <= 0) {
            if (this.wholeLeftTime.text != "")
                this.wholeLeftTime.text = "";
        }
        else
            this.wholeLeftTime.text = DateUtils.getFormatBySecond(this._leftTime, DateUtils.TIME_FORMAT_5, 4);
        this._leftTime--;
        if (this._changeTime <= 0) {
            if (this.assignPer.visible)
                this.assignPer.visible = false;
        }
        else {
            if (!this.assignPer.visible)
                this.assignPer.visible = true;
            this.campLeftTime0.text = DateUtils.getFormatBySecond(this._changeTime, DateUtils.TIME_FORMAT_5, 4);
        }
        this._changeTime--;
        if (this._littleChangeTime <= 0) {
            if (this.bigTimeGroup.visible)
                this.bigTimeGroup.visible = false;
        }
        else {
            this.countDown.text = Math.floor(this._littleChangeTime) + "";
            if (!this.bigTimeGroup.visible)
                this.bigTimeGroup.visible = true;
        }
        this._littleChangeTime--;
    };
    BattleWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTap);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        this._giftMax = false;
        this._canGetGift = false;
        egret.Tween.removeTweens(this.lzlabel0);
        egret.Tween.removeTweens(this.skillGroup0);
    };
    BattleWin.prototype.updateRank = function () {
        var ranks = BattleCC.ins().getRankTop();
        var len = ranks ? ranks.length : 0;
        var vo;
        for (var i = 0; i < 3; i++) {
            if (i < len)
                vo = ranks[i];
            else
                vo = null;
            this["name" + i].text = vo ? vo.roleName : "";
            this["num" + i].text = vo ? vo.score + "" : "";
        }
    };
    BattleWin.prototype.updateMyScore = function () {
        this.num3.text = BattleCC.ins().myScore + "";
        this.rank3.text = BattleCC.ins().myRank + "";
        this.updateGift();
    };
    BattleWin.prototype.updateGift = function () {
        if (this._giftMax)
            return;
        var awardId = BattleCC.ins().awardID;
        var len = Object.keys(GlobalConfig.CampBattlePersonalAwardConfig).length;
        this._canGetGift = false;
        if (awardId >= len) {
            this._giftMax = true;
            this.giftGroup.visible = false;
        }
        else {
            this.giftGroup.visible = true;
            var cfg = void 0;
            cfg = GlobalConfig.CampBattlePersonalAwardConfig[awardId + 1];
            this._canGetGift = BattleCC.ins().myScore >= cfg.integral;
            this.redPoint.visible = this._canGetGift;
            this.scoreTxt.text = "战绩：" + BattleCC.ins().myScore;
            var colorStr = this._canGetGift ? 0x00ff00 : 0xff0000;
            this.scoreTxt2.textFlow = TextFlowMaker.generateTextFlow1("|C:" + colorStr + "&T:" + BattleCC.ins().myScore + "|/" + cfg.integral);
        }
    };
    BattleWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.jump:
                ViewManager.ins().open(BattleRankWin);
                break;
            case this.giftBtn:
                if (this._canGetGift)
                    BattleCC.ins().getMyAward();
                break;
        }
    };
    return BattleWin;
}(BaseEuiView));
__reflect(BattleWin.prototype, "BattleWin");
ViewManager.ins().reg(BattleWin, LayerManager.Main_View);
//# sourceMappingURL=BattleWin.js.map