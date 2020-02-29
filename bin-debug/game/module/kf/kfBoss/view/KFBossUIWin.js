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
var KFBossUIWin = (function (_super) {
    __extends(KFBossUIWin, _super);
    function KFBossUIWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KFbossUISkin";
        _this.attackList.itemRenderer = TargetMemberHeadRender;
        _this.attackedList.itemRenderer = TargetMemberHeadRender;
        return _this;
    }
    KFBossUIWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    KFBossUIWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return KFBossUIWin;
}(BaseEuiView));
__reflect(KFBossUIWin.prototype, "KFBossUIWin");
ViewManager.ins().reg(KFBossUIWin, LayerManager.UI_Main);
//# sourceMappingURL=KFBossUIWin.js.map