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
var DressSpecialTipsBase = (function (_super) {
    __extends(DressSpecialTipsBase, _super);
    function DressSpecialTipsBase() {
        var _this = _super.call(this) || this;
        _this.skinName = "DressSpecialAttrSkin";
        return _this;
    }
    DressSpecialTipsBase.prototype.setData = function (data) {
        this.clear();
        if (data == null)
            return;
        var title = data.title;
        var attrDesc = data.attrDesc;
        this.attrType.textFlow = TextFlowMaker.generateTextFlow1(title);
        this.suit.textFlow = TextFlowMaker.generateTextFlow1(attrDesc);
    };
    DressSpecialTipsBase.prototype.clear = function () {
        this.attrType.textFlow = null;
        this.suit.textFlow = null;
    };
    return DressSpecialTipsBase;
}(BaseView));
__reflect(DressSpecialTipsBase.prototype, "DressSpecialTipsBase");
//# sourceMappingURL=DressSpecialTipsBase.js.map