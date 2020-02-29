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
var PersonRewardRenderer = (function (_super) {
    __extends(PersonRewardRenderer, _super);
    function PersonRewardRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "PersonRewardRendererSkin";
        _this.itemList.itemRenderer = ItemBase;
        return _this;
    }
    PersonRewardRenderer.prototype.dataChanged = function () {
        this.desc.text = +this.data.integral + "";
        this.itemList.dataProvider = new eui.ArrayCollection(this.data.award);
    };
    return PersonRewardRenderer;
}(BaseItemRender));
__reflect(PersonRewardRenderer.prototype, "PersonRewardRenderer");
//# sourceMappingURL=PersonRewardRenderer.js.map