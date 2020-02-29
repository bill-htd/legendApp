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
var HeartMethodItemRenderer = (function (_super) {
    __extends(HeartMethodItemRenderer, _super);
    function HeartMethodItemRenderer() {
        return _super.call(this) || this;
    }
    HeartMethodItemRenderer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HeartMethodItemRenderer.prototype.dataChanged = function () {
        if (!this.data)
            return;
        if (this.data) {
            if (this.data.itemid) {
                this.itemIcon.setData(GlobalConfig.ItemConfig[this.data.itemid]);
                this.itemIcon.visible = true;
                this.blank.visible = false;
            }
            else {
                this.itemIcon.visible = false;
                this.blank.source = this.data.blank;
                this.blank.visible = true;
            }
            this.redPoint.visible = this.data.redPoint;
        }
    };
    return HeartMethodItemRenderer;
}(BaseItemRender));
__reflect(HeartMethodItemRenderer.prototype, "HeartMethodItemRenderer");
//# sourceMappingURL=HeartMethodItemRenderer.js.map