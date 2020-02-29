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
var DoubleEleventWin = (function (_super) {
    __extends(DoubleEleventWin, _super);
    function DoubleEleventWin() {
        var _this = _super.call(this) || this;
        _this._selectIndex = 0;
        _this.skinName = "doubleElevenWin";
        _this.isTopLevel = true;
        _this.DETimeBuySkin.activityIDs = [150, 151, 152, 153];
        _this.DEFanliSkin.activityID = 156;
        _this.DEDailyGiftSkin.activityID = 130;
        _this._panels = [_this.DETimeBuySkin, _this.DEFanliSkin, _this.DEDailyGiftSkin];
        return _this;
    }
    DoubleEleventWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var datas = [];
        var btnNames = [];
        var data;
        var ids = [150, 156, 130];
        for (var k_1 in Activity.ins().doubleElevenData) {
            data = Activity.ins().getbtnInfo(k_1);
            if (btnNames.indexOf(data.icon) == -1) {
                datas.push(data);
                btnNames.push(data.icon);
            }
        }
        btnNames.length = 0;
        btnNames = null;
        var panels = [];
        datas.sort(this.sort);
        for (var k in datas) {
            data = datas[k];
            panels.push(this._panels[ids.indexOf(data.id)]);
        }
        this.BtnArr = datas;
        this.dataArr = new eui.ArrayCollection();
        this.dataArr.source = this.BtnArr;
        this.menuList.itemRenderer = ActivityBtnRenderer;
        this.menuList.dataProvider = this.dataArr;
        this._panels = panels;
        this.viewStack.removeChildren();
        var len = panels.length;
        for (var i = 0; i < len; i++)
            this.viewStack.addChild(this._panels[i]);
        this._panels[this._selectIndex].open();
        this.menuList.selectedIndex = this._selectIndex;
        this.viewStack.selectedIndex = this._selectIndex;
        Activity.ins().setPalyEffListById(this._panels[this._selectIndex].activityID, true);
        this.viewStack.validateNow();
        this.menuList.validateNow();
    };
    DoubleEleventWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addChangeEvent(this.menuList, this.onClickMenu);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.observe(Activity.ins().postActivityIsGetAwards, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRecharge, this.refushRedPoint);
        this.observe(Recharge.ins().postRechargeTotalDay, this.refushRedPoint);
        this.observe(Recharge.ins().postUpdateRechargeEx, this.refushRedPoint);
        this.observe(Actor.ins().postYbChange, this.refushRedPoint);
        this.observe(Actor.ins().postLevelChange, this.refushRedPoint);
        this.refushRedPoint();
    };
    DoubleEleventWin.prototype.close = function () {
        for (var i = 0; i < this.viewStack.numChildren; i++) {
            this.viewStack.getChildAt(i)['close']();
        }
    };
    DoubleEleventWin.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    DoubleEleventWin.prototype.refushRedPoint = function () {
        this.dataArr.replaceAll(this.BtnArr);
        this.menuList.dataProvider = this.dataArr;
    };
    DoubleEleventWin.prototype.sort = function (a, b) {
        if (a.sort > b.sort)
            return 1;
        else if (a.sort < b.sort)
            return -1;
        else
            return 0;
    };
    DoubleEleventWin.prototype.onClickMenu = function (e) {
        if (this._selectIndex != e.currentTarget.selectedIndex) {
            SoundUtil.ins().playEffect(SoundUtil.WINDOW);
            this._panels[this._selectIndex].close();
        }
        this._selectIndex = e.currentTarget.selectedIndex;
        this._panels[this._selectIndex].open();
        this.viewStack.selectedIndex = this._selectIndex;
        Activity.ins().setPalyEffListById(this._panels[this._selectIndex].activityID, true);
    };
    return DoubleEleventWin;
}(BaseEuiView));
__reflect(DoubleEleventWin.prototype, "DoubleEleventWin");
ViewManager.ins().reg(DoubleEleventWin, LayerManager.UI_Main);
//# sourceMappingURL=DoubleEleventWin.js.map