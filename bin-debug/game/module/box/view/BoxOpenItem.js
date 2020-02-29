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
var BoxOpenItem = (function (_super) {
    __extends(BoxOpenItem, _super);
    function BoxOpenItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChestStateOpenSkin";
        return _this;
    }
    BoxOpenItem.prototype.dataChanged = function () {
        this.labelTime.text = "";
        TimerManager.ins().removeAll(this);
        var data = this.data;
        this.time = data.getTime();
        if (!data.canUsed) {
            this.labelTips.text = "" + data.openTips;
            this.currentState = "tips";
            return;
        }
        if (!data.itemId) {
            this.currentState = "add";
            return;
        }
        var conf = GlobalConfig.TreasureBoxConfig[data.itemId];
        this.imgBox.source = conf.imgClose;
        if (this.time > 0) {
            TimerManager.ins().doTimer(1000, this.time, this.updateTime, this);
            this.currentState = "waiting";
        }
        else {
            this.currentState = "canOpen";
        }
    };
    BoxOpenItem.prototype.updateTime = function () {
        if (this.time > 0) {
            this.time--;
            this.labelTime.text = DateUtils.getFormatBySecond(this.time, 1);
        }
        else {
            TimerManager.ins().removeAll(this);
        }
    };
    BoxOpenItem.prototype.destruct = function () {
        TimerManager.ins().removeAll(this);
    };
    return BoxOpenItem;
}(BaseItemRender));
__reflect(BoxOpenItem.prototype, "BoxOpenItem");
//# sourceMappingURL=BoxOpenItem.js.map