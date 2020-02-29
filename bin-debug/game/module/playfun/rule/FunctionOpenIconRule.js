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
var FunctionOpenIconRule = (function (_super) {
    __extends(FunctionOpenIconRule, _super);
    function FunctionOpenIconRule(id, icon) {
        var _this = _super.call(this, id, icon) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            GameApp.ins().postZeroInit
        ];
        return _this;
    }
    FunctionOpenIconRule.prototype.createTar = function () {
        var icon = _super.prototype.createTar.call(this);
        this.alertText = new eui.Label();
        this.alertText.size = 14;
        this.alertText.width = 120;
        this.alertText.textAlign = "center";
        this.alertText.textColor = 0x35e62d;
        this.alertText.horizontalCenter = 0;
        icon.addChild(this.alertText);
        this.alertText.y = 70;
        var cfg = ActivityForeshowModel.ins().getForeshow();
        if (cfg) {
            this.dataCfg = cfg;
            if (GameServer.serverOpenDay >= cfg.close) {
                this.alertText.text = "";
            }
            else {
                this.time = this.getLeftTime();
                this.runTime();
                TimerManager.ins().doTimer(1000, 0, this.runTime, this);
            }
            icon['icon'] = cfg.icon;
        }
        return icon;
    };
    FunctionOpenIconRule.prototype.getLeftTime = function () {
        var leftTime = 0;
        if (GameServer.serverOpenDay < this.dataCfg.close) {
            var date = new Date(GameServer.serverTime);
            var day = this.dataCfg.close - GameServer.serverOpenDay;
            date.setDate(date.getDate() + day);
            date.setHours(0, 0, 0, 0);
            leftTime = Math.floor((date.getTime() - GameServer.serverTime) / 1000);
        }
        return leftTime;
    };
    FunctionOpenIconRule.prototype.runTime = function () {
        var time = this.time;
        this.time -= 1;
        if (time > 0) {
            this.alertText.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_12);
        }
        else {
            this.alertText.text = "";
            TimerManager.ins().remove(this.runTime, this);
            this.updateShow();
        }
    };
    FunctionOpenIconRule.prototype.checkShowIcon = function () {
        var isShow = false;
        var cfg = ActivityForeshowModel.ins().getForeshow();
        if (cfg) {
            isShow = true;
        }
        return isShow;
    };
    FunctionOpenIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    FunctionOpenIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(ActivityForeshowWin);
    };
    return FunctionOpenIconRule;
}(RuleIconBase));
__reflect(FunctionOpenIconRule.prototype, "FunctionOpenIconRule");
//# sourceMappingURL=FunctionOpenIconRule.js.map