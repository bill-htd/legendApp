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
var EncounterRewardRender = (function (_super) {
    __extends(EncounterRewardRender, _super);
    function EncounterRewardRender() {
        return _super.call(this) || this;
    }
    EncounterRewardRender.prototype.dataChanged = function () {
        if (this.data.maxRank == this.data.minRank) {
            this.rank.text = "\u7B2C" + this.data.minRank + "\u540D";
        }
        else {
            this.rank.text = "\u7B2C" + this.data.minRank + "\u540D~\u7B2C" + this.data.maxRank + "\u540D";
        }
        this.item0.data = this.data.rewards[0];
        this.item1.data = this.data.rewards[1];
    };
    return EncounterRewardRender;
}(BaseItemRender));
__reflect(EncounterRewardRender.prototype, "EncounterRewardRender");
//# sourceMappingURL=EncounterRewardRender.js.map