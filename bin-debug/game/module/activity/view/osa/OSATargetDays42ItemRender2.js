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
var OSATargetDays42ItemRender2 = (function (_super) {
    __extends(OSATargetDays42ItemRender2, _super);
    function OSATargetDays42ItemRender2() {
        var _this = _super.call(this) || this;
        _this.skinName = "Days42BigRewardItemSkin";
        return _this;
    }
    OSATargetDays42ItemRender2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATargetDays42ItemRender2.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.days.text = "";
        if (data.awardList.length > 1) {
            this.reward.data = data.awardList[1];
        }
        else {
            this.reward.data = data.awardList[0];
        }
        if (Recharge.ins().rechargeTotal.hasGetDays.length >= 42) {
            this.state.visible = true;
        }
        else if (Recharge.ins().rechargeTotal.hasGetDays.indexOf(data.id) >= 0) {
            this.state.visible = true;
        }
        else {
            this.state.visible = false;
        }
    };
    return OSATargetDays42ItemRender2;
}(BaseItemRender));
__reflect(OSATargetDays42ItemRender2.prototype, "OSATargetDays42ItemRender2");
//# sourceMappingURL=OSATargetDays42ItemRender2.js.map