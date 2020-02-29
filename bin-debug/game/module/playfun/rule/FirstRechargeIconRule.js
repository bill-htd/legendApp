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
var FirstRechargeIconRule = (function (_super) {
    __extends(FirstRechargeIconRule, _super);
    function FirstRechargeIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            Recharge.ins().postUpdateRecharge,
            Recharge.ins().postUpdateRechargeEx
        ];
        _this.updateMessage = [
            Recharge.ins().postUpdateRecharge,
            Recharge.ins().postUpdateRechargeEx
        ];
        return _this;
    }
    FirstRechargeIconRule.prototype.createTar = function () {
        _super.prototype.createTar.call(this);
        var data = Recharge.ins().getRechargeData(0);
        if (data.num != 2)
            this.tar["icon"] = "zjmshouchong";
        else if (!data.isAwards)
            this.tar["icon"] = "zjmshouchong2";
        else
            this.tar["icon"] = "zjmlibao";
        return this.tar;
    };
    FirstRechargeIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.FIRSTCHARGE)) {
            return false;
        }
        if (Recharge.ins().getCurDailyRechargeIsAllGet()) {
            return false;
        }
        if (this.tar) {
            var data = Recharge.ins().getRechargeData(0);
            if (data.num != 2)
                this.tar["icon"] = "zjmshouchong";
            else if (!data.isAwards)
                this.tar["icon"] = "zjmshouchong2";
            else
                this.tar["icon"] = "zjmlibao";
        }
        return true;
    };
    FirstRechargeIconRule.prototype.checkShowRedPoint = function () {
        var count = 0;
        var data = Recharge.ins().getRechargeData(0);
        if (data.num == 1) {
            count = data.num;
        }
        else if (data.num == 2) {
            var config = Recharge.ins().getCurRechargeConfig();
            for (var k in config) {
                var state = ((data.isAwards >> config[k].index) & 1);
                if (state == 0 && data.curDayPay >= config[k].pay) {
                    return 1;
                }
            }
        }
        return count;
    };
    FirstRechargeIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    FirstRechargeIconRule.prototype.tapExecute = function () {
        var data = Recharge.ins().getRechargeData(0);
        if (data.num == 2) {
            ViewManager.ins().open(Recharge2Win);
        }
        else {
            ViewManager.ins().open(Recharge1Win);
        }
    };
    return FirstRechargeIconRule;
}(RuleIconBase));
__reflect(FirstRechargeIconRule.prototype, "FirstRechargeIconRule");
//# sourceMappingURL=FirstRechargeIconRule.js.map