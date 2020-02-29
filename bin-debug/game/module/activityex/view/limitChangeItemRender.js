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
var limitChangeItemRender = (function (_super) {
    __extends(limitChangeItemRender, _super);
    function limitChangeItemRender() {
        return _super.call(this) || this;
    }
    limitChangeItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
        this.get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    limitChangeItemRender.prototype.dataChanged = function () {
        this._activityID = this.data[0];
        this._config = this.data[1];
        this.slimit.visible = this.data[4] != Number.MAX_VALUE;
        if (this.data[4] != Number.MAX_VALUE) {
            var colorStr = this.data[4] ? 0x00ff00 : 0xff0000;
            this.limitchange0.textFlow = TextFlowMaker.generateTextFlow1("\u4ECA\u65E5\u5168\u670D\u53EF\u5151\u6362\u6B21\u6570\uFF1A|C:" + colorStr + "&T:" + this.data[4]);
        }
        if (this.data[3] == Number.MAX_VALUE)
            this.limitchange1.text = "";
        else {
            var colorStr = this.data[3] ? 0x00ff00 : 0xff0000;
            this.limitchange1.textFlow = TextFlowMaker.generateTextFlow1("\u53EF\u5151\u6362\uFF1A|C:" + colorStr + "&T:" + this.data[3] + "|/" + this._config.count);
        }
        if (!this._dataCollect) {
            this._dataCollect = new ArrayCollection();
            this.reward.dataProvider = this._dataCollect;
        }
        this._dataCollect.source = this._config.rewards;
        this.consnum.text = this._config.itemCount + "";
        this.get.enabled = this.data[2];
        this.redPoint.visible = this.get.enabled;
    };
    limitChangeItemRender.prototype.onTap = function (e) {
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
            return;
        }
        Activity.ins().sendReward(this._activityID, this._config.index);
    };
    limitChangeItemRender.prototype.destruct = function () {
        this.get.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return limitChangeItemRender;
}(BaseItemRender));
__reflect(limitChangeItemRender.prototype, "limitChangeItemRender");
//# sourceMappingURL=limitChangeItemRender.js.map