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
var FindEnemyWin = (function (_super) {
    __extends(FindEnemyWin, _super);
    function FindEnemyWin() {
        return _super.call(this) || this;
    }
    FindEnemyWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZaoYuTip0Skin";
    };
    FindEnemyWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn0, this.closeCB);
        this.addTouchEvent(this.cancel, this.closeCB);
        this.addTouchEvent(this.ok, this.buy);
        this.updateView();
    };
    FindEnemyWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn0, this.closeCB);
        this.removeTouchEvent(this.cancel, this.closeCB);
        this.removeTouchEvent(this.ok, this.buy);
    };
    FindEnemyWin.prototype.updateView = function () {
        this.yuanbao.text = GlobalConfig.SkirmishBaseConfig.refreshCost + "元宝";
        this.count.text = "（本日已主动寻找" + EncounterModel.refreshTimes + "次对手）";
    };
    FindEnemyWin.prototype.closeCB = function (e) {
        ViewManager.ins().close(this);
    };
    FindEnemyWin.prototype.buy = function (e) {
        if (Actor.yb >= GlobalConfig.SkirmishBaseConfig.refreshCost) {
            Encounter.ins().sendRefresh();
            Encounter.ins().postZaoYuRecord();
            ViewManager.ins().close(this);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    return FindEnemyWin;
}(BaseEuiView));
__reflect(FindEnemyWin.prototype, "FindEnemyWin");
ViewManager.ins().reg(FindEnemyWin, LayerManager.UI_Main);
//# sourceMappingURL=FindEnemyWin.js.map