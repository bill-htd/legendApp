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
var DoubleElevenIconRule = (function (_super) {
    __extends(DoubleElevenIconRule, _super);
    function DoubleElevenIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postLevelChange,
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postYbChange,
            Recharge.ins().postUpdateRecharge,
            Recharge.ins().postRechargeTotalDay,
            Recharge.ins().postUpdateRechargeEx,
            Activity.ins().postSpecials
        ];
        return _this;
    }
    DoubleElevenIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.DOUBLEELEVEN)) {
            return false;
        }
        var data = Activity.ins().doubleElevenData;
        for (var k in data) {
            if (data[k].isOpenActivity())
                return true;
        }
        return false;
    };
    DoubleElevenIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().doubleElevenData;
        for (var k in data) {
            var actData = data[k];
            if (actData.canReward()) {
                if (Activity.ins().doubleElevenSpecialIDs.indexOf(actData.id) != -1) {
                    if (actData.isSpecialOpen())
                        return 1;
                }
                else if (actData.isOpenActivity())
                    return 1;
            }
        }
        return 0;
    };
    DoubleElevenIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    DoubleElevenIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(DoubleEleventWin);
        this.firstTap = false;
        this.update();
    };
    return DoubleElevenIconRule;
}(RuleIconBase));
__reflect(DoubleElevenIconRule.prototype, "DoubleElevenIconRule");
//# sourceMappingURL=DoubleElevenIconRule.js.map