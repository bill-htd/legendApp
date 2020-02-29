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
var BossRewardsItem = (function (_super) {
    __extends(BossRewardsItem, _super);
    function BossRewardsItem() {
        return _super.call(this) || this;
    }
    BossRewardsItem.prototype.dataChanged = function () {
        var rewards = this.data.rewards;
        this.experience.data = rewards[0];
        this.randomRune.data = rewards[1];
        this.runeCream.data = rewards[2];
        var model = SkyLevelModel.ins();
        var nextCfg = model.getNextOpenLevel();
        if (nextCfg) {
            if (!this.target.data) {
                this.target.data = nextCfg.showIcon;
            }
            var curCfg = GlobalConfig.FbChallengeConfig[model.cruLevel];
            var cfg = GlobalConfig.ItemConfig[nextCfg.showIcon];
            var runeType = ItemConfig.getQuality(cfg);
            var endstr = "层解锁";
            if (runeType == FBChallengePanel.RunType)
                endstr = "\u5C42\u83B7\u5F97";
            if (curCfg.group == nextCfg.group)
                this.leftlabel.text = "" + nextCfg.layer + endstr;
            else
                this.leftlabel.text = "\u518D\u95EF" + (nextCfg.id - curCfg.id) + endstr;
        }
        this.labelGroup.visible = this.target.visible = nextCfg && GameMap.fbType != UserFb.FB_TYPE_HUN_SHOU;
    };
    return BossRewardsItem;
}(BaseItemRender));
__reflect(BossRewardsItem.prototype, "BossRewardsItem");
//# sourceMappingURL=BossRewards.js.map