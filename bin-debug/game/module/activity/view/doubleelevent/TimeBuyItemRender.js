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
var TimeBuyItemRender = (function (_super) {
    __extends(TimeBuyItemRender, _super);
    function TimeBuyItemRender() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this._activityID = 0;
        _this.skinName = "DETimeBuyItemSkin";
        return _this;
    }
    TimeBuyItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
        this.get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    TimeBuyItemRender.prototype.dataChanged = function () {
        this._config = this.data[0];
        this._state = this.data[1];
        this._activityID = this.data[3];
        this.discountNum.text = this._config.discount + "";
        this.priceLabel.text = this._config.price + "";
        var colorStr = this.data[2] ? 0x00ff00 : 0xff0000;
        this.times.textFlow = TextFlowMaker.generateTextFlow1("\u53EF\u8D2D\u4E70\uFF1A|C:" + colorStr + "&T:" + this.data[2] + "|/" + this._config.count);
        this.reward.dataProvider = new eui.ArrayCollection(this._config.rewards);
        this.stock.text = this.data[4];
        this.redPoint.visible = this._state == 1 && Actor.yb >= this._config.price;
        this.get.enabled = this._state == 1;
        this.get.visible = this._state != 2;
        this.already.visible = this._state == 2;
    };
    TimeBuyItemRender.prototype.onTap = function (e) {
        if (Actor.yb < this._config.price)
            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
        else
            Activity.ins().sendReward(this._activityID, this._config.index);
    };
    TimeBuyItemRender.prototype.destruct = function () {
        this.get.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return TimeBuyItemRender;
}(BaseItemRender));
__reflect(TimeBuyItemRender.prototype, "TimeBuyItemRender");
//# sourceMappingURL=TimeBuyItemRender.js.map