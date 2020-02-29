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
var DailyCheckInPanel = (function (_super) {
    __extends(DailyCheckInPanel, _super);
    function DailyCheckInPanel() {
        var _this = _super.call(this) || this;
        _this.isTweenItem = false;
        _this.currentyear = 0;
        _this.currentDay = 0;
        _this.panelwidth = 400;
        _this.xqArr = ["日", "一", "二", "三", "四", "五", "六"];
        _this.MonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        _this.skinName = "DailyCheckInPanelSkin";
        _this.cardList.itemRenderer = DailyCheckInCard;
        return _this;
    }
    DailyCheckInPanel.prototype.childrenCreated = function () {
        this.eff = new MovieClip;
        this.eff.x = 428;
        this.eff.y = 43;
        this.eff.scaleX = 0.85;
        this.eff.scaleY = 0.85;
        this.eff.touchEnabled = false;
        this.listData = new eui.ArrayCollection();
        this.cardList.dataProvider = this.listData;
    };
    DailyCheckInPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(DailyCheckIn.ins().postCheckInData, this.onCheckInData);
        this.observe(DailyCheckIn.ins().postCheckIn, this.onCheckIn);
        this.observe(UserVip.ins().postUpdateVipData, this.onCheckInData);
        this.cardScroller.addEventListener(egret.Event.ENTER_FRAME, this.updateListPos, this);
        this.addTouchEvent(this.cardList, this.onListTap);
        this.addTouchEvent(this.rewardBtn, this.ondayRewardListTap);
        this.isTweenItem = true;
        this.initPanel();
        this.updateCheckInTimes();
        this.updateList();
    };
    DailyCheckInPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.isTweenItem = false;
        this.cardScroller.removeEventListener(egret.Event.ENTER_FRAME, this.updateListPos, this);
        DisplayUtils.removeFromParent(this.eff);
        this.listData = null;
        this.removeObserve();
        this.cleanList();
    };
    DailyCheckInPanel.prototype.toCheckIn = function (index) {
        DailyCheckIn.ins().sendCheckIn(index);
    };
    DailyCheckInPanel.prototype.onCheckIn = function (param) {
        var success = param[0];
        var index = param[1];
        var str = success ? "签到成功" : "签到失败，请稍后再试";
        UserTips.ins().showTips(str);
        if (success && this.isTweenItem) {
            this.runTweenItem(this, index);
        }
    };
    DailyCheckInPanel.prototype.runTweenItem = function (self, index) {
        if (!self)
            return;
        var cardList = self.cardList;
        if (!cardList)
            return;
        var card = cardList.getElementAt(index - 1);
        if (!card)
            return;
        var rewardCfg = card.data;
        if (!rewardCfg)
            return;
        var itemCfg = GlobalConfig.ItemConfig[rewardCfg.rewards[0].id];
        if (!itemCfg)
            return;
        var cardGlobalPos = cardList.localToGlobal(card.x + (card.width >> 1), card.y + (card.height >> 1));
        var posX = cardGlobalPos.x;
        var posY = cardGlobalPos.y;
        return [itemCfg.icon.toString(), posX, posY];
    };
    DailyCheckInPanel.prototype.onCheckInData = function (param) {
        this.updateCheckInTimes();
        this.updateList();
    };
    DailyCheckInPanel.prototype.onListTap = function (e) {
        var _this = this;
        if (e && e.currentTarget) {
            if (this.cardList.selectedItem) {
                var state = DailyCheckIn.ins().getCheckInState(this.cardList.selectedItem.day);
                if (state) {
                    if (state == 1) {
                        if (UserVip.ins().lv > 0) {
                            this.toCheckIn(this.cardList.selectedItem.day);
                        }
                        else if (this.cardList.selectedItem.vipLabel && UserVip.ins().lv < this.cardList.selectedItem.vipLabel) {
                            var str = "\u5EFA\u8BAE\u53CC\u500D\u9886\u53D6\uFF0C\u957F\u671F\u53EF\u83B7\u5F97\u9AD8\u8FBE\u767E\u500D\u6536\u76CA";
                            var win = WarnWin.show(str, function () {
                                _this.toCheckIn(_this.cardList.selectedItem.day);
                            }, this, function () {
                                ViewManager.ins().open(Recharge1Win);
                            }, this);
                            win.showUI("", "", "", "VIP1");
                            win.setBtnLabel("\u5355\u500D\u9886\u53D6", "\u53CC\u500D\u9886\u53D6");
                        }
                        else {
                            this.toCheckIn(this.cardList.selectedItem.day);
                        }
                    }
                    else if (state == 2) {
                        UserTips.ins().showTips("已签到");
                    }
                }
                else {
                    if (this.cardList.selectedItem.day > this.currentDay) {
                        UserTips.ins().showTips("未到签到时间");
                    }
                }
            }
        }
    };
    DailyCheckInPanel.prototype.ondayRewardListTap = function (e) {
        DailyCheckIn.ins().sendGetReward(this.curRewardData.days);
    };
    DailyCheckInPanel.prototype.onNotYetCardTap = function (rewardCfg) {
        if (!rewardCfg)
            return;
        var card = this.cardList.getElementAt(rewardCfg.day - 1);
        if (!card)
            return;
    };
    DailyCheckInPanel.prototype.updateCheckInTimes = function () {
        this.checkInLab.text = DailyCheckIn.ins().loginTimes.toString() + "\u5929";
    };
    DailyCheckInPanel.prototype.initPanel = function () {
        this.monthList = CheckInConfigMgr.ins().getMonthRewardCfg_Daily();
        var xm = this.panelwidth / 7;
        var ym = 0;
        this.listData.replaceAll(this.monthList);
    };
    DailyCheckInPanel.prototype.updateList = function () {
        this.addDate();
    };
    DailyCheckInPanel.prototype.addDate = function () {
        this.listData.replaceAll(this.monthList);
        var logIndays = DailyCheckIn.ins().conLoginTimes;
        var tempRewardList = DailyCheckIn.ins().getRewardList(DailyCheckIn.ins().rewardIndex);
        if (tempRewardList) {
            this.rewardBtn.visible = this.rewardItem.visible = true;
            this.curRewardData = tempRewardList;
            var comDays = this.curRewardData.days - logIndays >= 0 ? this.curRewardData.days - logIndays : 0;
            var boo = logIndays >= this.curRewardData.days;
            var color1 = boo ? 0x20CB30 : 0xF3311E;
            var color2 = 0x9F946D;
            var color3 = 0xF8B141;
            var str = "\u5DF2\u7D2F\u8BA1\u7B7E\u5230(|C:" + color1 + "&T:" + logIndays + "|/|C:" + color2 + "&T:" + this.curRewardData.days + "|)\u5929\uFF0C\n\u518D\u7B7E\u5230|C:" + color3 + "&T:" + comDays + "\u5929|\u9886\u53D6\u5956\u52B1\u3002";
            this.dayReardText.textFlow = TextFlowMaker.generateTextFlow(str);
            this.rewardItem.data = this.curRewardData.rewards[0];
            if (boo) {
                this.rewardBtn.enabled = true;
                this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
                if (!this.eff.parent)
                    this.rewardGroup.addChild(this.eff);
            }
            else {
                this.rewardBtn.enabled = false;
                DisplayUtils.removeFromParent(this.eff);
            }
        }
        else {
            DisplayUtils.removeFromParent(this.eff);
            this.rewardBtn.visible = this.rewardItem.visible = false;
            this.rewardBtn.enabled = false;
            var comDays = 1;
            var boo = false;
            var color1 = boo ? 0x20CB30 : 0xF3311E;
            var color2 = 0x9F946D;
            var color3 = 0xF8B141;
            var str = "\u5DF2\u9886\u53D6\u6240\u6709\u7684\u7D2F\u8BA1\u5956\u52B1";
            this.dayReardText.textFlow = TextFlowMaker.generateTextFlow(str);
        }
    };
    DailyCheckInPanel.prototype.cleanList = function () {
        this.cardList.dataProvider = null;
    };
    DailyCheckInPanel.prototype.updateListPos = function () {
        this.cardScroller.removeEventListener(egret.Event.ENTER_FRAME, this.updateListPos, this);
        var cardIndex = DailyCheckIn.ins().loginTimes;
        if (cardIndex >= 25) {
            this.cardScroller.viewport.scrollV = this.cardScroller.viewport.contentHeight - this.cardScroller.height;
        }
    };
    return DailyCheckInPanel;
}(BaseEuiView));
__reflect(DailyCheckInPanel.prototype, "DailyCheckInPanel");
//# sourceMappingURL=DailyCheckInPanel.js.map