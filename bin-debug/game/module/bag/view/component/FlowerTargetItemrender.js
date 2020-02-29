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
var FlowerTargetItemrender = (function (_super) {
    __extends(FlowerTargetItemrender, _super);
    function FlowerTargetItemrender() {
        var _this = _super.call(this) || this;
        _this.skinName = "flowerTargetItem";
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    FlowerTargetItemrender.prototype.dataChanged = function () {
        this.nameTxt.text = this.data.name;
    };
    return FlowerTargetItemrender;
}(BaseItemRender));
__reflect(FlowerTargetItemrender.prototype, "FlowerTargetItemrender");
//# sourceMappingURL=FlowerTargetItemrender.js.map