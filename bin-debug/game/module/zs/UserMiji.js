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
var UserMiji = (function (_super) {
    __extends(UserMiji, _super);
    function UserMiji() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Miji;
        _this.regNetMsg(1, _this.postMijiData);
        _this.regNetMsg(2, _this.postMijiUpDate);
        _this.regNetMsg(3, _this.postMijiChange);
        _this.regNetMsg(6, _this.postMijiLockInfo);
        return _this;
    }
    UserMiji.ins = function () {
        return _super.ins.call(this);
    };
    UserMiji.prototype.postMijiData = function (bytes) {
        this.grid = bytes.readShort();
        var count = SubRoles.ins().subRolesLen;
        this.miji = [];
        for (var i = 0; i < count; i++) {
            this.miji[i] = [];
            for (var j = 0; j < this.grid; j++) {
                var mijiData = new MijiData();
                mijiData.id = bytes.readInt();
                mijiData.isLocked = bytes.readInt();
                this.miji[i][j] = mijiData;
            }
        }
    };
    UserMiji.prototype.sendMijiLearn = function (roleID, skillID) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleID);
        bytes.writeInt(skillID);
        this.sendToServer(bytes);
    };
    UserMiji.prototype.postMijiUpDate = function (bytes) {
        var roleID = bytes.readShort();
        var index = bytes.readShort() - 1;
        var id = bytes.readInt();
        var isSuss = bytes.readByte();
        var oldID = this.miji[roleID][index].id;
        this.miji[roleID][index].id = id;
        return [index, id, oldID, isSuss];
    };
    UserMiji.prototype.sendMijiChange = function (id1, id2, id3) {
        var bytes = this.getBytes(3);
        bytes.writeInt(id1);
        bytes.writeInt(id2);
        bytes.writeInt(id3);
        this.sendToServer(bytes);
    };
    UserMiji.prototype.sendMijiwancheng = function (roleID) {
        var bytes = this.getBytes(4);
        bytes.writeShort(roleID);
        this.sendToServer(bytes);
    };
    UserMiji.prototype.sendMijiAddLock = function (roleID, mijiID) {
        var bytes = this.getBytes(5);
        bytes.writeInt(roleID);
        bytes.writeInt(mijiID);
        this.sendToServer(bytes);
    };
    UserMiji.prototype.sendMijiDelLock = function (roleID, mijiID) {
        var bytes = this.getBytes(6);
        bytes.writeInt(roleID);
        bytes.writeInt(mijiID);
        this.sendToServer(bytes);
    };
    UserMiji.prototype.getSkillListOfRole = function (roleID) {
        return (this.miji && this.miji[roleID]) ? this.miji[roleID] : null;
    };
    UserMiji.prototype.getMijiData = function (roleID, skillID) {
        var list = this.getSkillListOfRole(roleID);
        return (list && list[skillID]) ? list[skillID].id : null;
    };
    UserMiji.prototype.hasSpecificSkillOfRole = function (roleID, skillID) {
        var result = false;
        var skillList = this.getSkillListOfRole(roleID);
        if (skillList != null) {
            var b = false;
            for (var i = 0; i < skillList.length; i++) {
                if (skillList[i].id == skillID) {
                    b = true;
                }
            }
            if (b) {
                result = true;
            }
        }
        return result;
    };
    UserMiji.prototype.mijiIsLock = function (roleID, skillID) {
        var isLock = false;
        var skillList = this.getSkillListOfRole(roleID);
        if (skillList != null) {
            var b = false;
            for (var i = 0; i < skillList.length; i++) {
                if (Math.floor(skillList[i].id / 10) == Math.floor(skillID / 10) && skillList[i].isLocked) {
                    b = true;
                }
            }
            if (b) {
                isLock = true;
            }
        }
        return isLock;
    };
    UserMiji.prototype.hasNewSkillOfRole = function (roleID) {
        var result = false;
        var skillList = this.getSkillListOfRole(roleID);
        if (skillList != null) {
            skillList.every(function (obj) {
                if (obj.id > 0) {
                    result = true;
                    return false;
                }
                return true;
            });
        }
        return result;
    };
    UserMiji.prototype.postMijiChange = function (bytes) {
        var itemID = bytes.readInt();
        return itemID;
    };
    UserMiji.prototype.postMijiLockInfo = function (bytes) {
        var arr = this.miji[bytes.readInt()];
        var mijiid = bytes.readInt();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == mijiid) {
                var dd = bytes.readInt();
                arr[i].isLocked = dd;
                break;
            }
        }
    };
    UserMiji.prototype.getPowerByRole = function (index) {
        var power = 0;
        var mijiArr = this.miji[index];
        for (var i = 0; i < mijiArr.length; i++) {
            if (mijiArr[i].id)
                power += GlobalConfig.MiJiSkillConfig[mijiArr[i].id].power;
        }
        return power;
    };
    UserMiji.prototype.postSelectedMiji = function (itemNumber, name) {
        return [itemNumber, name];
    };
    UserMiji.prototype.postBagUseMiji = function (itemId) {
        return itemId;
    };
    UserMiji.prototype.hasEquipMiji = function (itemId, index) {
        if (index === void 0) { index = 0; }
        var numList = this.miji[index];
        if (!numList)
            return false;
        for (var j = 0; j < numList.length; j++) {
            if (numList[j] && numList[j].id != 0) {
                var cfg = GlobalConfig.MiJiSkillConfig[numList[j].id];
                if (cfg.item == itemId) {
                    return true;
                }
            }
        }
        return false;
    };
    UserMiji.prototype.isMjiSum = function () {
        if (UserZs.ins().lv < UserMiji.ZsLv)
            return false;
        if (!this.miji)
            return false;
        var arr = UserBag.ins().getBagGoodsByType(2);
        var have = arr.length > 0 ? true : false;
        if (!have)
            return false;
        var mijiRedPoint = Setting.ins().getValue(ClientSet.mijiRedPoint);
        if (mijiRedPoint)
            return false;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var numList = this.miji[i];
            for (var j = 0; j < numList.length; j++) {
                if (numList[j].id) {
                    var cfg = GlobalConfig.MiJiSkillConfig[numList[j].id];
                    for (var k = 0; k < arr.length; k++) {
                        if (cfg.item == arr[k]._configID) {
                            Setting.ins().setValue(ClientSet.mijiRedPoint, 1);
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };
    UserMiji.ZsLv = 1;
    UserMiji.BAGOPEN = 5;
    return UserMiji;
}(BaseSystem));
__reflect(UserMiji.prototype, "UserMiji");
var GameSystem;
(function (GameSystem) {
    GameSystem.userMiji = UserMiji.ins.bind(UserMiji);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserMiji.js.map