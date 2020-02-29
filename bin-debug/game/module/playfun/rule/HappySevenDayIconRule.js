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
var HappySevenDayIconRule = (function (_super) {
    __extends(HappySevenDayIconRule, _super);
    function HappySevenDayIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this._activityID = 0;
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards
        ];
        return _this;
    }
    HappySevenDayIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.HAPPYSEVENDAY))
            return false;
        var data = Activity.ins().activityData;
        var sum = Object.keys(data);
        if (!sum || !sum.length)
            return false;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.HAPPYSEVENDAY) {
                if (actData.isOpenActivity() && !actData.getHide()) {
                    this._activityID = (+k);
                    return true;
                }
            }
        }
        return false;
    };
    HappySevenDayIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.HAPPYSEVENDAY) {
                if (actData.isOpenActivity() && actData.canReward() && !actData.getHide())
                    return 1;
            }
        }
        return 0;
    };
    HappySevenDayIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    HappySevenDayIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(HappySevenDayWin, this._activityID);
        if (this.firstTap) {
            this.firstTap = false;
            this.update();
        }
    };
    return HappySevenDayIconRule;
}(RuleIconBase));
__reflect(HappySevenDayIconRule.prototype, "HappySevenDayIconRule");
//# sourceMappingURL=HappySevenDayIconRule.js.map