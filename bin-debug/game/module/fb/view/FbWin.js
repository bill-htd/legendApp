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
var FbWin = (function (_super) {
    __extends(FbWin, _super);
    function FbWin() {
        var _this = _super.call(this) || this;
        _this.fbDataList = [];
        _this.lastSelectIndex = -1;
        _this.skinName = "DailyFbSkin";
        _this.isTopLevel = true;
        _this.fbList.itemRenderer = FbItem;
        _this.fbDataList = UserFb.ins().fbDataList.slice();
        _this.fbList.dataProvider = new eui.ArrayCollection(_this.fbDataList);
        return _this;
    }
    FbWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var index = param[0] == undefined ? 0 : param[0];
        switch (index) {
            case 4:
                return GuardWeaponModel.ins().isOpen();
            case 2:
                var info = GlobalConfig.FbChallengeConfig[1];
                if (Actor.level < info.levelLimit) {
                    UserTips.ins().showTips(info.levelLimit + "\u7EA7\u53EF\u6311\u6218");
                    return false;
                }
                break;
            case 1:
                if (Actor.level < GlobalConfig.ExpFubenBaseConfig.openLv) {
                    UserTips.ins().showTips(GlobalConfig.ExpFubenBaseConfig.openLv + "\u7EA7\u5F00\u542F");
                    return false;
                }
                break;
            case 0:
                if (Actor.level < 10) {
                    UserTips.ins().showTips("10级开启");
                    return false;
                }
                break;
        }
        if (!FbWin.isClose)
            ViewManager.ins().close(LiLianWin);
        FbWin.isClose = false;
        return true;
    };
    FbWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    FbWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.fbList, this.onTap);
        this.addTouchEvent(this.help, this.onTap);
        this.observe(UserFb.ins().postFbInfoInit, this.updateFbList);
        this.observe(UserFb.ins().postUpDataInfo, this.updateFbList);
        this.observe(FbRedPoint.ins().postTabs, this.updateRedPoint);
        this.observe(UserFb.ins().postUpDataInfo, this.updateRedPoint);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.checkIsOpen);
        this.updateFbList();
        var index = param[0] == undefined ? 0 : param[0];
        this.viewStack.selectedIndex = index;
        this.tab.selectedIndex = index;
        this.setOpenIndex(index);
        this.updateRedPoint();
    };
    FbWin.prototype.updateRedPoint = function () {
        this.redPoint0.visible = FbRedPoint.ins().getRedPoint(0);
        this.redPoint1.visible = FbRedPoint.ins().getRedPoint(1);
        this.redPoint2.visible = FbRedPoint.ins().getRedPoint(2);
        this.redPoint3.visible = FbRedPoint.ins().getRedPoint(3);
        this.redPoint4.visible = FbRedPoint.ins().getRedPoint(4);
    };
    FbWin.prototype.updateFbList = function () {
        this.fbList.dataProvider.replaceAll(this.fbDataList);
    };
    FbWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.help:
                ViewManager.ins().open(ZsBossRuleSpeak, 28);
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            default:
                if (e.target instanceof eui.Button) {
                    var fbID = e.target.parent.data;
                    var fbConfig = GlobalConfig.DailyFubenConfig[fbID];
                    if (e.target.name == 'add') {
                        this.Sweep(fbID);
                    }
                    else if (e.target.name == 'double') {
                        this.DoubleSweep(fbID);
                    }
                    else {
                        var fbInfos = UserFb.ins().getFbDataById(fbID);
                        if (fbInfos.getCount() <= 0) {
                            UserTips.ins().showTips("|C:0xf3311e&T:剩余挑战次数不足|");
                        }
                        else if (fbConfig.levelLimit > Actor.level) {
                            UserTips.ins().showTips("|C:0xf3311e&T:转生或等级不足|");
                        }
                        else {
                            var isPass = UserFb.ins().fbModel[fbID].isPass;
                            if (Recharge.ins().franchise && isPass) {
                                UserFb.ins().sendChallenge(fbID);
                            }
                            else {
                                if (UserFb.ins().checkInFB())
                                    return;
                                UserFb.ins().sendChallenge(fbConfig.id);
                                if (!(UserZs.ins().lv >= fbConfig.sweepLevel && fbInfos.isPass))
                                    ViewManager.ins().closeTopLevel();
                            }
                        }
                    }
                    ViewManager.ins().close(LimitTaskView);
                }
        }
    };
    FbWin.prototype.Sweep = function (fbID) {
        var fbConfig = GlobalConfig.DailyFubenConfig[fbID];
        var discount = GlobalConfig.MonthCardConfig.sweepPrecent / 100;
        var addValue = Recharge.ins().monthDay > 0 ? 1 - discount : 1;
        var buyPrice = fbConfig.buyPrice[UserFb.ins().getFbDataById(fbID).vipBuyCount] * addValue;
        if (!(Actor.yb >= buyPrice)) {
            UserTips.ins().showTips("元宝不足");
            return;
        }
        DieGuide.ins().setClick(fbID);
        var index = this.fbDataList.lastIndexOf(fbID);
        this.fbList.getChildAt(index).starSaoDang(0);
    };
    FbWin.prototype.DoubleSweep = function (fbID) {
        var fbConfig = GlobalConfig.DailyFubenConfig[fbID];
        var discount = GlobalConfig.MonthCardConfig.sweepPrecent / 100;
        var addValue = Recharge.ins().monthDay > 0 ? 1 - discount : 1;
        var buyPrice = fbConfig.buyDoublePrice[UserFb.ins().getFbDataById(fbID).vipBuyCount] * addValue;
        if (!(Actor.yb >= buyPrice)) {
            UserTips.ins().showTips("元宝不足");
            return;
        }
        DieGuide.ins().setClick(fbID);
        var index = this.fbDataList.lastIndexOf(fbID);
        this.fbList.getChildAt(index).starSaoDang(1);
    };
    FbWin.prototype.setOpenIndex = function (selectedIndex) {
        if (!this.checkIndexOpen(selectedIndex)) {
            this.setOpenIndex(this.lastSelectIndex);
            this.tab.selectedIndex = this.lastSelectIndex;
            return;
        }
        if (this.lastSelectIndex > -1) {
            switch (this.lastSelectIndex) {
                case 1:
                    this.fbExpPanel.close();
                    break;
                case 2:
                    break;
            }
        }
        this.lastSelectIndex = selectedIndex;
        this.help.visible = false;
        switch (selectedIndex) {
            case 4:
                this.guardWeaponPanel.open();
                this.help.visible = true;
                break;
            case 3:
                this.playWayPanel.open();
                break;
            case 2:
                this.fbChallengePanel.open();
                break;
            case 1:
                this.fbExpPanel.open();
                break;
            case 0:
                this.updateFbList();
                break;
        }
    };
    FbWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(e.currentTarget.selectedIndex);
    };
    FbWin.prototype.checkIsOpen = function (e) {
        var tab = e.target;
        if (!this.checkIndexOpen(tab.selectedIndex)) {
            e.preventDefault();
            return;
        }
        ViewManager.ins().close(LiLianWin);
        ViewManager.ins().close(LimitTaskView);
    };
    FbWin.prototype.checkIndexOpen = function (index) {
        if (index == 2) {
            var info = GlobalConfig.FbChallengeConfig[1];
            if (Actor.level < info.levelLimit) {
                UserTips.ins().showTips(info.levelLimit + "\u7EA7\u53EF\u6311\u6218");
                return false;
            }
        }
        else if (index == 1) {
            if (Actor.level < GlobalConfig.ExpFubenBaseConfig.openLv) {
                UserTips.ins().showTips(GlobalConfig.ExpFubenBaseConfig.openLv + "\u7EA7\u5F00\u542F");
                return false;
            }
        }
        else if (index == 4) {
            if (!GuardWeaponModel.ins().isOpen()) {
                UserTips.ins().showTips(GuardWeaponModel.ins().getDesc());
                return false;
            }
        }
        return true;
    };
    return FbWin;
}(BaseEuiView));
__reflect(FbWin.prototype, "FbWin");
ViewManager.ins().reg(FbWin, LayerManager.UI_Main);
//# sourceMappingURL=FbWin.js.map