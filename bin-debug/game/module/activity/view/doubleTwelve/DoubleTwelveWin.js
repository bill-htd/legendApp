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
var DoubleTwelveWin = (function (_super) {
    __extends(DoubleTwelveWin, _super);
    function DoubleTwelveWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "doubleTwelveWin";
        _this.isTopLevel = true;
        return _this;
    }
    DoubleTwelveWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.menuList.itemRenderer = ActivityBtnRenderer;
        this.addChangeEvent(this.menuList, this.onClickMenu);
        this.addTouchEvent(this.closeBtn, this.closeWin);
        this.observe(Activity.ins().postChangePage, this.updateView);
        this.observe(Activity.ins().postRewardResult, this.updateView);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateView);
        this.updateView();
    };
    DoubleTwelveWin.prototype.close = function () {
        for (var i = 0; i < this.viewStack.numChildren; i++) {
            this.viewStack.getChildAt(i)['close']();
        }
    };
    DoubleTwelveWin.prototype.updateView = function () {
        var btnIcons = [];
        for (var i in Activity.ins().doubleTwelveData) {
            var data = Activity.ins().getbtnInfo(i);
            var activity = Activity.ins().doubleTwelveData[i];
            if (activity.isOpenActivity()) {
                btnIcons.push(data);
                if (activity.type == 2) {
                    this.DTDailyGiftSkin.activityID = activity.id;
                }
                else {
                    this.DTLuckyTurntableSkin.activityID = activity.id;
                }
            }
        }
        btnIcons.sort(function (obj1, obj2) {
            return Algorithm.sortAscAttr(obj1, obj2, "sort");
        });
        this.menuList.dataProvider = new ArrayCollection(btnIcons);
        this.panels = [this.DTDailyGiftSkin, this.DTLuckyTurntableSkin];
        if (!this.selectIndex) {
            this.selectIndex = 0;
        }
        this.viewStack.selectedIndex = this.selectIndex;
        this.panels[this.selectIndex].open();
    };
    DoubleTwelveWin.prototype.closeWin = function (e) {
        ViewManager.ins().close(DoubleTwelveWin);
    };
    DoubleTwelveWin.prototype.onClickMenu = function (e) {
        if (this.selectIndex != e.currentTarget.selectedIndex) {
            SoundUtil.ins().playEffect(SoundUtil.WINDOW);
            this.panels[this.selectIndex].close();
        }
        this.selectIndex = e.currentTarget.selectedIndex;
        this.viewStack.selectedIndex = this.selectIndex;
        this.panels[this.selectIndex].open();
        Activity.ins().setPalyEffListById(this.panels[this.selectIndex].activityID, true);
    };
    return DoubleTwelveWin;
}(BaseEuiView));
__reflect(DoubleTwelveWin.prototype, "DoubleTwelveWin");
ViewManager.ins().reg(DoubleTwelveWin, LayerManager.UI_Main);
//# sourceMappingURL=DoubleTwelveWin.js.map