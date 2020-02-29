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
var RingIconRule = (function (_super) {
    __extends(RingIconRule, _super);
    function RingIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            SpecialRing.ins().postActiveRing,
        ];
        _this.updateMessage = [
            SpecialRing.ins().postActiveRing,
            UserBag.ins().postItemDel,
            UserBag.ins().postItemAdd
        ];
        return _this;
    }
    RingIconRule.prototype.checkShowIcon = function () {
        var b = OpenSystem.ins().checkSysOpen(SystemType.RING);
        if (b) {
            var maxCount = Object.keys(GlobalConfig.ActorExRingConfig).length;
            b = SpecialRing.ins().ringActiNum < maxCount;
        }
        return b;
    };
    RingIconRule.prototype.checkShowRedPoint = function () {
        var flag = SpecialRing.ins().checkHaveUpRing();
        if (flag)
            return 1;
        return 0;
    };
    RingIconRule.prototype.getEffName = function () {
        return undefined;
    };
    RingIconRule.prototype.tapExecute = function () {
        if (SpecialRing.ins().checkRingOpen()) {
            ViewManager.ins().open(RingInfoView);
        }
        else {
            UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u795E\u9F99\u4E4B\u6212 \u540E\u5F00\u542F");
        }
    };
    return RingIconRule;
}(RuleIconBase));
__reflect(RingIconRule.prototype, "RingIconRule");
//# sourceMappingURL=RingIconRule.js.map