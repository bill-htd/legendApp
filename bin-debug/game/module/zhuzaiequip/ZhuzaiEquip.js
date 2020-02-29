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
var ZhuzaiEquip = (function (_super) {
    __extends(ZhuzaiEquip, _super);
    function ZhuzaiEquip() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.ZhuZaiEquip;
        _this.regNetMsg(1, _this.postZhuZaiData);
        _this.regNetMsg(3, _this.postShengjie);
        _this.regNetMsg(4, _this.postShengjie);
        return _this;
    }
    ZhuzaiEquip.ins = function () {
        return _super.ins.call(this);
    };
    ZhuzaiEquip.prototype.postZhuZaiData = function (bytes) {
        var count = bytes.readShort();
        var index;
        for (var i = 0; i < count; i++) {
            index = bytes.readByte();
            var len = bytes.readShort();
            for (var j = 0; j < len; j++) {
                var data = new ZhuZaiData;
                data.parser(bytes);
                SubRoles.ins().getSubRoleByIndex(index).setZhuZaiData(data.id - 1, data);
            }
        }
    };
    ZhuzaiEquip.prototype.sendShengjie = function (roleID, id) {
        var bytes = this.getBytes(3);
        bytes.writeByte(roleID);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    ZhuzaiEquip.prototype.postShengjie = function (bytes) {
        return bytes.readBoolean();
    };
    ZhuzaiEquip.prototype.sendGrow = function (roleID, id) {
        var bytes = this.getBytes(4);
        bytes.writeByte(roleID);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    ZhuzaiEquip.prototype.sendFenjie = function () {
        this.sendBaseProto(5);
    };
    ZhuzaiEquip.prototype.canFengjie = function () {
        return false;
    };
    ZhuzaiEquip.prototype.canAllLevelup = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            if (this.canLevelup(i))
                return true;
        }
        return false;
    };
    ZhuzaiEquip.prototype.canLevelup = function (roleIndex) {
        var config = GlobalConfig.EquipPointBasicConfig;
        var b = false;
        for (var i in config) {
            var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
            var zhuzaiData = role.getZhuZaiDataByIndex(parseInt(i) - 1);
            b = zhuzaiData && zhuzaiData.canLevelup();
            if (b)
                return true;
        }
        return false;
    };
    ZhuzaiEquip.prototype.canAllAdvance = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            if (this.canAdvance(i))
                return true;
        }
        return false;
    };
    ZhuzaiEquip.prototype.canAdvance = function (roleIndex) {
        var config = GlobalConfig.EquipPointBasicConfig;
        var b = false;
        for (var i in config) {
            var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
            var zhuzaiData = role.getZhuZaiDataByIndex(parseInt(i) - 1);
            b = zhuzaiData && zhuzaiData.canAdvance();
            if (b)
                return true;
        }
        return false;
    };
    return ZhuzaiEquip;
}(BaseSystem));
__reflect(ZhuzaiEquip.prototype, "ZhuzaiEquip");
var GameSystem;
(function (GameSystem) {
    GameSystem.zhuzaiEquip = ZhuzaiEquip.ins.bind(ZhuzaiEquip);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ZhuzaiEquip.js.map