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
var FDProjectItemRender = (function (_super) {
    __extends(FDProjectItemRender, _super);
    function FDProjectItemRender() {
        return _super.call(this) || this;
    }
    FDProjectItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = ItemBase;
        this._listCollect = new ArrayCollection();
        this.list.dataProvider = this._listCollect;
    };
    FDProjectItemRender.prototype.dataChanged = function () {
        this._listCollect.source = this.data.conf.reward;
        this.pName.textFlow = TextFlowMaker.generateTextFlow1(this.data.conf.name);
        this.scedule.textFlow = TextFlowMaker.generateTextFlow1("|C:" + 0x00ff00 + "&T:" + Math.floor(this.data.times / this.data.conf.rate) + "|/" + Math.floor(this.data.conf.dayLimit / this.data.conf.rate));
        this.currentState = this.data.state == 2 ? "done" : "normal";
        this.redpoint.visible = this.data.state == 1;
        this.score.text = this.data.conf.score;
        if (this.data.state == 0 && this.data.conf.turn) {
            this.actBtn.enabled = true;
            this.actBtn.label = "前  往";
        }
        else {
            this.actBtn.label = "领  取";
            this.actBtn.enabled = this.data.state == 1;
        }
        if (!this.hasEventListener(egret.TouchEvent.REMOVED_FROM_STAGE))
            this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    FDProjectItemRender.prototype.onTouch = function (e) {
        if (e.target != this.actBtn)
            return;
        if (this.data.state == 0 && this.data.conf.turn)
            ViewManager.ins().open(this.data.conf.turn[0], this.data.conf.turn[1]);
        else
            Activity.ins().sendReward(this.data.activityID, this.data.conf.index, 2);
    };
    FDProjectItemRender.prototype.onRmove = function (e) {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    return FDProjectItemRender;
}(BaseItemRender));
__reflect(FDProjectItemRender.prototype, "FDProjectItemRender");
//# sourceMappingURL=FDProjectItemRender.js.map