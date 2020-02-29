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
var HappySevenDayItemRender = (function (_super) {
    __extends(HappySevenDayItemRender, _super);
    function HappySevenDayItemRender() {
        return _super.call(this) || this;
    }
    HappySevenDayItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = ItemBase;
        this._listCollect = new ArrayCollection();
        this.list.dataProvider = this._listCollect;
        this.actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    HappySevenDayItemRender.prototype.dataChanged = function () {
        this._listCollect.source = this.data.conf.reward;
        this.pName.textFlow = TextFlowMaker.generateTextFlow1(this.data.conf.name);
        this.scedule.textFlow = TextFlowMaker.generateTextFlow1("|C:" + 0x00ff00 + "&T:" + Math.floor(this.data.times / this.data.conf.rate) + "|/" + Math.floor(this.data.conf.dayLimit / this.data.conf.rate));
        this.currentState = this.data.state == 2 ? "done" : "normal";
        this.redpoint.visible = this.data.state == 1;
        if (this.data.state == 0 && this.data.conf.turn) {
            this.actBtn.enabled = true;
            this.actBtn.label = "前  往";
        }
        else {
            this.actBtn.label = "领  取";
            this.actBtn.enabled = this.data.state == 1;
        }
    };
    HappySevenDayItemRender.prototype.onTouch = function (e) {
        if (this.data.state == 0 && this.data.conf.turn)
            ViewManager.ins().open(this.data.conf.turn[0], this.data.conf.turn[1]);
        else
            Activity.ins().sendReward(this.data.activityID, this.data.conf.index, 2);
    };
    HappySevenDayItemRender.prototype.destruct = function () {
        this.actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    return HappySevenDayItemRender;
}(BaseItemRender));
__reflect(HappySevenDayItemRender.prototype, "HappySevenDayItemRender");
//# sourceMappingURL=HappySevenDayItemRender.js.map