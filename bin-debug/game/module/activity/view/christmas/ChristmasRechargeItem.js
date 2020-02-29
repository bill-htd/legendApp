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
var ChristmasRechargeItem = (function (_super) {
    __extends(ChristmasRechargeItem, _super);
    function ChristmasRechargeItem() {
        return _super.call(this) || this;
    }
    ChristmasRechargeItem.prototype.dataChanged = function () {
        var config;
        var actData;
        if (this.data instanceof ActivityType3Config) {
            config = this.data;
            actData = Activity.ins().getActivityDataById(config.Id);
        }
        else if (this.data instanceof PActivity3Config) {
            config = this.data;
            actData = PActivity.ins().getActivityDataById(config.Id);
        }
        this.reward.data = config.rewards[0];
        this.reward.hideName();
        this.schedule.textFlow = TextFlowMaker.generateTextFlow1("|C:0x00ff00&T:" + Math.floor(actData.chongzhiTotal / 100) + "|/" + Math.floor(config.val / 100));
        var state = actData.getRewardStateById(config.index);
        if (state == Activity.Geted) {
            this.lingqu.visible = true;
            this.redPoint.visible = false;
            this.reward.touchEnabled = true;
            this.reward.touchChildren = true;
            this.ball.source = "cd_treeitembg2";
        }
        else if (state == Activity.CanGet) {
            this.lingqu.visible = false;
            this.redPoint.visible = true;
            this.reward.touchEnabled = false;
            this.reward.touchChildren = false;
            this.ball.source = "cd_treeitembg2";
        }
        else {
            this.lingqu.visible = false;
            this.redPoint.visible = false;
            this.reward.touchEnabled = true;
            this.reward.touchChildren = true;
            this.ball.source = "cd_treeitembg1";
        }
    };
    return ChristmasRechargeItem;
}(BaseItemRender));
__reflect(ChristmasRechargeItem.prototype, "ChristmasRechargeItem");
//# sourceMappingURL=ChristmasRechargeItem.js.map