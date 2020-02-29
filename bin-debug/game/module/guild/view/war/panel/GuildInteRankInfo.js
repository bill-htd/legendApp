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
var GuildInteRankInfo = (function (_super) {
    __extends(GuildInteRankInfo, _super);
    function GuildInteRankInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildInteRankSkin";
        _this.name = "公会排行";
        _this.list.itemRenderer = GuildInteRankItemRenderer;
        _this.data = new eui.ArrayCollection([]);
        _this.model = GuildWar.ins().getModel();
        _this.lastName.text = _this.model.isWatStart ? '本届排行' : '上届排行';
        _this.lastNameJie.text = _this.model.isWatStart ? '本届攻城结果' : '上届攻城结果';
        return _this;
    }
    GuildInteRankInfo.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.dataProvider = this.data;
        this.observe(GuildWar.ins().postRankInfo, this.refushList);
        GuildWar.ins().requestGuildRank();
    };
    GuildInteRankInfo.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
    };
    GuildInteRankInfo.prototype.refushList = function () {
        this.data.replaceAll(this.model.guildRankList);
        if (this.model.guildRankList.length > 0) {
            this.guildName.text = this.model.guildRankList[0].guildName;
        }
        else {
            this.guildName.text = "虚位以待";
        }
    };
    return GuildInteRankInfo;
}(BaseView));
__reflect(GuildInteRankInfo.prototype, "GuildInteRankInfo");
//# sourceMappingURL=GuildInteRankInfo.js.map