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
var ZhanLingPanelEx = (function (_super) {
    __extends(ZhanLingPanelEx, _super);
    function ZhanLingPanelEx() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ZhanlingSkin';
        _this.isTopLevel = true;
        return _this;
    }
    ZhanLingPanelEx.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.openView(param);
    };
    return ZhanLingPanelEx;
}(ZhanLingPanel));
__reflect(ZhanLingPanelEx.prototype, "ZhanLingPanelEx");
ViewManager.ins().reg(ZhanLingPanelEx, LayerManager.UI_Main);
//# sourceMappingURL=ZhanLingPanelEx.js.map