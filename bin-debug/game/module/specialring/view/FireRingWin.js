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
var FireRingWin = (function (_super) {
    __extends(FireRingWin, _super);
    function FireRingWin() {
        var _this = _super.call(this) || this;
        _this.lastSelect = 0;
        _this.skinName = "LYRingSkin";
        _this.isTopLevel = true;
        return _this;
    }
    FireRingWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.lastSelect = param[0] || 0;
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.tab.addEventListener(egret.Event.CHANGE, this.setSelectedIndex, this);
        this.tab.selectedIndex = this.lastSelect;
        this.viewStack.selectedIndex = this.lastSelect;
        this.viewStack.getElementAt(this.lastSelect)['open']();
        this.checkPoint();
        this.observe(SpecialRing.ins().postSRStairUp, this.checkPoint);
        this.observe(SpecialRing.ins().postSkillInfo, this.checkPoint);
        this.observe(UserFb.ins().postFbRingInfo, this.checkPoint);
        this.observe(UserBag.ins().postItemAdd, this.checkPoint);
        this.observe(UserBag.ins().postItemDel, this.checkPoint);
        this.observe(UserBag.ins().postItemCountChange, this.checkPoint);
        this.observe(LyMark.ins().postMarkData, this.checkPoint);
    };
    FireRingWin.prototype.close = function () {
        this.removeObserve();
        this.removeEventListener(egret.Event.CHANGING, this.onTabTouching, this.tab);
        this.removeEventListener(egret.Event.CHANGE, this.setSelectedIndex, this);
        if (this.viewStack.getElementAt(this.lastSelect))
            this.viewStack.getElementAt(this.lastSelect)['close']();
    };
    FireRingWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    FireRingWin.prototype.checkIsOpen = function (index) {
        if (index == 3 && !LyMark.ins().checkOpen()) {
            UserTips.ins().showTips("\u70C8\u7130\u6212\u6307\u8FBE\u5230" + GlobalConfig.FlameStamp.openLevel + "\u7EA7\u5F00\u542F");
            return false;
        }
        return true;
    };
    FireRingWin.prototype.setSelectedIndex = function (e) {
        this.viewStack.getElementAt(this.lastSelect)['close']();
        this.lastSelect = this.viewStack.selectedIndex;
        this.viewStack.getElementAt(this.lastSelect)['open']();
    };
    FireRingWin.prototype.checkPoint = function () {
        this.redPoint0.visible = SpecialRing.ins().checkHaveUpRing();
        this.redPoint1.visible = SpecialRing.ins().isCanStudySkill() || SpecialRing.ins().isCanUpgradeSkill();
        this.redPoint2.visible = SpecialRing.ins().fireRingRedPoint();
        this.redPoint3.visible = LyMark.ins().checkRed();
    };
    return FireRingWin;
}(BaseEuiView));
__reflect(FireRingWin.prototype, "FireRingWin");
ViewManager.ins().reg(FireRingWin, LayerManager.UI_Main);
//# sourceMappingURL=FireRingWin.js.map