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
var GodWeaponWin = (function (_super) {
    __extends(GodWeaponWin, _super);
    function GodWeaponWin() {
        var _this = _super.call(this) || this;
        _this._selectIndex = -1;
        return _this;
    }
    GodWeaponWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GwSkin";
        this.isTopLevel = true;
        this.gwRp.visible = false;
        this.mjRp.visible = false;
        this.gwBossRp.visible = false;
    };
    GodWeaponWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(GodWeaponRedPoint.ins().postGwMj, this.updateRedPoint);
        this.observe(GodWeaponRedPoint.ins().postGwSb, this.updateRedPoint);
        this.observe(GodWeaponRedPoint.ins().postgGwBossRp, this.updateRedPoint);
        this.observe(GodWeaponRedPoint.ins().postGodWeaponItem, this.updateRedPoint);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.help, this.onTap);
        this.gwadImg.visible = false;
        this.gwadImg.source = "";
        this.tab.visible = true;
        this.timeBp.visible = false;
        this.addChangeEvent(this.tab, this.itemTouchHandler);
        this.addChangingEvent(this.tab, this.itemTouching);
        if (param[0] && this.checkIsOpen(param[0])) {
            this.viewStack.selectedIndex = param[0];
            this.selectIndex = this.tab.selectedIndex = param[0];
        }
        else {
            this.viewStack.selectedIndex = 0;
            this.selectIndex = this.tab.selectedIndex = 0;
        }
        this.updateRedPoint();
    };
    GodWeaponWin.prototype.gwTimeShow = function () {
        var days = GlobalConfig.GodWeaponBaseConfig.openDay - GameServer.serverOpenDay;
        var totalNum = days * DateUtils.SECOND_PER_DAY;
        this.totalNumber = totalNum - DateUtils.getTodayPassedSecond();
        this.updateAward();
        var num = this.totalNumber;
        TimerManager.ins().doTimer(1000, num, this.updateAward, this);
    };
    GodWeaponWin.prototype.updateAward = function () {
        if (this.totalNumber <= 0) {
            TimerManager.ins().remove(this.updateAward, this);
            this.updateOpen();
            return;
        }
        var str = DateUtils.getFormatBySecond(this.totalNumber, DateUtils.TIME_FORMAT_1);
        var temp = str.split(":");
        str = temp.join(".");
        this.timeBp.text = str;
        this.totalNumber--;
    };
    GodWeaponWin.prototype.updateOpen = function () {
        this.gwadImg.visible = false;
        this.gwadImg.source = "";
        this.tab.visible = true;
        this.timeBp.visible = false;
        this.viewStack.selectedIndex = 0;
        this.selectIndex = 0;
    };
    GodWeaponWin.prototype.updateRedPoint = function () {
        this.gwRp.visible = GodWeaponRedPoint.ins().gwSbRed;
        this.mjRp.visible = GodWeaponRedPoint.ins().gwMjRed;
        this.gwBossRp.visible = GodWeaponRedPoint.ins().gwBossRp;
        this.mixRp.visible = GodWeaponRedPoint.ins().gwItem;
    };
    GodWeaponWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this._selectIndex > -1)
            this.viewStack.getChildAt(this._selectIndex)['close']();
    };
    Object.defineProperty(GodWeaponWin.prototype, "selectIndex", {
        get: function () {
            return this._selectIndex;
        },
        set: function (value) {
            if (this._selectIndex > -1) {
                this.viewStack.getChildAt(this._selectIndex)['close']();
            }
            this._selectIndex = value;
            this.viewStack.getChildAt(this._selectIndex)['open']();
            if (this._selectIndex == 3) {
                this.help.visible = true;
            }
            else {
                this.help.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    GodWeaponWin.prototype.itemTouchHandler = function (e) {
        this.selectIndex = this.tab.selectedIndex;
    };
    GodWeaponWin.prototype.itemTouching = function (e) {
        if (!this.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    GodWeaponWin.prototype.checkIsOpen = function (selectIndex) {
        if (selectIndex >= 1) {
            if (UserZs.ins().lv >= GlobalConfig.GodWeaponBaseConfig.zhuanshengLevel && GameServer.serverOpenDay >= GlobalConfig.GodWeaponBaseConfig.openDay) {
                return true;
            }
            else {
                if (UserZs.ins().lv < GlobalConfig.GodWeaponBaseConfig.zhuanshengLevel) {
                    UserTips.ins().showTips("\u89D2\u8272\u8F6C\u751F\u7B49\u7EA7" + GlobalConfig.GodWeaponBaseConfig.zhuanshengLevel + "\u5F00\u542F");
                }
                else if (GameServer.serverOpenDay < GlobalConfig.GodWeaponBaseConfig.openDay) {
                    UserTips.ins().showTips("\u5F00\u670D" + GlobalConfig.GodWeaponBaseConfig.openDay + "\u5929\u5F00\u542F");
                }
                return false;
            }
        }
        return true;
    };
    GodWeaponWin.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        switch (tar) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.help:
                if (this._selectIndex == 3)
                    ViewManager.ins().open(ZsBossRuleSpeak, 23);
                break;
        }
    };
    return GodWeaponWin;
}(BaseEuiView));
__reflect(GodWeaponWin.prototype, "GodWeaponWin");
ViewManager.ins().reg(GodWeaponWin, LayerManager.UI_Main);
//# sourceMappingURL=GodWeaponWin.js.map