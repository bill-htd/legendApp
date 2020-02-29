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
var TreasureIconRule = (function (_super) {
    __extends(TreasureIconRule, _super);
    function TreasureIconRule(id, t) {
        if (t === void 0) { t = null; }
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserZs.ins().postZsLv,
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            GameServer.ins().postServerOpenDay,
        ];
        _this.updateMessage = [
            UserBag.ins().postItemAdd,
            UserBag.ins().postHuntStore,
            Heirloom.ins().postHuntBoxInfo,
        ];
        return _this;
    }
    TreasureIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.TREASURE);
    };
    TreasureIconRule.prototype.checkShowRedPoint = function () {
        if (Setting.ins().getValue(ClientSet.firstClickTreasure) != new Date(GameServer.serverTime).getDate()) {
            return 1;
        }
        if (Boolean(UserBag.ins().getHuntGoods(0).length) || Boolean(UserBag.ins().getHuntGoods(1).length) || Rune.ins().getIsGetBox() ||
            (Heirloom.ins().isHeirloomHuntOpen() && (Boolean(UserBag.ins().getHuntGoods(2).length) || Heirloom.ins().getIsGetBox())) ||
            RuneRedPointMgr.ins().checkCanExchange())
            return 1;
        return 0;
    };
    TreasureIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(TreasureHuntWin);
        var date = new Date(GameServer.serverTime).getDate();
        if (Setting.ins().getValue(ClientSet.firstClickTreasure) != date) {
            Setting.ins().setValue(ClientSet.firstClickTreasure, date);
            this.update();
        }
    };
    return TreasureIconRule;
}(RuleIconBase));
__reflect(TreasureIconRule.prototype, "TreasureIconRule");
//# sourceMappingURL=TreasureIconRule.js.map