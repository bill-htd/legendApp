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
var FDtabBtnItemRender = (function (_super) {
    __extends(FDtabBtnItemRender, _super);
    function FDtabBtnItemRender() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        return _this;
    }
    FDtabBtnItemRender.prototype.dataChanged = function () {
        this.tabName.text = this.data.gName;
        this.redpoint.visible = this.data.showRed;
    };
    Object.defineProperty(FDtabBtnItemRender.prototype, "selected", {
        set: function (value) {
            this.currentState = value ? "select" : "unselect";
            if (this.data) {
                this.redpoint.visible = this.data.showRed;
            }
        },
        enumerable: true,
        configurable: true
    });
    return FDtabBtnItemRender;
}(BaseItemRender));
__reflect(FDtabBtnItemRender.prototype, "FDtabBtnItemRender");
//# sourceMappingURL=FDtabBtnItemRender.js.map