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
var HighRewardItemRender = (function (_super) {
    __extends(HighRewardItemRender, _super);
    function HighRewardItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "highRewardItemSkin";
        return _this;
    }
    HighRewardItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = ItemBase;
        this._listCollect = new ArrayCollection();
        this.list.dataProvider = this._listCollect;
        this.get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    HighRewardItemRender.prototype.dataChanged = function () {
        this.count.text = this.data.config.score;
        this.currentState = this.data.state == 2 ? "done" : (this.data.state == 1 ? "kelingqu" : "normal");
        this._listCollect.source = this.data.config.reward;
    };
    HighRewardItemRender.prototype.onTouch = function (e) {
        Activity.ins().sendReward(this.data.activityID, this.data.index, 1);
    };
    HighRewardItemRender.prototype.destruct = function () {
        this.get.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    return HighRewardItemRender;
}(BaseItemRender));
__reflect(HighRewardItemRender.prototype, "HighRewardItemRender");
//# sourceMappingURL=HighRewardItemRender.js.map