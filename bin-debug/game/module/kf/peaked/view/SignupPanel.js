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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SignupPanel = (function (_super) {
    __extends(SignupPanel, _super);
    function SignupPanel() {
        var _this = _super.call(this) || this;
        _this.curKonckRound = 0;
        _this.skinName = "SignupSkin";
        _this.left = 0;
        _this.right = 0;
        _this.top = 0;
        _this.bottom = 0;
        return _this;
    }
    SignupPanel.prototype.childrenCreated = function () {
        this.eliminateInfoList.itemRenderer = PeakKnockoutItemItemRender;
        this._eliminateInfoDt = new eui.ArrayCollection();
        this.eliminateInfoList.dataProvider = this._eliminateInfoDt;
        this.rewardList.itemRenderer = ItemBase;
        var knockOutTime = DateUtils.getFormatBySecond(GlobalConfig.PeakRaceBase.KnockOutTime, DateUtils.TIME_FORMAT_10);
        this.info.text = "\u6DD8\u6C70\u8D5B\u8D1F" + GlobalConfig.PeakRaceBase.signUpLose + "\u573A\u51FA\u5C40,\u6BCF\u573A\u95F4\u9694" + knockOutTime;
    };
    SignupPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(PeakedSys.ins().postState, this.upCurState);
        this.observe(PeakedSys.ins().postSignUp, this.upSignUpState);
        this.observe(PeakedRedpoint.ins().postRedPoint, this.refRedPoint);
        this.observe(PeakedSys.ins().postEliminateReportData, this.upEliminateReport);
        this.observe(PeakedSys.ins().postKFEliminateReportData, this.upEliminateReport);
        this.addTouchEvent(this.signUpBtn, this.onTouch);
        this.addTouchEvent(this.eliminateInfoList, this.onTouch);
        PeakedRedpoint.ins().postRedPoint();
        if (PeakedSys.ins().isKf()) {
            var state = PeakedSys.ins().kfStatus;
            if (state == KF_PeakStatus.Knockout && PeakedSys.ins().kfStatusIsEnd == 0) {
                this.observe(PeakedSys.ins().postBFInfoList, this.upCurState);
                PeakedSys.ins().sendBFInfoList();
            }
            else
                this.upCurState();
        }
        else
            this.upCurState();
    };
    SignupPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.$onClose();
        this.removeTouchEvent(this.signUpBtn, this.onTouch);
        this.removeTouchEvent(this.eliminateInfoList, this.onTouch);
        TimerManager.ins().remove(this.onTime, this);
    };
    SignupPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.signUpBtn:
                if (PeakedRedpoint.ins().redpoint1 > 0) {
                    PeakedSys.ins().sendSignUp();
                }
                else if (PeakedSys.ins().bfStatus == BF_PeakStatus.Knockout && !PeakedSys.ins().isSignUp) {
                    UserTips.ins().showTips("\u5F53\u524D\u7684\u62A5\u540D\u65F6\u95F4\u5DF2\u8FC7\uFF01");
                }
                else if (UserZs.ins().lv < GlobalConfig.PeakRaceBase.needZsLv) {
                    UserTips.ins().showTips("\u9700\u8981\u8F6C\u751F\u7B49\u7EA7\u5230\u8FBE" + GlobalConfig.PeakRaceBase.needZsLv);
                }
                else {
                    UserTips.ins().showTips("\u5F53\u524D\u4E0D\u5728\u62A5\u540D\u65F6\u95F4");
                }
                break;
            case this.eliminateInfoList:
                break;
            default:
                if (e.target instanceof eui.Label && e.target.parent instanceof PeakKnockoutItemItemRender && e.target.name) {
                    var info = e.target.parent.data;
                    if (info)
                        UserReadPlayer.ins().sendFindPlayer(e.target.name, info.servId);
                    else
                        UserReadPlayer.ins().sendFindPlayer(e.target.name);
                }
        }
    };
    SignupPanel.prototype.upCurState = function () {
        if (PeakedSys.ins().isKf()) {
            var state = PeakedSys.ins().kfStatus;
            if (state == KF_PeakStatus.Knockout && PeakedSys.ins().kfStatusIsEnd == 0) {
                if (!PeakedSys.ins().isSignUp) {
                    UserTips.ins().showTips("\u60A8\u672A\u62A5\u540D\uFF0C\u8BF7\u7B49\u51B3\u51FA64\u5F3A\u540E\u518D\u6765\u67E5\u770B");
                    state = KF_PeakStatus.None;
                }
                else if (!PeakedHelp.isSixteenById(Actor.actorID)) {
                    UserTips.ins().showTips("\u60A8\u672A\u8FDB\u5165\u5355\u670D16\u5F3A\uFF0C\u8BF7\u7B49\u51B3\u51FA64\u5F3A\u540E\u518D\u6765\u67E5\u770B");
                    state = KF_PeakStatus.None;
                }
            }
            switch (state) {
                case KF_PeakStatus.None:
                    this.signGroup.visible = true;
                    this.knockoutGroup.visible = false;
                    this.signUpBtn.visible = false;
                    this.signed.visible = false;
                    this.signUpRuleTxt.textFlow = TextFlowMaker.generateTextFlow(PeakedHelp.getKFTimerRuleStr());
                    this.rewardList.dataProvider = new eui.ArrayCollection(GlobalConfig.PeakRaceBase.croosRewards);
                    break;
                case KF_PeakStatus.Knockout:
                    this.signGroup.visible = false;
                    this.knockoutGroup.visible = true;
                    this.signUpBtn.visible = false;
                    this.signed.visible = false;
                    PeakedSys.ins().sendKFEliminateReport();
                    break;
                case KF_PeakStatus.Prom64:
                case KF_PeakStatus.Prom32:
                case KF_PeakStatus.Prom16:
                case KF_PeakStatus.Prom8:
                case KF_PeakStatus.Prom4:
                case KF_PeakStatus.Finals:
                    break;
            }
        }
        else {
            var state = PeakedSys.ins().bfStatus;
            if (state == BF_PeakStatus.Knockout && !PeakedSys.ins().isSignUp) {
                state = BF_PeakStatus.SignUp;
            }
            switch (state) {
                case BF_PeakStatus.None:
                case BF_PeakStatus.SignUp:
                    this.signGroup.visible = true;
                    this.knockoutGroup.visible = false;
                    if (PeakedSys.ins().isSignUp) {
                        this.signed.visible = true;
                        this.signUpBtn.visible = false;
                    }
                    else {
                        this.signUpBtn.label = "\u62A5\u540D";
                        this.signed.visible = false;
                    }
                    this.signUpRuleTxt.textFlow = TextFlowMaker.generateTextFlow(PeakedHelp.getTimerRuleStr());
                    this.rewardList.dataProvider = new eui.ArrayCollection(GlobalConfig.PeakRaceBase.singleRewards);
                    break;
                case BF_PeakStatus.Knockout:
                    this.signGroup.visible = false;
                    this.knockoutGroup.visible = true;
                    PeakedSys.ins().sendEliminateReport();
                    break;
                case BF_PeakStatus.Prom16:
                case BF_PeakStatus.Prom8:
                case BF_PeakStatus.Prom4:
                case BF_PeakStatus.Finals:
                    break;
            }
        }
    };
    SignupPanel.prototype.upSignUpState = function (state) {
        if (state === void 0) { state = -1; }
        if (PeakedSys.ins().isSignUp) {
            this.signed.visible = true;
            this.signUpBtn.visible = false;
            if (state != -1)
                UserTips.ins().showTips("\u6210\u529F\u62A5\u540D\u5DC5\u5CF0\u8D5B\u5B63");
        }
    };
    SignupPanel.prototype.upEliminateReport = function () {
        var sysDt = PeakedSys.ins();
        var reportList = sysDt.isKf() ? sysDt.kfKonckReportList : sysDt.bfKonckReportList;
        this.curKonckRound = sysDt.isKf() ? sysDt.kfKonckRound : sysDt.bfKonckRound;
        var surplusNum = sysDt.isKf() ? sysDt.kfKonckSurplusNum : sysDt.bfKonckSurplusNum;
        this._eliminateInfoDt.replaceAll(reportList);
        DisplayUtils.scrollerToBottom(this.eliminateListScroller);
        var record = "\uFF0C\u6211\u7684\u6218\u7EE9\uFF1A";
        var winNum = PeakedHelp.calcEliminateWinNum();
        if (reportList.length - winNum >= GlobalConfig.PeakRaceBase.signUpLose) {
            record = "|C:" + ColorUtil.RED + "&T:(\u60A8\u5DF2\u7ECF\u88AB\u6DD8\u6C70)|";
            this.nextStartCountdownLabel.visible = false;
            this.state2.visible = false;
        }
        else {
            var loseNum = this.curKonckRound - winNum < 0 ? 0 : this.curKonckRound - winNum;
            record += winNum + "\u80DC" + loseNum + "\u8D1F";
            TimerManager.ins().remove(this.onTime, this);
            TimerManager.ins().doTimer(1000, 0, this.onTime, this);
            this.onTime(true);
            this.state2.visible = true;
        }
        this.eliminateInfoLabel.textFlow = TextFlowMaker.generateTextFlow1("\u5F53\u524D\u6DD8\u6C70\u8D5B\u7B2C" + this.curKonckRound + "\u8F6E\uFF0C\u5269\u4F59" + surplusNum + "\u4EBA " + record);
    };
    SignupPanel.prototype.onTime = function (isInt) {
        if (isInt === void 0) { isInt = false; }
        var kNextTimer = PeakedSys.ins().isKf() ? PeakedSys.ins().kfKonckNextTimer : PeakedSys.ins().bfKonckNextTimer;
        var nexttimer = Math.floor((DateUtils.formatMiniDateTime(kNextTimer) - GameServer.serverTime) / 1000);
        if (nexttimer > 0) {
            this.nextStartCountdownLabel.text = DateUtils.getFormatBySecond(nexttimer);
        }
        else {
            TimerManager.ins().remove(this.onTime, this);
            this.nextStartCountdownLabel.text = "";
            if (!isInt) {
            }
        }
    };
    SignupPanel.prototype.refRedPoint = function () {
        this.redPoint.visible = PeakedRedpoint.ins().redpoint1 > 0;
    };
    __decorate([
        callLater
    ], SignupPanel.prototype, "upCurState", null);
    return SignupPanel;
}(BaseView));
__reflect(SignupPanel.prototype, "SignupPanel");
//# sourceMappingURL=SignupPanel.js.map