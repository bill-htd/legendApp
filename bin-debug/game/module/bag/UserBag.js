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
var UserBag = (function (_super) {
    __extends(UserBag, _super);
    function UserBag() {
        var _this = _super.call(this) || this;
        _this.bagNum = 0;
        _this.bagModel = [];
        _this.isExitUsedItem = 0;
        _this.isChange = 0;
        _this.OrangeEquipRedPoint = [];
        _this.itemCount = { 0: {}, 1: {} };
        _this.promptList = ["", "背包满了", "", "不能被使用", "级别不足", "数量不足够"];
        _this.equipPowerDic = [];
        _this.wearList = [];
        _this.sysId = PackageID.Bag;
        _this.regNetMsg(1, _this.doBagData);
        _this.regNetMsg(2, _this.doBagValumnAdd);
        _this.regNetMsg(3, _this.doDeleteItem);
        _this.regNetMsg(4, _this.doAddItem);
        _this.regNetMsg(5, _this.doUpDataItem);
        _this.regNetMsg(6, _this.doUserItemBack);
        _this.regNetMsg(7, _this.postMergeItemBack);
        _this.regNetMsg(8, _this.doChoosableGiftResult);
        _this.observe(Recharge.ins().postGetMonthDay, _this.doBagVolChange);
        _this._useItemFunc = {};
        _this.registerUseItemFunc(ItemConst.RENAME, _this.useRenameItem);
        for (var i = 0; i < 8; i++) {
            _this.OrangeEquipRedPoint[i] = false;
        }
        return _this;
    }
    UserBag.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(UserBag, "fitleEquip", {
        get: function () {
            if (!UserBag._fitleEquip) {
                UserBag._fitleEquip = [];
                for (var k in GlobalConfig.SpecialEquipsConfig) {
                    if (GlobalConfig.SpecialEquipsConfig[k].style == FitleStyle.hc)
                        UserBag._fitleEquip.push(GlobalConfig.SpecialEquipsConfig[k].id);
                }
            }
            return UserBag._fitleEquip;
        },
        enumerable: true,
        configurable: true
    });
    UserBag.prototype.sendAddBagGrid = function (num) {
        var bytes = this.getBytes(2);
        bytes.writeInt(num);
        this.sendToServer(bytes);
    };
    UserBag.prototype.sendUseItem = function (id, count) {
        if (this._useItemFunc[id] != null) {
            this._useItemFunc[id](id, count);
            return true;
        }
        var bytes = this.getBytes(6);
        bytes.writeInt(id);
        bytes.writeInt(count);
        this.sendToServer(bytes);
        return false;
    };
    UserBag.prototype.sendUserGoods = function (id, count) {
    };
    UserBag.prototype.addItemCount = function (type, item) {
        var id = item.configID;
        if (item.count == 0) {
            this.delItemCount(type, id);
            return;
        }
        this.itemCount[type][id] = this.itemCount[type][id] || 0;
        if (type == 1) {
            this.itemCount[type][id] += 1;
        }
        else {
            this.itemCount[type][id] = item.count;
        }
    };
    UserBag.prototype.delItemCount = function (type, delId) {
        if (type == 1) {
            if (this.itemCount[type][delId]) {
                this.itemCount[type][delId] -= 1;
                if (this.itemCount[type][delId] == 0)
                    delete this.itemCount[type][delId];
            }
        }
        else {
            delete this.itemCount[type][delId];
        }
    };
    UserBag.prototype.getBagItemCount = function (type, id) {
        return this.itemCount[type][id] || 0;
    };
    UserBag.prototype.doBagData = function (bytes) {
        var code = bytes.readByte();
        var type = bytes.readByte();
        if (code == 0) {
            this.bagModel[type] = [];
            this.itemCount[type] = {};
        }
        var len = bytes.readInt();
        var itemModel;
        for (var i = 0; i < len; i++) {
            itemModel = new ItemData();
            itemModel.parser(bytes);
            this.bagModel[type].push(itemModel);
            if (type == 0 || type == 1) {
                this.addItemCount(type, itemModel);
            }
        }
        UserBag.ins().postItemAdd();
        if (type == 1) {
            this.doBagVolChange();
        }
        if (type == 2) {
            UserBag.ins().postHuntStore();
        }
        this.getIsExitUsedItem();
        UserBag.ins().postHasItemCanUse();
    };
    UserBag.prototype.doBagVolChange = function () {
        this.postBagVolChange();
    };
    UserBag.prototype.postBagVolChange = function () {
        var b = this.ronglianCheck();
        this.isChange = b ? 1 : 0;
        var count = b ? 2 : 0;
        UserBag.ins().postItemCountChange();
        if (!b) {
            b = this.getSurplusCount() < this.getMaxBagRoom() * 0.05;
            count = b ? 1 : 0;
        }
        UserBag.ins().postBagWillFull(count);
    };
    UserBag.prototype.ronglianCheck = function () {
        var total = this.bagNum;
        if (GlobalConfig
            && GlobalConfig.VipGridConfig
            && GlobalConfig.VipGridConfig[UserVip.ins().lv]) {
            total += GlobalConfig.VipGridConfig[UserVip.ins().lv].grid + Recharge.ins().getAddBagGrid();
        }
        var ins = UserBag.ins();
        var isFind = false;
        var b = UserFb.ins().guanqiaID > 50 ? this.getBagItemNum() / total >= 0.8 : this.getBagItemNum() >= 50;
        if (b) {
            var list = ins.getOutEquips();
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var data = list_1[_i];
                if (data && data.itemConfig) {
                    isFind = true;
                    break;
                }
            }
        }
        return isFind;
    };
    UserBag.prototype.doUserItemBack = function (bytes) {
        var index = bytes.readByte();
        if (index > 0) {
            UserTips.ins().showTips(this.promptList[index]);
        }
        else if (index == 0) {
            UserBag.ins().postUseItemSuccess();
        }
    };
    UserBag.prototype.doBagValumnAdd = function (bytes) {
        this.bagNum = bytes.readInt();
        UserBag.ins().postBagVolAdd();
    };
    UserBag.prototype.doDeleteItem = function (bytes) {
        var type = bytes.readByte();
        var handle = bytes.readDouble();
        var delId = 0;
        for (var i = this.bagModel[type].length - 1; i >= 0; i--) {
            if (this.bagModel[type][i].handle == (handle)) {
                delId = this.bagModel[type][i].configID;
                UserBag.ins().isExitUsedItem = this.bagModel[type][i].getCanbeUsed() ? 1 : 0;
                this.bagModel[type].splice(i, 1);
                break;
            }
        }
        if (type == 0 || type == 1) {
            this.delItemCount(type, delId);
        }
        if (type == 2) {
            this.deleteHasType2 = true;
        }
        if (!this.isDeleteDelay) {
            this.isDeleteDelay = true;
            TimerManager.ins().doTimer(50, 1, this.deleteDelay, this);
        }
    };
    UserBag.prototype.doAddItem = function (bytes) {
        var type = bytes.readByte();
        var itemModel = new ItemData();
        itemModel.parser(bytes);
        this.bagModel[type].push(itemModel);
        if (type == 0 || type == 1) {
            this.addItemCount(type, itemModel);
        }
        UserBag.ins().isExitUsedItem = itemModel.getCanbeUsed() ? 1 : 0;
        var showTip = bytes.readByte();
        if (showTip) {
            var quality = ItemConfig.getQuality(itemModel.itemConfig);
            if (quality >= 4 && type == 1) {
                UserTips.ins().showGoodEquipTips(itemModel);
            }
            else {
                if (type != 2) {
                    if (ItemConfig.getType(itemModel.itemConfig) == ItemType.TYPE_18) {
                        UserTips.ins().showHeartItemTips(itemModel.itemConfig.id);
                    }
                    else {
                        var str = "获得|C:" + ItemConfig.getQualityColor(itemModel.itemConfig) + "&T:" + itemModel.itemConfig.name + " x " + itemModel.count + "|";
                        UserTips.ins().showTips(str);
                    }
                }
            }
        }
        if (type == 2) {
            this.addHasType2 = true;
        }
        if (!this.isAddDelay) {
            this.isAddDelay = true;
            TimerManager.ins().doTimer(50, 1, this.addDelay, this);
        }
        if (type == 1)
            NewEquip.ins().addItem(itemModel);
    };
    UserBag.prototype.addDelay = function () {
        this.isAddDelay = false;
        UserBag.ins().postItemAdd();
        UserBag.ins().postHasItemCanUse();
        this.doBagVolChange();
        if (this.addHasType2) {
            this.addHasType2 = false;
            UserBag.ins().postHuntStore();
        }
    };
    UserBag.prototype.deleteDelay = function () {
        this.isDeleteDelay = false;
        UserBag.ins().postItemDel();
        UserBag.ins().postHasItemCanUse();
        this.doBagVolChange();
        if (this.deleteHasType2) {
            this.deleteHasType2 = false;
            UserBag.ins().postHuntStore();
        }
    };
    UserBag.prototype.doUpDataItem = function (bytes) {
        var type = bytes.readByte();
        var handle = bytes.readDouble();
        var addNum = 0;
        var element;
        for (var i = 0; i < this.bagModel[type].length; i++) {
            element = this.bagModel[type][i];
            if (element.handle == (handle)) {
                var num = bytes.readInt();
                addNum = num - element.count;
                element.count = num;
                if (type == 0 || type == 1) {
                    this.addItemCount(type, element);
                }
                UserBag.ins().isExitUsedItem = element.getCanbeUsed() ? 1 : 0;
                UserBag.ins().postHasItemCanUse();
                break;
            }
        }
        var showTip = bytes.readByte();
        if (showTip) {
            if (addNum > 0) {
                if (type != 2) {
                    if (ItemConfig.getType(element.itemConfig) == ItemType.TYPE_18) {
                        UserTips.ins().showHeartItemTips(element.itemConfig.id);
                    }
                    else {
                        var quality = ItemConfig.getQualityColor(element.itemConfig);
                        var str = "获得|C:" + quality + "&T:" + element.itemConfig.name + " x " + addNum + "|";
                        UserTips.ins().showTips(str);
                    }
                    UserBag.ins().postItemAdd();
                }
            }
        }
        this.doBagVolChange();
        UserBag.ins().postItemChange();
    };
    UserBag.prototype.sendMergeItem = function (id, count) {
        var bytes = this.getBytes(7);
        bytes.writeInt(id);
        bytes.writeInt(count);
        this.sendToServer(bytes);
    };
    UserBag.prototype.postMergeItemBack = function (bytes) {
        var id = bytes.readInt();
        var count = bytes.readInt();
        var len = bytes.readInt();
        var items = [];
        for (var i = 0; i < len; i++) {
            items[i] = new RewardData();
            items[i].parser(bytes);
        }
        return items;
    };
    UserBag.prototype.sendGetGoodsByStore = function (uuid) {
        if (uuid == DepotType.Equip && this.getSurplusCount() < 1) {
            var strTips = GlobalConfig.ServerTips[2].tips;
            UserTips.ins().showTips(strTips);
            return;
        }
        var bytes = this.getBytes(4);
        bytes.writeNumber(uuid);
        this.sendToServer(bytes);
    };
    UserBag.prototype.postItemChange = function () {
    };
    UserBag.prototype.registerUseItemFunc = function (itemID, useFunc) {
        this._useItemFunc[itemID] = useFunc;
    };
    UserBag.prototype.postItemDel = function () {
    };
    UserBag.prototype.postItemAdd = function () {
    };
    UserBag.prototype.postItemCountChange = function () {
        return UserBag.ins().isChange;
    };
    UserBag.prototype.postBagWillFull = function (willFull) {
        return willFull;
    };
    UserBag.prototype.postHuntStore = function () {
    };
    UserBag.prototype.postHasItemCanUse = function () {
        return UserBag.ins().isExitUsedItem;
    };
    UserBag.prototype.postUseItemSuccess = function () {
    };
    UserBag.prototype.postBagVolAdd = function () {
    };
    UserBag.prototype.getBagItemById = function (id, Bag_Type) {
        if (Bag_Type === void 0) { Bag_Type = UserBag.BAG_TYPE_OTHTER; }
        var itemData = this.bagModel[Bag_Type];
        if (!itemData)
            return null;
        for (var _i = 0, itemData_1 = itemData; _i < itemData_1.length; _i++) {
            var data = itemData_1[_i];
            if (data.itemConfig.id == id)
                return data;
        }
        return null;
    };
    UserBag.prototype.getFilterBagItemById = function (id, filterAry, Bag_Type) {
        if (Bag_Type === void 0) { Bag_Type = UserBag.BAG_TYPE_OTHTER; }
        var itemData = this.bagModel[Bag_Type];
        for (var _i = 0, itemData_2 = itemData; _i < itemData_2.length; _i++) {
            var data = itemData_2[_i];
            if (data.itemConfig.id == id && filterAry.indexOf(data.handle) < 0)
                return data;
        }
        return null;
    };
    UserBag.prototype.getBagGoodsByTypeAndId = function (type, id) {
        var itemData = this.bagModel[type];
        for (var _i = 0, itemData_3 = itemData; _i < itemData_3.length; _i++) {
            var data = itemData_3[_i];
            if (data.itemConfig.id == id)
                return data;
        }
        return null;
    };
    UserBag.prototype.getBagEquipByType = function (type) {
        var itemData = this.bagModel[UserBag.BAG_TYPE_EQUIP];
        var itemData1 = [];
        for (var a in itemData) {
            if (ItemConfig.getType(itemData[a].itemConfig) == type) {
                itemData1.push(itemData[a]);
            }
        }
        return itemData1;
    };
    UserBag.prototype.getBagByType = function (t) {
        return this.bagModel[t];
    };
    UserBag.prototype.getBagGoodsCountByType = function (type, ids) {
        var itemData = this.bagModel[UserBag.BAG_TYPE_OTHTER];
        if (itemData) {
            for (var i = 0; i < itemData.length; i++) {
                if (ItemConfig.getType(itemData[i].itemConfig) == 8) {
                    if (itemData[i].itemConfig.bagType == DepotType.Rune) {
                        continue;
                    }
                    if (ids) {
                        if (ids.indexOf(itemData[i].itemConfig.id) != -1)
                            return true;
                    }
                    if (itemData[i].itemConfig.id == ItemConst.EXP_ITEM) {
                        if (Actor.level < 65)
                            continue;
                    }
                    if (itemData[i].itemConfig.id == ItemConst.LEVELUP_ITEM) {
                        if (this.getRmbItemIsBuy(ItemConst.LEVELUP_ITEM))
                            return true;
                        continue;
                    }
                    if (itemData[i].itemConfig.id == ItemConst.WEIWANG_ITEM)
                        continue;
                    return true;
                }
                else if (ItemConfig.getType(itemData[i].itemConfig) == 12) {
                    var b = Actor.level >= itemData[i].itemConfig.level && Guild.ins().guildID != 0 ? true : false;
                    if (b)
                        return true;
                }
                else if (ItemConfig.getType(itemData[i].itemConfig) == 17) {
                    return true;
                }
                else {
                    var composeConf = GlobalConfig.ItemComposeConfig[itemData[i].configID];
                    if (composeConf && composeConf.srcCount <= itemData[i].count) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    UserBag.prototype.getRuneBagGoodsCountByType = function (type) {
        var itemData = this.bagModel[UserBag.BAG_TYPE_OTHTER];
        if (itemData) {
            for (var i = 0; i < itemData.length; i++) {
                if (ItemConfig.getType(itemData[i].itemConfig) == 8) {
                    if (itemData[i].itemConfig.bagType) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    UserBag.prototype.getBagGoodsCountById = function (type, id) {
        if (type == 0 || type == 1) {
            return this.getBagItemCount(type, id);
        }
        var itemData = this.bagModel[type];
        if (itemData) {
            for (var i = 0; i < itemData.length; i++) {
                if (itemData[i].itemConfig && itemData[i].itemConfig.id == id)
                    return itemData[i].count;
            }
        }
        return 0;
    };
    UserBag.prototype.getBagGoodsByIndex = function (type, index) {
        return this.bagModel[type][index];
    };
    UserBag.prototype.getBagItemNum = function (type) {
        if (type === void 0) { type = 1; }
        var itemData = this.bagModel[type];
        return itemData ? itemData.length : 0;
    };
    UserBag.prototype.getSurplusCount = function () {
        return this.bagNum - this.getBagItemNum() + GlobalConfig.VipGridConfig[UserVip.ins().lv].grid + Recharge.ins().getAddBagGrid();
    };
    UserBag.prototype.getMaxBagRoom = function () {
        return this.bagNum + GlobalConfig.VipGridConfig[UserVip.ins().lv].grid + Recharge.ins().getAddBagGrid() + Recharge.ins().getAddBagFranchiseGrid();
    };
    UserBag.prototype.sort1 = function (a, b) {
        var s1 = a.point;
        var s2 = b.point;
        if (s1 > s2)
            return -1;
        else if (s1 < s2)
            return 1;
        else
            return 0;
    };
    UserBag.prototype.sort2 = function (a, b) {
        var s1 = a.point;
        var s2 = b.point;
        if (s1 < s2)
            return -1;
        else if (s1 > s2)
            return 1;
        else
            return 0;
    };
    UserBag.prototype.getHejiEquipsByType = function (pos) {
        var itemData = this.bagModel[1];
        var list = [];
        for (var i = 0; i < itemData.length; i++) {
            var item = itemData[i];
            var type = ItemConfig.getType(item.itemConfig);
            var subType = ItemConfig.getSubType(item.itemConfig);
            if (type != 5)
                continue;
            if (subType == pos) {
                list.push(item);
            }
        }
        list.sort(this.sort3);
        return list;
    };
    UserBag.prototype.sort3 = function (a, b) {
        var s1 = a.point;
        var s2 = b.point;
        if (s1 > s2)
            return -1;
        else if (s1 < s2)
            return 1;
        if (a.configID > b.configID)
            return -1;
        else if (a.configID < b.configID)
            return 1;
        else
            return 0;
    };
    UserBag.prototype.getBagSortEquips = function (isSort) {
        if (isSort === void 0) { isSort = 0; }
        var itemData = this.bagModel[UserBag.BAG_TYPE_EQUIP];
        if (isSort)
            itemData.sort(this.sort1);
        else
            itemData.sort(this.sort2);
        return itemData;
    };
    UserBag.prototype.getBagSortQualityEquips = function (quality, sole, sort, filter) {
        if (quality === void 0) { quality = 5; }
        if (sole === void 0) { sole = 0; }
        if (sort === void 0) { sort = 0; }
        if (filter === void 0) { filter = null; }
        var list = this.bagModel[UserBag.BAG_TYPE_EQUIP];
        var returnList = [];
        if (!list)
            return returnList;
        for (var i = 0; i < list.length; i++) {
            var q = ItemConfig.getQuality(list[i].itemConfig);
            if (quality != 5 && (q > quality || (sole && q < quality)))
                continue;
            if (filter != null && !filter(list[i]))
                continue;
            returnList[returnList.length] = list[i];
        }
        return returnList;
    };
    UserBag.prototype.getLegendOutEquips = function () {
        var list = UserBag.ins().getBagEquipsByQuality(5);
        var returnList = [];
        var nowEquips = [];
        var roleList = [];
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (!roleList[role.job]) {
                roleList[role.job] = [];
            }
            var equipLen = role.getEquipLen();
            for (var ii = 0; ii < equipLen; ii++) {
                var goods = role.getEquipByIndex(ii);
                if (!goods.item.itemConfig) {
                    continue;
                }
                this.addOneEquipToListEx(nowEquips, goods, role.job);
            }
        }
        var outEquip;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var subType = ItemConfig.getSubType(item.itemConfig);
            if (subType != 0 && subType != 2)
                continue;
            var isWear = false;
            for (var j = 0; j < nowEquips.length; j++) {
                var pos = ItemConfig.getSubType(item.itemConfig);
                if (pos == subType) {
                    isWear = true;
                    break;
                }
            }
            if (!isWear)
                continue;
            outEquip = this.checkEquipsIsGood(nowEquips, this.cloneItemDataInfo(item));
            if (outEquip) {
                if (!UserEquip.ins().checkEquipsIsWear(outEquip) && ItemConfig.getQuality(outEquip.itemConfig) == 5) {
                    returnList.push(outEquip);
                }
            }
        }
        return returnList;
    };
    UserBag.prototype.getLegendHasResolve = function () {
        var list = UserBag.ins().getBagEquipsByQuality(4);
        var returnList = [];
        var nowEquips = [];
        var roleList = [];
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            var equipLen = role.getEquipLen();
            for (var ii = 0; ii < equipLen; ii++) {
                var goods = role.getEquipByIndex(ii);
                if (!goods.item.itemConfig) {
                    continue;
                }
                this.addOneEquipToListRed(nowEquips, goods, i);
            }
        }
        var outEquip;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var job = ItemConfig.getJob(item.itemConfig);
            if (BreakDownView.fitleEquip[item.configID])
                continue;
            outEquip = this.checkEquipsIsGoodRed(nowEquips, this.cloneItemDataInfo(item));
            if (!outEquip) {
                return true;
            }
        }
        return false;
    };
    UserBag.prototype.otherEquipSmeltFilter = function (item) {
        var type = ItemConfig.getType(item.itemConfig);
        var subType = ItemConfig.getSubType(item.itemConfig);
        if (item.itemConfig && type == 4)
            return true;
        if (type == 0) {
            for (var key in ForgeConst.CAN_FORGE_EQUIP) {
                if (ForgeConst.EQUIP_POS_TO_SUB[ForgeConst.CAN_FORGE_EQUIP[key]] == subType)
                    return false;
            }
            return true;
        }
        return false;
    };
    UserBag.prototype.normalEquipSmeltFilter = function (item) {
        return ItemConfig.getType(item.itemConfig) == 0;
    };
    UserBag.prototype.getHejiOutEquips = function () {
        var returnList = [];
        if (returnList.length < 9) {
            this.checkHejiEquipsTodestroy(returnList);
        }
        this.creatListLength(returnList);
        return returnList;
    };
    UserBag.prototype.getOutEquips = function () {
        var list = this.getBagSortQualityEquips(5, 0, 1, this.normalEquipSmeltFilter);
        var returnList = [];
        var nowEquips = [];
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            var equipLen = role.getEquipLen();
            for (var ii = 0; ii < equipLen; ii++) {
                var goods = role.getEquipByIndex(ii);
                if (!goods.item.itemConfig) {
                    continue;
                }
                this.addOneEquipToList(nowEquips, goods, role.job);
            }
        }
        var outEquip;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            outEquip = this.checkEquipsIsGood(nowEquips, this.cloneItemDataInfo(item));
            if (outEquip) {
                if (!UserEquip.ins().checkEquipsIsWear(outEquip) && ItemConfig.getQuality(outEquip.itemConfig) < 4) {
                    if (ItemConfig.getSubType(outEquip.itemConfig) != ForgeConst.EQUIP_POS_TO_SUB[EquipPos.DZI]) {
                        returnList.push(outEquip);
                    }
                }
            }
            if (returnList.length >= 9) {
                break;
            }
        }
        if (returnList.length < 9) {
            this.getGuanyinEquip(returnList);
        }
        this.upLevelEquips = [];
        this.creatListLength(returnList);
        return returnList;
    };
    UserBag.prototype.creatListLength = function (list) {
        if (list.length < 9) {
            for (var i = 0; i < 9; i++) {
                if (list[i] == undefined) {
                    list[i] = null;
                }
            }
        }
    };
    UserBag.prototype.checkUpLevelEquips = function (item) {
        var job = ItemConfig.getJob(item.itemConfig);
        var subType = ItemConfig.getSubType(item.itemConfig);
        var zsLv = item.itemConfig.zsLevel;
        var level = item.itemConfig.level;
        var quality = ItemConfig.getQuality(item.itemConfig);
        if (quality == 5)
            return null;
        if (!this.upLevelEquips) {
            this.upLevelEquips = [];
        }
        if (!this.upLevelEquips[job]) {
            this.upLevelEquips[job] = [];
        }
        if (!this.upLevelEquips[job][subType]) {
            this.upLevelEquips[job][subType] = [];
        }
        if (!this.upLevelEquips[job][subType][zsLv]) {
            this.upLevelEquips[job][subType][zsLv] = [];
        }
        var onItem;
        onItem = this.upLevelEquips[job][subType][zsLv][level];
        if (onItem) {
            var best = this.checkEquipGetBest(onItem, item);
            if (best == onItem) {
                this.upLevelEquips[job][subType][zsLv][level] = item;
            }
            return best;
        }
        else {
            this.upLevelEquips[job][subType][zsLv][level] = item;
        }
        return null;
    };
    UserBag.prototype.checkUplevelBest = function (item, list) {
        var job = ItemConfig.getJob(item.itemConfig);
        var subType = ItemConfig.getSubType(item.itemConfig);
        var item1;
        var item2;
        var bestOne = null;
        if (!list[job]) {
            list[job] = [];
        }
        if (!list[job][subType]) {
            list[job][subType] = null;
        }
        item1 = list[job][subType];
        if (item1) {
            bestOne = this.checkEquipGetBest(item1, item);
        }
        return bestOne;
    };
    UserBag.prototype.checkEquipsIsGoodRed = function (list, item) {
        var lv = Actor.level;
        var zsLv = UserZs.ins().lv;
        var job = ItemConfig.getJob(item.itemConfig);
        var subType = ItemConfig.getSubType(item.itemConfig);
        var len = SubRoles.ins().subRolesLen;
        for (var roleId = 0; roleId < len; roleId++) {
            if (!list[roleId]) {
                list[roleId] = [];
            }
            var itemZsLevel = item.itemConfig.zsLevel ? item.itemConfig.zsLevel : 0;
            var itemLevel = item.itemConfig.level ? item.itemConfig.level : 0;
            if (zsLv >= itemZsLevel && lv >= itemLevel) {
                if (!list[roleId][subType]) {
                    return item;
                }
                var best = this.checkEquipGetBestEx(list[roleId][subType], item);
                if (!UserEquip.ins().checkEquipsIsWear(best)) {
                    return best;
                }
            }
        }
        return null;
    };
    UserBag.prototype.checkEquipsIsGood = function (list, item) {
        var lv = Actor.level;
        var zsLv = UserZs.ins().lv;
        var job = ItemConfig.getJob(item.itemConfig);
        var subType = ItemConfig.getSubType(item.itemConfig);
        if (item.itemConfig.level > lv || item.itemConfig.zsLevel > zsLv) {
            var best = this.checkUplevelBest(item, list);
            if (best && !UserEquip.ins().checkEquipsIsWear(best)) {
                return best;
            }
            return this.checkUpLevelEquips(item);
        }
        if (!list[job] || !list[job][subType]) {
            this.addOneEquipToList(list, item);
            return null;
        }
        var oldItem;
        var clearItem1;
        var clearItem;
        oldItem = list[job][subType];
        clearItem = this.checkEquipGetBest(oldItem, item);
        if (oldItem == clearItem) {
            list[job][subType] = item;
        }
        return clearItem;
    };
    UserBag.prototype.checkEquipGetBestEx = function (oldItem, newItem) {
        if (oldItem && newItem) {
            if (oldItem.point >= newItem.point) {
                return oldItem;
            }
            else {
                return newItem;
            }
        }
        return null;
    };
    UserBag.prototype.checkEquipGetBest = function (oldItem, newItem) {
        if (oldItem != null && newItem != null && oldItem.point >= newItem.point) {
            return newItem;
        }
        return oldItem;
    };
    UserBag.prototype.addOneEquipToListEx = function (list, item, rolejob) {
        if (rolejob === void 0) { rolejob = 0; }
        var goods;
        if (item instanceof EquipsData) {
            goods = this.cloneItemDataInfo(item.item);
        }
        else {
            goods = this.cloneItemDataInfo(item);
        }
        var job = ItemConfig.getJob(goods.itemConfig);
        var subType = ItemConfig.getSubType(goods.itemConfig);
        if (!job)
            job = rolejob;
        if (!list[job]) {
            list[job] = [];
        }
        list[job][subType] = goods;
    };
    UserBag.prototype.addOneEquipToListRed = function (list, item, roleId) {
        var goods;
        if (item instanceof EquipsData) {
            goods = this.cloneItemDataInfo(item.item);
        }
        else {
            goods = this.cloneItemDataInfo(item);
        }
        var subType = ItemConfig.getSubType(goods.itemConfig);
        if (!list[roleId]) {
            list[roleId] = [];
        }
        list[roleId][subType] = goods;
    };
    UserBag.prototype.addOneEquipToList = function (list, item, index) {
        if (index === void 0) { index = 0; }
        var goods;
        if (item instanceof EquipsData) {
            goods = this.cloneItemDataInfo(item.item);
        }
        else {
            goods = this.cloneItemDataInfo(item);
        }
        var job = ItemConfig.getJob(goods.itemConfig);
        if (job == 0)
            job = index;
        var subType = ItemConfig.getSubType(goods.itemConfig);
        if (!list[job]) {
            list[job] = [];
        }
        list[job][subType] = goods;
    };
    UserBag.prototype.cloneItemDataList = function (list) {
        var returnList = [];
        for (var i = 0; i < list.length; i++) {
            var item = new ItemData();
            item.handle = list[i].handle;
            item.configID = list[i].configID;
            item.att = list[i].att;
            item.itemConfig = list[i].itemConfig;
            item.count = list[i].count;
            returnList.push(item);
        }
        return returnList;
    };
    UserBag.prototype.cloneItemDataInfo = function (data) {
        var item = new ItemData();
        item.handle = data.handle;
        item.configID = data.configID;
        item.att = data.att;
        item.itemConfig = data.itemConfig;
        item.count = data.count;
        return item;
    };
    UserBag.prototype.getBagGoodsBySort = function (type) {
        var goodsList = this.getGoodsListByType(type, UserBag.BAG_TYPE_OTHTER);
        goodsList.sort(function (n1, n2) {
            if (n1.configID > n2.configID) {
                return 1;
            }
            if (n1.configID < n2.configID) {
                return -1;
            }
            return 0;
        });
        return goodsList;
    };
    UserBag.prototype.getBagGoodsByType = function (type) {
        var itemData = this.bagModel[UserBag.BAG_TYPE_OTHTER];
        var itemData1 = [];
        for (var a in itemData) {
            if (ItemConfig.getType(itemData[a].itemConfig) == type) {
                itemData1.push(itemData[a]);
            }
        }
        return itemData1;
    };
    UserBag.prototype.getBagGoodsByDescIndex = function (descIndex, Bag_Type) {
        if (Bag_Type === void 0) { Bag_Type = UserBag.BAG_TYPE_OTHTER; }
        var itemData = this.bagModel[Bag_Type];
        var itemData1;
        for (var a in itemData) {
            if (itemData[a].itemConfig.descIndex == descIndex) {
                itemData1 = itemData[a];
                break;
            }
        }
        return itemData1;
    };
    UserBag.prototype.getBagEquipsByQuality = function (quality, type, Bag_Type) {
        if (type === void 0) { type = 0; }
        if (Bag_Type === void 0) { Bag_Type = UserBag.BAG_TYPE_EQUIP; }
        var itemData = this.bagModel[Bag_Type];
        var itemData1 = [];
        for (var a in itemData) {
            var item = itemData[a];
            if (item &&
                ItemConfig.getType(item.itemConfig) == type &&
                ItemConfig.getQuality(item.itemConfig) == quality) {
                itemData1.push(itemData[a]);
            }
        }
        return itemData1;
    };
    UserBag.prototype.getBagGoodsByHandle = function (type, handle) {
        var itemData = this.bagModel[type];
        for (var i = 0; i < itemData.length; i++) {
            if (itemData[i].handle == (handle))
                return itemData[i];
        }
        return null;
    };
    UserBag.prototype.getHuntGoods = function (type) {
        return this.getGoodsListByType(type);
    };
    UserBag.prototype.getGoodsListByType = function (type, bagType) {
        if (bagType === void 0) { bagType = UserBag.BAG_TYPE_TREASUREHUNT; }
        var list = this.bagModel[bagType];
        var backList = [];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var itemConfig = list[i].itemConfig;
                if (itemConfig.bagType == type) {
                    if (itemConfig.split)
                        this.splitItemData(backList, list[i]);
                    else
                        backList.push(list[i]);
                }
            }
        }
        return backList;
    };
    UserBag.prototype.splitItemData = function (list, itemData) {
        var count = itemData.count;
        if (count > 1) {
            while (count > 0) {
                var newItem = itemData.copy();
                newItem.count = 1;
                list.push(newItem);
                count -= 1;
            }
        }
        else {
            list.push(itemData);
        }
    };
    UserBag.prototype.getHuntGoodsBySort = function (type) {
        var goodsList = [];
        if (this.bagModel[UserBag.BAG_TYPE_TREASUREHUNT]) {
            goodsList = this.getGoodsListByType(type);
            goodsList.sort(function (n1, n2) {
                var n1t = ItemConfig.getType(n1.itemConfig);
                var n2t = ItemConfig.getType(n2.itemConfig);
                if (n1t < n2t) {
                    return 1;
                }
                else if (n1t > n2t) {
                    return -1;
                }
                if (n1t) {
                    if (n1.configID >= n2.configID) {
                        return 1;
                    }
                    else if (n1.configID < n2.configID) {
                        return -1;
                    }
                }
                else {
                    if (n1.point >= n2.point) {
                        return -1;
                    }
                    else if (n1.point < n2.point) {
                        return 1;
                    }
                }
                return 0;
            });
        }
        return goodsList;
    };
    UserBag.prototype.getGuanyinEquip = function (list) {
        var items = this.getBagSortQualityEquips(5, 0, 0, this.otherEquipSmeltFilter);
        var lastId = 0;
        var len = SubRoles.ins().subRolesLen;
        if (len < 3) {
            lastId = 0;
        }
        else {
            for (var i = 0; i < len; i++) {
                var mo = SubRoles.ins().getSubRoleByIndex(i);
                var equip = mo.getEquipByIndex(EquipPos.DZI);
                if ((equip && equip.item && equip.item.configID < lastId) || lastId == 0)
                    lastId = equip.item.configID;
            }
        }
        if (items.length > 0) {
            for (var k in items) {
                var item = this.updateGuanyinEquip(items[k], lastId);
                if (item != null)
                    list.push(item);
                if (list.length >= 9)
                    break;
            }
        }
        return list;
    };
    UserBag.prototype.updateGuanyinEquip = function (data, lastId) {
        if (lastId === void 0) { lastId = 0; }
        var index = 0;
        var len = SubRoles.ins().subRolesLen;
        if (ItemConfig.getSubType(data.itemConfig) == ForgeConst.EQUIP_POS_TO_SUB[EquipPos.DZI]) {
            var score = data.point;
            for (var i = 0; i < len; i++) {
                var mo = SubRoles.ins().getSubRoleByIndex(i);
                var equip = mo.getEquipByIndex(EquipPos.DZI);
                var config = equip.item.itemConfig;
                if (!config || (config && score > equip.item.point)) {
                    return null;
                }
            }
            return data;
        }
        return null;
    };
    UserBag.prototype.getGuanyinLevel = function (itemConfig) {
        var str = TextFlowMaker.getCStr(itemConfig.id - ItemConst.GUANYIN_ITEM + 1);
        return str + "\u9636";
    };
    UserBag.prototype.getIsExitUsedItem = function () {
        var arr = this.bagModel[UserBag.BAG_TYPE_OTHTER];
        if (!arr)
            return false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].getCanbeUsed()) {
                UserBag.ins().isExitUsedItem = 1;
                return true;
            }
        }
        UserBag.ins().isExitUsedItem = 0;
        return false;
    };
    UserBag.prototype.getEquipsScoreByRolesOfBody = function () {
        var len = SubRoles.ins().subRolesLen;
        var point = 0;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role && role.equipsData) {
                var eqdata = role.equipsData;
                for (var j = 0; j < EquipPos.MAX; j++) {
                    if (eqdata[j] && eqdata[j].item &&
                        eqdata[j].item.itemConfig && eqdata[j].item.itemConfig.id) {
                        point += eqdata[j].item.point;
                    }
                }
            }
        }
        return point;
    };
    UserBag.prototype.calculationScore = function (item) {
        var equipsData;
        var mPoint = 0;
        var len = SubRoles.ins().subRolesLen;
        for (var ii = 0; ii < len; ii++) {
            var role = SubRoles.ins().getSubRoleByIndex(ii);
            if (role.job == ItemConfig.getJob(item.itemConfig)) {
                var equipLen = role.getEquipLen();
                for (var n = 0; n < equipLen; n++) {
                    equipsData = role.getEquipByIndex(n).item;
                    if (equipsData && equipsData.itemConfig && ItemConfig.getSubType(equipsData.itemConfig) == ItemConfig.getSubType(item.itemConfig)) {
                        if (mPoint == 0) {
                            mPoint = equipsData.point;
                        }
                        else {
                            mPoint = Math.min(equipsData.point, mPoint);
                        }
                    }
                }
            }
        }
        return item.point - mPoint;
    };
    UserBag.prototype.useRenameItem = function (id, count) {
        ViewManager.ins().open(RenameWin);
    };
    UserBag.getAttrPower = function (attr, role) {
        if (role === void 0) { role = null; }
        var powerConfig = GlobalConfig.AttrPowerConfig;
        var allPower = 0;
        if (!attr)
            return allPower;
        var exPower = 0;
        for (var i = 0; i < attr.length; i++) {
            var atype = attr[i].type;
            var value = attr[i].value;
            if (atype == AttributeType.atHpEx ||
                atype == AttributeType.atAtkEx ||
                atype == AttributeType.atDamageReduction) {
                continue;
            }
            if (!powerConfig[atype] || !value)
                continue;
            allPower += value * powerConfig[atype].power;
            if (atype == AttributeType.atHuiXinDamage && role)
                exPower += ItemConfig.relatePower(attr[i], role);
        }
        return Math.floor(allPower / 100) + Math.floor(exPower);
    };
    UserBag.prototype.setEquipPowerDic = function (job, pos, power) {
        if (power === void 0) { power = 0; }
        if (!this.equipPowerDic[job])
            this.equipPowerDic[job] = [];
        if (!this.equipPowerDic[job][pos])
            this.equipPowerDic[job][pos] = 0;
        this.equipPowerDic[job][pos] = power;
    };
    UserBag.prototype.getEquipPowerDic = function (job, pos) {
        if (this.equipPowerDic[job] && this.equipPowerDic[job][pos]) {
            return this.equipPowerDic[job][pos];
        }
        return 0;
    };
    UserBag.prototype.getLowEquipIndex = function (equips, type) {
        var index = -1;
        var tPower = Number.MAX_VALUE;
        var len = equips.length;
        for (var i = 0; i < len; i++) {
            if (ForgeConst.EQUIP_POS_TO_SUB[i] != type)
                continue;
            var item = equips[i];
            if (item.handle == 0) {
                return i;
            }
            var itemPower = item.point;
            if (itemPower < tPower) {
                index = i;
                tPower = itemPower;
            }
        }
        return index;
    };
    UserBag.prototype.getHejiEquips = function () {
        var itemData = this.bagModel[1];
        var list = [];
        for (var i = 0; i < itemData.length; i++) {
            var item = itemData[i];
            if (ItemConfig.getType(item.itemConfig) == 5)
                list.push(item);
        }
        return list;
    };
    UserBag.prototype.checkIsWear = function (item) {
        if (!item) {
            return false;
        }
        for (var k = 0; k < 8; k++) {
            var wear = UserSkill.ins().equipListData[k];
            if (wear && wear.handle == item.handle) {
                return false;
            }
        }
        return true;
    };
    UserBag.prototype.makeHejiWearList = function (item) {
        var pos = ItemConfig.getSubType(item.itemConfig);
        this.wearList[pos] = item;
    };
    UserBag.prototype.checkHejiEquipsTodestroy = function (returnList) {
        if (!UserSkill.ins().equipListData)
            return;
        for (var k = 0; k < 8; k++) {
            var wear_1 = UserSkill.ins().equipListData[k];
            if (wear_1 && wear_1.configID != 0) {
                this.makeHejiWearList(wear_1);
            }
        }
        var itemList = this.getHejiEquips();
        var len = itemList.length;
        var item;
        var wear;
        for (var i = 0; i < len; i++) {
            item = itemList[i];
            var pos = ItemConfig.getSubType(item.itemConfig);
            wear = this.wearList[pos];
            if (!wear || wear.configID == 0)
                continue;
            var point1 = 0;
            var point2 = 0;
            point1 = item.point;
            point2 = wear.point;
            if (point2 >= point1) {
                returnList.push(item);
            }
            else {
                var level = 0;
                if (item.itemConfig.level <= level) {
                    this.wearList[pos] = item;
                    if (this.checkIsWear(wear)) {
                        returnList.push(wear);
                    }
                }
            }
            if (returnList.length >= 9) {
                break;
            }
        }
    };
    UserBag.prototype.getEquipByPos = function (index, pos) {
        var list = this.bagModel[UserBag.BAG_TYPE_EQUIP];
        var role = SubRoles.ins().getSubRoleByIndex(index);
        var goods = role.getEquipByIndex(pos);
        var subType = 0;
        if (goods && goods.item.itemConfig) {
            subType = ItemConfig.getSubType(goods.item.itemConfig);
        }
        else {
            subType = pos;
        }
        var returnList = [];
        var tempList = [];
        var level = Actor.level;
        var zsLevel = UserZs.ins().lv;
        for (var i = 0; i < list.length; i++) {
            var job = ItemConfig.getJob(list[i].itemConfig);
            var subType1 = ItemConfig.getSubType(list[i].itemConfig);
            if ((job == role.job || job == 0) && subType1 == subType) {
                if (Math.floor(list[i].itemConfig.id / 10000) == 91)
                    continue;
                if (goods && list[i].handle == goods.item.handle) {
                    continue;
                }
                if (zsLevel < list[i].itemConfig.zsLevel || level < list[i].itemConfig.level) {
                    tempList.push(list[i]);
                }
                else {
                    returnList.push(list[i]);
                }
            }
        }
        returnList = returnList.sort(this.sortFun);
        tempList.sort(this.sortFun);
        returnList = returnList.concat(tempList);
        return returnList;
    };
    UserBag.prototype.sortFun = function (aItem, bItem) {
        var att1 = UserBag.ins().getEquipAttrs(aItem);
        var itemPoint1 = UserBag.getAttrPower(att1);
        var att2 = UserBag.ins().getEquipAttrs(bItem);
        var itemPoint2 = UserBag.getAttrPower(att2);
        if (itemPoint1 < itemPoint2)
            return 1;
        if (itemPoint1 > itemPoint2)
            return -1;
        return 0;
    };
    UserBag.prototype.getEquipAttrs = function (data) {
        var config = GlobalConfig.EquipConfig[data.configID];
        var totalAttr = [];
        for (var k in Role.translate) {
            if (config[k] <= 0)
                continue;
            var attr = data.att;
            for (var index = 0; index < attr.length; index++) {
                if (attr[index].type == Role.getAttrTypeByName(k)) {
                    var attrs = new AttributeData;
                    attrs.type = attr[index].type;
                    attrs.value = config[k] + attr[index].value;
                    totalAttr.push(attrs);
                    break;
                }
            }
        }
        return totalAttr;
    };
    UserBag.prototype.checkEqRedPoint = function (index, role, islook) {
        var equipData = role.getEquipByIndex(index);
        var nextConfig;
        if (equipData.item.itemConfig && ItemConfig.getQuality(equipData.item.itemConfig) < 4)
            nextConfig = null;
        else
            nextConfig = GlobalConfig.ItemConfig[equipData.item.configID + 1];
        var needNum = 0;
        var costID = 0;
        if (equipData.item.itemConfig && ItemConfig.getQuality(equipData.item.itemConfig) == 4 && equipData.item.itemConfig.zsLevel >= 12)
            return null;
        if (equipData.item.itemConfig && ItemConfig.getQuality(equipData.item.itemConfig) == 5)
            return null;
        if (nextConfig != null && (nextConfig.level > Actor.level || nextConfig.zsLevel > UserZs.ins().lv))
            return null;
        if (nextConfig != undefined && equipData.item.handle != 0 && ItemConfig.getQuality(equipData.item.itemConfig) == 4 && equipData.item.itemConfig.level != 1 && UserBag.fitleEquip.indexOf(equipData.item.configID) == -1) {
        }
        else {
            var configId = UserEquip.ins().getEquipConfigIDByPosAndQualityByGod(role, index, 4, role.job);
            var mixConfig = GlobalConfig.LegendComposeConfig[configId];
            if (mixConfig) {
                needNum = mixConfig.count;
                costID = mixConfig.itemId;
                var curNum = UserBag.ins().getBagGoodsCountById(0, costID);
                if (curNum >= needNum && !UserBag.ins().OrangeEquipRedPoint[index]) {
                    if (islook)
                        UserBag.ins().OrangeEquipRedPoint[index] = false;
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return null;
    };
    UserBag.prototype.doChoosableGiftResult = function (bytes) {
        var result = bytes.readUnsignedByte();
        if (result == 0)
            this.postGiftResult();
    };
    UserBag.prototype.postGiftResult = function () {
    };
    UserBag.prototype.sendChoosableGift = function (itemId, count, index) {
        var bytes = this.getBytes(8);
        bytes.writeInt(itemId);
        bytes.writeInt(count);
        bytes.writeInt(index + 1);
        this.sendToServer(bytes);
    };
    UserBag.prototype.getRmbItemIsBuy = function (id) {
        var config = GlobalConfig.ItemConfig[id];
        if (config && config.needyuanbao && Actor.yb >= config.needyuanbao) {
            return true;
        }
        return false;
    };
    UserBag.BAG_TYPE_OTHTER = 0;
    UserBag.BAG_TYPE_EQUIP = 1;
    UserBag.BAG_TYPE_TREASUREHUNT = 2;
    UserBag.BAG_ENOUGH = 20;
    UserBag.BAG_ENOUGH100 = 100;
    UserBag.BAG_ENOUGH200 = 200;
    UserBag.BAG_DESC_TYPE_HEIR = 11;
    return UserBag;
}(BaseSystem));
__reflect(UserBag.prototype, "UserBag");
var GameSystem;
(function (GameSystem) {
    GameSystem.userbag = UserBag.ins.bind(UserBag);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserBag.js.map