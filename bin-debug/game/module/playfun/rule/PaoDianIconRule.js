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
var PaoDianIconRule = (function (_super) {
    __extends(PaoDianIconRule, _super);
    function PaoDianIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this._time = 0;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            PaoDianCC.ins().postOpenInfo
        ];
        return _this;
    }
    PaoDianIconRule.prototype.createTar = function () {
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
        if (PaoDianCC.ins().isOpen) {
            this._timeTxt.text = "进行中";
        }
        else {
            var leftTime = PaoDianCC.ins().getOpenLeftTime();
            if (leftTime > 0) {
                this._time = leftTime;
                this._timeTxt.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
                if (!TimerManager.ins().isExists(this.setRepeat, this))
                    TimerManager.ins().doTimer(1000, 0, this.setRepeat, this);
            }
        }
        return t;
    };
    PaoDianIconRule.prototype.checkShowIcon = function () {
        TimerManager.ins().removeAll(this);
        if (!OpenSystem.ins().checkSysOpen(SystemType.PAODIAN))
            return false;
        if (PaoDianCC.ins().isOpen) {
            return true;
        }
        else {
            var leftTime = PaoDianCC.ins().getOpenLeftTime();
            if (leftTime > 0) {
                this._time = leftTime;
                if (!TimerManager.ins().isExists(this.setRepeat, this))
                    TimerManager.ins().doTimer(1000, 0, this.setRepeat, this);
                return true;
            }
        }
        return false;
    };
    PaoDianIconRule.prototype.setRepeat = function () {
        this._time--;
        if (this._time > 0)
            this._timeTxt.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
        else {
            this._timeTxt.text = "进行中";
            TimerManager.ins().removeAll(this);
        }
    };
    PaoDianIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    PaoDianIconRule.prototype.getEffName = function (redPointNum) {
        this.effX = 38;
        this.effY = 38;
        return "actIconCircle";
    };
    PaoDianIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(FbWin, 3);
        this.update();
    };
    return PaoDianIconRule;
}(RuleIconBase));
__reflect(PaoDianIconRule.prototype, "PaoDianIconRule");
//# sourceMappingURL=PaoDianIconRule.js.map