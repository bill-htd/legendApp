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
var FbBtnIconRule = (function (_super) {
    __extends(FbBtnIconRule, _super);
    function FbBtnIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            GameLogic.ins().postEnterMap,
            Actor.ins().postLevelChange,
            UserTask.ins().postUpdteTaskTrace,
        ];
        _this.updateMessage = [
            FbRedPoint.ins().postRedPoint,
        ];
        return _this;
    }
    FbBtnIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.FB) && !UserFb.ins().pkGqboss;
    };
    FbBtnIconRule.prototype.checkShowRedPoint = function () {
        return FbRedPoint.ins().redpoint ? 1 : 0;
    };
    FbBtnIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(FbWin);
    };
    return FbBtnIconRule;
}(RuleIconBase));
__reflect(FbBtnIconRule.prototype, "FbBtnIconRule");
//# sourceMappingURL=FbBtnIconRule.js.map