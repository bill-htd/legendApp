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
var GuardWeaponPanel = (function (_super) {
    __extends(GuardWeaponPanel, _super);
    function GuardWeaponPanel() {
        return _super.call(this) || this;
    }
    GuardWeaponPanel.prototype.childrenCreated = function () {
        this.itemList.itemRenderer = ItemBase;
        this.noticeList.itemRenderer = GuardLogsListRenderer;
    };
    GuardWeaponPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btnChallenge, this.challenge);
        this.observe(UserFb.ins().postGuardWeaponLogs, this.updateLogs);
        this.observe(UserFb.ins().postGuardInfo, this.updateChallgeTimes);
        this.updateChallgeTimes();
        this.itemList.dataProvider = new eui.ArrayCollection(GlobalConfig.GuardGodWeaponConf.showReward[UserZs.ins().lv]);
        UserFb.ins().sendGuardWeaponLogs();
        this.btnChallenge.label = GuardWeaponModel.ins().isShowSweep ? "扫  荡" : "挑  战";
    };
    GuardWeaponPanel.prototype.updateChallgeTimes = function () {
        this.lbTime.text = (GlobalConfig.GuardGodWeaponConf.dailyCount - GuardWeaponModel.ins().challengeTimes).toString();
    };
    GuardWeaponPanel.prototype.challenge = function () {
        if (!GuardWeaponModel.ins().isShowSweep)
            UserFb.ins().challengeGuard();
        else {
            if (GlobalConfig.GuardGodWeaponConf.dailyCount - GuardWeaponModel.ins().challengeTimes <= 0) {
                UserTips.ins().showCenterTips("今天次数已用完，请明天再参加");
                return;
            }
            ViewManager.ins().open(BuySpecialWin);
        }
    };
    GuardWeaponPanel.prototype.updateLogs = function (arr) {
        this.noticeList.dataProvider = new eui.ArrayCollection(arr);
    };
    GuardWeaponPanel.prototype.close = function () {
        this.removeObserve();
    };
    return GuardWeaponPanel;
}(BaseView));
__reflect(GuardWeaponPanel.prototype, "GuardWeaponPanel");
//# sourceMappingURL=GuardWeaponPanel.js.map