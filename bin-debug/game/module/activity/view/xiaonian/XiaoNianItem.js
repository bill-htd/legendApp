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
var XiaoNianItem = (function (_super) {
    __extends(XiaoNianItem, _super);
    function XiaoNianItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'XNHongBaoItem';
        return _this;
    }
    XiaoNianItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    XiaoNianItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        this.currentState = this.data;
    };
    XiaoNianItem.prototype.destruct = function () {
    };
    return XiaoNianItem;
}(BaseItemRender));
__reflect(XiaoNianItem.prototype, "XiaoNianItem");
//# sourceMappingURL=XiaoNianItem.js.map