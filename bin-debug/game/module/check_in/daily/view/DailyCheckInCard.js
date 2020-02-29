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
var DailyCheckInCard = (function (_super) {
    __extends(DailyCheckInCard, _super);
    function DailyCheckInCard() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.checkInState = 0;
        _this.skinName = "DailyCheckInItem";
        return _this;
    }
    DailyCheckInCard.prototype.dataChanged = function () {
        this.resetView();
        var rewardCfg = this.data;
        if (rewardCfg) {
            this.vipFlagGroup.touchChildren = false;
            this.vipFlagGroup.touchEnabled = false;
            this.dayFlagGroup.touchChildren = false;
            this.dayFlagGroup.touchEnabled = false;
            this.complement.touchEnabled = false;
            this.dayFlagGroup.visible = false;
            this.item.data = rewardCfg.rewards[0];
            this.item.touchChildren = false;
            this.item.touchEnabled = false;
            var state = DailyCheckIn.ins().getCheckInState(rewardCfg.day);
            if (state) {
                switch (state) {
                    case DailyCheckInState.canCheck:
                        this.checkInState = DailyCheckInState.canCheck;
                        this.showFlag();
                        break;
                    case DailyCheckInState.hasChecked:
                        this.checkInState = DailyCheckInState.hasChecked;
                        this.showChecked();
                        break;
                }
            }
            else {
                this.showFlag();
                var isComplement = false;
                this.item.touchChildren = !isComplement;
                this.item.touchEnabled = !isComplement;
            }
        }
        this.showEquipEffect();
    };
    DailyCheckInCard.prototype.showEquipEffect = function () {
        var state = DailyCheckIn.ins().getCheckInState(this.data.day);
        if (state != DailyCheckInState.canCheck) {
            if (this.EquipEffect)
                DisplayUtils.removeFromParent(this.EquipEffect);
        }
        else {
            this.EquipEffect = this.EquipEffect || new MovieClip();
            this.EquipEffect.touchEnabled = false;
            this.EquipEffect.x = 50;
            this.EquipEffect.y = 48;
            this.EquipEffect.scaleX = 1.6;
            this.EquipEffect.scaleY = 1.6;
            if (!this.EquipEffect.parent)
                this.addChild(this.EquipEffect);
            this.EquipEffect.playFile(RES_DIR_EFF + "quaeff4", -1);
        }
    };
    DailyCheckInCard.prototype.showChecked = function () {
        this.checked.visible = this.checkedMask.visible = true;
    };
    DailyCheckInCard.prototype.showFlag = function () {
        var rewardCfg = this.data;
        if (rewardCfg) {
            if (rewardCfg.vipLabel > 0) {
                var vipLevel = rewardCfg.vipLabel;
                if (vipLevel > 10)
                    vipLevel = 10;
                var vipCfg = CheckInConfigMgr.ins().getVipCfg_Daily(vipLevel);
                if (vipCfg) {
                    this.vipFlagGroup.visible = true;
                    this.vipLab.text = "V" + vipLevel + "\u53CC\u500D";
                }
            }
            else {
                if (rewardCfg.dayLabel > 0) {
                    this.dayLab.text = rewardCfg.day + "\u5929";
                }
            }
        }
    };
    DailyCheckInCard.prototype.resetView = function () {
        this.complement.visible = false;
        this.vipFlagGroup.visible = false;
        this.dayFlagGroup.visible = false;
        this.checked.visible = this.checkedMask.visible = false;
        if (this.EquipEffect)
            DisplayUtils.removeFromParent(this.EquipEffect);
    };
    DailyCheckInCard.GENE_STRING_LIST = ["零", "一", "双", "三", "四", "五", "六", "七", "八", "九", "十"];
    return DailyCheckInCard;
}(eui.ItemRenderer));
__reflect(DailyCheckInCard.prototype, "DailyCheckInCard");
//# sourceMappingURL=DailyCheckInCard.js.map