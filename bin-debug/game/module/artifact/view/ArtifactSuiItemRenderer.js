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
var ArtifactSuiItemRenderer = (function (_super) {
    __extends(ArtifactSuiItemRenderer, _super);
    function ArtifactSuiItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "shenqiItemskin";
        return _this;
    }
    ArtifactSuiItemRenderer.prototype.dataChanged = function () {
        if (this.data["name"] == "") {
            this.itemImg.visible = false;
            this.labelMaterial.visible = false;
            this.closeImg.visible = true;
        }
        else {
            if (this.data["state"]) {
                this.labelMaterial.textColor = 0x35e62d;
            }
            else {
                this.labelMaterial.textColor = 0xbdbdbd;
            }
            if (this.data["state2"]) {
                if (!this.mc) {
                    this.mc = new MovieClip();
                    this.mc.x = 0;
                    this.mc.y = 0;
                }
                this.groupMc.addChild(this.mc);
                this.mc.playFile(RES_DIR_EFF + "chargeff1", -1);
            }
            else {
                if (this.mc) {
                    DisplayUtils.removeFromParent(this.mc);
                }
            }
            this.itemImg.visible = true;
            this.labelMaterial.visible = true;
            this.closeImg.visible = false;
            this.itemImg.source = this.data["img"];
            this.labelMaterial.textFlow = (new egret.HtmlTextParser).parser("<u>" + this.data["name"] + "</u>");
        }
    };
    return ArtifactSuiItemRenderer;
}(BaseItemRender));
__reflect(ArtifactSuiItemRenderer.prototype, "ArtifactSuiItemRenderer");
//# sourceMappingURL=ArtifactSuiItemRenderer.js.map