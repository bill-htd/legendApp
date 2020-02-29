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
var ShenshouSys = (function (_super) {
    __extends(ShenshouSys, _super);
    function ShenshouSys() {
        var _this = _super.call(this) || this;
        _this.maxLimit = 0;
        _this.dataList = {};
        _this.exp = 0;
        _this.sysId = PackageID.Shenshou;
        _this.regNetMsg(1, _this.postInfo);
        _this.regNetMsg(2, _this.postWearEquip);
        _this.regNetMsg(4, _this.postBattleState);
        _this.regNetMsg(5, _this.postBattleMaxLimit);
        _this.regNetMsg(6, _this.postUpdateExp);
        _this.regNetMsg(7, _this.postUpEquip);
        _this.regNetMsg(8, _this.postDepartEquip);
        return _this;
    }
    ShenshouSys.ins = function () {
        return _super.ins.call(this);
    };
    ShenshouSys.prototype.postInfo = function (bytes) {
        var len = bytes.readByte();
        for (var i = 0; i < len; i++) {
            var dt = new ShenshouData(bytes);
            this.dataList[dt.id] = dt;
        }
        this.maxLimit = bytes.readByte();
        this.exp = bytes.readInt();
    };
    ShenshouSys.prototype.postWearEquip = function (bytes) {
        var id = bytes.readByte();
        var pos = bytes.readByte();
        var equipId = bytes.readInt();
        if (this.dataList[id]) {
            this.dataList[id].equipIDs[pos] = equipId;
        }
        else {
            var dt = new ShenshouData();
            dt.equipIDs[pos] = equipId;
            dt.id = id;
            this.dataList[id] = dt;
        }
        this.dataList[id].checkState();
        ViewManager.ins().close(ShenshouWearEquipWin);
    };
    ShenshouSys.prototype.postBattleState = function (bytes) {
        this.dataList[bytes.readByte()].state = bytes.readByte();
    };
    ShenshouSys.prototype.postBattleMaxLimit = function (bytes) {
        this.maxLimit = bytes.readByte();
        ViewManager.ins().close(ShenshouDanUseWin);
    };
    ShenshouSys.prototype.postUpdateExp = function (bytes) {
        var oldExp = this.exp;
        this.exp = bytes.readInt();
        if (this.exp - oldExp > 0) {
            UserTips.ins().showTips("|C:0xffd93f&T:\u517D\u795E\u7CBE\u9B44  +" + (this.exp - oldExp) + "|");
        }
    };
    ShenshouSys.prototype.postUpEquip = function (bytes) {
        var id = bytes.readByte();
        var pos = bytes.readByte();
        var equipId = bytes.readInt();
        this.dataList[id].equipIDs[pos] = equipId;
        return equipId;
    };
    ShenshouSys.prototype.postDepartEquip = function (bytes) {
    };
    ShenshouSys.prototype.sendWearEquip = function (id, pos, equipId) {
        var bytes = this.getBytes(2);
        bytes.writeByte(id);
        bytes.writeByte(pos);
        bytes.writeInt(equipId);
        this.sendToServer(bytes);
    };
    ShenshouSys.prototype.sendComposeEquip = function (equipIds) {
        var bytes = this.getBytes(3);
        var len = equipIds.length;
        while (--len > 0) {
            bytes.writeInt(equipIds[len]);
        }
        this.sendToServer(bytes);
    };
    ShenshouSys.prototype.sendBattle = function (id) {
        var bytes = this.getBytes(4);
        bytes.writeByte(id);
        this.sendToServer(bytes);
    };
    ShenshouSys.prototype.sendUpLimitMax = function () {
        this.sendBaseProto(5);
    };
    ShenshouSys.prototype.sendUpEquip = function (id, pos) {
        var bytes = this.getBytes(7);
        bytes.writeByte(id);
        bytes.writeByte(pos);
        this.sendToServer(bytes);
    };
    ShenshouSys.prototype.sendDepartEquip = function (equips) {
        var bytes = this.getBytes(8);
        var count = equips.length;
        bytes.writeByte(count);
        for (var i = 0; i < count; i++) {
            bytes.writeInt(equips[i]);
        }
        this.sendToServer(bytes);
    };
    return ShenshouSys;
}(BaseSystem));
__reflect(ShenshouSys.prototype, "ShenshouSys");
var GameSystem;
(function (GameSystem) {
    GameSystem.shenshouSys = ShenshouSys.ins.bind(ShenshouSys);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ShenshouSys.js.map