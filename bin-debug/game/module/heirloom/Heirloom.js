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
var Heirloom = (function (_super) {
    __extends(Heirloom, _super);
    function Heirloom() {
        var _this = _super.call(this) || this;
        _this.huntTimes = 0;
        _this.huntBoxInfo = [];
        _this.huntHope = 0;
        _this.huntFreeTimes = 0;
        _this.huntRecords = [];
        _this.upRequest = false;
        _this.sysId = PackageID.Heirloom;
        _this.regNetMsg(1, _this.postHeirloomInfo);
        _this.regNetMsg(4, _this.doHuntBack);
        _this.regNetMsg(5, _this.postHuntRecord);
        _this.regNetMsg(7, _this.postHuntBoxInfo);
        return _this;
    }
    Heirloom.ins = function () {
        return _super.ins.call(this);
    };
    Heirloom.prototype.checkRedPoint = function () {
        if (UserZs.ins().lv < 3) {
            return false;
        }
        var len = SubRoles.ins().subRolesLen;
        var isShow = false;
        for (var i = 0; i < len; i++) {
            var curRole = SubRoles.ins().getSubRoleByIndex(i);
            for (var j = 0; j < 8; j++) {
                var info = curRole.heirloom.getInfoBySolt(j);
                var config = void 0;
                if (info.lv) {
                    config = GlobalConfig.HeirloomEquipConfig[info.slot][info.lv];
                }
                else {
                    config = GlobalConfig.HeirloomEquipFireConfig[j + 1];
                }
                var costItemLen = 0;
                var need = 0;
                if (config) {
                    var expend = config.expend;
                    if (!expend) {
                        continue;
                    }
                    var itemData = UserBag.ins().getBagItemById(expend.id);
                    costItemLen = itemData ? itemData.count : 0;
                    need = expend.count;
                    if (costItemLen >= need) {
                        isShow = true;
                        break;
                    }
                }
            }
            if (isShow)
                break;
        }
        return isShow;
    };
    Heirloom.prototype.sendHeirloomAdd = function (slot) {
        var bytes = this.getBytes(1);
        bytes.writeByte(slot);
        this.sendToServer(bytes);
    };
    Heirloom.prototype.sendHeirloomAct = function (roleId, slot) {
        var bytes = this.getBytes(2);
        bytes.writeByte(roleId);
        bytes.writeByte(slot);
        this.sendToServer(bytes);
    };
    Heirloom.prototype.sendHeirloomUpLevel = function (roleId, slot) {
        var bytes = this.getBytes(3);
        bytes.writeByte(roleId);
        bytes.writeByte(slot);
        this.upRequest = true;
        this.sendToServer(bytes);
    };
    Heirloom.prototype.postHeirloomInfo = function (bytes) {
        var roleId = bytes.readUnsignedByte();
        var solt = bytes.readUnsignedByte();
        var lv = bytes.readUnsignedByte();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        if (role) {
            role.heirloom.update(solt, lv);
        }
    };
    Heirloom.prototype.sendHunt = function (times) {
        var bytes = this.getBytes(4);
        bytes.writeByte(times);
        this.sendToServer(bytes);
    };
    Heirloom.prototype.sendHuntRecord = function () {
        this.sendBaseProto(5);
    };
    Heirloom.prototype.sendHuntAward = function (index) {
        var bytes = this.getBytes(6);
        bytes.writeInt(index);
        this.sendToServer(bytes);
    };
    Heirloom.prototype.doHuntBack = function (bytes) {
        var type = bytes.readUnsignedByte();
        var num = bytes.readUnsignedByte();
        var arr = [];
        for (var i = 0; i < num; i++)
            arr[i] = [bytes.readInt(), bytes.readUnsignedByte()];
        if (ViewManager.ins().isShow(HuntResultWin))
            this.postHuntResult(type, arr, 2);
        else {
            ViewManager.ins().open(HuntResultWin, type, arr, 2);
            this.postHuntResult(type, arr, 2);
        }
    };
    Heirloom.prototype.postHuntResult = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return params;
    };
    Heirloom.prototype.postHuntRecord = function (bytes) {
        this.huntRecords = [];
        var num = bytes.readUnsignedByte();
        for (var i = 0; i < num; i++)
            this.huntRecords[i] = [bytes.readString(), bytes.readInt()];
        this.huntRecords.reverse();
    };
    Heirloom.prototype.postHuntBoxInfo = function (bytes) {
        var state = bytes.readInt();
        this.huntTimes = bytes.readInt();
        this.huntHope = bytes.readInt();
        this.huntFreeTimes = bytes.readShort();
        var config;
        var i = 0;
        for (var k in GlobalConfig.HeirloomTreasureRewardConfig) {
            config = GlobalConfig.HeirloomTreasureRewardConfig[k];
            this.huntBoxInfo[i] = ((state >> config.id) & 1) ? Heirloom.ISNGET : (this.huntTimes >= config.needTime ? Heirloom.CANGET : Heirloom.UNGET);
            i++;
        }
    };
    Heirloom.prototype.getIsGetBox = function () {
        return this.huntBoxInfo.indexOf(Heirloom.CANGET) != -1 || this.huntFreeTimes > 0;
    };
    Heirloom.prototype.isHeirloomHuntOpen = function () {
        return UserZs.ins().lv >= GlobalConfig.HeirloomTreasureConfig.openZSlevel && GameServer.serverOpenDay >= GlobalConfig.HeirloomTreasureConfig.openDay;
    };
    Heirloom.UNGET = 0;
    Heirloom.CANGET = 1;
    Heirloom.ISNGET = 2;
    return Heirloom;
}(BaseSystem));
__reflect(Heirloom.prototype, "Heirloom");
var GameSystem;
(function (GameSystem) {
    GameSystem.heirloom = Heirloom.ins.bind(Heirloom);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Heirloom.js.map