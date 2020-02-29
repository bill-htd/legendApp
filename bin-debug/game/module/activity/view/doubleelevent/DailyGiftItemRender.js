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
var DailyGiftItemRender = (function (_super) {
    __extends(DailyGiftItemRender, _super);
    function DailyGiftItemRender() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this._activityID = 0;
        _this._subRmb = 0;
        _this.skinName = "DEDailyGiftItemSkin";
        return _this;
    }
    DailyGiftItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
        this.get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    DailyGiftItemRender.prototype.dataChanged = function () {
        this._config = this.data[0];
        this._state = this.data[1];
        this._activityID = this.data[3];
        this._subRmb = this.data[4];
        this.discountNum.text = this._config.discount + "";
        this.vipLv.text = this._config.vip + "";
        this.vip.visible = this._config.vip > 0;
        this.original.text = this._config.originalPrice + "";
        this.now.text = this._config.price + "";
        var colorStr = this.data[2] ? 0x00ff00 : 0xff0000;
        this.times.textFlow = TextFlowMaker.generateTextFlow1("\u53EF\u8D2D\u4E70\uFF1A|C:" + colorStr + "&T:" + this.data[2] + "|/" + this._config.count);
        this.reward.dataProvider = new eui.ArrayCollection(this._config.rewards);
        this.redPoint.visible = this._state == 1 && Actor.yb >= this._config.price && this._subRmb >= this._config.needRecharge && UserVip.ins().lv >= this._config.vip;
        this.get.enabled = this._state == 1;
        this.get.visible = this._state != 2;
        this.already.visible = this._state == 2;
    };
    DailyGiftItemRender.prototype.onTap = function (e) {
        if (UserVip.ins().lv < this._config.vip)
            UserTips.ins().showTips("|C:0xff0000&T:VIP\u7B49\u7EA7\u4E0D\u6EE1\u8DB3\u8981\u6C42|");
        else if (Actor.yb < this._config.price)
            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
        else if (this._subRmb < this._config.needRecharge)
            UserTips.ins().showTips("|C:0xf3311e&T:\u5145\u503C\u4E0D\u8DB3|");
        else
            Activity.ins().sendReward(this._activityID, this._config.index);
    };
    DailyGiftItemRender.prototype.destruct = function () {
        this.get.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return DailyGiftItemRender;
}(BaseItemRender));
__reflect(DailyGiftItemRender.prototype, "DailyGiftItemRender");
//# sourceMappingURL=DailyGiftItemRender.js.map