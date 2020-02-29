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
var DoubleTwelveActivityIconRule = (function (_super) {
    __extends(DoubleTwelveActivityIconRule, _super);
    function DoubleTwelveActivityIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            Activity.ins().postActivityIsGetAwards,
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
        ];
        return _this;
    }
    DoubleTwelveActivityIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.DOUBLE_TWELVE)) {
            return false;
        }
        var data = Activity.ins().doubleTwelveData;
        for (var k in data) {
            if (data[k].isOpenActivity())
                return true;
        }
        return false;
    };
    DoubleTwelveActivityIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().doubleTwelveData;
        for (var i in data) {
            if (data[i].isOpenActivity() && data[i].type == 9) {
                for (var j = 0; j < 3; j++) {
                    if (Activity.ins().isGetRollReward(data[i].id, j))
                        return 1;
                }
            }
        }
        return 0;
    };
    DoubleTwelveActivityIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    DoubleTwelveActivityIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(DoubleTwelveWin);
        this.firstTap = false;
        this.update();
    };
    return DoubleTwelveActivityIconRule;
}(RuleIconBase));
__reflect(DoubleTwelveActivityIconRule.prototype, "DoubleTwelveActivityIconRule");
//# sourceMappingURL=DoubleTwelveActivityIconRule.js.map