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
var CharTransfer = (function (_super) {
    __extends(CharTransfer, _super);
    function CharTransfer() {
        var _this = _super.call(this) || this;
        _this.hasDir = [];
        _this.touchEnabled = true;
        _this.transferName = new TransferNameHead();
        _this.transferName.anchorOffsetX = 40;
        _this.transferName.anchorOffsetY = 21;
        _this.titleCantainer.addChild(_this.transferName);
        _this.titleCantainer.anchorOffsetY = 80;
        return _this;
    }
    Object.defineProperty(CharTransfer.prototype, "infoModel", {
        get: function () {
            return this._infoModel;
        },
        set: function (model) {
            this._infoModel = model;
        },
        enumerable: true,
        configurable: true
    });
    CharTransfer.prototype.updateModel = function () {
        this.x = this.infoModel.x;
        this.y = this.infoModel.y;
        this.transferName.updateModel(this.infoModel);
        this.addMc(CharMcOrder.BODY, this.infoModel.avatarFileName);
    };
    return CharTransfer;
}(CharEffect));
__reflect(CharTransfer.prototype, "CharTransfer");
//# sourceMappingURL=CharTransfer.js.map