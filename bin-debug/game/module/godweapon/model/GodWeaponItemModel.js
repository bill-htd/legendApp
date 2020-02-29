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
var GodweaponItemModel = (function (_super) {
    __extends(GodweaponItemModel, _super);
    function GodweaponItemModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GodweaponItemModel.ins = function () {
        return _super.ins.call(this);
    };
    GodweaponItemModel.prototype.init = function () {
        if (this._qualityItemMap || this._jobItemMap)
            return;
        this._qualityItemMap = {};
        this._jobItemMap = {};
        for (var i in GlobalConfig.GodweaponItemConfig) {
            var cfg = GlobalConfig.GodweaponItemConfig[i];
            var item = GlobalConfig.ItemConfig[cfg.id];
            var quality = ItemConfig.getQuality(item);
            if (quality < 4) {
                var ary = this._qualityItemMap[quality];
                if (ary == undefined) {
                    ary = [];
                }
                ary.push(cfg.id);
                this._qualityItemMap[quality] = ary;
            }
            else if (quality == 4) {
                if (!cfg.skill || cfg.skill.length <= 1) {
                    var job = ItemConfig.getJob(item);
                    var dataAry = this._jobItemMap[job];
                    if (dataAry == undefined) {
                        dataAry = [];
                    }
                    dataAry.push(cfg.id);
                    this._jobItemMap[job] = dataAry;
                }
            }
        }
    };
    Object.defineProperty(GodweaponItemModel.prototype, "qualityItemMap", {
        get: function () {
            if (!this._qualityItemMap) {
                this.init();
            }
            return this._qualityItemMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GodweaponItemModel.prototype, "jobItemMap", {
        get: function () {
            if (!this._jobItemMap) {
                this.init();
            }
            return this._jobItemMap;
        },
        enumerable: true,
        configurable: true
    });
    GodweaponItemModel.prototype.isCanCompound = function () {
        var canCompound = false;
        var qualityItemMap = this.qualityItemMap;
        for (var i in qualityItemMap) {
            if (parseInt(i) < 4) {
                canCompound = this.checkNum(qualityItemMap[i]);
                if (canCompound)
                    return canCompound;
            }
        }
        return canCompound;
    };
    GodweaponItemModel.prototype.checkNum = function (itemList) {
        var count = itemList.length;
        var itemCount = 0;
        for (var i = 0; i < count; i++) {
            itemCount += UserBag.ins().getBagGoodsCountById(0, itemList[i]);
        }
        return itemCount >= 3;
    };
    GodweaponItemModel.prototype.getCompoundItemList = function () {
        var list = {};
        var canCompound = false;
        var qualityItemMap = this.qualityItemMap;
        for (var i in qualityItemMap) {
            canCompound = this.checkNum(qualityItemMap[i]);
            if (canCompound) {
                list[i] = this.getItemList(qualityItemMap[i]);
            }
        }
        return list;
    };
    GodweaponItemModel.prototype.filterCompoundItemList = function (data, list) {
        var result = [];
        for (var i in list) {
            var cfg = new GodweaponItemData(list[i].id, list[i].count, list[i].quality);
            if (cfg.quality == data.quality) {
                if (cfg.id == data.id) {
                    if (cfg.count > 1) {
                        cfg.count--;
                        result.push(cfg);
                    }
                }
                else {
                    result.push(cfg);
                }
            }
        }
        return result;
    };
    GodweaponItemModel.prototype.toList = function (list) {
        var ary = [];
        for (var i in list) {
            ary = ary.concat(list[i]);
        }
        return ary;
    };
    GodweaponItemModel.prototype.getItemList = function (itemList) {
        var count = itemList.length;
        var ary = [];
        for (var i = 0; i < count; i++) {
            var itemId = itemList[i];
            var itemCount = UserBag.ins().getBagGoodsCountById(0, itemId);
            var quality = ItemConfig.getQuality(GlobalConfig.ItemConfig[itemId]);
            if (itemCount > 0) {
                ary.push(new GodweaponItemData(itemId, itemCount, quality));
            }
        }
        return ary;
    };
    GodweaponItemModel.prototype.isCanFuse = function () {
        var canFuse = false;
        return canFuse;
    };
    GodweaponItemModel.prototype.checkFuseNum = function (itemList) {
        var count = 0;
        var itemCount = 0;
        for (var i = 0; i < itemList.length; i++) {
            itemCount = UserBag.ins().getBagGoodsCountById(0, itemList[i]);
            if (itemCount > 0) {
                count++;
                if (count > 1) {
                    return true;
                }
            }
        }
        return false;
    };
    GodweaponItemModel.prototype.getFuseItemList = function () {
        var list = {};
        var canFuse = false;
        var jobItemMap = this.jobItemMap;
        for (var i in jobItemMap) {
            canFuse = this.checkFuseNum(jobItemMap[i]);
            if (canFuse) {
                list[i] = this.getJobFuseItemList(jobItemMap[i]);
            }
        }
        return list;
    };
    GodweaponItemModel.prototype.getJobFuseItemList = function (itemList) {
        var count = itemList.length;
        var ary = [];
        for (var i = 0; i < count; i++) {
            var id = itemList[i];
            var quality = ItemConfig.getQuality(GlobalConfig.ItemConfig[id]);
            var itemCount = UserBag.ins().getBagGoodsCountById(0, itemList[i]);
            if (itemCount > 0) {
                ary.push(new GodweaponItemData(id, itemCount, quality));
            }
        }
        return ary;
    };
    GodweaponItemModel.prototype.filterFuseItemList = function (data, list) {
        var result = [];
        var targetJob = ItemConfig.getJob(GlobalConfig.ItemConfig[data.id]);
        for (var i in list) {
            var cfg = new GodweaponItemData(list[i].id, list[i].count, list[i].quality);
            var job = ItemConfig.getJob(GlobalConfig.ItemConfig[cfg.id]);
            if (targetJob == job && data.id != cfg.id) {
                result.push(cfg);
            }
        }
        return result;
    };
    GodweaponItemModel.prototype.getFuseTargetItem = function (itemId1, itemId2) {
        var job = ItemConfig.getJob(GlobalConfig.ItemConfig[itemId1]);
        var itemId = 400000 + job * 10000 + Math.max(itemId1, itemId2) - Math.min(itemId1, itemId2) + 100 * (Math.min(itemId1, itemId2) % 20);
        return itemId;
    };
    return GodweaponItemModel;
}(BaseClass));
__reflect(GodweaponItemModel.prototype, "GodweaponItemModel");
//# sourceMappingURL=GodWeaponItemModel.js.map