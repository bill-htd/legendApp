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
var OSATargetItemRender4 = (function (_super) {
    __extends(OSATargetItemRender4, _super);
    function OSATargetItemRender4() {
        var _this = _super.call(this) || this;
        _this.skinName = 'OSARankListItemSkin';
        _this.init();
        return _this;
    }
    OSATargetItemRender4.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
        this.reward.itemRenderer = ItemBase;
    };
    OSATargetItemRender4.prototype.onClick = function (e) {
    };
    OSATargetItemRender4.prototype.dataChanged = function () {
        if (!this.data.rankData)
            return;
        var rankData = this.data.rankData;
        var activityID = this.data.activityID;
        var pos;
        var cfg = GlobalConfig.ActivityType4Config[activityID][1];
        var rankType = cfg.rankType;
        if (rankType == RankDataType.TYPE_HF_XIAOFEI) {
            if (rankData instanceof DabiaoData) {
                var rank = this.data.rank ? this.data.rank : rankData.rankIndex;
                if (rank <= 3) {
                    this.rankImg.source = "paihang" + rank;
                    this.rankNum.visible = false;
                }
                else {
                    this.rankImg.source = "";
                    this.rankNum.visible = true;
                    this.rankNum.text = rank + "";
                }
                this.name1.text = rankData.name;
                this.value.text = rankData.numType;
                pos = rank;
                if (pos == 1) {
                    pos = 1;
                }
                else if (pos == 2 || pos == 3) {
                    pos = 2;
                }
                else if (pos == 4 || pos == 5) {
                    pos = 4;
                }
                else {
                    pos = 6;
                }
                cfg = GlobalConfig.ActivityType4Config[activityID][pos];
                this.reward.dataProvider = new eui.ArrayCollection(cfg.rewards);
            }
            else {
                var rank = this.data.rank ? this.data.rank : rankData.pos;
                if (rank <= 3) {
                    this.rankImg.source = "paihang" + rank;
                    this.rankNum.visible = false;
                }
                else {
                    this.rankImg.source = "";
                    this.rankNum.visible = true;
                    this.rankNum.text = rank;
                }
                this.name1.text = rankData.player;
                this.value.text = rankData.value;
                pos = rank;
                if (pos == 1) {
                    pos = 1;
                }
                else if (pos == 2 || pos == 3) {
                    pos = 2;
                }
                else if (pos == 4 || pos == 5) {
                    pos = 4;
                }
                else {
                    pos = 6;
                }
                cfg = GlobalConfig.ActivityType4Config[activityID][pos];
                this.reward.dataProvider = new eui.ArrayCollection(cfg.rewards);
            }
        }
        else {
            if (rankData instanceof DabiaoData) {
                if (rankData.rankIndex <= 3) {
                    this.rankImg.source = "paihang" + rankData.rankIndex;
                    this.rankNum.visible = false;
                }
                else {
                    this.rankImg.source = "";
                    this.rankNum.visible = true;
                    this.rankNum.text = rankData.rankIndex + "";
                }
                this.name1.text = rankData.name;
                this.value.text = rankData.numType;
                pos = rankData.rankIndex;
                if (pos > 4) {
                    pos = 4;
                }
                cfg = GlobalConfig.ActivityType4Config[activityID][pos];
                this.reward.dataProvider = new eui.ArrayCollection(cfg.rewards);
            }
            else {
                if (rankData.pos <= 3) {
                    this.rankImg.source = "paihang" + rankData.pos;
                    this.rankNum.visible = false;
                }
                else {
                    this.rankImg.source = "";
                    this.rankNum.visible = true;
                    this.rankNum.text = rankData.pos;
                }
                this.name1.text = rankData.player;
                this.value.text = rankData.value;
                pos = rankData.pos;
                cfg = GlobalConfig.ActivityType4Config[activityID][pos];
                this.reward.dataProvider = new eui.ArrayCollection(cfg.rewards);
            }
        }
    };
    return OSATargetItemRender4;
}(BaseItemRender));
__reflect(OSATargetItemRender4.prototype, "OSATargetItemRender4");
//# sourceMappingURL=OSATargetItemRender4.js.map