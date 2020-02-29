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
var GuildBossRankItemRender = (function (_super) {
    __extends(GuildBossRankItemRender, _super);
    function GuildBossRankItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildBossHarmItem";
        return _this;
    }
    GuildBossRankItemRender.prototype.dataChanged = function () {
        this.rank.text = this.data.rank;
        this.playerName.text = this.data.name;
        this.harm.text = this.data.damage;
        var isGet = false;
        var config = GlobalConfig.GuildBossRankConfig;
        var conf;
        for (var id in config) {
            if (config[id].srank <= this.data.rank && config[id].erank >= this.data.rank) {
                isGet = true;
                this.reward.text = config[id].awards[0].count + "";
                break;
            }
            if (config[id].srank == 0 && config[id].erank == 0)
                conf = config[id];
        }
        if (!isGet) {
            this.reward.text = conf.awards[0].count + "";
        }
    };
    return GuildBossRankItemRender;
}(BaseItemRender));
__reflect(GuildBossRankItemRender.prototype, "GuildBossRankItemRender");
//# sourceMappingURL=GuildBossRankItemRender.js.map