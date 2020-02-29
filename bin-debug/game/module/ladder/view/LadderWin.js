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
var LadderWin = (function (_super) {
    __extends(LadderWin, _super);
    function LadderWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ladderwinskin";
        _this.isTopLevel = true;
        return _this;
    }
    LadderWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.help, this.onTap);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addChangeEvent(this.tab, this.selectIndexChange);
        this.addChangingEvent(this.tab, this.checkIsBack);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.observe(Mine.ins().postRedPoint, this.updateMineRedPoint);
        this.observe(UserFb.ins().postShowRedChange, this.refushredPoint);
        this.observe(Hungu.ins().postHunShouFBInfo, this.refushredPoint);
        this.observe(Hungu.ins().postSweepHunShouFB, this.refushredPoint);
        var index = param[0] ? param[0] : 0;
        this.tab.selectedIndex = index;
        this.viewStack.selectedIndex = index;
        this.selectIndexChange();
        this.refushredPoint();
        if (Hungu.ins().showHunShouFB()) {
            if (this.viewStack.numElements < 5) {
                this.viewStack.addChild(this.challengeHunshou);
                this.redGroup.addChild(this.redPoint5);
                this.redPoint5.visible = Hungu.ins().showHunShouRed();
            }
        }
        else {
            if (this.viewStack.numElements >= 5) {
                this.viewStack.removeChild(this.challengeHunshou);
                DisplayUtils.removeFromParent(this.redPoint5);
            }
        }
    };
    LadderWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.Event.CHANGING, this.onTabTouching, this.tab);
    };
    LadderWin.prototype.selectIndexChange = function (e) {
        if (e === void 0) { e = null; }
        switch (this.tab.selectedIndex) {
            case 0:
                this.zaoyu.open();
                break;
            case 1:
                this.ladder.open();
                break;
            case 2:
                this.wakuang.open();
                break;
            case 3:
                this.teamfb.open();
                break;
            case 4:
                this.challengeHunshou.open();
                break;
        }
        this.title.source = "biaoti_jingji" + this.tab.selectedIndex;
    };
    LadderWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    LadderWin.prototype.checkIsOpen = function (index) {
        if (index == 3 && !UserFb.ins().isTeamFBOpen()) {
            UserTips.ins().showTips("\u7EC4\u961F\u526F\u672C\u8FBE\u5230" + GlobalConfig.TeamFuBenBaseConfig.needZsLv + "\u8F6C\u4E14\u5F00\u670D\u7B2C" + GlobalConfig.TeamFuBenBaseConfig.openDay + "\u5929\u5F00\u542F");
            return false;
        }
        if (index == 4 && !Hungu.ins().isHunShouFBOpen()) {
            UserTips.ins().showTips("\u8FBE\u5230" + GlobalConfig.HunGuConf.needZsLv + "\u8F6C\u4E14\u5F00\u670D\u7B2C" + GlobalConfig.HunGuConf.fbOpenDay + "\u5929\u5F00\u542F");
            return false;
        }
        return true;
    };
    LadderWin.prototype.refushredPoint = function () {
        this.redPoint1.visible = !!Encounter.ins().isHasRed();
        this.redPoint2.visible = Ladder.ins().isCanReward || Ladder.ins().isOpen ? Ladder.ins().challgeNum > 0 : false;
        this.redPoint3.visible = Mine.redpointCheck();
        this.redPoint4.visible = UserFb.ins().checkTFRed();
        this.redPoint5.visible = Hungu.ins().showHunShouRed();
    };
    LadderWin.prototype.updateMineRedPoint = function (num) {
        this.redPoint3.visible = !!num;
    };
    LadderWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.help:
                if (this.tab.selectedIndex == 0) {
                    ViewManager.ins().open(ZsBossRuleSpeak, 10);
                }
                else if (this.tab.selectedIndex == 1) {
                    ViewManager.ins().open(ZsBossRuleSpeak, 4);
                }
                else if (this.tab.selectedIndex == 2) {
                    ViewManager.ins().open(ZsBossRuleSpeak, 14);
                }
                else if (this.tab.selectedIndex == 4) {
                    ViewManager.ins().open(ZsBossRuleSpeak, 37);
                }
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    LadderWin.prototype.checkIsBack = function (e) {
        var tab = e.target;
        if (!LadderWin.openCheck([tab.selectedIndex])) {
            e.$cancelable = true;
            e.preventDefault();
        }
        else {
            ViewManager.ins().close(LimitTaskView);
        }
    };
    LadderWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var index = param[0] ? param[0] : 0;
        if (index == 0) {
            var v = GlobalConfig.SkirmishBaseConfig.openLevel;
            var b = UserFb.ins().guanqiaID >= v;
            if (!b)
                UserTips.ins().showTips("\u901A\u5173\u5230\u7B2C" + v + "\u5173\u5F00\u542F\u906D\u9047\u6218");
            return b;
        }
        if (index == 1) {
            var v = GlobalConfig.TianTiConstConfig.openLevel;
            var b = Actor.level >= v;
            if (!b)
                UserTips.ins().showTips(v + "\u7EA7\u5F00\u542F");
            return b;
        }
        else if (index == 2) {
            var b = Mine.openCheck(true);
            return b;
        }
        else if (index == 3) {
            var b = true;
            return b;
        }
        else if (index == 4) {
            var b = true;
            return b;
        }
    };
    return LadderWin;
}(BaseEuiView));
__reflect(LadderWin.prototype, "LadderWin");
ViewManager.ins().reg(LadderWin, LayerManager.UI_Main);
//# sourceMappingURL=LadderWin.js.map