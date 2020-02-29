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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WJBattlefieldResultWin = (function (_super) {
    __extends(WJBattlefieldResultWin, _super);
    function WJBattlefieldResultWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "WJBattleDataSkin";
        _this.currentState = "result";
        return _this;
    }
    WJBattlefieldResultWin.prototype.initUI = function () {
        this.myList.itemRenderer = WJBattleDataItem;
        this._myScore = BitmapNumber.ins().createNumPic(0, "1", 5);
        this._myScore.x = 95;
        this._myScore.y = 100;
        this.group.addChild(this._myScore);
        this._enemyScore = BitmapNumber.ins().createNumPic(0, "1", 5);
        this._enemyScore.x = 300;
        this._enemyScore.y = 100;
        this.group.addChild(this._enemyScore);
        this.addExclusionWin(egret.getQualifiedClassName(WJBattlefieldDataWin));
    };
    WJBattlefieldResultWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.upData(args[0], args[1], args[2], args[3]);
    };
    WJBattlefieldResultWin.prototype.upData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var AScores = args[0];
        var BScores = args[1];
        var mydatas = args[2];
        var enemydatas = args[3];
        this.myList.dataProvider = new eui.ArrayCollection(mydatas);
        this.enemyList.dataProvider = new eui.ArrayCollection(enemydatas);
        BitmapNumber.ins().changeNum(this._myScore, AScores, "1", 5);
        BitmapNumber.ins().changeNum(this._enemyScore, BScores, "1", 5);
        if (AScores > BScores) {
            this.myResult.source = "wjBattle_json.wj_winning";
            this.enemyResult.source = "wjBattle_json.wj_fail";
        }
        else {
            this.enemyResult.source = "wjBattle_json.wj_winning";
            this.myResult.source = "wjBattle_json.wj_fail";
        }
    };
    WJBattlefieldResultWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.quitBtn:
                UserFb.ins().sendExitFb();
                break;
        }
    };
    __decorate([
        callLater
    ], WJBattlefieldResultWin.prototype, "upData", null);
    return WJBattlefieldResultWin;
}(BaseEuiView));
__reflect(WJBattlefieldResultWin.prototype, "WJBattlefieldResultWin");
ViewManager.ins().reg(WJBattlefieldResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=WJBattlefieldResultWin.js.map