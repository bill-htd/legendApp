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
var DailyRechargeItemRender = (function (_super) {
    __extends(DailyRechargeItemRender, _super);
    function DailyRechargeItemRender() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this._totalRecharge = 0;
        _this._activityID = 0;
        _this._index = 0;
        _this.skinName = "DailyRechargeItemSkin";
        return _this;
    }
    DailyRechargeItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
        this.get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    DailyRechargeItemRender.prototype.dataChanged = function () {
        this._config = this.data[0];
        this._state = this.data[1];
        this._totalRecharge = this.data[2];
        this._activityID = this.data[3];
        this._index = this.data[4];
        this.target.text = "累计充值" + this._config.val + "元宝";
        this.recharge.text = "(" + (this._totalRecharge > this._config.val ? this._config.val : this._totalRecharge) + "/" + this._config.val + ")";
        this.reward.dataProvider = new eui.ArrayCollection(this._config.rewards);
        this.redPoint.visible = this._state == 1;
        this.get.enabled = this._state == 1;
        this.get.label = this._state == 2 ? "已领取" : (this._state == 1 ? "领取" : "未完成");
    };
    DailyRechargeItemRender.prototype.onTap = function (e) {
        if (this._config instanceof ActivityType3Config)
            Activity.ins().sendReward(this._activityID, this._index);
        else if (this._config instanceof PActivity3Config)
            PActivity.ins().sendReward(this._activityID, this._index);
    };
    return DailyRechargeItemRender;
}(BaseItemRender));
__reflect(DailyRechargeItemRender.prototype, "DailyRechargeItemRender");
//# sourceMappingURL=DailyRechargeItemRender.js.map