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
var MergeCC = (function (_super) {
    __extends(MergeCC, _super);
    function MergeCC() {
        return _super.call(this) || this;
    }
    MergeCC.ins = function () {
        return _super.ins.call(this);
    };
    MergeCC.prototype.isOpen = function () {
        return SamsaraModel.ins().isOpen() || ZhanLingModel.ins().ZhanLingOpen() || Rune.ins().isOpen();
    };
    MergeCC.prototype.redPoint = function () {
        var b = false;
        if (SamsaraModel.ins().isOpen()) {
            b = SamsaraModel.ins().isCanCompose();
        }
        if (!b && ZhanLingModel.ins().ZhanLingOpen()) {
            b = this.isZlCanMerge();
        }
        if (!b && Rune.ins().isOpen()) {
            b = Rune.ins().isRuneCanMerge();
        }
        return b;
    };
    MergeCC.prototype.getMergeMenu = function () {
        var config = GlobalConfig.MergeTotal;
        var lv = Actor.level;
        var zs = UserZs.ins().lv;
        var arr = [];
        for (var i in config) {
            if (config[i].type == MergeType.SamsareEquip) {
                if (SamsaraModel.ins().isOpen())
                    arr.push(config[i]);
            }
            else if (config[i].type == MergeType.ZhanlingEquip) {
                if (ZhanLingModel.ins().ZhanLingOpen())
                    arr.push(config[i]);
            }
            else if ((config[i].openZs || 0) <= zs && (config[i].openLv || 0) <= lv) {
                arr.push(config[i]);
            }
        }
        arr.sort(this.sortMenu);
        return arr;
    };
    MergeCC.prototype.getMergeSecMenu = function (id) {
        var config = GlobalConfig.MergeConfig[id];
        var lv = Actor.level;
        var zs = UserZs.ins().lv;
        var arr = [];
        for (var i in config) {
            if ((config[i].openZs || 0) <= zs && (config[i].openLv || 0) <= lv) {
                arr.push(config[i]);
            }
        }
        arr.sort(this.sortMenu);
        return arr;
    };
    MergeCC.prototype.sortMenu = function (a, b) {
        if (a.sort < b.sort)
            return -1;
        else if (a.sort > b.sort)
            return 1;
        return 0;
    };
    MergeCC.prototype.getListData = function (id, index) {
        var config = GlobalConfig.MergeTotal[id];
        var merge = GlobalConfig.MergeConfig[id][index];
        if (config.type == MergeType.SamsareEquip) {
            return SamsaraModel.ins().composeEquipMap[merge.lv][merge.openZs];
        }
        else if (config.type == MergeType.ZhanlingEquip) {
            return this.getZlMergeEquipByLv(merge.lv);
        }
        else if (config.type == MergeType.Rune) {
            return Rune.ins().getRuneMergeEquipByLv(merge.lv);
        }
        return [];
    };
    MergeCC.prototype.isCanMergeById = function (id) {
        var _type = GlobalConfig.MergeTotal[id].type;
        var b = false;
        switch (_type) {
            case MergeType.SamsareEquip:
                b = SamsaraModel.ins().isCanTypeCompose(id);
                break;
            case MergeType.ZhanlingEquip:
                b = this.isZlCanMerge();
                break;
            case MergeType.Rune:
                b = Rune.ins().isRuneCanMerge();
                break;
        }
        return b;
    };
    MergeCC.prototype.isCanMergeByIndex = function (id, index) {
        var _type = GlobalConfig.MergeTotal[id].type;
        var b = false;
        switch (_type) {
            case MergeType.SamsareEquip:
                b = SamsaraModel.ins().isCanZsLvCompose(GlobalConfig.MergeConfig[id][index].lv, GlobalConfig.MergeConfig[id][index].openZs);
                break;
            case MergeType.ZhanlingEquip:
                b = this.isZlCanMergeByIndex(id, index);
                break;
            case MergeType.Rune:
                b = Rune.ins().isRuneCanMergeByType(index);
                break;
        }
        return b;
    };
    MergeCC.prototype.getCanMergeTargetId = function (id, index) {
        var _type = GlobalConfig.MergeTotal[id].type;
        var targetId = 0;
        switch (_type) {
            case MergeType.SamsareEquip:
                var config = GlobalConfig.MergeConfig[id][index];
                targetId = SamsaraModel.ins().getComposeEquipId(config.lv, config.openZs);
                break;
            case MergeType.ZhanlingEquip:
                targetId = this.getZlCanMergeTargetId(id, index);
                break;
        }
        return targetId;
    };
    MergeCC.prototype.isCanMergeTargetId = function (type, targetId) {
        if (type == MergeType.SamsareEquip) {
            var config = GlobalConfig.ReincarnateEquipCompose[targetId];
            return SamsaraModel.ins().isCanEquipCompose(config.material.id);
        }
        else if (type == MergeType.ZhanlingEquip) {
            return this.isZlEquipIdCanMerge(targetId);
        }
        else if (type == MergeType.Rune) {
            return Rune.ins().isRuneCanMergeByID(targetId);
        }
        return false;
    };
    MergeCC.prototype.getZlMergeEquipByLv = function (lv) {
        if (!this._zlMergeEquip) {
            this._zlMergeEquip = {};
            var configs = GlobalConfig.ZhanLingEquip;
            for (var id in configs) {
                if (!this._zlMergeEquip[configs[id].level])
                    this._zlMergeEquip[configs[id].level] = [];
                this._zlMergeEquip[configs[id].level].push({ type: MergeType.ZhanlingEquip, id: configs[id].id });
            }
        }
        return this._zlMergeEquip[lv + 1];
    };
    MergeCC.prototype.getZlCanMergeTargetId = function (id, index) {
        var lv = GlobalConfig.MergeConfig[id][index].lv;
        var equips = this.getZlMergeEquipByLv(lv);
        for (var _i = 0, equips_1 = equips; _i < equips_1.length; _i++) {
            var equip = equips_1[_i];
            if (this.isZlEquipIdCanMerge(equip.id))
                return equip.id;
        }
        return 0;
    };
    MergeCC.prototype.isZlCanMerge = function () {
        var config = GlobalConfig.ZhanLingEquip;
        for (var i in config) {
            if (this.isZlEquipIdCanMerge(i))
                return true;
        }
        return false;
    };
    MergeCC.prototype.isZlCanMergeByIndex = function (id, index) {
        return !!this.getZlCanMergeTargetId(id, index);
    };
    MergeCC.prototype.isZlEquipIdCanMerge = function (equipId) {
        var config = GlobalConfig.ZhanLingEquip[equipId];
        var mat = config.mat;
        if (mat) {
            var num = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, mat[0].id) + this.getZlHadEquipCount(mat[0].id);
            if (num >= mat[0].count) {
                return true;
            }
        }
        return false;
    };
    MergeCC.prototype.getZlHadEquipCount = function (equipId) {
        var config = GlobalConfig.ZhanLingEquip[equipId];
        if (ZhanLingModel.ins().getZhanLingDataByItem(0, config.pos) == equipId) {
            return 1;
        }
        return 0;
    };
    return MergeCC;
}(BaseSystem));
__reflect(MergeCC.prototype, "MergeCC");
var MergeType;
(function (MergeType) {
    MergeType[MergeType["SamsareEquip"] = 1] = "SamsareEquip";
    MergeType[MergeType["ZhanlingEquip"] = 2] = "ZhanlingEquip";
    MergeType[MergeType["Rune"] = 3] = "Rune";
})(MergeType || (MergeType = {}));
var GameSystem;
(function (GameSystem) {
    GameSystem.mergeCC = MergeCC.ins.bind(MergeCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=MergeCC.js.map