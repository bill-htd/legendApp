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
var GuildShopRecordItemRender = (function (_super) {
    __extends(GuildShopRecordItemRender, _super);
    function GuildShopRecordItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildStoreItemSkin";
        return _this;
    }
    GuildShopRecordItemRender.prototype.dataChanged = function () {
        if (this.data instanceof GuildStoreRecordInfo) {
            var config = GlobalConfig.ItemConfig[this.data.itemId];
            if (config)
                this.rank.textFlow = new egret.HtmlTextParser().parser(this.data.roleName + "   \u83B7\u5F97\u4E86   <font color=" + ItemConfig.getQualityColor(config) + ">" + config.name + "</font>");
            else
                this.rank.text = "";
        }
    };
    return GuildShopRecordItemRender;
}(BaseItemRender));
__reflect(GuildShopRecordItemRender.prototype, "GuildShopRecordItemRender");
//# sourceMappingURL=GuildShopRecordItemRender.js.map