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
var WJBattlefieldDataWin = (function (_super) {
    __extends(WJBattlefieldDataWin, _super);
    function WJBattlefieldDataWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "WJBattleDataSkin";
        _this.currentState = "data";
        return _this;
    }
    WJBattlefieldDataWin.prototype.initUI = function () {
        this.myList.itemRenderer = WJBattleDataItem;
        this._myScore = BitmapNumber.ins().createNumPic(0, "1", 5);
        this._myScore.x = 95;
        this._myScore.y = 100;
        this.group.addChild(this._myScore);
        this._enemyScore = BitmapNumber.ins().createNumPic(0, "1", 5);
        this._enemyScore.x = 300;
        this._enemyScore.y = 100;
        this.group.addChild(this._enemyScore);
    };
    WJBattlefieldDataWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        var mydatas = args[0];
        var enemydatas = args[1];
        this.myList.dataProvider = new eui.ArrayCollection(mydatas);
        this.enemyList.dataProvider = new eui.ArrayCollection(enemydatas);
        BitmapNumber.ins().changeNum(this._myScore, WJBattlefieldSys.ins().campAScores, "1", 5);
        BitmapNumber.ins().changeNum(this._enemyScore, WJBattlefieldSys.ins().campBScores, "1", 5);
    };
    WJBattlefieldDataWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        WatcherUtil.removeFromArrayCollection(this.myList.dataProvider);
        this.myList.dataProvider = null;
        WatcherUtil.removeFromArrayCollection(this.enemyList.dataProvider);
        this.enemyList.dataProvider = null;
    };
    WJBattlefieldDataWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return WJBattlefieldDataWin;
}(BaseEuiView));
__reflect(WJBattlefieldDataWin.prototype, "WJBattlefieldDataWin");
ViewManager.ins().reg(WJBattlefieldDataWin, LayerManager.UI_Popup);
//# sourceMappingURL=WJBattlefieldDataWin.js.map