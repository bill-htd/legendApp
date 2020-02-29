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
var TreasureWin = (function (_super) {
    __extends(TreasureWin, _super);
    function TreasureWin() {
        var _this = _super.call(this) || this;
        _this.lastSelect = 0;
        _this.skinName = "TreasureWinSkin";
        _this.isTopLevel = true;
        return _this;
    }
    TreasureWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    TreasureWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var num = this.viewStack.numChildren;
        for (var i = 0; i < num; i++) {
            this.viewStack.getChildAt(i).close();
        }
        this.removeObserve();
    };
    TreasureWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.addTouchEvent(this.help, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.observe(HeartMethodRedPoint.ins().postHeartMethodRedPoint, this.showRoleRedPoint);
        this.observe(ShenshouRedpoint.ins().postRedPoint, this.showTabRedPoint);
        this.lastSelect = param[0] || 0;
        this.curRole = param[1] || 0;
        this.viewStack.selectedIndex = this.lastSelect;
        this.roleSelect.setCurRole(this.curRole);
        this.setOpenIndex(this.viewStack.selectedIndex);
        this.observe(UserBag.ins().postItemAdd, this.delayRedPoint);
        this.observe(UserBag.ins().postItemChange, this.delayRedPoint);
        this.observe(Actor.ins().postLevelChange, this.delayRedPoint);
        this.observe(JadeNew.ins().postJadeData, this.delayRedPoint);
        this.observe(LongHun.ins().postDateUpdate, this.delayRedPoint);
        this.observe(LongHun.ins().postStageUpgrade, this.delayRedPoint);
        this.observe(LongHun.ins().postStageActive, this.delayRedPoint);
        this.observe(HunguRedPoint.ins().postRedPoint, this.showTabRedPoint);
        this.checkYuPeiRed();
        this.checkPanel();
    };
    TreasureWin.prototype.checkPanel = function () {
        if (Hungu.ins().checkShowOpen()) {
            if (!this.HunguPanel.parent) {
                this.viewStack.addChild(this.HunguPanel);
            }
            if (this.redPoint4.parent) {
                this.redPointGroup.addChild(this.redPoint4);
            }
        }
        else {
            DisplayUtils.removeFromParent(this.HunguPanel);
            DisplayUtils.removeFromParent(this.redPoint4);
        }
    };
    TreasureWin.prototype.delayRedPoint = function () {
        if (!TimerManager.ins().isExists(this.checkYuPeiRed, this))
            TimerManager.ins().doTimer(60, 1, this.checkYuPeiRed, this);
    };
    TreasureWin.prototype.checkYuPeiRed = function () {
        this.redPoint0.visible = false;
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            var b = LongHun.ins().canShowRedPointInRole(i);
            if (b) {
                this.redPoint0.visible = b;
                break;
            }
        }
        this.redPoint1.visible = JadeNew.ins().checkRed();
        this.showRoleRedPoint();
    };
    TreasureWin.prototype.onTabTouching = function (e) {
        if (!TreasureWin.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    TreasureWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(this.viewStack.selectedIndex);
    };
    TreasureWin.prototype.setRoleId = function (roleId) {
        this.curRole = roleId;
        this.setOpenIndex(this.viewStack.selectedIndex);
    };
    TreasureWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.help:
                if (this.viewStack.selectedIndex == TreasureWin.Longhun) {
                }
                else if (this.viewStack.selectedIndex == TreasureWin.Yupei) {
                    ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[30].text);
                }
                else if (this.viewStack.selectedIndex == TreasureWin.Xinfa) {
                    ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[27].text);
                }
                else if (this.viewStack.selectedIndex == TreasureWin.Hungu) {
                    ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[36].text);
                }
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    TreasureWin.prototype.setOpenIndex = function (index) {
        this.lastSelect = index;
        this.help.visible = true;
        this.roleSelect.currentState = "yhead";
        var param = [];
        switch (this.viewStack.selectedIndex) {
            case TreasureWin.Longhun:
                this.title.source = "biaoti_longhun";
                this.help.visible = false;
                break;
            case TreasureWin.Yupei:
                this.title.source = "biaoti_yupei";
                break;
            case TreasureWin.Xinfa:
                this.title.source = "heartmethodName";
                if (this.lastSelect != undefined) {
                    var hmwin = this.viewStack.getElementAt(this.lastSelect);
                    if (hmwin)
                        param[0] = hmwin.heartId;
                }
                break;
            case TreasureWin.Shenshou:
                this.help.visible = false;
                this.title.source = "biaoti_shoushen";
                this.roleSelect.currentState = "nohead";
                break;
            case TreasureWin.Hungu:
                this.title.source = "hunguName";
                param[0] = HGPOS.ITEM0;
                break;
        }
        if (this.lastSelect != undefined) {
            this.viewStack.getElementAt(this.lastSelect)['close']();
        }
        this.viewStack.getElementAt(this.lastSelect)['open'](this.curRole, param[0]);
        this.showRoleRedPoint();
    };
    TreasureWin.prototype.onChange = function (e) {
        this.setRoleId(this.roleSelect.getCurRole());
    };
    TreasureWin.checkIsOpen = function (index) {
        if (index == TreasureWin.Yupei && !JadeNew.ins().checkOpen()) {
            UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.JadePlateBaseConfig.openDay + "\u5929\u5E76\u8FBE\u5230" + GlobalConfig.JadePlateBaseConfig.openlv + "\u7EA7\u5F00\u542F");
            return false;
        }
        if (index == TreasureWin.Xinfa && !HeartMethod.ins().checkOpen()) {
            UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.HeartMethodBaseConfig.serverDay + "\u5929\u5E76\u8FBE\u5230" + GlobalConfig.HeartMethodBaseConfig.zsLv + "\u8F6C\u5F00\u542F");
            return false;
        }
        if (index == TreasureWin.Shenshou && !ShenshouModel.ins().checkOpen()) {
            UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.ShenShouConfig.openserverday + "\u5929\u5E76\u8FBE\u5230" + GlobalConfig.ShenShouConfig.openzhuanshenglv + "\u8F6C\u5F00\u542F");
            return false;
        }
        if (index == TreasureWin.Hungu && !Hungu.ins().checkOpen()) {
            UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.HunGuConf.openserverday + "\u5929\u5E76\u8FBE\u5230" + GlobalConfig.HunGuConf.openzhuanshenglv + "\u8F6C\u5F00\u542F");
            return false;
        }
        return true;
    };
    TreasureWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    TreasureWin.prototype.showTabRedPoint = function () {
        this.redPoint2.visible = HeartMethodRedPoint.ins().redPoint;
        this.redPoint3.visible = ShenshouRedpoint.ins().redpoint;
        this.redPoint4.visible = HunguRedPoint.ins().redPoint;
    };
    TreasureWin.prototype.showRoleRedPoint = function () {
        var len = SubRoles.ins().subRolesLen;
        switch (this.viewStack.selectedIndex) {
            case TreasureWin.Longhun:
                for (var i = 0; i < len; i++) {
                    this.roleSelect.showRedPoint(i, LongHun.ins().canShowRedPointInRole(i));
                }
                break;
            case TreasureWin.Yupei:
                for (var i = 0; i < len; i++)
                    this.roleSelect.showRedPoint(i, JadeNew.ins().checkRedByRoleID(i));
                break;
            case TreasureWin.Xinfa:
                for (var i = 0; i < len; i++) {
                    var red = false;
                    for (var k in HeartMethodRedPoint.ins().roleTabs[i]) {
                        if (HeartMethodRedPoint.ins().roleTabs[i][k]) {
                            red = true;
                            break;
                        }
                    }
                    this.roleSelect.showRedPoint(i, red);
                }
                break;
            case TreasureWin.Hungu:
                for (var i = 0; i < len; i++) {
                    var red = HunguRedPoint.ins().roleTabs[i];
                    this.roleSelect.showRedPoint(i, red);
                }
                break;
        }
        this.showTabRedPoint();
    };
    TreasureWin.Longhun = 0;
    TreasureWin.Yupei = 1;
    TreasureWin.Xinfa = 2;
    TreasureWin.Shenshou = 3;
    TreasureWin.Hungu = 4;
    return TreasureWin;
}(BaseEuiView));
__reflect(TreasureWin.prototype, "TreasureWin");
ViewManager.ins().reg(TreasureWin, LayerManager.UI_Main);
//# sourceMappingURL=TreasureWin.js.map