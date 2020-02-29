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
var KfArenaJoinItemRender = (function (_super) {
    __extends(KfArenaJoinItemRender, _super);
    function KfArenaJoinItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "KfArenaJoinItemSkin";
        return _this;
    }
    KfArenaJoinItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.rewardList.itemRenderer = ItemBase;
        this.rewardList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    KfArenaJoinItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        this.redPoint.visible = false;
        this.get.visible = false;
        this.target.text = "" + this.data.count;
        var state = KfArenaSys.ins().dflState;
        if (((state >> this.data.id) & 1) == 1) {
            this.get.visible = true;
        }
        else {
            if (KfArenaSys.ins().dflCount >= this.data.count) {
                this.redPoint.visible = true;
            }
        }
        this.rewardList.dataProvider = new eui.ArrayCollection(this.data.award);
    };
    KfArenaJoinItemRender.prototype.onTap = function (e) {
        if (this.redPoint.visible)
            KfArenaSys.ins().sendJoinRewards(this.data.id);
    };
    KfArenaJoinItemRender.prototype.destruct = function () {
        this.rewardList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return KfArenaJoinItemRender;
}(BaseItemRender));
__reflect(KfArenaJoinItemRender.prototype, "KfArenaJoinItemRender");
//# sourceMappingURL=KfArenaJoinItemRender.js.map