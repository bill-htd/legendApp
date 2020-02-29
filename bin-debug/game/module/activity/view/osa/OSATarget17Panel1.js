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
var OSATarget17Panel1 = (function (_super) {
    __extends(OSATarget17Panel1, _super);
    function OSATarget17Panel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "luckyStarSkin";
        return _this;
    }
    OSATarget17Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.$onClose();
        TimerManager.ins().removeAll(this);
    };
    OSATarget17Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.luckyzp, this.gotoLuckTurn);
        this.addTouchEvent(this.help, this.openHelp);
        this.updateData();
        this.refRedpoint();
    };
    OSATarget17Panel1.prototype.updateData = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (!data)
            return;
        var config1 = GlobalConfig.ActivityType17_1Config[this.activityID];
        this.inte.text = data.score + "";
        this.recharge.text = data.curRecharge + "";
        this.endtime.text = data.overDay + "\u5929";
        var addScore = 0;
        for (var n in data.actStar) {
            addScore += data.actStar[n] * config1[n].score;
            for (var i = 1; i <= config1[n].star; i++) {
                var indexStr = i < 10 ? "0" + i : i + "";
                if (i <= data.actStar[n]) {
                    this["star" + (parseInt(n) - 1) + indexStr].source = "star" + (parseInt(n) + 3);
                }
                else
                    this["star" + (parseInt(n) - 1) + indexStr].source = "star1";
            }
        }
        var totalScore = 0;
        for (var key in config1) {
            totalScore += config1[key].score * config1[key].star;
        }
        this.accinte.text = addScore + "/" + totalScore;
    };
    OSATarget17Panel1.prototype.gotoLuckTurn = function () {
        if (this.showPanel)
            this.showPanel(2);
    };
    OSATarget17Panel1.prototype.openHelp = function () {
        ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[26].text);
    };
    OSATarget17Panel1.prototype.refRedpoint = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (data)
            this.redPoint.visible = data.checkRedPoint();
    };
    return OSATarget17Panel1;
}(ActivityPanel));
__reflect(OSATarget17Panel1.prototype, "OSATarget17Panel1");
//# sourceMappingURL=OSATarget17Panel1.js.map