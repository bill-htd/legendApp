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
var ChritmasSnowMainItem = (function (_super) {
    __extends(ChritmasSnowMainItem, _super);
    function ChritmasSnowMainItem() {
        var _this = _super.call(this) || this;
        _this.states = ["lingqu", "normal", "done"];
        _this.skinName = "snowManItemSkin";
        return _this;
    }
    ChritmasSnowMainItem.prototype.childrenCreated = function () {
        this.goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    ChritmasSnowMainItem.prototype.onTap = function (e) {
        var config = this.data;
        Activity.ins().sendReward(config.Id, config.index);
    };
    ChritmasSnowMainItem.prototype.dataChanged = function () {
        var config = this.data;
        var data = Activity.ins().getActivityDataById(config.Id);
        var state = data.getAwardState(config.index);
        if (state == Activity.Geted)
            this.currentState = this.states[2];
        else if (state == Activity.CanGet)
            this.currentState = this.states[0];
        else {
            this.currentState = this.states[1];
            this.schedule.textFlow = TextFlowMaker.generateTextFlow1("|C:0x00ff00&T:" + config.score + "|\u96EA\u7403");
        }
        this.reward.data = config.rewards[0];
        this.reward.hideName();
    };
    return ChritmasSnowMainItem;
}(BaseItemRender));
__reflect(ChritmasSnowMainItem.prototype, "ChritmasSnowMainItem");
//# sourceMappingURL=ChritmasSnowMainItem.js.map