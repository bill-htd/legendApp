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
var SpringEightDayIconRule = (function (_super) {
    __extends(SpringEightDayIconRule, _super);
    function SpringEightDayIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this._activityID = 0;
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
        ];
        return _this;
    }
    SpringEightDayIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.SPRINGEIGHTDAY))
            return false;
        var data = Activity.ins().activityData;
        var sum = Object.keys(data);
        if (!sum || !sum.length)
            return false;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.SPRINGEIGHTDAY) {
                if (actData.isOpenActivity() && !actData.getHide()) {
                    this._activityID = (+k);
                    return true;
                }
            }
        }
        return false;
    };
    SpringEightDayIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.SPRINGEIGHTDAY) {
                if (actData.isOpenActivity() && actData.canReward() && !actData.getHide())
                    return 1;
            }
        }
        return 0;
    };
    SpringEightDayIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    SpringEightDayIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(SpringEightDayWin, this._activityID);
        if (this.firstTap) {
            this.firstTap = false;
            this.update();
        }
    };
    return SpringEightDayIconRule;
}(RuleIconBase));
__reflect(SpringEightDayIconRule.prototype, "SpringEightDayIconRule");
//# sourceMappingURL=SpringEightDayIconRule.js.map