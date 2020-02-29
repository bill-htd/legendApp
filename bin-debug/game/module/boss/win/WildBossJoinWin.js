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
var WildBossJoinWin = (function (_super) {
    __extends(WildBossJoinWin, _super);
    function WildBossJoinWin() {
        return _super.call(this) || this;
    }
    WildBossJoinWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WildBossJoinSkin";
        this.list.itemRenderer = WildBossJoinItem;
        this.arrCollect = new eui.ArrayCollection();
    };
    WildBossJoinWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.arrCollect.source = [];
        this.list.dataProvider = this.arrCollect;
    };
    WildBossJoinWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    WildBossJoinWin.prototype.updateRank = function (param) {
        var id = param[0];
        var datas = param[1];
        this.arrCollect.source = datas;
        this.list.dataProvider = this.arrCollect;
    };
    WildBossJoinWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            default:
                break;
        }
    };
    return WildBossJoinWin;
}(BaseEuiView));
__reflect(WildBossJoinWin.prototype, "WildBossJoinWin");
ViewManager.ins().reg(WildBossJoinWin, LayerManager.UI_Main);
//# sourceMappingURL=WildBossJoinWin.js.map