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
var BossScoreExchangeItem = (function (_super) {
    __extends(BossScoreExchangeItem, _super);
    function BossScoreExchangeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'hefuBossItemSkin';
        return _this;
    }
    BossScoreExchangeItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    BossScoreExchangeItem.prototype.dataChanged = function () {
        if (this.data instanceof ActivityType7Config) {
            var config = this.data;
            var item = GlobalConfig.ItemConfig[config.rewards[0].id];
            var actdata = Activity.ins().getActivityDataById(config.Id);
            var count = actdata.bossScore;
            var isBuy = Activity.ins().getIsBuy(config);
            this.redPoint.visible = isBuy && count >= config.score;
            this.nameLab.text = item.name;
            var color = (count < config.score) ? "#F3311E" : "#35E62D";
            this.descLab.textFlow = new egret.HtmlTextParser().parser("<font color = '" + color + "'>" + config.score + "</font>");
            this.goBtn.currentState = "up";
            this.goBtn.touchEnabled = true;
            if (config.count) {
                this.count.visible = true;
                var sum = config.count - actdata.personalRewardsSum[config.index];
                sum = sum > 0 ? sum : 0;
                if (!sum) {
                    this.goBtn.currentState = "disabled";
                    this.goBtn.touchEnabled = false;
                }
                var colorInt = sum < 0 ? 0xF3311E : 0x35E62D;
                this.count.textFlow = TextFlowMaker.generateTextFlow1("|C:0x9F946D&T:\u5269\u4F59|C:" + colorInt + "&T:" + sum + "|C:0x9F946D&T:\u4EFD");
            }
            else {
                this.count.visible = false;
            }
            this.itemConfig = item;
            this.itemIcon0.data = config.rewards[0];
        }
    };
    BossScoreExchangeItem.prototype.onClick = function () {
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
    return BossScoreExchangeItem;
}(eui.ItemRenderer));
__reflect(BossScoreExchangeItem.prototype, "BossScoreExchangeItem");
//# sourceMappingURL=BossScoreExchangeItem.js.map