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
var TreasureHuntWin = (function (_super) {
    __extends(TreasureHuntWin, _super);
    function TreasureHuntWin() {
        var _this = _super.call(this) || this;
        _this.curRole = 0;
        _this.curSelectIndex = 0;
        _this.skinName = "TreasureHuntSkin";
        _this.isTopLevel = true;
        return _this;
    }
    TreasureHuntWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.panelArr = [this.treasureHuntPanel, this.treasureRune, this.treasureChuanshi];
        this.viewStack.selectedIndex = 0;
        this.checkHeirloomOpen();
        this.tab.dataProvider = this.viewStack;
    };
    TreasureHuntWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    TreasureHuntWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var page = param[0] ? param[0] : 0;
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.help, this.onClick);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.checkIsOpen);
        this.observe(UserBag.ins().postItemChange, this.setRedPoint);
        this.observe(UserBag.ins().postItemAdd, this.setRedPoint);
        this.observe(UserBag.ins().postItemDel, this.setRedPoint);
        this.observe(GameLogic.ins().postSubRoleChange, this.setRedPoint);
        this.observe(Rune.ins().postRuneBoxGift, this.setRedPoint);
        this.observe(GameServer.ins().postServerOpenDay, this.checkHeirloomOpen);
        this.observe(UserZs.ins().postZsLv, this.checkHeirloomOpen);
        this.setSelectedIndex(page);
        this.setRedPoint();
    };
    TreasureHuntWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.panelArr[this.curSelectIndex].close();
    };
    TreasureHuntWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.help:
                var helpIndex = void 0;
                if (this.tab.selectedIndex == 0)
                    helpIndex = 39;
                else if (this.tab.selectedIndex == 1)
                    helpIndex = 13;
                else if (this.tab.selectedIndex == 2)
                    helpIndex = 40;
                if (helpIndex)
                    ViewManager.ins().open(ZsBossRuleSpeak, helpIndex);
                break;
        }
    };
    TreasureHuntWin.prototype.switchRole = function () {
    };
    TreasureHuntWin.prototype.checkIsOpen = function (e) {
        var tab = e.target;
        var openlevel = GlobalConfig.FuwenTreasureConfig.openlevel;
        if (tab.selectedIndex == 1 && Actor.level < openlevel) {
            UserTips.ins().showTips(openlevel + "\u7EA7\u5F00\u542F");
            e.$cancelable = true;
            e.preventDefault();
            return;
        }
    };
    TreasureHuntWin.prototype.onTabTouch = function (e) {
        this.panelArr[this.curSelectIndex].close();
        var selectedIndex = e.currentTarget.selectedIndex;
        this.setSelectedIndex(selectedIndex);
        this.setRedPoint();
        ViewManager.ins().close(LimitTaskView);
    };
    TreasureHuntWin.prototype.setSelectedIndex = function (selectedIndex) {
        this.curSelectIndex = selectedIndex;
        this.panelArr[selectedIndex].open();
        this.viewStack.selectedIndex = selectedIndex;
    };
    TreasureHuntWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0]) {
            if (param[0] == 2) {
                if (!Heirloom.ins().isHeirloomHuntOpen()) {
                    UserTips.ins().showTips("\u5F00\u670D\u7B2C" + (GlobalConfig.HeirloomTreasureConfig.openDay + 1) + "\u5929\u8FBE\u5230" + GlobalConfig.HeirloomTreasureConfig.openZSlevel + "\u8F6C\u540E\u65B9\u53EF\u53C2\u4E0E");
                    return false;
                }
            }
            else if (param[0] == 1) {
                if (Actor.level < GlobalConfig.FuwenTreasureConfig.openlevel) {
                    UserTips.ins().showTips(GlobalConfig.FuwenTreasureConfig.openlevel + "\u7EA7\u5F00\u542F");
                    return false;
                }
            }
        }
        if (OpenSystem.ins().checkSysOpen(SystemType.TREASURE)) {
            ViewManager.ins().close(LiLianWin);
            return true;
        }
        UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.TREASURE));
        return false;
    };
    TreasureHuntWin.prototype.setRedPoint = function () {
        this.redPoint0.visible = Boolean(UserBag.ins().getHuntGoods(0).length);
        this.redPoint1.visible = Boolean(UserBag.ins().getHuntGoods(1).length) || Rune.ins().getIsGetBox() || RuneRedPointMgr.ins().checkCanExchange();
        this.redPoint2.visible = Boolean(Heirloom.ins().isHeirloomHuntOpen() && (UserBag.ins().getHuntGoods(2).length || Heirloom.ins().getIsGetBox()));
    };
    TreasureHuntWin.prototype.checkHeirloomOpen = function () {
        if (Heirloom.ins().isHeirloomHuntOpen()) {
            if (this.viewStack.length < 3) {
                this.viewStack.addChild(this.treasureChuanshi);
                this.redGroup.addChild(this.redPoint2);
                this.tab.dataProvider = this.viewStack;
            }
        }
        else {
            if (this.viewStack.length > 2) {
                this.viewStack.removeChildAt(2);
                this.redGroup.removeChildAt(2);
                this.tab.dataProvider = this.viewStack;
            }
        }
    };
    return TreasureHuntWin;
}(BaseEuiView));
__reflect(TreasureHuntWin.prototype, "TreasureHuntWin");
ViewManager.ins().reg(TreasureHuntWin, LayerManager.UI_Main);
//# sourceMappingURL=TreasureHuntWin.js.map