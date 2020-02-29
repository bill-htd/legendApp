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
var ShenshouModel = (function (_super) {
    __extends(ShenshouModel, _super);
    function ShenshouModel() {
        return _super.call(this) || this;
    }
    ShenshouModel.ins = function () {
        return _super.ins.call(this);
    };
    ShenshouModel.prototype.findCanWearEquips = function (id, pos) {
        var equips = UserBag.ins().getBagGoodsByType(ItemType.TYPE_23);
        var list = [];
        var myEquipScore = 0;
        var data = ShenshouSys.ins().dataList[id];
        if (data && data.equipIDs[pos])
            myEquipScore = UserBag.getAttrPower(GlobalConfig.ShenShouEquip[data.equipIDs[pos]].attrs);
        for (var _i = 0, equips_1 = equips; _i < equips_1.length; _i++) {
            var item = equips_1[_i];
            var quality = this.getEquipQuality(item.configID);
            var socre = UserBag.getAttrPower(GlobalConfig.ShenShouEquip[item.configID].attrs);
            if (ItemConfig.getSubType(item.itemConfig) == pos - 1 &&
                GlobalConfig.ShenShouBase[id].minLevel[pos - 1] <= quality) {
                var dt = new ShenshouEquipData();
                dt.id = item.configID;
                dt.pos = pos;
                dt.shenshuId = id;
                var aData = GlobalConfig.ShenShouEquip[item.configID];
                dt.sortIndex = UserBag.getAttrPower(aData.attrs);
                dt.best = dt.sortIndex > myEquipScore;
                list.push(dt);
            }
        }
        list.sort(this.compareFun);
        return list;
    };
    ShenshouModel.prototype.checkEquipScore = function (id, tId) {
        var mySocre = UserBag.getAttrPower(GlobalConfig.ShenShouEquip[id].attrs);
        var toSocre = UserBag.getAttrPower(GlobalConfig.ShenShouEquip[tId].attrs);
        return mySocre >= toSocre;
    };
    ShenshouModel.prototype.compareFun = function (a, b) {
        if (a.sortIndex > b.sortIndex)
            return -1;
        else if (a.sortIndex < b.sortIndex)
            return 1;
        else
            return 0;
    };
    ShenshouModel.prototype.calcEquipScore = function (id) {
        var data = this.getDataById(id);
        var score = 0;
        if (data) {
            for (var i = 1; i <= data.equipIDs.length; i++) {
                var equipData = GlobalConfig.ShenShouEquip[data.equipIDs[i]];
                if (!equipData)
                    continue;
                score += UserBag.getAttrPower(equipData.attrs);
                if (equipData.expower)
                    score += equipData.expower;
            }
        }
        return score;
    };
    ShenshouModel.prototype.getDataById = function (id) {
        var data = ShenshouSys.ins().dataList[id];
        return data;
    };
    ShenshouModel.prototype.getAttrValue = function (id, attrType) {
        var data = this.getDataById(id);
        if (data) {
            var value = 0;
            for (var pos in data.equipIDs) {
                if (!pos)
                    continue;
                var equip = GlobalConfig.ShenShouEquip[data.equipIDs[pos]];
                if (!equip)
                    continue;
                for (var _i = 0, _a = equip.attrs; _i < _a.length; _i++) {
                    var attr = _a[_i];
                    if (attrType == attr.type)
                        value += attr.value;
                }
            }
            return value;
        }
        return 0;
    };
    ShenshouModel.prototype.getCurStatus = function (id) {
        var data = this.getDataById(id);
        if (data) {
            return data.state;
        }
        return ShenshouState.State_No;
    };
    ShenshouModel.prototype.getCurBattle = function () {
        var count = 0;
        for (var id in ShenshouSys.ins().dataList) {
            if (ShenshouSys.ins().dataList[id].state == ShenshouState.State_Has)
                count++;
        }
        return count;
    };
    ShenshouModel.prototype.getCountBattle = function () {
        return GlobalConfig.ShenShouConfig.minCount + ShenshouSys.ins().maxLimit;
    };
    ShenshouModel.prototype.isCanBattle = function () {
        return this.getCurBattle() < this.getCountBattle();
    };
    ShenshouModel.prototype.getNowAttr = function (equip) {
        var nowAttrList = [];
        for (var index = 0; index < equip.attrs.length; index++) {
            var newAttr = new AttributeData(equip.attrs[index].type, equip.attrs[index].value - equip.starattrs[index].value);
            nowAttrList.push(newAttr);
        }
        return nowAttrList;
    };
    ShenshouModel.prototype.getEquipLv = function (id) {
        return parseInt((id + "").slice(4, 7));
    };
    ShenshouModel.prototype.getEquipQuality = function (id) {
        return parseInt((id + "").slice(2, 4));
    };
    ShenshouModel.prototype.getEquipBaseId = function (id) {
        return (id / 1000 >> 0) * 1000 + 1;
    };
    ShenshouModel.prototype.checkOpen = function () {
        return UserZs.ins().lv >= GlobalConfig.ShenShouConfig.openzhuanshenglv &&
            GameServer.serverOpenDay + 1 >= GlobalConfig.ShenShouConfig.openserverday;
    };
    ShenshouModel.EQUIPE_QUALITY_CN = ["\u5E73\u51E1", "\u7CBE\u826F", "\u53F2\u8BD7", "\u4F20\u5947", "\u795E\u8BDD"];
    return ShenshouModel;
}(BaseClass));
__reflect(ShenshouModel.prototype, "ShenshouModel");
//# sourceMappingURL=ShenshouModel.js.map