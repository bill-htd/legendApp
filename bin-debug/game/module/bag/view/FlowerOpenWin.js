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
var FlowerOpenWin = (function (_super) {
    __extends(FlowerOpenWin, _super);
    function FlowerOpenWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "flowerOpenSkin";
        return _this;
    }
    FlowerOpenWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = FlowerRewardItemRender;
    };
    FlowerOpenWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.addTouchEvent(this.closeBtn0, this.onTouch);
        this.observe(UserFb.ins().postTeamFbFlowarRecords, this.update);
        this.update();
    };
    FlowerOpenWin.prototype.close = function () {
        this.removeTouchEvent(this.closeBtn, this.onTouch);
        this.removeTouchEvent(this.closeBtn0, this.onTouch);
        this.removeObserve();
        UserFb.ins().clearTfFlowerRecords();
        var win = ViewManager.ins().getView(PlayFunView);
        if (win)
            win.removeFlowerItem();
    };
    FlowerOpenWin.prototype.update = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.list.dataProvider = this._collect;
        }
        var source = UserFb.ins().tfFlowerRecords.concat();
        source.reverse();
        this._collect.source = source;
        var len = source.length;
        var total = 0;
        for (var i = 0; i < len; i++)
            total += (source[i].count * GlobalConfig.TeamFuBenBaseConfig.flowerChiv);
        this.charmCount.text = "你的魅力提高了 " + total + " 点";
    };
    FlowerOpenWin.prototype.onTouch = function (e) {
        ViewManager.ins().close(this);
    };
    return FlowerOpenWin;
}(BaseEuiView));
__reflect(FlowerOpenWin.prototype, "FlowerOpenWin");
ViewManager.ins().reg(FlowerOpenWin, LayerManager.UI_Popup);
//# sourceMappingURL=FlowerOpenWin.js.map