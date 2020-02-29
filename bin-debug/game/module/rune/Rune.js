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
var Rune = (function (_super) {
    __extends(Rune, _super);
    function Rune() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Rune;
        _this.regNetMsg(1, _this.doInlay);
        _this.regNetMsg(2, _this.doUpgrade);
        _this.regNetMsg(3, _this.doOneKeyDecompose);
        _this.regNetMsg(5, _this.postHuntRuneInfo);
        _this.regNetMsg(6, _this.postBestListInfo);
        _this.regNetMsg(8, _this.postRuneBoxGift);
        _this.regNetMsg(10, _this.postDelRune);
        _this.boxs = [];
        return _this;
    }
    Rune.ins = function () {
        return _super.ins.call(this);
    };
    Rune.prototype.sendInlay = function (role, pos, runeid) {
        var bytes = this.getBytes(1);
        bytes.writeShort(role);
        bytes.writeShort(pos);
        bytes.writeDouble(runeid);
        this.sendToServer(bytes);
    };
    Rune.prototype.doInlay = function (bytes) {
        var isSuccess = Boolean(bytes.readShort());
        var roleID = 0;
        var pos = 0;
        var id = 0;
        if (isSuccess) {
            roleID = bytes.readShort();
            pos = bytes.readShort();
            id = bytes.readInt();
        }
        this.postInlayResult([isSuccess, roleID, pos, id]);
    };
    Rune.prototype.postInlayResult = function (param) {
        return param;
    };
    Rune.prototype.sendUpgrade = function (role, pos) {
        var bytes = this.getBytes(2);
        bytes.writeShort(role);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    Rune.prototype.doUpgrade = function (bytes) {
        var isSuccess = Boolean(bytes.readByte());
        if (isSuccess) {
            var roleID = bytes.readShort();
            var pos = bytes.readShort();
            var id = bytes.readInt();
            RuneDataMgr.ins().replaceRune(roleID, pos, id);
            this.postUpgradeResult([isSuccess, roleID, id, pos]);
        }
    };
    Rune.prototype.postUpgradeResult = function (param) {
        return param;
    };
    Rune.prototype.sendOneKeyDecompose = function (uidList) {
        var len = uidList.length;
        var bytes = this.getBytes(3);
        bytes.writeInt(len);
        for (var i = 0; i < len; i++) {
            bytes.writeInt(uidList[i].configID);
        }
        this.sendToServer(bytes);
    };
    Rune.prototype.doOneKeyDecompose = function (bytes) {
        var isSuccess = Boolean(bytes.readByte());
        var normalNum = bytes.readInt();
        this.postOneKeyDecomposeResult([isSuccess, normalNum]);
    };
    Rune.prototype.postOneKeyDecomposeResult = function (param) {
        return param;
    };
    Rune.prototype.sendExchangeRune = function (id) {
        var bytes = this.getBytes(4);
        bytes.writeUnsignedInt(id);
        this.sendToServer(bytes);
    };
    Rune.prototype.sendHuntRune = function (type) {
        var bytes = this.getBytes(5);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    Rune.prototype.postHuntRuneInfo = function (bytes) {
        var type = bytes.readUnsignedByte();
        var num = bytes.readUnsignedByte();
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr[i] = [bytes.readInt(), bytes.readUnsignedByte()];
        }
        if (ViewManager.ins().isShow(HuntResultWin)) {
            Hunt.ins().postHuntResult(type, arr, 1);
        }
        else {
            ViewManager.ins().open(HuntResultWin, type, arr, 1);
        }
    };
    Rune.prototype.postBestListInfo = function (bytes) {
        var num = bytes.readUnsignedByte();
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr[i] = [bytes.readString(), bytes.readInt()];
        }
        arr.reverse();
        return arr;
    };
    Rune.prototype.sendRuneBoxGift = function (id) {
        var bytes = this.getBytes(7);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    Rune.prototype.postRuneBoxGift = function (bytes) {
        this.RuneRewards = bytes.readInt();
        this.runeCount = bytes.readInt();
        this.hope = bytes.readInt();
        var idx = 0;
        for (var k in GlobalConfig.FuwenTreasureRewardConfig) {
            var config = GlobalConfig.FuwenTreasureRewardConfig[k];
            this.boxs[idx] = ((this.RuneRewards >> config.id) & 1) ? Rune.ISNGET : (this.runeCount >= config.needTime ? Rune.CANGET : Rune.UNGET);
            idx++;
        }
    };
    Rune.prototype.getIsGetBox = function () {
        for (var i = 0; i < Rune.BoxSum; i++) {
            switch (Rune.ins().boxs[i]) {
                case Rune.UNGET:
                    break;
                case Rune.CANGET:
                    return true;
                case Rune.ISNGET:
                    break;
            }
        }
        return false;
    };
    Rune.prototype.sendRuneMerge = function (id) {
        var bytes = this.getBytes(9);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    Rune.prototype.postDelRune = function (bytes) {
        var item = RuneDataMgr.ins().getRune(bytes.readInt(), bytes.readInt());
        item.init();
    };
    Rune.prototype.isOpen = function () {
        var config = GlobalConfig.MergeTotal[4];
        if ((config.openZs || 0) <= UserZs.ins().lv && (config.openLv || 0) <= Actor.level) {
            return true;
        }
        return false;
    };
    Rune.prototype.getRuneMergeEquipByLv = function (type) {
        var arr = [];
        var configs = GlobalConfig.RuneComposeConfig;
        for (var it in configs) {
            if (configs[it].mixId[1] == type)
                arr.push({ type: MergeType.Rune, id: configs[it].id });
        }
        return arr;
    };
    Rune.prototype.isRuneCanMergeByID = function (id) {
        var config = GlobalConfig.RuneComposeConfig[id];
        var mat = config.material;
        var num1 = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, config.material[0]);
        var num2 = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, config.material[1]);
        var num3 = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, GlobalConfig.RuneOtherConfig.goldItemId);
        if (num1 > 0 && num2 > 0 && num3 >= config.count) {
            return true;
        }
        return false;
    };
    Rune.prototype.isRuneCanMergeByType = function (type) {
        var arr = [];
        var configs = GlobalConfig.RuneComposeConfig;
        for (var it in configs) {
            if (configs[it].mixId[1] == type && this.isRuneCanMergeByID(configs[it].id)) {
                return true;
            }
        }
        return false;
    };
    Rune.prototype.isRuneCanMerge = function () {
        var arr = [];
        var configs = GlobalConfig.RuneComposeConfig;
        for (var it in configs) {
            if (this.isRuneCanMergeByID(configs[it].id)) {
                return true;
            }
        }
        return false;
    };
    Rune.prototype.getRuneMergeByID = function (id) {
        var arr = [];
        var configs = GlobalConfig.RuneComposeConfig;
        for (var it in configs) {
            var data = configs[it];
            for (var i in data.material) {
                if (data.material[i] == id)
                    return data;
            }
        }
        return null;
    };
    Rune.prototype.getIsMergeByID = function (id) {
        var itemCfg1 = GlobalConfig.ItemConfig[id];
        var tem = GlobalConfig.RuneComposeConfig;
        for (var it in tem) {
            var itemCfg = GlobalConfig.ItemConfig[it];
            if (ItemConfig.getSubType(itemCfg1) == ItemConfig.getSubType(itemCfg)) {
                return true;
            }
        }
        return false;
    };
    Rune.prototype.getMergeIndexByType = function (type, id) {
        var configs = GlobalConfig.RuneComposeConfig;
        var index = 0;
        for (var it in configs) {
            if (configs[it].mixId[1] == type) {
                if (id == configs[it].id)
                    return index;
                index++;
            }
        }
        return index;
    };
    Rune.prototype.isEquipMerge = function (id, curRole, pos) {
        var mId = this.isMergeId(id);
        var configs = GlobalConfig.RuneComposeConfig[mId];
        if (!configs)
            return false;
        var itemCfg = GlobalConfig.ItemConfig[id];
        var rdList = RuneDataMgr.ins().getRoleRune(curRole);
        if (!rdList)
            return false;
        var selectedRuneData = RuneDataMgr.ins().getRune(curRole, pos);
        var cfg;
        var len = rdList.length;
        for (var i = 0; i < len; i++) {
            var rd = rdList[i];
            cfg = RuneConfigMgr.ins().getBaseCfg(rd);
            if (cfg) {
                var arr = this.getIsEquipMerge(configs.checkMaterial, mId);
                for (var j = 0; j < arr.length; j++) {
                    var itemCfg1 = GlobalConfig.ItemConfig[arr[j]];
                    if (ItemConfig.getSubType(itemCfg1) == ItemConfig.getSubType(rd.itemConfig)) {
                        if (selectedRuneData) {
                            if (selectedRuneData.configID <= 0) {
                                if (this.getIsMergeByID(id) || this.getRoleIsHasMerge(arr, curRole))
                                    return true;
                            }
                            if (selectedRuneData.itemConfig) {
                                var b = this.getCurIsType(arr, ItemConfig.getSubType(selectedRuneData.itemConfig));
                                if (b) {
                                    if (this.getIsMergeByID(id) || this.getRoleIsHasMerge(arr, curRole))
                                        return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    Rune.prototype.getRoleIsHasMerge = function (arr, curRole) {
        var rdList = RuneDataMgr.ins().getRoleRune(curRole);
        if (!rdList)
            return false;
        var cfg;
        var len = rdList.length;
        for (var i = 0; i < len; i++) {
            var rd = rdList[i];
            cfg = RuneConfigMgr.ins().getBaseCfg(rd);
            if (cfg && this.getIsMergeByID(cfg.id)) {
                for (var j = 0; j < arr.length; j++) {
                    var itemCfg1 = GlobalConfig.ItemConfig[arr[j]];
                    if (ItemConfig.getSubType(rd.itemConfig) == ItemConfig.getSubType(itemCfg1)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Rune.prototype.getCurIsType = function (arr, type) {
        var b = true;
        for (var j = 0; j < arr.length; j++) {
            var itemCfg1 = GlobalConfig.ItemConfig[arr[j]];
            if (ItemConfig.getSubType(itemCfg1) == type) {
                b = false;
                break;
            }
        }
        return b;
    };
    Rune.prototype.getIsEquipMerge = function (arr, id) {
        var temArr = [];
        for (var i = 0; i < arr.length; i++) {
            temArr.push(arr[i]);
        }
        temArr.push(id);
        return temArr;
    };
    Rune.prototype.isMergeId = function (id) {
        var myID = id;
        var itemCfg1 = GlobalConfig.ItemConfig[id];
        var arr = GlobalConfig.RuneComposeConfig;
        for (var it in arr) {
            var itemCfg = GlobalConfig.ItemConfig[it];
            if (ItemConfig.getSubType(itemCfg1) == ItemConfig.getSubType(itemCfg)) {
                return parseInt(it);
            }
            for (var i in arr[it].material) {
                var itemCfg2 = GlobalConfig.ItemConfig[arr[it].material[i]];
                if (ItemConfig.getSubType(itemCfg1) == ItemConfig.getSubType(itemCfg2)) {
                    return parseInt(it);
                }
            }
        }
        return myID;
    };
    Rune.prototype.isCanEquip = function (id, curRole, tiId, posIndex) {
        var itemCfg = GlobalConfig.ItemConfig[id];
        var rdList = RuneDataMgr.ins().getRoleRune(curRole);
        if (!rdList)
            return true;
        var cfg;
        var len = rdList.length;
        for (var i = 0; i < len; i++) {
            var rd = rdList[i];
            cfg = RuneConfigMgr.ins().getBaseCfg(rd);
            if (cfg && rd.itemConfig) {
                var conf = GlobalConfig.RuneComposeConfig[cfg.id];
                if (!conf)
                    continue;
                var arr = conf.checkMaterial;
                for (var j = 0; j < arr.length; j++) {
                    var itemCfg1 = GlobalConfig.ItemConfig[arr[j]];
                    if (ItemConfig.getSubType(itemCfg1) == ItemConfig.getSubType(itemCfg)) {
                        if (tiId == 0)
                            return false;
                        else {
                            var itemCfg2 = GlobalConfig.ItemConfig[tiId];
                            if (ItemConfig.getSubType(itemCfg2) == ItemConfig.getSubType(itemCfg))
                                return false;
                        }
                    }
                }
            }
        }
        return true;
    };
    Rune.prototype.getMergeRune = function (id, curRole, item) {
        var mId = this.isMergeId(id);
        var itemCfg = GlobalConfig.ItemConfig[id];
        var configs = GlobalConfig.RuneComposeConfig[mId];
        var arr = [];
        if (!configs)
            return null;
        var rdList = RuneDataMgr.ins().getRoleRune(curRole);
        if (!rdList)
            return null;
        var cfg;
        var len = rdList.length;
        for (var i = 0; i < len; i++) {
            var rd = rdList[i];
            cfg = RuneConfigMgr.ins().getBaseCfg(rd);
            if (cfg) {
                var arrTem = this.getIsEquipMerge(configs.checkMaterial, mId);
                for (var j = 0; j < arrTem.length; j++) {
                    var itemCfg1 = GlobalConfig.ItemConfig[arrTem[j]];
                    if (ItemConfig.getSubType(itemCfg1) == ItemConfig.getSubType(rd.itemConfig)) {
                        if (item && item.configID != cfg.id && this.getIsMergeByID(id)) {
                            arr = ["\u66F4\u6362" + GlobalConfig.ItemConfig[configs.id].name + "\u5C06\u540C\u65F6\u8131\u4E0B" + GlobalConfig.ItemConfig[cfg.id].name, "" + i];
                            return arr;
                        }
                    }
                }
            }
        }
        return null;
    };
    Rune.UNGET = 0;
    Rune.CANGET = 1;
    Rune.ISNGET = 2;
    Rune.BoxSum = 5;
    return Rune;
}(BaseSystem));
__reflect(Rune.prototype, "Rune");
var GameSystem;
(function (GameSystem) {
    GameSystem.rune = Rune.ins.bind(Rune);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Rune.js.map