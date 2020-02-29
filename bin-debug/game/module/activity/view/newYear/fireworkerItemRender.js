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
var FireworkerItemRender = (function (_super) {
    __extends(FireworkerItemRender, _super);
    function FireworkerItemRender() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this.skinName = "fireworkerItemSkin";
        _this.touchChildren = false;
        return _this;
    }
    FireworkerItemRender.prototype.dataChanged = function () {
        this.touchEnabled = this.data.state != 2;
        this.redPoint.visible = this.data.state == 1;
        this.lingqu.visible = this.data.state == 2;
        var colorStr = this.data.state == 0 ? 0xff0000 : 0x00ff00;
        this.boxSchadule.textFlow = TextFlowMaker.generateTextFlow1("|C:" + colorStr + "&T:" + (this.data.curTimes > this.data.times ? this.data.times : this.data.curTimes) + "|/" + this.data.times);
        this.count.text = this.data.count;
        if (this.data.type == 1) {
            var itemConfig = GlobalConfig.ItemConfig[this.data.id];
            this.box.source = itemConfig.icon + '_png';
        }
        else
            this.box.source = "richman_reward";
    };
    return FireworkerItemRender;
}(BaseItemRender));
__reflect(FireworkerItemRender.prototype, "FireworkerItemRender");
//# sourceMappingURL=fireworkerItemRender.js.map