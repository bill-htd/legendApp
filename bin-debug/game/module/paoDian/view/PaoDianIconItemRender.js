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
var PaoDianIconItemRender = (function (_super) {
    __extends(PaoDianIconItemRender, _super);
    function PaoDianIconItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "PointResultAwardSkin";
        return _this;
    }
    PaoDianIconItemRender.prototype.dataChanged = function () {
        this.icon.source = this.data[0];
        var num = this.data[1];
        num = Math.floor(num / 1000) / 10;
        this.count.text = num == 0 ? "0" : num + "万";
    };
    return PaoDianIconItemRender;
}(BaseItemRender));
__reflect(PaoDianIconItemRender.prototype, "PaoDianIconItemRender");
//# sourceMappingURL=PaoDianIconItemRender.js.map