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
var OSATarget3BigRewardItemRender = (function (_super) {
    __extends(OSATarget3BigRewardItemRender, _super);
    function OSATarget3BigRewardItemRender() {
        return _super.call(this) || this;
    }
    OSATarget3BigRewardItemRender.prototype.setData = function (actId, index) {
        this.reward.touchEnabled = false;
        var config = GlobalConfig.ActivityType3Config[actId][index];
        var act = Activity.ins().getActivityDataById(actId);
        this.days.text = "\u7D2F\u5145" + act.dabiao[index - 1] + "/" + config.day + "\u5929";
        this.reward.data = config.rewards[0];
        this.reward.isShowName(false);
        if (((act.recrod >> index) & 1) == 1) {
            this.state.visible = true;
        }
        else {
            this.state.visible = false;
        }
    };
    OSATarget3BigRewardItemRender.prototype.showEquipEffect = function (b) {
        if (!b) {
            if (this.EquipEffect)
                DisplayUtils.removeFromParent(this.EquipEffect);
        }
        else {
            this.EquipEffect = this.EquipEffect || new MovieClip();
            this.EquipEffect.touchEnabled = false;
            this.EquipEffect.x = 45;
            this.EquipEffect.y = 48;
            this.EquipEffect.scaleX = 1.6;
            this.EquipEffect.scaleY = 1.6;
            if (!this.EquipEffect.parent)
                this.addChild(this.EquipEffect);
            this.EquipEffect.playFile(RES_DIR_EFF + "quaeff4", -1);
        }
    };
    OSATarget3BigRewardItemRender.prototype.setSelected = function (b) {
        this.select.visible = b;
    };
    return OSATarget3BigRewardItemRender;
}(BaseComponent));
__reflect(OSATarget3BigRewardItemRender.prototype, "OSATarget3BigRewardItemRender");
//# sourceMappingURL=OSATarget3BigRewardItemRender.js.map