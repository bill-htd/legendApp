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
var NewWorldBossIconRule = (function (_super) {
    __extends(NewWorldBossIconRule, _super);
    function NewWorldBossIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = _this.updateMessage = [
            UserBoss.ins().postNewBossOpen
        ];
        return _this;
    }
    NewWorldBossIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.alertText = new eui.Label();
        this.alertText.size = 14;
        this.alertText.width = 120;
        this.alertText.textAlign = "center";
        this.alertText.textColor = 0x35e62d;
        this.alertText.horizontalCenter = 0;
        t.addChild(this.alertText);
        this.alertText.y = 70;
        if (UserBoss.ins().newWorldBossData.startTime) {
            this.runTime();
            if (!TimerManager.ins().isExists(this.runTime, this))
                TimerManager.ins().doTimer(1000, 0, this.runTime, this);
        }
        else {
            this.alertText.text = "活动结束";
        }
        return t;
    };
    NewWorldBossIconRule.prototype.runTime = function () {
        var time = Math.floor((UserBoss.ins().newWorldBossData.startTime - GameServer.serverTime) / 1000);
        if (time >= 0) {
            this.alertText.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_12);
        }
        else if (GlobalConfig.NewWorldBossBaseConfig.bossTime * 1000 + UserBoss.ins().newWorldBossData.startTime > GameServer.serverTime) {
            this.alertText.text = "";
        }
        else {
            this.alertText.text = "活动结束";
            TimerManager.ins().remove(this.runTime, this);
            this.updateShow();
        }
    };
    NewWorldBossIconRule.prototype.checkShowIcon = function () {
        if (!GameServer.serverOpenDay)
            return false;
        var b = UserBoss.ins().newWorldBossData.isOpen;
        if (b && UserBoss.ins().newWorldBossData.startTime) {
            if (!TimerManager.ins().isExists(this.runTime, this))
                TimerManager.ins().doTimer(1000, 0, this.runTime, this);
        }
        return b;
    };
    NewWorldBossIconRule.prototype.checkShowRedPoint = function () {
        return GameServer.serverTime > UserBoss.ins().newWorldBossData.startTime && (GlobalConfig.NewWorldBossBaseConfig.bossTime * 1000 + UserBoss.ins().newWorldBossData.startTime > GameServer.serverTime) ? 1 : 0;
    };
    NewWorldBossIconRule.prototype.getEffName = function () {
        if (this.checkShowRedPoint()) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return "";
    };
    NewWorldBossIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(NewWorldBossWin);
    };
    return NewWorldBossIconRule;
}(RuleIconBase));
__reflect(NewWorldBossIconRule.prototype, "NewWorldBossIconRule");
//# sourceMappingURL=NewWorldBossIconRule.js.map