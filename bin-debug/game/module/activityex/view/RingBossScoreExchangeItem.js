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
var RingBossScoreExchangeItem = (function (_super) {
    __extends(RingBossScoreExchangeItem, _super);
    function RingBossScoreExchangeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ringBossItemSkin';
        return _this;
    }
    RingBossScoreExchangeItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    RingBossScoreExchangeItem.prototype.dataChanged = function () {
        if (this.data instanceof ActivityType7Config) {
            var config = this.data;
            var item = GlobalConfig.ItemConfig[config.rewards[0].id];
            var actdata = Activity.ins().getActivityDataById(config.Id);
            var count = actdata.bossScore;
            var isBuy = Activity.ins().getIsBuy(config);
            this.redPoint.visible = isBuy && count >= config.score;
            this.nameLab.text = item.name;
            var color = (count < config.score) ? "#F3311E" : "#35E62D";
            this.descLab.textFlow = new egret.HtmlTextParser().parser("<font color = '" + color + "'>" + count + "</font><font color = '#9F946D'>/" + config.score + "</font>");
            this.itemConfig = item;
            this.itemIcon0.data = config.rewards[0];
            this.itemIcon0.hideName();
            var data = Activity.ins().getActivityDataById(config.Id);
            var useCount = data.personalRewardsSum[config.index];
            var remainCount = config.count - useCount;
            if (remainCount) {
                this.count.text = "剩余" + remainCount + "份";
            }
            else {
                this.count.text = "";
            }
        }
    };
    RingBossScoreExchangeItem.prototype.onClick = function () {
        if (this.data instanceof ActivityType7Config) {
            var config = this.data;
            var actdata = Activity.ins().getActivityDataById(config.Id);
            if (actdata.bossScore < config.score) {
                UserTips.ins().showTips("|C:0xf3311e&T:积分不足|");
                return;
            }
            if (!Activity.ins().getIsBuy(config)) {
                UserTips.ins().showTips("|C:0xf3311e&T:已经兑换完|");
                return;
            }
            Activity.ins().sendReward(config.Id, config.index);
        }
    };
    return RingBossScoreExchangeItem;
}(eui.ItemRenderer));
__reflect(RingBossScoreExchangeItem.prototype, "RingBossScoreExchangeItem");
//# sourceMappingURL=RingBossScoreExchangeItem.js.map