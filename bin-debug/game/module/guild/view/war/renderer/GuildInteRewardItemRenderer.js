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
var GuildInteRewardItemRenderer = (function (_super) {
    __extends(GuildInteRewardItemRenderer, _super);
    function GuildInteRewardItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildInteRewardItemSkin";
        _this.list.itemRenderer = ItemBase;
        return _this;
    }
    GuildInteRewardItemRenderer.prototype.dataChanged = function () {
        if (this.itemIndex < 3) {
            this.numImg.visible = true;
            this.rankLabel.visible = false;
            this.numImg.source = "guildshop_json.guildpaihang" + (this.itemIndex + 1);
        }
        else {
            this.numImg.visible = false;
            this.rankLabel.visible = true;
            this.rankLabel.text = "\u7B2C" + (this.itemIndex + 1) + "\u540D";
        }
        if (this.data.rank) {
            this.list.dataProvider = new eui.ArrayCollection(this.data.award);
        }
        else {
            this.list.dataProvider = new eui.ArrayCollection(GuildWar.ins().getModel().creatGuildRankReward(this.data));
        }
    };
    return GuildInteRewardItemRenderer;
}(BaseItemRender));
__reflect(GuildInteRewardItemRenderer.prototype, "GuildInteRewardItemRenderer");
//# sourceMappingURL=GuildInteRewardItemRenderer.js.map