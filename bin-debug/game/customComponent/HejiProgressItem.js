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
var HejiProgressItem = (function (_super) {
    __extends(HejiProgressItem, _super);
    function HejiProgressItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PunchItemSkin";
        return _this;
    }
    HejiProgressItem.prototype.dataChanged = function () {
        var curPro = UserSkill.ins().hejiProgressList[this.itemIndex];
        if (!curPro)
            return;
        this.descLab.text = this.data.j + "";
        this.nameLab.text = this.data.t + "";
        this.label0.text = "(" + curPro.progress + "/" + this.data.v + ")";
        this.goBtn0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    return HejiProgressItem;
}(BaseItemRender));
__reflect(HejiProgressItem.prototype, "HejiProgressItem");
//# sourceMappingURL=HejiProgressItem.js.map