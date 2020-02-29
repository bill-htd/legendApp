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
var GodWeaponItemCC = (function (_super) {
    __extends(GodWeaponItemCC, _super);
    function GodWeaponItemCC() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.GodWeaponItem;
        _this.regNetMsg(1, _this.postCompound);
        _this.regNetMsg(2, _this.postFuse);
        return _this;
    }
    GodWeaponItemCC.prototype.requestCompound = function (itemId1, itemId2, itemId3) {
        var bytes = this.getBytes(1);
        bytes.writeInt(itemId1);
        bytes.writeInt(itemId2);
        bytes.writeInt(itemId3);
        this.sendToServer(bytes);
    };
    GodWeaponItemCC.prototype.postCompound = function (bytes) {
        var isSuccess = bytes.readBoolean();
        var num = bytes.readShort();
        var itemId = bytes.readInt();
        return { id: itemId, isSuccess: isSuccess };
    };
    GodWeaponItemCC.prototype.requestFuse = function (itemId1, itemId2, itemId3) {
        var bytes = this.getBytes(2);
        bytes.writeInt(itemId1);
        bytes.writeInt(itemId2);
        bytes.writeShort(itemId3);
        this.sendToServer(bytes);
    };
    GodWeaponItemCC.prototype.postFuse = function (bytes) {
        var isSuccess = bytes.readBoolean();
        var itemId = 0;
        if (isSuccess) {
            var num = bytes.readShort();
            itemId = bytes.readInt();
        }
        return { id: itemId, isSuccess: isSuccess };
    };
    GodWeaponItemCC.ins = function () {
        return _super.ins.call(this);
    };
    return GodWeaponItemCC;
}(BaseSystem));
__reflect(GodWeaponItemCC.prototype, "GodWeaponItemCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.godWeaponItemCC = GodWeaponItemCC.ins.bind(GodWeaponItemCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GodWeaponItemCC.js.map