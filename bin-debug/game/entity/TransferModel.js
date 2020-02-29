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
var TransferModel = (function (_super) {
    __extends(TransferModel, _super);
    function TransferModel() {
        var _this = _super.call(this) || this;
        _this.type = EntityType.Transfer;
        return _this;
    }
    Object.defineProperty(TransferModel.prototype, "avatarFileName", {
        get: function () {
            return RES_DIR_EFF + "movestand";
        },
        enumerable: true,
        configurable: true
    });
    return TransferModel;
}(NpcModel));
__reflect(TransferModel.prototype, "TransferModel");
//# sourceMappingURL=TransferModel.js.map