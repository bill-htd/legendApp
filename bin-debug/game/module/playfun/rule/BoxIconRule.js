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
var BoxIconRule = (function (_super) {
    __extends(BoxIconRule, _super);
    function BoxIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.updateMessage = [
            Box.ins().postUpdateData,
            Actor.ins().postLevelChange,
            Box.ins().postUpdateFreeBox,
        ];
        return _this;
    }
    BoxIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.alertText = new eui.Label();
        this.alertText.size = 14;
        this.alertText.width = 120;
        this.alertText.textAlign = "center";
        this.alertText.textColor = 0x35e62d;
        this.alertText.horizontalCenter = 0;
        t.addChild(this.alertText);
        this.alertText.y = 70;
        if (BoxModel.ins().checkCanTake()) {
            this.alertText.text = "\u53EF\u9886\u53D6";
        }
        else {
            this.startTime();
            this.runTime();
        }
        return t;
    };
    BoxIconRule.prototype.startTime = function () {
        if (!TimerManager.ins().isExists(this.runTime, this)) {
            TimerManager.ins().doTimer(1000, 0, this.runTime, this);
        }
    };
    BoxIconRule.prototype.removeTime = function () {
        TimerManager.ins().remove(this.runTime, this);
    };
    BoxIconRule.prototype.runTime = function () {
        var time = BoxModel.ins().getMinBoxTime();
        if (time == Number.MAX_VALUE) {
            this.alertText.text = '';
            this.removeTime();
        }
        else if (time <= 0) {
            this.alertText.text = "\u53EF\u9886\u53D6";
            this.removeTime();
            this.update();
        }
        else {
            this.alertText.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_12);
        }
    };
    BoxIconRule.prototype.checkShowIcon = function () {
        return false;
    };
    BoxIconRule.prototype.checkShowRedPoint = function () {
        var flag = BoxModel.ins().checkRedPointShow() || BookRedPoint.ins().redpoint;
        if (flag) {
            return 1;
        }
        return 0;
    };
    BoxIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(BoxBgWin);
    };
    BoxIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    return BoxIconRule;
}(RuleIconBase));
__reflect(BoxIconRule.prototype, "BoxIconRule");
//# sourceMappingURL=BoxIconRule.js.map