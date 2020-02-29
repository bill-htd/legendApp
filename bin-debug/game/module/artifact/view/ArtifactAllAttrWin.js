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
var ArtifactAllAttrWin = (function (_super) {
    __extends(ArtifactAllAttrWin, _super);
    function ArtifactAllAttrWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "shenqiAttrskin";
        _this.list.itemRenderer = ArtifactAttrDescItem;
        return _this;
    }
    ArtifactAllAttrWin.prototype.open = function () {
        this.addTouchEvent(this.rect, this.onTap);
        this.list.dataProvider = new eui.ArrayCollection(Artifact.ins().getAttr());
    };
    ArtifactAllAttrWin.prototype.close = function () {
    };
    ArtifactAllAttrWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.rect:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ArtifactAllAttrWin;
}(BaseEuiView));
__reflect(ArtifactAllAttrWin.prototype, "ArtifactAllAttrWin");
ViewManager.ins().reg(ArtifactAllAttrWin, LayerManager.UI_Popup);
//# sourceMappingURL=ArtifactAllAttrWin.js.map