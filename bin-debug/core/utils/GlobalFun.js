var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GlobalFun = (function () {
    function GlobalFun() {
    }
    GlobalFun.checkMoney = function (num, moneyType, noTips, backFun) {
        if (moneyType === void 0) { moneyType = MoneyConst.yuanbao; }
        if (noTips === void 0) { noTips = ""; }
        switch (moneyType) {
            case MoneyConst.gold:
                if (Actor.gold >= num)
                    return true;
                if (noTips == "")
                    noTips = "\u91D1\u5E01\u4E0D\u8DB3";
                UserTips.ins().showTips(noTips);
                break;
            case MoneyConst.yuanbao:
                if (Actor.yb >= num)
                    return true;
                if (noTips == "")
                    noTips = "\u5143\u5B9D\u4E0D\u8DB3";
                UserTips.ins().showTips(noTips);
                if (!KFServerSys.ins().isKF) {
                    var w = WarnWin.show("\u5143\u5B9D\u4E0D\u8DB3\uFF0C\u662F\u5426\u524D\u5F80\u5145\u503C\uFF1F", null, null, function () {
                        var rdata = Recharge.ins().getRechargeData(0);
                        if (!rdata || rdata.num != 2) {
                            ViewManager.ins().open(Recharge1Win);
                        }
                        else {
                            ViewManager.ins().open(ChargeFirstWin);
                        }
                        if (backFun && typeof backFun == "function")
                            backFun();
                    });
                    w.setBtnLabel("\u53D6\u6D88", "\u524D\u5F80");
                }
            default:
                debug.log("\u68C0\u67E5\u8D27\u5E01\u7C7B\u578B\u4E0D\u5BF9\uFF0C\u8BF7\u68C0\u67E5=", moneyType);
                return false;
        }
        return false;
    };
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map