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
var RankDataSkirmish = (function (_super) {
    __extends(RankDataSkirmish, _super);
    function RankDataSkirmish() {
        return _super.call(this) || this;
    }
    RankDataSkirmish.prototype.parser = function (bytes, items) {
        _super.prototype.parser.call(this, bytes, items);
        for (var i in GlobalConfig.SkirmishRankConfig) {
            var config = GlobalConfig.SkirmishRankConfig[i];
            if (config.minRank <= this.pos && this.pos <= config.maxRank) {
                this.reward = config.rewards[0].count;
                this.money = config.rewards[1].count;
                return;
            }
        }
        ;
        this.money = this.reward = 0;
    };
    return RankDataSkirmish;
}(RankDataBase));
__reflect(RankDataSkirmish.prototype, "RankDataSkirmish");
//# sourceMappingURL=RankDataSkirmish.js.map