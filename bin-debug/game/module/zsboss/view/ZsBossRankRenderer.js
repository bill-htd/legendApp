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
var ZsBossRankRenderer = (function (_super) {
    __extends(ZsBossRankRenderer, _super);
    function ZsBossRankRenderer() {
        return _super.call(this) || this;
    }
    ZsBossRankRenderer.prototype.dataChanged = function () {
        this.bg.visible = this.itemIndex % 2 == 0;
        this.txt0.text = this.data.rank + "";
        this.txt1.text = this.data.names;
        this.txt2.text = this.data.shanghai;
    };
    return ZsBossRankRenderer;
}(BaseItemRender));
__reflect(ZsBossRankRenderer.prototype, "ZsBossRankRenderer");
//# sourceMappingURL=ZsBossRankRenderer.js.map