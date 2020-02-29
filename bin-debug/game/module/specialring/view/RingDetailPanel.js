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
var RingDetailPanel = (function (_super) {
    __extends(RingDetailPanel, _super);
    function RingDetailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "LYRAttrSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RingDetailPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var attrs = param[0];
        this.attrValue.text = AttributeData.getAttStr(attrs, 0, 1, "    ", false, false);
        this.addTouchEndEvent(this.bgClose, this.otherClose);
    };
    RingDetailPanel.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    return RingDetailPanel;
}(BaseEuiView));
__reflect(RingDetailPanel.prototype, "RingDetailPanel");
ViewManager.ins().reg(RingDetailPanel, LayerManager.UI_Popup);
//# sourceMappingURL=RingDetailPanel.js.map