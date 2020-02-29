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
var SDShowItemRender = (function (_super) {
    __extends(SDShowItemRender, _super);
    function SDShowItemRender() {
        return _super.call(this) || this;
    }
    SDShowItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = ItemBase;
    };
    SDShowItemRender.prototype.dataChanged = function () {
        this.scheduleTxt.textFlow = TextFlowMaker.generateTextFlow1(this.data.showText);
        this.list.dataProvider = new ArrayCollection(this.data.reward);
    };
    return SDShowItemRender;
}(BaseItemRender));
__reflect(SDShowItemRender.prototype, "SDShowItemRender");
//# sourceMappingURL=SDShowItemRender.js.map