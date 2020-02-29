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
var DressType;
(function (DressType) {
    DressType[DressType["ROLE"] = 1] = "ROLE";
    DressType[DressType["ARM"] = 2] = "ARM";
    DressType[DressType["WING"] = 3] = "WING";
})(DressType || (DressType = {}));
var DressTypeName;
(function (DressTypeName) {
    DressTypeName[DressTypeName[""] = 0] = "";
    DressTypeName[DressTypeName["\u89D2\u8272"] = 1] = "\u89D2\u8272";
    DressTypeName[DressTypeName["\u6B66\u5668"] = 2] = "\u6B66\u5668";
    DressTypeName[DressTypeName["\u7FC5\u8180"] = 3] = "\u7FC5\u8180";
})(DressTypeName || (DressTypeName = {}));
var Dress = (function (_super) {
    __extends(Dress, _super);
    function Dress() {
        var _this = _super.call(this) || this;
        _this.timeInfo = {};
        _this.posInfo = [];
        _this.careerDic = {};
        _this.itemIdDic = {};
        _this.sysId = PackageID.Dress;
        _this.regNetMsg(1, _this.doDressInfo);
        _this.regNetMsg(2, _this.doDressActivationRes);
        _this.regNetMsg(3, _this.doDressUserRes);
        _this.regNetMsg(4, _this.doUnDressUserRes);
        _this.regNetMsg(5, _this.doDressTimeEnd);
        _this.regNetMsg(6, _this.postLevelUp);
        _this.regNetMsg(7, _this.postAddTime);
        return _this;
    }
    Dress.ins = function () {
        return _super.ins.call(this);
    };
    Dress.prototype.sendDressInfoReq = function () {
        this.sendBaseProto(1);
    };
    Dress.prototype.doDressInfo = function (bytes) {
        this.parser(bytes);
        Dress.ins().postDressInfo();
    };
    Dress.prototype.sendDressActivationReq = function (dressid) {
        var bytes = this.getBytes(2);
        bytes.writeInt(dressid);
        this.sendToServer(bytes);
    };
    Dress.prototype.doDressActivationRes = function (bytes) {
        this.parserAct(bytes);
        Dress.ins().postJiHuo();
        UserTips.ins().showTips("|C:0xffffff&T:激活装扮形象成功|");
    };
    Dress.prototype.sendDressUserReq = function (roid, dressid) {
        var bytes = this.getBytes(3);
        bytes.writeByte(roid);
        bytes.writeInt(dressid);
        this.sendToServer(bytes);
    };
    Dress.prototype.doDressUserRes = function (bytes) {
        this.parserDress(bytes);
        Dress.ins().postDressInfo();
        UserTips.ins().showTips("|C:0xffffff&T:幻化形象成功|");
    };
    Dress.prototype.sendUnDressUserReq = function (roid, dressid) {
        var bytes = this.getBytes(4);
        bytes.writeByte(roid);
        bytes.writeInt(dressid);
        this.sendToServer(bytes);
    };
    Dress.prototype.doUnDressUserRes = function (bytes) {
        this.parserDress(bytes);
        Dress.ins().postDressInfo();
        UserTips.ins().showTips("|C:0xffffff&T:取消幻化形象成功|");
    };
    Dress.prototype.doDressTimeEnd = function (bytes) {
        this.parserDel(bytes);
        Dress.ins().postDressInfo();
    };
    Dress.prototype.parser = function (bytes) {
        var num = bytes.readInt();
        this.timeInfo = {};
        for (var i = 0; i < num; i++) {
            var time = new DressTimeInfo();
            time.dressId = bytes.readInt();
            time.invalidtime = bytes.readInt();
            time.lv = bytes.readInt();
            this.timeInfo[time.dressId] = time;
        }
        num = bytes.readByte();
        this.posInfo = [];
        for (var i = 0; i < num; i++) {
            var pos = new DressPosInfo();
            for (var k = 0; k < 3; k++) {
                pos.posAry[k] = bytes.readInt();
            }
            this.posInfo.push(pos);
        }
    };
    Dress.prototype.parserAct = function (bytes) {
        var info = new DressTimeInfo();
        info.dressId = bytes.readInt();
        info.invalidtime = bytes.readInt();
        info.lv = bytes.readInt();
        this.timeInfo[info.dressId] = info;
    };
    Dress.prototype.parserDress = function (bytes) {
        var index = bytes.readByte();
        var posinfo = this.posInfo[index];
        var pos = bytes.readByte();
        var item = bytes.readInt();
        if (posinfo) {
            posinfo.posAry[pos - 1] = item;
        }
        var role = SubRoles.ins().getSubRoleByIndex(index);
        role.zhuangbei[pos - 1] = item;
        if (pos == 1 || pos == 2)
            UserEquip.ins().postEquipChange();
        else
            Dress.ins().postChangeWing();
        var mainRole = EntityManager.ins().getEntityByHandle(role.handle);
        if (mainRole)
            mainRole.updateModel();
    };
    Dress.prototype.parserDel = function (bytes) {
        var id = bytes.readInt();
        delete this.timeInfo[id];
        for (var i = 0; i < this.posInfo.length; i++) {
            var pos = this.posInfo[i];
            for (var k = 0; k < 3; k++) {
                if (pos.posAry[k] == id) {
                    pos.posAry[k] = 0;
                    var role = SubRoles.ins().getSubRoleByIndex(i);
                    role.zhuangbei[k] = 0;
                    if (k == 0 || k == 1)
                        UserEquip.ins().postEquipChange();
                    else
                        Dress.ins().postChangeWing();
                    var mainRole = EntityManager.ins().getEntityByHandle(role.handle);
                    if (mainRole)
                        mainRole.updateModel();
                    break;
                }
            }
        }
    };
    Dress.prototype.getModelPosId = function (curRole) {
        return this.posInfo[curRole];
    };
    Dress.prototype.redPoint = function () {
        return this.careerRedPoint();
    };
    Dress.prototype.careerRedPoint = function () {
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            var career = SubRoles.ins().getSubRoleByIndex(i).job;
            var zbs = this.getIdByCareer(career);
            for (var pos in zbs) {
                var zhuangban = zbs[pos];
                for (var _i = 0, zhuangban_1 = zhuangban; _i < zhuangban_1.length; _i++) {
                    var element = zhuangban_1[_i];
                    if (this.redPointDress(element.id)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Dress.prototype.curRoleRedPoint = function (roleId) {
        return this.roleRedPoint()[roleId];
    };
    Dress.prototype.roleRedPoint = function () {
        var boolList = [false, false, false];
        var length = SubRoles.ins().subRolesLen;
        for (var i = 0; i < length; i++) {
            var career = SubRoles.ins().getSubRoleByIndex(i).job;
            var zbs = this.getIdByCareer(career);
            for (var pos in zbs) {
                var zhuangban = zbs[pos];
                for (var _i = 0, zhuangban_2 = zhuangban; _i < zhuangban_2.length; _i++) {
                    var element = zhuangban_2[_i];
                    if (this.redPointDress(element.id)) {
                        boolList[i] = true;
                        break;
                    }
                }
                if (boolList[i])
                    break;
            }
        }
        return boolList;
    };
    Dress.prototype.canDress = function (job, pos) {
        if (pos == DressType.WING && Actor.level <= 16)
            return false;
        var arrZB = this.getIdByCareer(job)[pos];
        for (var k in arrZB) {
            if (this.redPointDress(arrZB[k].id)) {
                return true;
            }
        }
        return false;
    };
    Dress.prototype.posRedPoint = function () {
        var ret = [false, false, false];
        var length = SubRoles.ins().subRolesLen;
        for (var j = 0; j < length; j++) {
            var career = SubRoles.ins().getSubRoleByIndex(j).job;
            var zbs = this.getIdByCareer(career);
            for (var i = 0; i < 3; i++) {
                if (ret[i])
                    continue;
                var configs = zbs[i + 1];
                for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
                    var conf = configs_1[_i];
                    if (this.redPointDress(conf.id)) {
                        ret[i] = true;
                        break;
                    }
                }
            }
        }
        return ret;
    };
    Dress.prototype.getIdByCareer = function (career) {
        if (this.careerDic[career])
            return this.careerDic[career];
        this.initConfig();
        return this.careerDic[career];
    };
    Dress.prototype.getIdByItemId = function (itemId) {
        if (this.itemIdDic[itemId])
            return this.itemIdDic[itemId];
        this.initConfig();
        return this.itemIdDic[itemId];
    };
    Dress.prototype.initConfig = function () {
        if (Object.keys(this.itemIdDic).length)
            return;
        var ZBConfig = GlobalConfig.ZhuangBanId;
        for (var k in ZBConfig) {
            var config = ZBConfig[k];
            var roleType = config.roletype;
            var pos = config.pos;
            this.careerDic[roleType] = this.careerDic[roleType] || {};
            this.careerDic[roleType][pos] = this.careerDic[roleType][pos] || [];
            this.careerDic[roleType][pos].push(config);
            var itemId = config.cost.itemId;
            this.itemIdDic[itemId] = this.itemIdDic[itemId] || [];
            this.itemIdDic[itemId].push(config);
        }
    };
    Dress.prototype.redPointDress = function (id) {
        var config = GlobalConfig.ZhuangBanId[id];
        if (config.pos == DressType.WING && Actor.level <= 16)
            return false;
        var itemId = config.cost.itemId;
        var num = UserBag.ins().getBagGoodsCountById(0, itemId);
        if (num == 0)
            return false;
        if (!this.timeInfo[id]) {
            if (num >= config.cost.num)
                return true;
        }
        else {
            var arrIds = this.getIdByItemId(itemId);
            for (var _i = 0, arrIds_1 = arrIds; _i < arrIds_1.length; _i++) {
                var conf = arrIds_1[_i];
                if (conf.id != id) {
                    if (!this.timeInfo[conf.id])
                        return false;
                }
            }
            var nextlv = this.timeInfo[id].lv + 1;
            var zblu = GlobalConfig.ZhuangBanLevelUp[id];
            if (zblu && zblu[nextlv] && zblu[nextlv].cost.num <= num) {
                return true;
            }
        }
        return false;
    };
    Dress.prototype.getIdZhuangBanId = function (itemId) {
        var allData = GlobalConfig.ZhuangBanId;
        for (var key in allData) {
            var element = allData[key];
            if (element.cost.itemId == itemId) {
                return itemId;
            }
        }
        return 0;
    };
    Dress.prototype.sendLevelUp = function (id) {
        var bytes = this.getBytes(6);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    Dress.prototype.postLevelUp = function (bytes) {
        var id = bytes.readInt();
        var time = bytes.readInt();
        var lv = bytes.readInt();
        var info = this.timeInfo[id];
        info.invalidtime = time;
        info.lv = lv;
        this.postDressInfo();
    };
    Dress.prototype.sendAddTime = function (id) {
        var bytes = this.getBytes(7);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    Dress.prototype.postAddTime = function (bytes) {
        var id = bytes.readInt();
        var time = bytes.readInt();
        var lv = bytes.readInt();
        var info = this.timeInfo[id] || new DressTimeInfo();
        info.invalidtime = time;
        info.lv = lv;
        info.dressId = id;
        this.timeInfo[id] = info;
    };
    Dress.prototype.postDressInfo = function () {
    };
    Dress.prototype.postJiHuo = function () {
    };
    Dress.prototype.postChangeWing = function () {
    };
    return Dress;
}(BaseSystem));
__reflect(Dress.prototype, "Dress");
var GameSystem;
(function (GameSystem) {
    GameSystem.dress = Dress.ins.bind(Dress);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Dress.js.map