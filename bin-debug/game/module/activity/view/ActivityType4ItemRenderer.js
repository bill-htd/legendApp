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
var ActivityType4ItemRenderer = (function (_super) {
    __extends(ActivityType4ItemRenderer, _super);
    function ActivityType4ItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActraceSkinson";
        _this.list.itemRenderer = ItemBase;
        return _this;
    }
    ActivityType4ItemRenderer.prototype.dataChanged = function () {
        var config = this.data;
        if (this.data.ranking > 0) {
            this.rankImg.source = "rankDabiao_" + this.data.ranking;
        }
        else {
            this.rankImg.source = "rankDabiao_" + this.data.rankType + "_" + this.data.ranking;
        }
        this.list.dataProvider = new eui.ArrayCollection(config.rewards);
        var rankData = Activity.ins().getrankInfoListByIndex(this.itemIndex);
        if (rankData) {
            this.y = 21;
            this.rankName.text = rankData.name;
            this.value.visible = true;
            var str = void 0;
            switch (this.data.rankType) {
                case RankDataType.TYPE_LEVEL:
                    if (rankData.zsLevel > 0) {
                        str = rankData.zsLevel + "转" + rankData.level + "级";
                    }
                    else {
                        str = rankData.level + "级";
                    }
                    break;
                case RankDataType.TYPE_POWER:
                case RankDataType.TYPE_WING:
                case RankDataType.TYPE_JOB_ZS:
                case RankDataType.TYPE_JOB_FS:
                case RankDataType.TYPE_JOB_DS:
                    str = CommonUtils.overLength(rankData.numType);
                    break;
                case RankDataType.TYPE_BAOSHI:
                    str = rankData.numType + "级";
                    break;
            }
            this.value.text = str;
        }
        else {
            this.y = 33;
            this.rankName.text = "暂无";
            this.value.visible = false;
        }
    };
    return ActivityType4ItemRenderer;
}(BaseItemRender));
__reflect(ActivityType4ItemRenderer.prototype, "ActivityType4ItemRenderer");
//# sourceMappingURL=ActivityType4ItemRenderer.js.map