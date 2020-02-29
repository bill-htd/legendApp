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
var FireRingAbilityItem = (function (_super) {
    __extends(FireRingAbilityItem, _super);
    function FireRingAbilityItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FireRingAbilityItem.prototype.dataChanged = function () {
        var index = this.data;
        var cfg = GlobalConfig.ActorExRingAbilityConfig[index];
        this.nameTxt.text = cfg.abilityName;
        this.descLabel.textFlow = TextFlowMaker.generateTextFlow(cfg.abilityDesc);
        this.imgIcon.source = cfg.abilityIcon;
        var ringData = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
        var stage = SpecialRing.ins().getRingStair(ringData.level);
        if (stage >= cfg.ringLv) {
            this.stateLabel.text = "";
        }
        else {
            this.stateLabel.text = "(" + SpecialRing.ins().getUnLockStage(index) + "阶解锁)";
            this.stateLabel.textColor = ColorUtil.RED_COLOR_N;
        }
    };
    return FireRingAbilityItem;
}(ItemRenderer));
__reflect(FireRingAbilityItem.prototype, "FireRingAbilityItem");
//# sourceMappingURL=FireRingAbilityItem.js.map