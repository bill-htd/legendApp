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
var DailyAwardPanel = (function (_super) {
    __extends(DailyAwardPanel, _super);
    function DailyAwardPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailyAwardPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "DailyAwardSkin";
        this.isTopLevel = true;
        this.list.itemRenderer = ItemBase;
    };
    DailyAwardPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn1, this.onTap);
        this.addTouchEvent(this.sure, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.list.dataProvider = new eui.ArrayCollection(GlobalConfig.GuildBattleDayAward[GuildWar.ins().getModel().rewardDay].award);
        if (GuildWar.ins().getModel().getDayReward) {
            this.sure.label = "\u5DF2\u9886\u53D6";
            this.sure.enabled = false;
        }
        else {
            this.sure.label = "\u9886\u53D6";
            this.sure.enabled = true;
        }
    };
    DailyAwardPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn1, this.onTap);
        this.removeTouchEvent(this.sure, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
    };
    DailyAwardPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn1:
                ViewManager.ins().close(DailyAwardPanel);
                break;
            case this.sure:
                if (GuildWar.ins().getModel().getDayReward) {
                    UserTips.ins().showTips("|C:0xf3311e&T:已领取奖励，无法再次领取|");
                    return;
                }
                else if (!GuildWar.ins().getModel().canGetDay) {
                    UserTips.ins().showTips("|C:0xf3311e&T:龙城占领公会才能领取每日奖励|");
                    return;
                }
                GuildWar.ins().requestDayReward(GuildWar.ins().getModel().rewardDay);
                ViewManager.ins().close(DailyAwardPanel);
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return DailyAwardPanel;
}(BaseEuiView));
__reflect(DailyAwardPanel.prototype, "DailyAwardPanel");
ViewManager.ins().reg(DailyAwardPanel, LayerManager.UI_Main);
//# sourceMappingURL=DailyAwardPanel.js.map