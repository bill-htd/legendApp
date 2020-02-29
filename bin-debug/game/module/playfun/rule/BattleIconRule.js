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
var BattleIconRule = (function (_super) {
    __extends(BattleIconRule, _super);
    function BattleIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this._time = 0;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            BattleCC.ins().postOpenInfo
        ];
        return _this;
    }
    BattleIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this._timeTxt = new eui.Label();
        this._timeTxt.x = 0;
        this._timeTxt.y = 70;
        this._timeTxt.width = 70;
        this._timeTxt.textAlign = "center";
        this._timeTxt.text = "";
        this._timeTxt.size = 14;
        this._timeTxt.textColor = 0x00FF00;
        t.addChild(this._timeTxt);
        if (BattleCC.ins().isOpen) {
            this._timeTxt.text = "进行中";
        }
        else {
            var leftTime = BattleCC.ins().getOpenLeftTime();
            if (leftTime > 0) {
                this._time = leftTime;
                this._timeTxt.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
                if (!TimerManager.ins().isExists(this.setRepeat, this))
                    TimerManager.ins().doTimer(1000, 0, this.setRepeat, this);
            }
        }
        return t;
    };
    BattleIconRule.prototype.checkShowIcon = function () {
        TimerManager.ins().removeAll(this);
        if (!OpenSystem.ins().checkSysOpen(SystemType.BATTLE))
            return false;
        if (BattleCC.ins().isOpen) {
            return true;
        }
        else {
            var leftTime = BattleCC.ins().getOpenLeftTime();
            if (leftTime > 0) {
                this._time = leftTime;
                if (!TimerManager.ins().isExists(this.setRepeat, this))
                    TimerManager.ins().doTimer(1000, 0, this.setRepeat, this);
                return true;
            }
        }
        return false;
    };
    BattleIconRule.prototype.setRepeat = function () {
        this._time--;
        if (this._time > 0)
            this._timeTxt.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
        else {
            this._timeTxt.text = "进行中";
            TimerManager.ins().removeAll(this);
        }
    };
    BattleIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    BattleIconRule.prototype.getEffName = function (redPointNum) {
        this.effX = 38;
        this.effY = 38;
        return "actIconCircle";
    };
    BattleIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(FbWin, 3);
        this.update();
    };
    return BattleIconRule;
}(RuleIconBase));
__reflect(BattleIconRule.prototype, "BattleIconRule");
//# sourceMappingURL=BattleIconRule.js.map