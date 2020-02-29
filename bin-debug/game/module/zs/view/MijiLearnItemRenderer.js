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
var MijiLearnItemRenderer = (function (_super) {
    __extends(MijiLearnItemRenderer, _super);
    function MijiLearnItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "MijiLearnItemSkin";
        return _this;
    }
    MijiLearnItemRenderer.prototype.dataChanged = function () {
        var obj = this.data;
        this.item.data = obj["item"];
        if (obj["isLock"]) {
            this.label.visible = true;
            this.label.text = "已锁";
        }
        else if (obj["islearn"]) {
            this.label.visible = true;
            this.label.text = "已学";
        }
        else
            this.label.visible = false;
    };
    return MijiLearnItemRenderer;
}(BaseItemRender));
__reflect(MijiLearnItemRenderer.prototype, "MijiLearnItemRenderer");
//# sourceMappingURL=MijiLearnItemRenderer.js.map